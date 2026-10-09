import { randomInt } from "node:crypto";
import { and, count, eq, gte, inArray, lte } from "drizzle-orm";
import { bookingItems, bookings } from "../../db/schema";
import { cleanPhone, validateCustomer, type Customer } from "@/lib/customer";
import { dressBySlug } from "@/lib/dresses";
import { dayStatus, ONLINE_PAYMENT, quote } from "@/lib/site";
import { bookingDatabase } from "./booking-repository.server";
import { bookingMessages, queueMessages, tryDeliverEmails } from "./mail.server";
import { createPaymentLink } from "./razorpay.server";

/** An error whose message is safe to show to the customer. */
export class UserError extends Error {}

export type RentalLine = { slug: string; date: string; days: 1 | 2 | 3 };

const REF_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const makeRef = () => "CA" + Array.from({ length: 6 }, () => REF_CHARS[randomInt(REF_CHARS.length)]).join("");
export const REF_PATTERN = /^CA[A-Z0-9]{6}$/;

// Cash-on-delivery requests are real orders, so they hold their dates as well.
const HOLDING = ["requested", "paid", "confirmed", "delivered"] as const;

function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

async function assertNoConflict(line: RentalLine, name: string) {
  const end = addDays(line.date, line.days - 1);
  const store = await bookingDatabase();
  const data = await store.select({ rental_date: bookingItems.rental_date, days: bookingItems.days })
    .from(bookingItems).innerJoin(bookings, eq(bookingItems.booking_id, bookings.id))
    .where(and(eq(bookingItems.dress_slug, line.slug), inArray(bookings.status, HOLDING),
      gte(bookingItems.rental_date, addDays(line.date, -2)), lte(bookingItems.rental_date, end)));
  const clash = data.some((row) => {
    if (!row.rental_date || !row.days) return false;
    const rowEnd = addDays(row.rental_date as string, (row.days as number) - 1);
    return (row.rental_date as string) <= end && rowEnd >= line.date;
  });
  if (clash) throw new UserError(`${name} is already booked for those dates. Please pick another date or outfit.`);
}

async function assertNotSpamming(mobile: string) {
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const store = await bookingDatabase();
  const [result] = await store.select({ count: count() }).from(bookings).where(and(
    eq(bookings.mobile, mobile), inArray(bookings.status, ["pending_payment", "requested"]), gte(bookings.created_at, since),
  ));
  if (result.count >= 3) throw new UserError("Too many attempts. Please finish your existing booking or try again in a few minutes.");
}

function customerFields(customer: Customer) {
  return {
    name: customer.name.trim(),
    mobile: cleanPhone(customer.mobile),
    whatsapp: cleanPhone(customer.whatsapp) || null,
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
  const store = await bookingDatabase();
  const { booking, mailKeys } = await store.transaction(async (transaction) => {
    const [booking] = await transaction.insert(bookings).values({ ref, kind: "rental", status: ONLINE_PAYMENT ? "pending_payment" : "requested", total, ...fields }).returning();
    const items = priced.map((line) => ({ booking_id: booking.id, dress_slug: line.slug, rental_date: line.date, days: line.days, fee: line.fee }));
    await transaction.insert(bookingItems).values(items);
    const mailKeys = ONLINE_PAYMENT ? [] : await queueMessages(transaction, bookingMessages({ ...booking, booking_items: items }, "received"));
    return { booking, mailKeys };
  });

  if (!ONLINE_PAYMENT) {
    await tryDeliverEmails(mailKeys);
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
    await store.update(bookings).set({ razorpay_link_id: link.id, razorpay_link_url: link.url, updated_at: new Date().toISOString() }).where(eq(bookings.id, booking.id));
    return { ref, payUrl: link.url };
  } catch (cause) {
    await store.delete(bookings).where(eq(bookings.id, booking.id));
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
  const store = await bookingDatabase();
  const mailKeys = await store.transaction(async (transaction) => {
    const [booking] = await transaction.insert(bookings).values({ ref, kind: "trial", status: "requested", total: 0, ...fields }).returning();
    const items = slugs.map((slug) => ({ booking_id: booking.id, dress_slug: slug, rental_date: null, days: null, fee: 0 }));
    await transaction.insert(bookingItems).values(items);
    return queueMessages(transaction, bookingMessages({ ...booking, booking_items: items }, "received"));
  });
  await tryDeliverEmails(mailKeys);
  return { ref, payUrl: null as string | null };
}

/** Mark a booking paid exactly once (the webhook and the return page can both call this) and send the emails. */
export async function markPaid(input: { ref: string; linkId: string; paymentId: string; amountPaise?: number }) {
  const store = await bookingDatabase();
  const result = await store.transaction(async (transaction) => {
    const [booking] = await transaction.select().from(bookings).where(eq(bookings.ref, input.ref)).for("update");
    if (!booking || booking.razorpay_link_id !== input.linkId || (input.amountPaise !== undefined && input.amountPaise !== booking.total * 100)) return { ok: false, keys: [] as string[] };
    if (booking.status !== "pending_payment" && booking.status !== "expired") return { ok: true, keys: [] as string[] };
    const [updated] = await transaction.update(bookings).set({ status: "paid", paid_at: new Date().toISOString(), razorpay_payment_id: input.paymentId, updated_at: new Date().toISOString() }).where(eq(bookings.id, booking.id)).returning();
    const items = await transaction.select().from(bookingItems).where(eq(bookingItems.booking_id, booking.id));
    const keys = await queueMessages(transaction, bookingMessages({ ...updated, booking_items: items }, "confirmed"));
    return { ok: true, keys };
  });
  if (result.keys.length) await tryDeliverEmails(result.keys);
  return result.ok;
}

export async function markExpired(ref: string) {
  const store = await bookingDatabase();
  await store.update(bookings).set({ status: "expired", updated_at: new Date().toISOString() }).where(and(eq(bookings.ref, ref), eq(bookings.status, "pending_payment")));
}
