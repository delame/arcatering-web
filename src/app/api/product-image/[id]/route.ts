import { getZohoAccessToken, zohoEnvHeader, zohoBase } from "@/lib/zoho";

// Proxy fotky produktu z Creatoru + cache na CDN.
// /api/product-image/<recordID>  (cesta bez query stringu kvůli next/image)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id || !/^\d+$/.test(id)) {
    return new Response("Bad id", { status: 400 });
  }
  try {
    const token = await getZohoAccessToken();
    const headers = { Authorization: `Zoho-oauthtoken ${token}`, ...zohoEnvHeader() };

    // 1. načti záznam → zjisti download path obrázku (pole Foto)
    const recRes = await fetch(`${zohoBase()}/report/Products_Report/${id}`, { headers });
    const recData = await recRes.json();
    const fotoPath = recData?.data?.Foto;
    if (!fotoPath || typeof fotoPath !== "string") {
      // cachujeme i 404, jinak by každá návštěva znovu volala Creator (kvóta)
      return new Response("No image", { status: 404, headers: { "Cache-Control": "public, s-maxage=3600" } });
    }

    // 2. stáhni obrázek (povol jen cestu k Foto download tohoto reportu)
    if (!fotoPath.includes("/report/Products_Report/") || !fotoPath.includes("/Foto/download")) {
      return new Response("Invalid path", { status: 400 });
    }
    const imgRes = await fetch(`https://creator.zoho.eu${fotoPath}`, { headers });
    if (!imgRes.ok) {
      return new Response("Image fetch failed", { status: 502 });
    }
    const buf = await imgRes.arrayBuffer();
    const contentType = imgRes.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";

    return new Response(buf, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    console.error("[product-image]", e);
    return new Response("Error", { status: 500 });
  }
}
