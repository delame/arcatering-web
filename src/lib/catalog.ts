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

export interface CatalogItem {
  id: string;
  photo: string;
  urlPic?: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  /** Množství v košíku je v jednotkách qtyUnit (ks/g), resp. v baleních, když je qtyUnit prázdné. */
  min: number;
  step: number;
  /** Kolik jednotek qtyUnit je v jednom balení z ceníku (20ks → 20, 1 000g → 1000; počítání v baleních → 1). */
  pack: number;
  qtyUnit: "ks" | "g" | "";
  tags: string[];
  allergens: string[];
  order: number;
}

// Kvóta Creator API je omezená a počítá se na každé volání. Katalog proto čteme
// z Creatoru max. jednou za 6 hodin, ne při každé návštěvě webu:
//  - CDN (Vercel) drží odpověď přes s-maxage, návštěvníci se do funkce vůbec nedostanou
//  - paměť instance drží poslední dobrou odpověď (použije se i když Creator selže)
const FRESH_MS = 6 * 60 * 60 * 1000;

export interface CatalogCategory {
  id: string;
  title: string;
  subtitle: string;
  items: CatalogItem[];
}

let cache: { categories: CatalogCategory[]; exp: number } | null = null;

// Pravidla množství podle kategorie (Richard, 2026-10-14). Množství se počítá buď
// v reálných jednotkách balení ("base": kanapky po kusech, mísy po gramech), nebo
// v celých baleních/porcích ("pack": teplé pokrmy 3× 200g).
//   min/step: číslo v jednotkách počítání, "pack" = velikost balení, "halfPack" = polovina
interface QtyRule {
  count: "base" | "pack";
  min: number | "pack";
  step: number | "pack" | "halfPack";
}
const BOWL: QtyRule = { count: "base", min: "pack", step: "halfPack" };
const PORTION: QtyRule = { count: "pack", min: 3, step: 1 };
const QTY_RULES: Record<string, QtyRule> = {
  "Kanapky": { count: "base", min: 20, step: 5 },
  "Studené finger food": { count: "base", min: 20, step: 5 },
  "Minidezerty": { count: "base", min: "pack", step: "pack" },
  "Zákusky": { count: "base", min: 5, step: 1 },
  "Slavnostní zdobené mísy": BOWL,
  "Salátové mísy": BOWL,
  "Vegetariánské salátové mísy": BOWL,
  "Ovocné mísy": BOWL,
  "Teplé pokrmy": PORTION,
  "Vegetariánské teplé pokrmy": PORTION,
  "Přílohy": PORTION,
};

// Balení z textu jednotky: "20ks" → 20 ks, "1 000g" (i s NBSP) → 1000 g, "Ks" → 1 ks.
function parsePack(unit: string): { size: number; base: "ks" | "g" } | null {
  const m = unit.replace(/[\s\u00a0]/g, "").toLowerCase().match(/^(\d*)(ks|g)$/);
  if (!m) return null;
  return { size: m[1] ? parseInt(m[1], 10) : 1, base: m[2] as "ks" | "g" };
}

// Jak se položka objednává: minimum, krok a v jakých jednotkách. Pole Min z Creatoru
// (v jednotkách počítání, tj. ks/g/porce) přepisuje minimum z pravidla.
// Bez pravidla: kusové balení (10ks) po celých baleních v kusech, ostatní po 1.
export function qtyRule(unit: string, rawMin: unknown, category: string) {
  const pack = parsePack(unit);
  let rule = QTY_RULES[category];
  if (!rule) rule = pack?.base === "ks" ? { count: "base", min: "pack", step: "pack" } : { count: "pack", min: 1, step: 1 };
  // mísa s nečitelnou jednotkou → aspoň po celých kusech
  if (rule.count === "base" && !pack) rule = { count: "pack", min: 1, step: 1 };

  const size = rule.count === "base" && pack ? pack.size : 1;
  const resolve = (v: number | "pack" | "halfPack") =>
    v === "pack" ? size : v === "halfPack" ? Math.max(1, Math.round(size / 2)) : v;
  const fromCreator = parseInt(String(rawMin ?? ""), 10);
  return {
    min: Math.max(1, fromCreator > 0 ? fromCreator : resolve(rule.min)),
    step: Math.max(1, resolve(rule.step)),
    pack: size,
    qtyUnit: rule.count === "base" && pack ? pack.base : ("" as const),
  };
}

