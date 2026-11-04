/**
 * Missing souls (Side B, /sideb/projects/missing-souls): the animals people leave in the caregiver's care, shared by
 * every visitor and kept until the place is full. A Vercel Function next to the static site, backed by Vercel Blob
 * (the store's BLOB_READ_WRITE_TOKEN comes from connecting a Blob store to the project).
 *
 * Each soul is two blobs with the same stem: its photo (a JPEG the visitor's browser cropped around the animal and
 * re-drew, so no location or camera details travel with it), shown in the list of who's here; and its look, kept in
 * its own pathname: c(at) or d(og), size (0–2), coat (0 plain, 1 tabby, 2 patches, 3 tortoiseshell), build (0 thin …
 * 9 chubby), three colours, its name and its owner's (hex of their UTF-8), and any markings ("_x" and bits in hex),
 * e.g. "souls/<stem>_c114_f2d9b0b98a5e4a3326_4d696c6f_4d69636b69.json".
 *
 * Whoever leaves a soul gets a key (kept in their browser) to change its look or take it out again; only the key's
 * SHA-256 is stored, inside the look's blob.
 *
 *   GET    /api/souls                    → { souls: Array<{ id, photo?, marks? }> (oldest first), cap }
 *   POST   /api/souls { look, photo }     → 201 { id, photo, key } · 409 { full: true } when full · 400 if it is not a soul
 *   PATCH  /api/souls { id, key, look }   → 200 { id } (its new id) · 403 with the wrong key · 404 if it is gone
 *   DELETE /api/souls { id, key }         → 200 { gone: id } · 403 with the wrong key · 404 if it is gone
 */
import { del, list, put } from '@vercel/blob';

const CAP = 42; // Souls the place holds; then it is full (until someone takes theirs out).
const PREFIX = 'souls/';
// Look (coat 0–3, build 0–9), name, owner, and its markings if it has any.
const LOOK = /^[cd][012][0-3][0-9]_[0-9a-f]{18}_[0-9a-f]{2,40}_[0-9a-f]{2,40}(?:_x[0-9a-f]{1,4})?$/;
const MAX_PHOTO = 600_000; // Bytes of JPEG.
// Souls taken out of the place (by their stem), without deleting their files: Lexie, who is alive.
const HIDDEN = new Set(['mv41f4ng-3a584adb']);
// Photos replaced by hand (by stem), served from the site: Sandia's was kept blank by the browser it was left from.
const PHOTOS: Record<string, string> = { 'mv4c70zh-7573a7b7': '/04_SideB/Projects/04_MissingSouls/souls/sandia.jpg' };
// Markings added by hand (by stem, bits as in the site's MARKS) to souls left before they could be chosen:
// Mirko and Sandia have pricked ears (1024).
const MARKS: Record<string, number> = { 'mv459j8u-ca3564ca': 1024, 'mv4c70zh-7573a7b7': 1024 };

const json = (body: unknown, status = 200, cache = 'no-store') =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': cache } });

const everything = async () => {
  const blobs: Array<{ pathname: string; url: string; uploadedAt: Date }> = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, limit: 1000, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
};
const stemOf = (pathname: string) => pathname.replace(/^souls\//, '').split('_')[0].replace(/\.jpg$/, '');
const shown = (pathname: string) => !HIDDEN.has(stemOf(pathname));
const sha256 = async (text: string) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)))].map((b) => b.toString(16).padStart(2, '0')).join('');

/** The soul `id` names, if `key` is the one it was left with: its look blob and its photo blob. */
const owned = async (id: unknown, key: unknown) => {
  if (typeof id !== 'string' || typeof key !== 'string' || !/^souls\/[0-9a-z]+-[0-9a-f]{8}_/.test(id) || key.length < 32 || key.length > 128) return { status: 400 as const };
  const stem = stemOf(id);
  const blobs = (await list({ prefix: `${PREFIX}${stem}` })).blobs;
  const look = blobs.find((blob) => blob.pathname === id);
  if (!look || !shown(id)) return { status: 404 as const };
  const kept = await fetch(look.url, { cache: 'no-store' }).then((response) => response.json()).catch(() => null) as { keyHash?: string } | null;
  if (!kept?.keyHash || kept.keyHash !== await sha256(key)) return { status: 403 as const };
  return { status: 200 as const, stem, look, photo: blobs.find((blob) => blob.pathname.endsWith('.jpg')), keyHash: kept.keyHash };
};

