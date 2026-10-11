/**
 * Missing souls (Side B, /sideb/projects/missing-souls): the animals people leave in the caregiver's care, shared by
 * every visitor and kept until the place is full. A Vercel Function next to the static site, backed by Vercel Blob
 * (the store's BLOB_READ_WRITE_TOKEN comes from connecting a Blob store to the project).
 *
 * Nothing of the photo is stored: it is read on the visitor's device, and all that is sent is a short description of
 * the pet, e.g. "c12_f2d9b0b98a5e4a3326": c(at) or d(og), its size (0–2), its markings (0 plain, 1 tabby, 2 patches)
 * and three colours. It is kept in the soul's own name, so listing the store is enough to draw everyone.
 *
 *   GET  /api/souls               → { souls: string[] (names, oldest first), cap }
 *   POST /api/souls { look }      → 201 { id } · 409 { full: true } when the place is full · 400 if it is not a look
 */
import { list, put } from '@vercel/blob';

const CAP = 42; // Souls the place holds; then it is full, for good.
const PREFIX = 'souls/';
const LOOK = /^[cd][012][012]_[0-9a-f]{18}$/;

const json = (body: unknown, status = 200, cache = 'no-store') =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': cache } });

const allSouls = async () => {
  const souls: Array<{ pathname: string; uploadedAt: Date }> = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, limit: 1000, cursor });
    souls.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return souls.sort((a, b) => +a.uploadedAt - +b.uploadedAt);
};

export async function GET() {
  const souls = await allSouls();
  return json({ souls: souls.map((soul) => soul.pathname), cap: CAP }, 200, 'public, max-age=0, s-maxage=5, stale-while-revalidate=60');
}

export async function POST(request: Request) {
  if (Number(request.headers.get('content-length') ?? 0) > 200) return json({ error: 'Too large' }, 413);
  const body = await request.json().catch(() => null) as { look?: unknown } | null;
  const look = typeof body?.look === 'string' ? body.look : '';
  if (!LOOK.test(look)) return json({ error: 'Not a look' }, 400);

  const souls = await allSouls();
  if (souls.length >= CAP) return json({ full: true, cap: CAP }, 409);
  const id = `${PREFIX}${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}_${look}.json`;
  await put(id, JSON.stringify({ look }), { access: 'public', contentType: 'application/json', addRandomSuffix: false });
  return json({ id, count: souls.length + 1, cap: CAP }, 201);
}
