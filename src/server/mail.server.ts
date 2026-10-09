import { inr } from "@/lib/site";
import { dressBySlug } from "@/lib/dresses";
import { formatLong } from "@/lib/site";
import { env, optionalEnv, siteUrl } from "./env.server";
import type { BookingRow } from "./db.server";

const esc = (value: string | number | null | undefined) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function send(message: { to: string | string[]; subject: string; html: string; replyTo?: string }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env("MAIL_FROM"),
      to: message.to,
      subject: message.subject,
      html: message.html,
      reply_to: message.replyTo,
    }),
  });
  if (!response.ok) throw new Error(`Resend failed (${response.status}): ${await response.text()}`);
}

function itemsHtml(booking: BookingRow) {
  const rows = (booking.booking_items ?? [])
    .map((item) => {
      const name = dressBySlug(item.dress_slug)?.name ?? item.dress_slug;
      const detail =
        booking.kind === "trial"
          ? "Free home trial"
          : `${item.rental_date ? formatLong(item.rental_date) : ""} · ${item.days} day${item.days === 1 ? "" : "s"} · ${inr(item.fee)}`;
      return `<tr><td style="padding:6px 0"><strong>${esc(name)}</strong><br><span style="color:#666">${esc(detail)}</span></td></tr>`;
    })
    .join("");
  return `<table style="width:100%;border-collapse:collapse">${rows}</table>`;
}

type Cta = { label: string; url: string };

