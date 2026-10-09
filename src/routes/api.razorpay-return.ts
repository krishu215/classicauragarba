import { createFileRoute } from "@tanstack/react-router";
import { markPaid, REF_PATTERN } from "@/server/booking-service.server";
import { verifyReturn } from "@/server/razorpay.server";

/** Razorpay sends the customer back here after paying. We verify the signature, record the payment, then show the confirmation page. */
export const Route = createFileRoute("/api/razorpay-return")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const params = new URL(request.url).searchParams;
        const reference = params.get("razorpay_payment_link_reference_id") ?? "";
        const target = REF_PATTERN.test(reference) ? `/confirmed?ref=${reference}` : "/confirmed";
        try {
          const status = params.get("razorpay_payment_link_status") ?? "";
          const linkId = params.get("razorpay_payment_link_id") ?? "";
          const paymentId = params.get("razorpay_payment_id") ?? "";
          const signature = params.get("razorpay_signature") ?? "";
          if (
            status === "paid" &&
            REF_PATTERN.test(reference) &&
            verifyReturn({ linkId, reference, status, paymentId, signature })
          ) {
            await markPaid({ ref: reference, linkId, paymentId });
          }
        } catch (error) {
          // The webhook is the backup path, so a failure here must not block the customer.
          console.error("[return]", error);
        }
        return new Response(null, { status: 302, headers: { Location: target } });
      },
    },
  },
});
