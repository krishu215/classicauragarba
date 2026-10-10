import { useCallback, useEffect, useState, type FormEvent } from "react";
import { imgSize } from "@/lib/images";
import { inr } from "@/lib/site";
import type { CollectionId } from "@/lib/dresses";
import { adminDeleteProduct, adminListProducts, adminSaveProduct, adminSetProductActive, type ProductInput } from "@/server/products";
import type { ProductRow } from "@/server/products.server";

const COLLECTION_LABEL: Record<CollectionId, string> = {
  peacock: "Peacock Border",
  mirror: "Mirror Work",
  festive: "Festive Lehengas",
};

type Draft = Omit<ProductInput, "price" | "was" | "imageBase64" | "imageType"> & { price: string; was: string };

const EMPTY: Draft = {
  name: "",
  collection: "peacock",
  price: "",
  was: "",
  colors: "",
  work: "",
  occasion: "",
  story: "",
  details: "",
  badge: "",
  alt: "",
  active: true,
};

/** Shrink a phone photo to a web-sized JPEG before upload, so it is quick to send and quick to load. */
async function toJpeg(file: File): Promise<{ base64: string; preview: string }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const preview = canvas.toDataURL("image/jpeg", 0.86);
  return { base64: preview.split(",")[1] ?? "", preview };
}