/** One branded shell for every email Classic Aura sends: dark header, cream card, wine button. */
function layout(input: { preheader?: string; heading?: string; bodyHtml: string; cta?: Cta; footnote?: string }) {
  const button = input.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 8px"><tr><td style="background:#6d2436"><a href="${esc(input.cta.url)}" style="display:inline-block;padding:15px 30px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#ffffff;text-decoration:none">${esc(input.cta.label)}</a></td></tr></table>
       <p style="margin:12px 0 0;font-size:12px;line-height:1.5;color:#8a7767">Button not working? Copy this link into your browser:<br><a href="${esc(input.cta.url)}" style="color:#8a6636;word-break:break-all">${esc(input.cta.url)}</a></p>`
    : "";
  return `<!doctype html><html lang="en"><body style="margin:0;padding:0;background:#efe4d6">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(input.preheader ?? "")}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efe4d6"><tr><td align="center" style="padding:24px 12px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fffdfb">
      <tr><td align="center" style="background:#1b110a;padding:28px 32px">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;letter-spacing:.06em;color:#f6f0e6">Classic Aura</div>
        <div style="margin-top:8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#b08958">Garba dresses on rent &middot; Indore</div>
      </td></tr>
      <tr><td style="height:3px;background:#b08958;line-height:3px;font-size:0">&nbsp;</td></tr>
      <tr><td style="padding:34px 32px 12px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#2a1a10">
        ${input.heading ? `<h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:30px;line-height:1.2;color:#1b110a">${input.heading}</h1>` : ""}
        ${input.bodyHtml}
        ${button}
        ${input.footnote ? `<p style="margin:22px 0 0;font-size:13px;line-height:1.5;color:#6e5b4e">${input.footnote}</p>` : ""}
      </td></tr>
      <tr><td style="padding:22px 32px 30px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#8a7767;border-top:1px solid #e0d0bd">
        Classic Aura &middot; Garba dresses on rent, free delivery across Indore.<br>
        <a href="${esc(siteUrl())}" style="color:#8a6636">${esc(siteUrl().replace(/^https?:\/\//, ""))}</a>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

const wrap = (inner: string) => layout({ bodyHtml: inner });

/** Email 1 of the account flow: verify the address. The link signs the customer in. */
export async function sendVerifyEmail(input: { to: string; name?: string; link: string }) {
  const first = (input.name ?? "").trim().split(" ")[0];
  await send({
    to: input.to,
    subject: "Verify your email · Classic Aura",
    html: layout({
      preheader: "One tap to verify your email and open your Classic Aura account.",
      heading: first ? `Welcome, ${esc(first)}` : "Welcome to Classic Aura",
      bodyHtml: `<p style="margin:0">Thank you for creating your Classic Aura account. Verify your email to see your bookings, delivery times and order status in one place.</p>`,
      cta: { label: "Verify my email", url: input.link },
      footnote: "This link works once and expires in 24 hours. If you did not create this account, you can ignore this email.",
    }),
  });
}

export async function sendResetEmail(input: { to: string; name?: string; link: string }) {
  const first = (input.name ?? "").trim().split(" ")[0];
  await send({
    to: input.to,
    subject: "Reset your password · Classic Aura",
    html: layout({
      preheader: "Choose a new password for your Classic Aura account.",
      heading: "Reset your password",
      bodyHtml: `<p style="margin:0">${first ? `Hi ${esc(first)}, we` : "We"} received a request to reset the password on your Classic Aura account. Tap the button to choose a new one.</p>`,
      cta: { label: "Choose a new password", url: input.link },
      footnote: "This link works once and expires in 1 hour. If you did not ask for this, ignore this email. Your password stays the same.",
    }),
  });
}

/** Sent when someone tries to create an account with an email that already has one. */
export async function sendExistingAccountEmail(to: string) {
  await send({
    to,
    subject: "You already have a Classic Aura account",
    html: layout({
      preheader: "Sign in, or reset your password if you forgot it.",
      heading: "You already have an account",
      bodyHtml: `<p style="margin:0">Someone (hopefully you) tried to create a Classic Aura account with this email, but one already exists. Sign in to see your orders. If you forgot your password, use "Forgot your password?" on the sign in page.</p>`,
      cta: { label: "Go to sign in", url: `${siteUrl()}/login` },
    }),
  });
}

/** Email the customer a confirmation and alert the owner. Failures are logged, never thrown, so a mail problem cannot undo a paid booking. */
export async function sendBookingEmails(booking: BookingRow) {
  const isTrial = booking.kind === "trial";
  const cash = booking.kind === "rental" && booking.status === "requested";
  const customerHtml = wrap(`
    <h2 style="margin:0 0 8px">${isTrial ? "Your free home trial request" : cash ? "Your booking request is received" : "Payment received. Your booking is confirmed."}</h2>
    <p>Hi ${esc(booking.name)}, your reference is <strong>${esc(booking.ref)}</strong>.</p>
    ${itemsHtml(booking)}
    ${isTrial ? "" : cash ? `<p><strong>Pay in cash on delivery: ${esc(inr(booking.total))}</strong></p>` : `<p><strong>Paid: ${esc(inr(booking.total))}</strong></p>`}
    <p>Delivery address: ${esc(booking.address)}, ${esc(booking.area)}, ${esc(booking.city)} ${esc(booking.pincode)}</p>
    <p>Our team will message you on WhatsApp to fix the delivery time. Free delivery and pickup across Indore.</p>`);
  const ownerHtml = wrap(`
    <h2 style="margin:0 0 8px">${isTrial ? "New home trial request" : cash ? "New cash-on-delivery booking" : "New paid booking"} ${esc(booking.ref)}</h2>
    <p>${esc(booking.name)} · ${esc(booking.mobile)} · ${esc(booking.email)}</p>
    <p>${esc(booking.address)}, ${esc(booking.area)}, ${esc(booking.city)} ${esc(booking.pincode)}</p>
    ${booking.preferred_time ? `<p>Preferred time: ${esc(booking.preferred_time)}</p>` : ""}
    ${booking.notes ? `<p>Notes: ${esc(booking.notes)}</p>` : ""}
    ${itemsHtml(booking)}
    ${isTrial ? "" : cash ? `<p><strong>To collect in cash: ${esc(inr(booking.total))}</strong></p>` : `<p><strong>Paid: ${esc(inr(booking.total))}</strong></p>`}
    <p><a href="${esc(siteUrl())}/admin">Open admin dashboard</a></p>`);

  const subjectPrefix = isTrial ? "Home trial request" : cash ? "Booking received" : "Booking confirmed";
  const tasks = [
    send({ to: booking.email, subject: `${subjectPrefix} ${booking.ref} · Classic Aura`, html: customerHtml, replyTo: optionalEnv("ADMIN_NOTIFY_EMAIL") }),
  ];
  const notify = optionalEnv("ADMIN_NOTIFY_EMAIL");
  if (notify) {
    tasks.push(send({ to: notify, subject: `${isTrial ? "Trial" : cash ? "Cash booking" : "Paid booking"} ${booking.ref} · ${booking.name}`, html: ownerHtml, replyTo: booking.email }));
  }
  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    if (result.status === "rejected") console.error("[mail]", result.reason);
  }
}

/** Tell the customer their booking was confirmed by the team, with the delivery time if one was set. */
export async function sendConfirmedEmail(booking: BookingRow) {
  const isTrial = booking.kind === "trial";
  const online = Boolean(booking.razorpay_payment_id);
  const html = wrap(`
    <h2 style="margin:0 0 8px">Your ${isTrial ? "home trial" : "booking"} is confirmed</h2>
    <p>Hi ${esc(booking.name)}, reference <strong>${esc(booking.ref)}</strong>.</p>
    <p style="font-size:16px"><strong>${booking.delivery_slot ? `Delivery time: ${esc(booking.delivery_slot)}` : "We will message you on WhatsApp with the delivery time."}</strong></p>
    ${itemsHtml(booking)}
    ${isTrial ? "" : online ? `<p>Paid: ${esc(inr(booking.total))}</p>` : `<p><strong>Pay in cash on delivery: ${esc(inr(booking.total))}</strong></p>`}
    <p>Delivery address: ${esc(booking.address)}, ${esc(booking.area)}, ${esc(booking.city)} ${esc(booking.pincode)}</p>
    <p><a href="${esc(siteUrl())}/login">Login to see your orders</a></p>`);
  try {
    await send({ to: booking.email, subject: `Confirmed ${booking.ref} · Classic Aura`, html, replyTo: optionalEnv("ADMIN_NOTIFY_EMAIL") });
  } catch (error) {
    console.error("[mail]", error);
  }
}
