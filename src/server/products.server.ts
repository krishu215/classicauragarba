import { setExtraDresses, type CollectionId, type Dress } from "@/lib/dresses";
import { db } from "./db.server";

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  collection: CollectionId;
  price: number;
  was: number;
  image_url: string;
  alt: string;
  badge: string | null;
  colors: string;
  work: string;
  occasion: string;
  story: string;
  details: string;
  active: boolean;
  sort_order: number;
  created_at: string;
};

export function toDress(row: ProductRow): Dress {
  return {
    slug: row.slug,
    name: row.name,
    collection: row.collection,
    price: row.price,
    was: row.was,
    image: row.image_url,
    alt: row.alt || row.name,
    badge: row.badge ?? undefined,
    colors: row.colors,
    work: row.work,
    occasion: row.occasion,
    story: row.story,
    details: row.details,
  };
}

let cache: { at: number; list: Dress[] } | null = null;
const TTL_MS = 30_000;

/** Load the active admin-added outfits (cached for 30 seconds) and put them into the shared DRESSES list. Never throws. */
export async function loadExtraDresses(): Promise<Dress[]> {
  if (cache && Date.now() - cache.at < TTL_MS) {
    setExtraDresses(cache.list);
    return cache.list;
  }
  let list: Dress[] = cache?.list ?? [];
  try {
    const { data, error } = await db()
      .from("products")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    list = ((data ?? []) as ProductRow[]).map(toDress);
    cache = { at: Date.now(), list };
  } catch (cause) {
    console.error("[products]", cause);
  }
  setExtraDresses(list);
  return list;
}

export function bustProductCache() {
  cache = null;
}
