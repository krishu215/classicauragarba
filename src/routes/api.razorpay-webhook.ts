import { createFileRoute } from "@tanstack/react-router";
import { markExpired, markPaid } from "@/server/booking-service.server";
import { verifyWebhook } from "@/server/razorpay.server";

type WebhookBody = {
  event?: string;
  payload?: {
    payment_link?: { entity?: { id?: string; reference_id?: string; amount_paid?: number } };
    payment?: { entity?: { id?: string } };
  };
};

export const Route = createFileRoute("/api/razorpay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        if (!verifyWebhook(raw, request.headers.get("x-razorpay-signature"))) {
          return new Response("invalid signature", { status: 400 });
        }
        try {
          const body = JSON.parse(raw) as WebhookBody;
          const link = body.payload?.payment_link?.entity;
          if (body.event === "payment_link.paid" && link?.id && link.reference_id) {
            await markPaid({
              ref: link.reference_id,
              linkId: link.id,
              paymentId: body.payload?.payment?.entity?.id ?? "",
              amountPaise: link.amount_paid,
            });
          } else if (body.event === "payment_link.expired" && link?.reference_id) {
            await markExpired(link.reference_id);
          }
          return new Response("ok");
        } catch (error) {
          console.error("[webhook]", error);
          // A 500 makes Razorpay retry later.
          return new Response("error", { status: 500 });
        }
      },
    },
  },
});
