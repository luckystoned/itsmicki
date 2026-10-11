/**
 * Missing souls (Side B, /sideb/projects/missing-souls): the animals people leave in the caregiver's care, shared by
 * every visitor and kept until the place is full. A Vercel Function next to the static site, backed by Vercel Blob
 * (the store's BLOB_READ_WRITE_TOKEN comes from connecting a Blob store to the project).
 *
 * Each soul is two blobs with the same stem: its photo (a JPEG the visitor's browser cropped around the animal and
 * re-drew, so no location or camera details travel with it), shown in the list of who's here; and its look, kept in
 * its own pathname: c(at) or d(og), size (0–2), markings (0 plain, 1 tabby, 2 patches), three colours, then its name
 * and its owner's (hex of their UTF-8), e.g. "souls/<stem>_c11_f2d9b0b98a5e4a3326_4d696c6f_4d69636b69.json".
 *
 *   GET  /api/souls                → { souls: Array<{ id, photo? }> (oldest first), cap }
 *   POST /api/souls { look, photo } → 201 { id, photo } · 409 { full: true } when full · 400 if it is not a soul
 */
import { list, put } from '@vercel/blob';

const CAP = 42; // Souls the place holds; then it is full, for good.
const PREFIX = 'souls/';
const LOOK = /^[cd][012][012]_[0-9a-f]{18}_[0-9a-f]{2,40}_[0-9a-f]{2,40}$/; // Look, name, owner.
const MAX_PHOTO = 600_000; // Bytes of JPEG.

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

export async function GET() {
  const blobs = await everything();
  const photos = new Map(blobs.filter((blob) => blob.pathname.endsWith('.jpg')).map((blob) => [stemOf(blob.pathname), blob.url]));
  const souls = blobs.filter((blob) => blob.pathname.endsWith('.json')).sort((a, b) => +a.uploadedAt - +b.uploadedAt)
    .map((blob) => ({ id: blob.pathname, photo: photos.get(stemOf(blob.pathname)) }));
  return json({ souls, cap: CAP }, 200, 'public, max-age=0, s-maxage=5, stale-while-revalidate=60');
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

  const souls = (await everything()).filter((blob) => blob.pathname.endsWith('.json'));
  if (souls.length >= CAP) return json({ full: true, cap: CAP }, 409);
  const stem = `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
  const picture = await put(`${PREFIX}${stem}.jpg`, photo, { access: 'public', contentType: 'image/jpeg', addRandomSuffix: false, cacheControlMaxAge: 31536000 });
  const id = `${PREFIX}${stem}_${look}.json`;
  await put(id, JSON.stringify({ look }), { access: 'public', contentType: 'application/json', addRandomSuffix: false });
  return json({ id, photo: picture.url, count: souls.length + 1, cap: CAP }, 201);
}
