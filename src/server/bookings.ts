import { createServerFn } from "@tanstack/react-start";
import type { Customer } from "@/lib/customer";
import { db } from "./db.server";
import { createRental, createTrial, REF_PATTERN, UserError, type RentalLine } from "./booking-service.server";

function friendly(error: unknown): never {
  if (error instanceof UserError) throw error;
  console.error("[booking]", error);
  throw new Error("Something went wrong on our side. Please try again, or WhatsApp us.");
}

export const submitRental = createServerFn({ method: "POST" })
  .inputValidator((data: { customer: Customer; lines: RentalLine[] }) => data)
  .handler(async ({ data }) => {
    try {
      return await createRental(data.customer, data.lines);
    } catch (error) {
      friendly(error);
    }
  });

export const submitTrial = createServerFn({ method: "POST" })
  .inputValidator((data: { customer: Customer; slugs: string[] }) => data)
  .handler(async ({ data }) => {
    try {
      return await createTrial(data.customer, data.slugs);
    } catch (error) {
      friendly(error);
    }
  });

/** Public status lookup for the confirmation page. Returns no contact details. */
export const getBookingStatus = createServerFn({ method: "GET" })
  .inputValidator((data: { ref: string }) => data)
  .handler(async ({ data }) => {
    if (!REF_PATTERN.test(data.ref)) return null;
    const { data: row } = await db()
      .from("bookings")
      .select("ref, kind, status, total, name, razorpay_link_url, delivery_slot, booking_items(dress_slug, rental_date, days, fee)")
      .eq("ref", data.ref)
      .maybeSingle();
    if (!row) return null;
    return {
      ref: row.ref as string,
      kind: row.kind as "rental" | "trial",
      status: row.status as string,
      total: row.total as number,
      firstName: (row.name as string).split(" ")[0],
      payUrl: row.status === "pending_payment" ? (row.razorpay_link_url as string | null) : null,
      online: Boolean(row.razorpay_link_url),
      deliverySlot: (row.delivery_slot as string | null) ?? null,
      items: (row.booking_items ?? []) as { dress_slug: string; rental_date: string | null; days: number | null; fee: number }[],
    };
  });
