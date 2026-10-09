export const ORDER_FIELDS =
  "ref, kind, status, total, name, area, razorpay_link_url, delivery_slot, created_at, updated_at, booking_items(dress_slug, rental_date, days, fee)";

type Row = Record<string, unknown>;

/** The customer-safe view of a booking row. */
export function shapeOrder(row: Row) {
  return {
    ref: row.ref as string,
    kind: row.kind as "rental" | "trial",
    status: row.status as string,
    total: row.total as number,
    firstName: (row.name as string).split(" ")[0],
    area: row.area as string,
    online: Boolean(row.razorpay_link_url),
    deliverySlot: (row.delivery_slot as string | null) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    items: (row.booking_items ?? []) as { dress_slug: string; rental_date: string | null; days: number | null; fee: number }[],
  };
}