export function ProductsPanel() {
  const [rows, setRows] = useState<ProductRow[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<ProductRow | "new" | null>(null);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      setRows(await adminListProducts());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load products.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function toggle(row: ProductRow) {
    try {
      await adminSetProductActive({ data: { id: row.id, active: !row.active } });
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update.");
    }
  }

  async function remove(row: ProductRow) {
    if (!window.confirm(`Delete "${row.name}" for good? Old bookings keep their record.`)) return;
    try {
      await adminDeleteProduct({ data: { id: row.id } });
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not delete.");
    }
  }

  if (editing) {
    return (
      <ProductForm
        product={editing === "new" ? null : editing}
        onCancel={() => setEditing(null)}
        onSaved={async (text) => {
          setEditing(null);
          setMessage(text);
          await load();
        }}
      />
    );
  }

  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-mute">Outfits you add here appear on the shop within a minute. The built-in outfits stay as they are.</p>
        <button className="btn btn-solid" onClick={() => { setMessage(""); setEditing("new"); }}>Add product</button>
      </div>
      {message ? <p className="mt-3 text-ok" role="status">{message}</p> : null}
      {error ? <p className="field-error mt-3">{error}</p> : null}
      {rows === null && !error ? <p className="mt-6 text-mute">Loading…</p> : null}
      {rows && rows.length === 0 ? <p className="mt-6 text-mute">No products added yet. Tap Add product to put a new outfit on the site.</p> : null}
      <ul className="mt-5 grid gap-3">
        {(rows ?? []).map((row) => (
          <li key={row.id} className="flex gap-4 border border-line bg-paper p-4">
            <img src={row.image_url} {...imgSize(row.image_url)} alt="" className="size-20 shrink-0 object-cover" loading="lazy" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-2xl leading-tight text-cream">{row.name}</p>
              <p className="text-sm text-mute">
                {inr(row.price)} per day · {COLLECTION_LABEL[row.collection]} · {row.active ? "Showing on the site" : "Hidden"}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button className="btn btn-line min-h-9 px-3 py-1" onClick={() => { setMessage(""); setEditing(row); }}>Edit</button>
                <button className="btn btn-line min-h-9 px-3 py-1" onClick={() => void toggle(row)}>{row.active ? "Hide" : "Show"}</button>
                <a className="btn btn-line min-h-9 px-3 py-1" href={`/dress/${row.slug}`} target="_blank" rel="noreferrer">View</a>
                <button className="btn btn-line min-h-9 px-3 py-1" onClick={() => void remove(row)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductForm({ product, onCancel, onSaved }: { product: ProductRow | null; onCancel: () => void; onSaved: (message: string) => Promise<void> }) {
  const [draft, setDraft] = useState<Draft>(
    product
      ? {
          id: product.id,
          name: product.name,
          collection: product.collection,
          price: String(product.price),
          was: String(product.was),
          colors: product.colors,
          work: product.work,
          occasion: product.occasion,
          story: product.story,
          details: product.details,
          badge: product.badge ?? "",
          alt: product.alt,
          active: product.active,
        }
      : EMPTY,
  );
  const [photo, setPhoto] = useState<{ base64: string } | null>(null);
  const [preview, setPreview] = useState(product?.image_url ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = (patch: Partial<Draft>) => setDraft((current) => ({ ...current, ...patch }));

  async function pick(file: File | undefined) {
    if (!file) return;
    setError("");
    try {
      const result = await toJpeg(file);
      setPhoto({ base64: result.base64 });
      setPreview(result.preview);
    } catch {
      setError("Could not read this photo. Please try a JPG or PNG.");
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!product && !photo) {
      setError("Add a photo of the outfit.");
      return;
    }
    setBusy(true);
    try {
      await adminSaveProduct({
        data: {
          ...draft,
          price: Number(draft.price),
          was: Number(draft.was || draft.price),
          imageBase64: photo?.base64,
          imageType: photo ? "image/jpeg" : undefined,
        },
      });
      await onSaved(product ? "Changes saved." : "Product added. It is live on the shop within a minute.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save the product.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 grid max-w-2xl gap-5">
      <h2 className="font-display text-3xl text-cream">{product ? "Edit product" : "Add a product"}</h2>

      <div>
        <label className="label" htmlFor="pr-photo">Photo {product ? "(leave empty to keep the current one)" : ""}</label>
        {preview ? <img src={preview} alt="Preview" className="mb-3 max-h-72 w-auto border border-line object-contain" /> : null}
        <input id="pr-photo" type="file" accept="image/jpeg,image/png,image/webp" className="field" onChange={(e) => void pick(e.target.files?.[0])} />
        <p className="mt-1 text-xs text-mute">Upright (portrait) photo of the whole outfit works best. It is resized automatically.</p>
      </div>

      <div>
        <label className="label" htmlFor="pr-name">Outfit name</label>
        <input id="pr-name" className="field" required value={draft.name} onChange={(e) => set({ name: e.target.value })} placeholder="Royal Peacock Mirror Chaniya Choli" />
      </div>

      <div>
        <label className="label" htmlFor="pr-col">Collection</label>
        <select id="pr-col" className="field" value={draft.collection} onChange={(e) => set({ collection: e.target.value as CollectionId })}>
          {(Object.keys(COLLECTION_LABEL) as CollectionId[]).map((id) => (
            <option key={id} value={id}>{COLLECTION_LABEL[id]}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="pr-price">Rent per day (₹)</label>
          <input id="pr-price" className="field" inputMode="numeric" required value={draft.price} onChange={(e) => set({ price: e.target.value.replace(/\D/g, "") })} placeholder="699" />
        </div>
        <div>
          <label className="label" htmlFor="pr-was">Original price (₹)</label>
          <input id="pr-was" className="field" inputMode="numeric" value={draft.was} onChange={(e) => set({ was: e.target.value.replace(/\D/g, "") })} placeholder="899" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="pr-colors">Colours</label>
        <input id="pr-colors" className="field" value={draft.colors} onChange={(e) => set({ colors: e.target.value })} placeholder="Purple, gold, multicolour" />
      </div>
      <div>
        <label className="label" htmlFor="pr-work">Work and embroidery</label>
        <input id="pr-work" className="field" value={draft.work} onChange={(e) => set({ work: e.target.value })} placeholder="Peacock and floral mirror border, gota, tassels" />
      </div>
      <div>
        <label className="label" htmlFor="pr-occ">Best for</label>
        <input id="pr-occ" className="field" value={draft.occasion} onChange={(e) => set({ occasion: e.target.value })} placeholder="Navratri nights, Garba ground, dandiya" />
      </div>
      <div>
        <label className="label" htmlFor="pr-story">About this outfit</label>
        <textarea id="pr-story" className="field min-h-28" value={draft.story} onChange={(e) => set({ story: e.target.value })} />
      </div>
      <div>
        <label className="label" htmlFor="pr-det">What is in the set</label>
        <textarea id="pr-det" className="field min-h-20" value={draft.details} onChange={(e) => set({ details: e.target.value })} placeholder="Chaniya, choli and dupatta" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="pr-badge">Tag (optional)</label>
          <input id="pr-badge" className="field" maxLength={24} value={draft.badge} onChange={(e) => set({ badge: e.target.value })} placeholder="New" />
        </div>
        <div>
          <label className="label" htmlFor="pr-alt">Photo description (optional)</label>
          <input id="pr-alt" className="field" value={draft.alt} onChange={(e) => set({ alt: e.target.value })} />
        </div>
      </div>

      <label className="flex items-center gap-3">
        <input type="checkbox" checked={draft.active} onChange={(e) => set({ active: e.target.checked })} />
        <span>Show on the site</span>
      </label>

      {error ? <p className="field-error">{error}</p> : null}
      <div className="flex gap-3">
        <button className="btn btn-solid" type="submit" disabled={busy}>{busy ? "Saving…" : product ? "Save changes" : "Add product"}</button>
        <button className="btn btn-line" type="button" onClick={onCancel} disabled={busy}>Cancel</button>
      </div>
    </form>
  );
}
