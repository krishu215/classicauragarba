import { and, eq, inArray, lt, lte, or, sql } from "drizzle-orm";
import { database } from "../../db";
import { emailOutbox } from "../../db/schema";
import { dressBySlug } from "../lib/dresses";
import { formatLong, inr } from "../lib/site";
import { optionalEnv } from "./env.server";
import { emailButton, emailLayout, escapeHtml as esc } from "./email-template.server";
import type { BookingRow } from "./db.server";

type Message = typeof emailOutbox.$inferInsert;
type MailStore = Pick<ReturnType<typeof database>, "insert">;

function itemsHtml(booking: BookingRow) {
  const rows = (booking.booking_items ?? []).map((item) => {
    const name = dressBySlug(item.dress_slug)?.name ?? item.dress_slug;
    const detail = booking.kind === "trial" ? "Free home trial" : `${item.rental_date ? formatLong(item.rental_date) : ""} · ${item.days} day${item.days === 1 ? "" : "s"} · ${inr(item.fee)}`;
    return `<tr><td style="padding:14px 0;border-bottom:1px solid #4a3727"><strong style="color:#f6f0e6">${esc(name)}</strong><br><span style="color:#cdb99d;font-size:13px">${esc(detail)}</span></td></tr>`;
  }).join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`;
}

export function bookingMessages(booking: BookingRow, event: "received" | "confirmed" | "delivered"): Message[] {
  const trial = booking.kind === "trial";
  const paid = Boolean(booking.razorpay_payment_id);
  const title = event === "delivered" ? "Your order is delivered" : event === "confirmed" ? "Your order is confirmed" : trial ? "Your home trial request is received" : "Your order request is received";
  const description = event === "delivered" ? "Your outfits have been delivered. Enjoy your Garba celebrations! Our team is here if you need help with your outfit or pickup." : event === "confirmed" ? (booking.delivery_slot ? `Delivery time: ${esc(booking.delivery_slot)}` : "Our team will message you on WhatsApp with your delivery time.") : "Our team is checking your request and will confirm it shortly. This email is not an order confirmation.";
  const html = emailLayout(`${title} · ${booking.ref}`, `
    <p style="margin:0 0 12px;font-size:11px;letter-spacing:3px;color:#b08958">${event === "delivered" ? "DELIVERY UPDATE" : "YOUR CLASSIC AURA ORDER"}</p>
    <h1 style="margin:0 0 20px;font-family:'Cormorant Garamond',Georgia,serif;font-size:32px;font-weight:400;line-height:1.2;color:#f6f0e6">${title}</h1>
    <p>Hi ${esc(booking.name)},</p><p>${description}</p>
    <p style="padding:14px 16px;border:1px solid #4a3727;color:#cdb99d">Order reference <strong style="color:#b08958">${esc(booking.ref)}</strong>${trial ? "<br>Free home trial" : ""}</p>
    ${itemsHtml(booking)}
    ${trial ? "" : `<p><strong>${paid ? "Paid online" : "Cash on delivery"}: ${esc(inr(booking.total))}</strong></p>`}
    <p style="color:#cdb99d">Delivery address<br><span style="color:#f6f0e6">${esc(booking.address)}, ${esc(booking.area)}, ${esc(booking.city)} ${esc(booking.pincode)}</span></p>
    ${emailButton("View your orders", "/login")}
    <p style="font-size:13px;color:#cdb99d">Sign in with the email address used for this order.</p>`);
  const messages: Message[] = [{
    key: `booking:${booking.id}:customer:${event}`,
    message: { to: booking.email, subject: `${title} · ${booking.ref} · Classic Aura`, html, replyTo: optionalEnv("ADMIN_NOTIFY_EMAIL") },
  }];
  const owner = optionalEnv("ADMIN_NOTIFY_EMAIL");
  if (owner && event !== "delivered") {
    const ownerTitle = event === "confirmed" ? "Confirmed order" : "New order request";
    messages.push({ key: `booking:${booking.id}:owner:${event}`, message: {
      to: owner, subject: `${ownerTitle} ${booking.ref} · Classic Aura`, replyTo: booking.email,
      html: emailLayout(`${ownerTitle} ${booking.ref}`, `<h1 style="font-family:Georgia,serif;font-weight:400">${ownerTitle} ${esc(booking.ref)}</h1><p>${esc(booking.name)} · ${esc(booking.mobile)} · ${esc(booking.email)}</p><p>${esc(booking.address)}, ${esc(booking.area)}, ${esc(booking.city)} ${esc(booking.pincode)}</p>${booking.preferred_time ? `<p>Preferred time: ${esc(booking.preferred_time)}</p>` : ""}${booking.notes ? `<p>Notes: ${esc(booking.notes)}</p>` : ""}${itemsHtml(booking)}<p>${trial ? "Free home trial" : `${paid ? "Paid" : "Cash on delivery"}: ${esc(inr(booking.total))}`}</p>${emailButton("Open dashboard", "/admin")}`),
    } });
  }
  return messages;
}

export async function queueMessages(store: MailStore, messages: Message[]) {
  if (messages.length) await store.insert(emailOutbox).values(messages).onConflictDoNothing();
  return messages.map((message) => message.key);
}

export async function deliverEmails(keys?: string[]) {
  const store = database();
  const now = new Date();
  await store.update(emailOutbox).set({ status: "failed", lease_until: null, last_error: "Email delivery retry limit reached" }).where(and(eq(emailOutbox.status, "sending"), lte(emailOutbox.lease_until, now), eq(emailOutbox.attempts, 10)));
  const due = and(
    keys ? inArray(emailOutbox.key, keys) : undefined,
    lt(emailOutbox.attempts, 10), lte(emailOutbox.next_attempt_at, now),
    or(eq(emailOutbox.status, "pending"), and(eq(emailOutbox.status, "sending"), lte(emailOutbox.lease_until, now))),
  );
  const apiKey = optionalEnv("RESEND_API_KEY");
  const from = optionalEnv("MAIL_FROM");
  if (!apiKey || !from) {
    await store.update(emailOutbox).set({ last_error: "Email provider is not configured", next_attempt_at: new Date(Date.now() + 5 * 60_000) }).where(due);
    return;
  }
  const candidates = await store.select({ key: emailOutbox.key }).from(emailOutbox).where(due).limit(20);
  await Promise.all(candidates.map(async (candidate) => {
    const [claimed] = await store.update(emailOutbox).set({ status: "sending", lease_until: new Date(Date.now() + 2 * 60_000), attempts: sql`${emailOutbox.attempts} + 1` }).where(and(due, eq(emailOutbox.key, candidate.key))).returning();
    if (!claimed) return;
    let failure = "Email delivery could not be completed";
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(15_000),
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": claimed.key },
        body: JSON.stringify({ from, to: claimed.message.to, subject: claimed.message.subject, html: claimed.message.html, reply_to: claimed.message.replyTo }),
      });
      if (response.ok) {
        await store.update(emailOutbox).set({ status: "sent", sent_at: new Date(), lease_until: null, last_error: null }).where(eq(emailOutbox.key, claimed.key));
        return;
      }
      failure = `Email provider returned HTTP ${response.status}`;
    } catch {
      failure = "Email provider connection failed";
    }
    await store.update(emailOutbox).set({
      status: claimed.attempts >= 10 ? "failed" : "pending", lease_until: null, last_error: failure,
      next_attempt_at: new Date(Date.now() + Math.min(30 * 60_000, 60_000 * 2 ** claimed.attempts)),
    }).where(eq(emailOutbox.key, claimed.key));
  }));
}

export async function tryDeliverEmails(keys: string[]) {
  try { await deliverEmails(keys); } catch { console.error("[mail] Queued emails await delivery retry."); }
}
