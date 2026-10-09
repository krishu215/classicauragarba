import { randomInt } from "node:crypto";
import { validateCustomer, type Customer } from "@/lib/customer";
import { dressBySlug } from "@/lib/dresses";
import { dayStatus, ONLINE_PAYMENT, quote } from "@/lib/site";
import { db, type BookingRow } from "./db.server";
import { sendBookingEmails } from "./mail.server";
import { createPaymentLink } from "./razorpay.server";

/** An error whose message is safe to show to the customer. */
export class UserError extends Error {}

export type RentalLine = { slug: string; date: string; days: 1 | 2 | 3 };

const REF_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const makeRef = () => "CA" + Array.from({ length: 6 }, () => REF_CHARS[randomInt(REF_CHARS.length)]).join("");
export const REF_PATTERN = /^CA[A-Z0-9]{6}$/;

const HOLDING = ["paid", "confirmed", "delivered"];

function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

async function assertNoConflict(line: RentalLine, name: string) {
  const end = addDays(line.date, line.days - 1);
  const { data, error } = await db()
    .from("booking_items")
    .select("rental_date, days, bookings!inner(status)")
    .eq("dress_slug", line.slug)
    .in("bookings.status", HOLDING)
    .gte("rental_date", addDays(line.date, -2))
    .lte("rental_date", end);
  if (error) throw error;
  const clash = (data ?? []).some((row) => {
    if (!row.rental_date || !row.days) return false;
    const rowEnd = addDays(row.rental_date as string, (row.days as number) - 1);
    return (row.rental_date as string) <= end && rowEnd >= line.date;
  });
  if (clash) throw new UserError(`${name} is already booked for those dates. Please pick another date or outfit.`);
}

async function assertNotSpamming(mobile: string) {
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count, error } = await db()
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .eq("mobile", mobile)
    .in("status", ["pending_payment", "requested"])
    .gte("created_at", since);
  if (error) throw error;
  if ((count ?? 0) >= 3) throw new UserError("Too many attempts. Please finish your existing booking or try again in a few minutes.");
}

function customerFields(customer: Customer) {
  return {
    name: customer.name.trim(),
    mobile: customer.mobile.trim(),
    whatsapp: customer.whatsapp.trim() || null,
    email: customer.email.trim().toLowerCase(),
    address: customer.address.trim(),
    area: customer.area.trim(),
    pincode: customer.pincode.trim(),
    city: customer.city.trim(),
    preferred_time: customer.time.trim() || null,
    notes: customer.notes.trim() || null,
  };
}