async function loadCatalog(): Promise<CatalogCategory[]> {
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

  // Verze fotky = krátký otisk cesty k souboru v poli Foto. Creator dává každému nahranému
  // souboru nový název, takže výměna fotky změní URL a obejde týdenní cache obrázků.
  const photoVersion = (path: string) => {
    let h = 5381;
    for (let i = 0; i < path.length; i++) h = ((h * 33) ^ path.charCodeAt(i)) >>> 0;
    return h.toString(36);
  };

  // Seskup podle kategorie, jen dostupné
  const byCat: Record<string, CatalogItem[]> = {};
  for (const r of records) {
    if (String(r.Dostupne) !== "true") continue;
    const cat = (r.Kategorie as string) || "Ostatní";
    (byCat[cat] ??= []).push({
      id: String(r.ID),
      // bez fotky v Creatoru neposíláme URL → frontend rovnou ukáže placeholder
      // a nevolá /api/product-image (každé takové volání by stálo kvótu)
      photo: r.Foto ? `/api/product-image/${r.ID}/${photoVersion(String(r.Foto))}` : "",
      // Cloudinary URL (pole urlPic v Creatoru) – fotka se pak načítá přímo z Cloudinary,
      // bez volání Creator API. next/image povoluje jen res.cloudinary.com, jiný host by
      // shodil render, proto jiné URL ignorujeme.
      ...(typeof r.urlPic === "string" && r.urlPic.startsWith("https://res.cloudinary.com/")
        ? { urlPic: r.urlPic }
        : {}),
      name: (r.Nazev as string) ?? "",
      description: (r.Popis as string) ?? "",
      price: parseFloat(r.Cena as string) || 0,
      unit: (r.Jednotka as string) ?? "",
      ...qtyRule((r.Jednotka as string) ?? "", r.Min, cat),
      tags: toList(r.Tagy),
      allergens: toList(r.Alergeny),
      order: parseInt(r.Poradi as string, 10) || 0,
    });
  }

  // Pořadí podle ceníku: Poradi v Creatoru je číslo 1–262 přes celý ceník, takže řadí položky
  // i kategorie (kategorie = nejnižší Poradi v ní). Položka bez Poradi (0) jde na konec.
  const rank = (i: CatalogItem) => (i.order > 0 ? i.order : Number.MAX_SAFE_INTEGER);
  const byRank = (a: CatalogItem, b: CatalogItem) => rank(a) - rank(b) || a.name.localeCompare(b.name, "cs");
  return Object.keys(byCat)
    .map((title) => ({
      id: slug(title),
      title,
      subtitle: "",
      items: byCat[title].sort(byRank),
    }))
    .sort((a, b) => rank(a.items[0]) - rank(b.items[0]) || a.title.localeCompare(b.title, "cs"));
}

// Katalog z paměti instance (max. 6 h starý), jinak čerstvě z Creatoru.
// Když Creator selže, vrátí poslední dobrou kopii se stale: true; bez kopie vyhodí chybu.
export async function getCatalog(): Promise<{ categories: CatalogCategory[]; stale: boolean }> {
  if (cache && cache.exp > Date.now()) {
    return { categories: cache.categories, stale: false };
  }
  try {
    const categories = await loadCatalog();
    cache = { categories, exp: Date.now() + FRESH_MS };
    return { categories, stale: false };
  } catch (e) {
    if (cache) {
      console.error("[catalog] Creator selhal, vracím starou kopii", e);
      return { categories: cache.categories, stale: true };
    }
    throw e;
  }
}
