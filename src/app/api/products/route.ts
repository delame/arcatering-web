import { NextResponse } from "next/server";
import { getZohoAccessToken, zohoEnvHeader, zohoBase } from "@/lib/zoho";

// Multi-select z Creatoru může přijít jako pole nebo čárkami oddělený string – sjednotíme na pole.
function toList(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === "string") return v.split(",").map((x) => x.trim()).filter(Boolean);
  return [];
}

// id kategorie ze sentence-case názvu (stabilní klíč pro frontend)
function slug(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface CatalogItem {
  id: string;
  photo: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  min: string;
  tags: string[];
  allergens: string[];
  order: number;
}

// Kvóta Creator API je omezená a počítá se na každé volání. Katalog proto čteme
// z Creatoru max. jednou za hodinu, ne při každé návštěvě webu:
//  - CDN (Vercel) drží odpověď přes s-maxage, návštěvníci se do funkce vůbec nedostanou
//  - paměť instance drží poslední dobrou odpověď (použije se i když Creator selže)
const FRESH_MS = 60 * 60 * 1000;
const OK_HEADERS = { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" };
let cache: { categories: unknown[]; exp: number } | null = null;

async function loadCatalog() {
  const token = await getZohoAccessToken();

  // Načti všechny produkty (stránkování po 200 kvůli většímu ceníku)
  const records: Record<string, unknown>[] = [];
  let from = 1;
  const limit = 200;
  while (true) {
    const url = `${zohoBase()}/report/Products_Report?from=${from}&limit=${limit}`;
    const res = await fetch(url, {
      headers: { Authorization: `Zoho-oauthtoken ${token}`, ...zohoEnvHeader() },
    });
    const data = await res.json();
    // Creator vrací chyby (např. 4000 = vyčerpaná API kvóta) s HTTP 200 → kontrolujeme code
    if (data.code !== 3000) {
      throw new Error("Creator error: " + JSON.stringify(data));
    }
    const page = data.data ?? [];
    records.push(...page);
    if (page.length < limit) break;
    from += limit;
  }

  // Seskup podle kategorie, jen dostupné, seřaď podle Poradi
  const byCat: Record<string, CatalogItem[]> = {};
  for (const r of records) {
    if (String(r.Dostupne) !== "true") continue;
    const cat = (r.Kategorie as string) || "Ostatní";
    (byCat[cat] ??= []).push({
      id: String(r.ID),
      // bez fotky v Creatoru neposíláme URL → frontend rovnou ukáže placeholder
      // a nevolá /api/product-image (každé takové volání by stálo kvótu)
      photo: r.Foto ? `/api/product-image/${r.ID}` : "",
      name: (r.Nazev as string) ?? "",
      description: (r.Popis as string) ?? "",
      price: parseFloat(r.Cena as string) || 0,
      unit: (r.Jednotka as string) ?? "",
      min: (r.Min as string) ?? "",
      tags: toList(r.Tagy),
      allergens: toList(r.Alergeny),
      order: parseInt(r.Poradi as string, 10) || 0,
    });
  }

  return Object.keys(byCat).map((title) => ({
    id: slug(title),
    title,
    subtitle: "",
    items: byCat[title].sort((a, b) => a.order - b.order),
  }));
}

export async function GET() {
  if (cache && cache.exp > Date.now()) {
    return NextResponse.json({ categories: cache.categories }, { headers: OK_HEADERS });
  }
  try {
    const categories = await loadCatalog();
    cache = { categories, exp: Date.now() + FRESH_MS };
    return NextResponse.json({ categories }, { headers: OK_HEADERS });
  } catch (e) {
    console.error("[products]", e);
    // Creator selhal → radši stará kopie než prázdný katalog; krátká cache ať se brzy zkusí znovu
    if (cache) {
      return NextResponse.json(
        { categories: cache.categories, stale: true },
        { headers: { "Cache-Control": "public, s-maxage=60" } }
      );
    }
    // chybu necachovat (no-store), jinak by se prázdný katalog držel na CDN
    return NextResponse.json(
      { categories: [], error: true },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
