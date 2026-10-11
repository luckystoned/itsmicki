/**
 * Missing souls (Side B, /sideb/projects/missing-souls): the animals people leave in the caregiver's care, shared by
 * every visitor and kept until the place is full. A Vercel Function next to the static site, backed by Vercel Blob
 * (the store's BLOB_READ_WRITE_TOKEN comes from connecting a Blob store to the project).
 *
 * Only the animal is ever stored, never the photo: it is read on the visitor's device, and what is sent is the pet's
 * silhouette and its light and shade (grey, only where the animal is). Each soul: 4 header bytes (width and height,
 * little-endian 16-bit), the silhouette (one byte per pixel) and, optionally, the shade (one more byte per pixel).
 *
 *   GET  /api/souls          → { souls: string[] (ids, oldest first), cap }
 *   GET  /api/souls?id=…     → the mask bytes (cached for good: a soul never changes)
 *   POST /api/souls  (mask)  → 201 { id } · 409 { full: true } when the place is full · 400 if it is not a mask
 */
import { get, list, put } from '@vercel/blob';

const CAP = 42; // Souls the place holds; then it is full, for good.
const MAX_SIDE = 240; // Largest mask side, in pixels.
const MIN_SIDE = 16;
const PREFIX = 'souls/';

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

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id');
  if (id) {
    if (!/^souls\/[a-z0-9-]+\.bin$/.test(id)) return new Response('Not found', { status: 404 });
    const blob = await get(id, { access: 'public' });
    if (!blob || blob.statusCode !== 200) return new Response('Not found', { status: 404 });
    return new Response(blob.stream, {
      headers: { 'content-type': 'application/octet-stream', 'cache-control': 'public, max-age=31536000, s-maxage=31536000, immutable' },
    });
  }
  const souls = await allSouls();
  return json({ souls: souls.map((soul) => soul.pathname), cap: CAP }, 200, 'public, max-age=0, s-maxage=5, stale-while-revalidate=60');
}

export async function POST(request: Request) {
  if (Number(request.headers.get('content-length') ?? 0) > 4 + MAX_SIDE * MAX_SIDE * 2) return json({ error: 'Too large' }, 413);
  const body = new Uint8Array(await request.arrayBuffer());
  if (body.length < 4) return json({ error: 'Not a mask' }, 400);
  const width = body[0] | (body[1] << 8), height = body[2] | (body[3] << 8);
  const sizeOk = width >= MIN_SIDE && height >= MIN_SIDE && width <= MAX_SIDE && height <= MAX_SIDE;
  if (!sizeOk || (body.length !== 4 + width * height && body.length !== 4 + width * height * 2)) return json({ error: 'Not a mask' }, 400);
  // A silhouette covers part of its box, never none or all of it.
  let solid = 0;
  for (let i = 4; i < 4 + width * height; i++) if (body[i] > 127) solid++;
  const cover = solid / (width * height);
  if (cover < .06 || cover > .94) return json({ error: 'Not a silhouette' }, 400);

  const souls = await allSouls();
  if (souls.length >= CAP) return json({ full: true, cap: CAP }, 409);
  const id = `${PREFIX}${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}.bin`;
  await put(id, Buffer.from(body), { access: 'public', contentType: 'application/octet-stream', addRandomSuffix: false });
  return json({ id, count: souls.length + 1, cap: CAP }, 201);
}
