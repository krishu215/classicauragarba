import type { Dress } from "@/lib/dresses";

// Browser-side copy of the admin-added outfits, so moving between pages does not ask the server every time.
let list: Dress[] = [];
let at = 0;
const FRESH_MS = 60_000;

export function primeExtraDresses(next: Dress[]) {
  if (typeof window === "undefined") return;
  list = next;
  at = Date.now();
}

export function freshExtraDresses(): Dress[] | null {
  if (typeof window === "undefined") return null;
  return at > 0 && Date.now() - at < FRESH_MS ? list : null;
}
