import { imgSize } from "@/lib/images";
import { PAGES } from "@/lib/pages";
import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { useBooking } from "@/lib/booking-store";
import { dressBySlug } from "@/lib/dresses";
import { formatLong, inr, PHONE_DISPLAY, PHONE_TEL, waLink } from "@/lib/site";
import { getBookingStatus } from "@/server/bookings";

export const Route = createFileRoute("/confirmed")({
  validateSearch: (search: Record<string, unknown>): { ref?: string } => ({
    ref: typeof search.ref === "string" ? search.ref : undefined,
  }),
  head: () => seo({ ...PAGES.confirmed, path: "/confirmed", noindex: true }),
  component: ConfirmedPage,
});

type Status = NonNullable<Awaited<ReturnType<typeof getBookingStatus>>>;

function ConfirmedPage() {
  const { ref } = Route.useSearch();
  const clearRentals = useBooking((state) => state.clearRentals);
  const clearTrial = useBooking((state) => state.clearTrial);
  const [booking, setBooking] = useState<Status | null | undefined>(undefined);

  // Load the booking, and keep checking for a short while if payment has not been recorded yet.
  useEffect(() => {
    if (!ref) {
      setBooking(null);
      return;
    }
    let stopped = false;
    let tries = 0;
    async function check() {
      if (stopped) return;
      try {
        const result = await getBookingStatus({ data: { ref: ref ?? "" } });
        if (stopped) return;
        setBooking(result);
        // Keep checking: payment can take a moment, and a new request turns "confirmed" when the team confirms it.
        if (result?.status === "pending_payment" && tries++ < 60) setTimeout(check, 4000);
        else if (result?.status === "requested" && tries++ < 60) setTimeout(check, 10000);
      } catch {
        if (!stopped) setBooking(null);
      }
    }
    void check();
    return () => {
      stopped = true;
    };
  }, [ref]);

  const status = booking?.status;
  const kind = booking?.kind;
  useEffect(() => {
    // The booking is safely recorded, so the outfits no longer sit in the cart.
    if (kind === "trial") clearTrial();
    if (kind === "rental" && status && status !== "pending_payment" && status !== "expired") clearRentals();
  }, [kind, status, clearRentals, clearTrial]);

  if (booking === undefined) {
    return (
      <Shell>
        <main className="mx-auto min-h-[50vh] max-w-xl px-5 py-16" aria-busy="true" />
      </Shell>
    );
  }

  if (!booking) {
    return (
      <Shell>
        <main className="mx-auto max-w-xl px-5 py-16">
          <h1 className="font-display text-4xl text-cream sm:text-5xl">We could not find that booking</h1>
          <p className="mt-3 text-mute">If you just paid, give it a minute and check your email. Or WhatsApp us and we will look it up.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/shop" className="btn btn-solid">See the dresses</Link>
            <a className="btn btn-line" href={waLink(ref ? `Hi Classic Aura, my booking reference is ${ref}.` : undefined)}>WhatsApp us</a>
          </div>
        </main>
      </Shell>
    );
  }

  const isTrial = booking.kind === "trial";
  const waiting = booking.status === "pending_payment";
  const expired = booking.status === "expired";
  const cancelled = booking.status === "cancelled";
  const cash = !isTrial && booking.status === "requested";
  const returned = booking.status === "returned";
  // Cash-on-delivery orders stay unpaid until the outfit is handed over.
  const unpaidCash = !isTrial && !booking.online && ["requested", "confirmed", "delivered"].includes(booking.status);

  const confirmedNow = booking.status === "confirmed" || booking.status === "delivered";
  const slotLine = booking.deliverySlot ? `Delivery time: ${booking.deliverySlot}.` : "We will message you on WhatsApp with the delivery time.";

  const heading = isTrial
    ? confirmedNow
      ? "Your home trial is confirmed ✓"
      : "Your trial request is in"
    : confirmedNow
      ? "Booking confirmed ✓"
      : waiting
      ? "Waiting for your payment"
      : cash
        ? "Booking request received"
      : expired
        ? "Payment window closed"
        : cancelled
          ? "Booking cancelled"
          : returned
            ? "Rental complete"
            : "Payment received ✓";

  return (
    <Shell>
      <main className="mx-auto max-w-xl px-5 py-16">
        <p className="kicker">Reference {booking.ref}</p>
        <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">{heading}</h1>
        <p className="mt-4 text-lg">
          {confirmedNow
            ? `${booking.firstName}, your ${isTrial ? "home trial" : "booking"} is confirmed. ${slotLine}${isTrial || booking.online ? "" : " You pay in cash when the outfit is delivered."}`
            : isTrial
            ? `${booking.firstName}, we have your request. We will message you on WhatsApp to fix the delivery time. A copy is on its way to your email.`
            : cash
              ? `${booking.firstName}, your booking request is in. We will message you on WhatsApp to confirm your date and delivery time. You pay in cash when the outfit is delivered. A copy is on its way to your email.`
            : waiting
              ? `${booking.firstName}, we have not received the payment yet. If you have just paid, this page updates by itself within a minute.`
              : expired || cancelled
                ? `${booking.firstName}, this booking is not active. You can start again or WhatsApp us for help.`
                : returned
                  ? `${booking.firstName}, your outfits are back with us. Thank you for renting with Classic Aura.`
                  : `${booking.firstName}, payment received. A confirmation is on its way to your email, and we will message you on WhatsApp to fix the delivery time.`}
        </p>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {booking.items.map((item) => {
            const dress = dressBySlug(item.dress_slug);
            if (!dress) return null;
            return (
              <li key={item.dress_slug} className="flex gap-3 py-3">
                <img src={dress.image} {...imgSize(dress.image)} loading="lazy" decoding="async" alt="" className="size-20 object-cover" />
                <span className="min-w-0">
                  <span className="block font-display text-2xl leading-tight">{dress.name}</span>
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
          <p className="mt-4 font-display text-3xl text-cream">
            {unpaidCash ? "Cash on delivery" : waiting || expired || cancelled || (returned && !booking.online) ? "Total" : "Paid"} {inr(booking.total)}
          </p>
        ) : (
          <p className="mt-4 text-mute">Delivery of the trial is free. Rent only what you love.</p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          {waiting && booking.payUrl ? (
            <a className="btn btn-solid" href={booking.payUrl}>Pay now</a>
          ) : null}
          <Link to="/login" className="btn btn-solid">Login to see my orders</Link>
          <a className="btn btn-line" href={waLink(`Hi Classic Aura, my booking reference is ${booking.ref}.`)}>
            WhatsApp us
          </a>
          <a className="btn btn-line" href={`tel:${PHONE_TEL}`}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
        <Link to="/shop" className="mt-8 inline-block text-sm underline">
          Keep browsing
        </Link>
      </main>
    </Shell>
  );
}
