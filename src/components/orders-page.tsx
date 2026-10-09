import { imgSize } from "@/lib/images";
import { dressBySlug } from "@/lib/dresses";
import { formatLong, inr } from "@/lib/site";
import type { customerOrders } from "@/server/customer";

export type Order = Awaited<ReturnType<typeof customerOrders>>[number];

const STEPS = ["Request received", "Confirmed", "Delivered", "Returned"] as const;

function stepOf(status: string) {
  if (status === "confirmed") return 1;
  if (status === "delivered") return 2;
  if (status === "returned") return 3;
  return 0;
}

export function OrderCard({ order }: { order: Order }) {
  const isTrial = order.kind === "trial";
  const cancelled = order.status === "cancelled" || order.status === "expired";
  const step = stepOf(order.status);
  const confirmed = order.status === "confirmed";

  return (
    <li className="border border-line bg-paper p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-2xl text-cream">
          {isTrial ? "Home trial" : "Rental"} <span className="text-sm text-gold">{order.ref}</span>
        </p>
        <p className="text-sm text-mute">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" })}</p>
      </div>

      {confirmed ? (
        <div className="mt-4 border border-ok px-4 py-3" role="status">
          <p className="font-display text-2xl text-ok">✓ {isTrial ? "Home trial confirmed" : "Booking confirmed"}</p>
          <p className="mt-1 text-lg">
            {order.deliverySlot ? `Delivery time: ${order.deliverySlot}` : "We will message you on WhatsApp with the delivery time."}
          </p>
          {!isTrial && !order.online ? <p className="mt-1 text-mute">Pay {inr(order.total)} in cash on delivery.</p> : null}
        </div>
      ) : null}

      {cancelled ? (
        <p className="mt-4 text-mute">This order is not active. WhatsApp us if you need help or want to book again.</p>
      ) : (
        <>
          <ol className="mt-5 grid grid-cols-4 gap-2 text-center text-xs tracking-label uppercase">
            {STEPS.map((label, index) => (
              <li key={label} className={index <= step ? "text-gold" : "text-mute"}>
                <span className={"mx-auto mb-2 block h-1 w-full " + (index <= step ? "bg-gold" : "bg-line")} />
                {label}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-mute">
            {order.status === "delivered"
              ? "Delivered. Enjoy your Garba! We pick the outfit up after your last rental day."
              : order.status === "returned"
                ? "Returned. Thank you for renting with Classic Aura."
                : confirmed
                  ? "Keep this page handy. It shows any change to your delivery."
                  : order.status === "paid"
                    ? "Payment received. We are confirming your date."
                    : order.status === "pending_payment"
                      ? "Waiting for your payment."
                      : "We have your request and will confirm it shortly."}
          </p>
        </>
      )}

      <ul className="mt-4 divide-y divide-line border-y border-line">
        {order.items.map((item) => {
          const dress = dressBySlug(item.dress_slug);
          if (!dress) return null;
          return (
            <li key={item.dress_slug} className="flex gap-3 py-3">
              <img src={dress.image} {...imgSize(dress.image)} loading="lazy" decoding="async" alt="" className="size-16 object-cover" />
              <span className="min-w-0">
                <span className="block font-display text-xl leading-tight">{dress.name}</span>
                <span className="text-sm text-mute">
                  {isTrial
                    ? "Free home trial"
                    : `${item.rental_date ? formatLong(item.rental_date) : ""} · ${item.days} day${item.days === 1 ? "" : "s"} · ${inr(item.fee)}`}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      {!isTrial ? (
        <p className="mt-3 font-display text-2xl text-cream">
          {order.online ? "Total" : "Cash on delivery"} {inr(order.total)}
        </p>
      ) : null}
      <p className="mt-1 text-sm text-mute">Delivery area: {order.area}, Indore</p>
    </li>
  );
}
