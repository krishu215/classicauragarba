import { createHmac, timingSafeEqual } from "node:crypto";
import { env, siteUrl } from "./env.server";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function hmac(secret: string, payload: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Create a hosted Razorpay Payment Link. The customer pays on Razorpay's page; we never see card or UPI details. */
export async function createPaymentLink(input: {
  ref: string;
  amountRupees: number;
  description: string;
  name: string;
  mobile: string;
  email: string;
}): Promise<{ id: string; url: string }> {
  const auth = Buffer.from(`${env("RAZORPAY_KEY_ID")}:${env("RAZORPAY_KEY_SECRET")}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: Math.round(input.amountRupees * 100),
      currency: "INR",
      accept_partial: false,
      reference_id: input.ref,
      description: input.description.slice(0, 250),
      customer: { name: input.name, contact: `+91${input.mobile}`, email: input.email },
      // We send our own confirmation email, so Razorpay does not notify the customer.
      notify: { sms: false, email: false },
      reminder_enable: false,
      expire_by: Math.floor(Date.now() / 1000) + 60 * 60,
      callback_url: `${siteUrl()}/api/razorpay-return`,
      callback_method: "get",
      notes: { ref: input.ref },
    }),
  });
  const body = (await response.json().catch(() => ({}))) as { id?: string; short_url?: string; error?: { description?: string } };
  if (!response.ok || !body.id || !body.short_url) {
    throw new Error(`Razorpay payment link failed: ${body.error?.description ?? response.status}`);
  }
  return { id: body.id, url: body.short_url };
}

/** Verify the X-Razorpay-Signature header of a webhook against the raw request body. */
export function verifyWebhook(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  return safeEqual(hmac(env("RAZORPAY_WEBHOOK_SECRET"), rawBody), signature);
}

/** Verify the signature Razorpay adds to the Payment Link return URL. */
export function verifyReturn(params: {
  linkId: string;
  reference: string;
  status: string;
  paymentId: string;
  signature: string;
}): boolean {
  const payload = `${params.linkId}|${params.reference}|${params.status}|${params.paymentId}`;
  return safeEqual(hmac(env("RAZORPAY_KEY_SECRET"), payload), params.signature);
}
