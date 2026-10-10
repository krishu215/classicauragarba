import { createServerFn } from "@tanstack/react-start";
import { BUILT_IN_SLUGS, type CollectionId } from "@/lib/dresses";
import { requireAdmin } from "./admin-auth.server";
import { db } from "./db.server";
import { env } from "./env.server";
import { bustProductCache, loadExtraDresses, type ProductRow } from "./products.server";

/** Public: the outfits added from the admin panel. The site shows them next to the built-in ones. */
export const getExtraDresses = createServerFn({ method: "GET" }).handler(async () => {
  return loadExtraDresses();
});

const COLLECTIONS: CollectionId[] = ["peacock", "mirror", "festive"];

export type ProductInput = {
  id?: string;
  name: string;
  collection: CollectionId;
  price: number;
  was: number;
  colors: string;
  work: string;
  occasion: string;
  story: string;
  details: string;
  badge: string;
  alt: string;
  active: boolean;
  /** JPEG, PNG or WebP photo as base64 (no data: prefix). Required for a new product. */
  imageBase64?: string;
  imageType?: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const publicUrl = (path: string) => `${env("SUPABASE_URL")}/storage/v1/object/public/products/${path}`;
const storagePath = (url: string) => url.split("/object/public/products/")[1] ?? "";

async function uploadPhoto(slug: string, base64: string, type: string) {
  const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
  if (!["image/jpeg", "image/png", "image/webp"].includes(type)) throw new Error("Photo must be a JPEG, PNG or WebP image.");
  const bytes = Buffer.from(base64, "base64");
  if (bytes.length === 0 || bytes.length > 3 * 1024 * 1024) throw new Error("Photo is too large. Please use one under 3 MB.");
  const path = `${slug}-${Date.now()}.${ext}`;
  const { error } = await db().storage.from("products").upload(path, bytes, { contentType: type, upsert: false });
  if (error) throw new Error("Could not upload the photo. Please try again.");
  return publicUrl(path);
}

function clean(input: ProductInput) {
  const name = input.name.trim().slice(0, 120);
  if (name.length < 3) throw new Error("Enter the outfit name.");
  if (!COLLECTIONS.includes(input.collection)) throw new Error("Choose a collection.");
  const price = Math.round(Number(input.price));
  const was = Math.round(Number(input.was));
  if (!(price > 0) || price > 100000) throw new Error("Enter the rent per day in rupees.");
  if (!(was >= price)) throw new Error("The original price must be the same as or more than the rent.");
  return {
    name,
    collection: input.collection,
    price,
    was,
    colors: input.colors.trim().slice(0, 200),
    work: input.work.trim().slice(0, 300),
    occasion: input.occasion.trim().slice(0, 300),
    story: input.story.trim().slice(0, 1200),
    details: input.details.trim().slice(0, 1200),
    badge: input.badge.trim().slice(0, 24) || null,
    alt: (input.alt.trim() || name).slice(0, 250),
    active: Boolean(input.active),
  };
}

export const adminListProducts = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { data, error } = await db().from("products").select("*").order("created_at", { ascending: false }).limit(300);
  if (error) throw new Error("Could not load products.");
  return (data ?? []) as ProductRow[];
});

export const adminSaveProduct = createServerFn({ method: "POST" })
  .inputValidator((data: ProductInput) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const fields = clean(data);

    if (data.id) {
      const patch: Record<string, unknown> = { ...fields };
      if (data.imageBase64) {
        const { data: current } = await db().from("products").select("slug, image_url").eq("id", data.id).maybeSingle();
        if (!current) throw new Error("Product not found.");
        patch.image_url = await uploadPhoto(current.slug as string, data.imageBase64, data.imageType ?? "image/jpeg");
        const old = storagePath(current.image_url as string);
        if (old) await db().storage.from("products").remove([old]);
      }
      const { error } = await db().from("products").update(patch).eq("id", data.id);
      if (error) throw new Error("Could not save the product.");
      bustProductCache();
      return { ok: true };
    }

    if (!data.imageBase64) throw new Error("Add a photo of the outfit.");
    let slug = slugify(fields.name);
    if (!slug) throw new Error("Enter a valid outfit name.");
    const { data: taken } = await db().from("products").select("slug").like("slug", `${slug}%`);
    const used = new Set([...(taken ?? []).map((row) => row.slug as string), ...BUILT_IN_SLUGS]);
    if (used.has(slug)) {
      let n = 2;
      while (used.has(`${slug}-${n}`)) n++;
      slug = `${slug}-${n}`;
    }
    const image_url = await uploadPhoto(slug, data.imageBase64, data.imageType ?? "image/jpeg");
    const { error } = await db().from("products").insert({ slug, image_url, ...fields });
    if (error) {
      console.error("[product-insert]", error);
      throw new Error("Could not save the product.");
    }
    bustProductCache();
    return { ok: true, slug };
  });

export const adminSetProductActive = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; active: boolean }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { error } = await db().from("products").update({ active: Boolean(data.active) }).eq("id", data.id);
    if (error) throw new Error("Could not update the product.");
    bustProductCache();
    return { ok: true };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { data: row } = await db().from("products").select("image_url").eq("id", data.id).maybeSingle();
    const { error } = await db().from("products").delete().eq("id", data.id);
    if (error) throw new Error("Could not delete the product.");
    const path = row ? storagePath(row.image_url as string) : "";
    if (path) await db().storage.from("products").remove([path]);
    bustProductCache();
    return { ok: true };
  });