export async function createRental(customer: Customer, lines: RentalLine[]) {
  const problems = validateCustomer(customer);
  if (Object.keys(problems).length) throw new UserError("Please check your delivery details.");
  if (lines.length < 1 || lines.length > 6) throw new UserError("Choose between 1 and 6 outfits.");
  if (new Set(lines.map((line) => line.slug)).size !== lines.length) throw new UserError("Each outfit can be added once.");

  // Prices always come from our own data, never from the browser.
  const priced = lines.map((line) => {
    const dress = dressBySlug(line.slug);
    if (!dress) throw new UserError("One of the outfits no longer exists.");
    if (![1, 2, 3].includes(line.days)) throw new UserError("Rental length must be 1, 2 or 3 days.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(line.date)) throw new UserError("Invalid Garba date.");
    if (["closed", "rented"].includes(dayStatus(line.slug, line.date))) {
      throw new UserError(`${dress.name} is not open on ${line.date}. Please choose another date.`);
    }
    return { ...line, dress, fee: quote(dress.price, line.days).fee };
  });
  const total = priced.reduce((sum, line) => sum + line.fee, 0);

  const fields = customerFields(customer);
  await assertNotSpamming(fields.mobile);
  for (const line of priced) await assertNoConflict(line, line.dress.name);

  const ref = makeRef();
  const { data: booking, error } = await db()
    .from("bookings")
    .insert({ ref, kind: "rental", status: ONLINE_PAYMENT ? "pending_payment" : "requested", total, ...fields })
    .select("*")
    .single();
  if (error || !booking) throw error ?? new Error("Could not save booking");

  const { error: itemsError } = await db()
    .from("booking_items")
    .insert(priced.map((line) => ({ booking_id: booking.id, dress_slug: line.slug, rental_date: line.date, days: line.days, fee: line.fee })));
  if (itemsError) {
    await db().from("bookings").delete().eq("id", booking.id);
    throw itemsError;
  }

  if (!ONLINE_PAYMENT) {
    // Cash on delivery: no payment step. Save the request and email both sides.
    await sendBookingEmails({
      ...(booking as BookingRow),
      booking_items: priced.map((line) => ({ dress_slug: line.slug, rental_date: line.date, days: line.days, fee: line.fee })),
    });
    return { ref, payUrl: null as string | null };
  }

  try {
    const link = await createPaymentLink({
      ref,
      amountRupees: total,
      description: `Classic Aura Garba rental ${ref}`,
      name: fields.name,
      mobile: fields.mobile,
      email: fields.email,
    });
    await db().from("bookings").update({ razorpay_link_id: link.id, razorpay_link_url: link.url }).eq("id", booking.id);
    return { ref, payUrl: link.url };
  } catch (cause) {
    await db().from("bookings").delete().eq("id", booking.id);
    throw cause;
  }
}

export async function createTrial(customer: Customer, slugs: string[]) {
  const problems = validateCustomer(customer);
  if (Object.keys(problems).length) throw new UserError("Please check your details.");
  if (slugs.length < 1 || slugs.length > 3 || new Set(slugs).size !== slugs.length) throw new UserError("Choose 1 to 3 outfits.");
  if (slugs.some((slug) => !dressBySlug(slug))) throw new UserError("One of the outfits no longer exists.");

  const fields = customerFields(customer);
  await assertNotSpamming(fields.mobile);
  const ref = makeRef();
  const { data: booking, error } = await db()
    .from("bookings")
    .insert({ ref, kind: "trial", status: "requested", total: 0, ...fields })
    .select("*")
    .single();
  if (error || !booking) throw error ?? new Error("Could not save request");
  const { error: itemsError } = await db()
    .from("booking_items")
    .insert(slugs.map((slug) => ({ booking_id: booking.id, dress_slug: slug, fee: 0 })));
  if (itemsError) {
    await db().from("bookings").delete().eq("id", booking.id);
    throw itemsError;
  }
  await sendBookingEmails({ ...(booking as BookingRow), booking_items: slugs.map((slug) => ({ dress_slug: slug, rental_date: null, days: null, fee: 0 })) });
  return { ref, payUrl: null as string | null };
}

/** Mark a booking paid exactly once (the webhook and the return page can both call this) and send the emails. */
export async function markPaid(input: { ref: string; linkId: string; paymentId: string; amountPaise?: number }) {
  const { data: booking, error } = await db().from("bookings").select("id, total, razorpay_link_id").eq("ref", input.ref).maybeSingle();
  if (error) throw error;
  if (!booking || booking.razorpay_link_id !== input.linkId) {
    console.error("[payment] link does not match booking", input.ref);
    return false;
  }
  if (input.amountPaise !== undefined && input.amountPaise !== booking.total * 100) {
    console.error("[payment] amount mismatch", input.ref, input.amountPaise, booking.total);
    return false;
  }
  const { data: updated, error: updateError } = await db()
    .from("bookings")
    .update({ status: "paid", paid_at: new Date().toISOString(), razorpay_payment_id: input.paymentId })
    .eq("id", booking.id)
    .in("status", ["pending_payment", "expired"])
    .select("*, booking_items(*)")
    .maybeSingle();
  if (updateError) throw updateError;
  if (updated) await sendBookingEmails(updated as BookingRow);
  return true;
}

export async function markExpired(ref: string) {
  await db().from("bookings").update({ status: "expired" }).eq("ref", ref).eq("status", "pending_payment");
}
