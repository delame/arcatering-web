import { GET as getImage } from "../route";

// /api/product-image/<recordID>/<verze> – verze se mění s každou nově nahranou fotkou
// (viz photoVersion v lib/catalog.ts), takže CDN i prohlížeč po výměně fotky stáhnou novou.
// Samotná verze se ignoruje, fotka se vždy čte z Creatoru podle ID.
export async function GET(
  request: Request,
  ctx: { params: Promise<{ id: string; v: string }> }
) {
  return getImage(request, ctx);
}