export async function GET() {
  const blobs = (await everything()).filter((blob) => shown(blob.pathname));
  const photos = new Map(blobs.filter((blob) => blob.pathname.endsWith('.jpg')).map((blob) => [stemOf(blob.pathname), blob.url]));
  // Oldest first, by when they were left (the stem starts with that time), so an edited soul keeps its place.
  const souls = blobs.filter((blob) => blob.pathname.endsWith('.json')).sort((a, b) => stemOf(a.pathname).localeCompare(stemOf(b.pathname)))
    .map((blob) => ({ id: blob.pathname, photo: PHOTOS[stemOf(blob.pathname)] ?? photos.get(stemOf(blob.pathname)), marks: MARKS[stemOf(blob.pathname)] }));
  // Cached at the edge for 30 seconds: listing counts against Blob's monthly operations (2,000 on Hobby). Whoever just
  // added a soul sees it right away anyway (their browser adds it until the list catches up).
  return json({ souls, cap: CAP }, 200, 'public, max-age=0, s-maxage=30, stale-while-revalidate=120');
}

export async function POST(request: Request) {
  if (Number(request.headers.get('content-length') ?? 0) > MAX_PHOTO * 1.4 + 1000) return json({ error: 'Too large' }, 413);
  const body = await request.json().catch(() => null) as { look?: unknown; photo?: unknown } | null;
  const look = typeof body?.look === 'string' ? body.look : '';
  if (!LOOK.test(look)) return json({ error: 'Not a look' }, 400);
  const match = typeof body?.photo === 'string' ? /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(body.photo) : null;
  const photo = match ? Buffer.from(match[1], 'base64') : null;
  // A JPEG (it starts FF D8 FF) of a sensible size.
  if (!photo || photo.length > MAX_PHOTO || photo[0] !== 0xff || photo[1] !== 0xd8 || photo[2] !== 0xff) return json({ error: 'Not a photo' }, 400);

  const souls = (await everything()).filter((blob) => blob.pathname.endsWith('.json') && shown(blob.pathname));
  if (souls.length >= CAP) return json({ full: true, cap: CAP }, 409);
  const stem = `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
  const picture = await put(`${PREFIX}${stem}.jpg`, photo, { access: 'public', contentType: 'image/jpeg', addRandomSuffix: false, cacheControlMaxAge: 31536000 });
  const id = `${PREFIX}${stem}_${look}.json`;
  const key = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, '');
  await put(id, JSON.stringify({ look, keyHash: await sha256(key) }), { access: 'public', contentType: 'application/json', addRandomSuffix: false });
  return json({ id, photo: picture.url, key, count: souls.length + 1, cap: CAP }, 201);
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null) as { id?: unknown; key?: unknown; look?: unknown } | null;
  const look = typeof body?.look === 'string' ? body.look : '';
  if (!LOOK.test(look)) return json({ error: 'Not a look' }, 400);
  const soul = await owned(body?.id, body?.key);
  if (soul.status !== 200) return json({ error: 'Not yours' }, soul.status);
  const id = `${PREFIX}${soul.stem}_${look}.json`;
  if (id !== soul.look.pathname) {
    await put(id, JSON.stringify({ look, keyHash: soul.keyHash }), { access: 'public', contentType: 'application/json', addRandomSuffix: false });
    await del(soul.look.url);
  }
  return json({ id });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null) as { id?: unknown; key?: unknown } | null;
  const soul = await owned(body?.id, body?.key);
  if (soul.status !== 200) return json({ error: 'Not yours' }, soul.status);
  await del([soul.look.url, ...(soul.photo ? [soul.photo.url] : [])]);
  return json({ gone: soul.look.pathname });
}
