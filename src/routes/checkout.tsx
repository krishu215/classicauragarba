import { imgSize } from "@/lib/images";
import { PAGES } from "@/lib/pages";
import { seo } from "@/lib/seo";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { CustomerFields } from "@/components/customer-form";
import { Shell } from "@/components/shell";
import { useBooking, useBookingReady } from "@/lib/booking-store";
import { emptyCustomer, validateCustomer, type Customer, type FieldErrors } from "@/lib/customer";
import { dressBySlug } from "@/lib/dresses";
import { dayStatus, formatLong, inr, quote, waLink } from "@/lib/site";
import { submitRental } from "@/server/bookings";

export const Route = createFileRoute("/checkout")({
  head: () => seo({ ...PAGES.checkout, path: "/checkout", noindex: true }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const ready = useBookingReady();
  const rentals = useBooking((state) => state.rentals);
  const updateRental = useBooking((state) => state.updateRental);
  const removeRental = useBooking((state) => state.removeRental);
  const saved = useBooking((state) => state.saved);
  const setSaved = useBooking((state) => state.setSaved);
  const lines = useMemo(
    () =>
      rentals.flatMap((rental) => {
        const dress = dressBySlug(rental.slug);
        return dress ? [{ ...rental, dress, bill: quote(dress.price, rental.days) }] : [];
      }),
    [rentals],
  );
  const total = lines.reduce((sum, line) => sum + line.bill.fee, 0);
  // A saved date can pass, or the dress can be taken for it, while the booking sits on this device.
  const blocked = new Set(
    lines.filter((line) => ["closed", "rented"].includes(dayStatus(line.slug, line.date))).map((line) => line.slug),
  );
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [agreed, setAgreed] = useState(false);
  const [save, setSave] = useState(false);
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!ready) {
    return (
      <Shell>
        <main className="mx-auto min-h-[50vh] max-w-xl px-5 py-16" aria-busy="true" />
      </Shell>
    );
  }

  if (lines.length === 0) {
    return (
      <Shell>
        <main className="mx-auto max-w-xl px-5 py-16">
          <p className="kicker">Secure checkout</p>
          <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">Choose an outfit first</h1>
          <p className="mt-4 text-mute">Add a dress and a Garba date to start your booking.</p>
          <Link to="/shop" className="btn btn-solid mt-6">
            Browse dresses
          </Link>
        </main>
      </Shell>
    );
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const next = validateCustomer(customer);
    setErrors(next);
    if (Object.keys(next).length) {
      setFormError("Please check the highlighted fields.");
      return;
    }
    if (blocked.size > 0) {
      setFormError("Remove or re-date the outfits marked below. Their Garba date is no longer open.");
      return;
    }
    if (!agreed) {
      setFormError("Please agree to the rental terms.");
      return;
    }
    setBusy(true);
    setFormError("");
    try {
      const result = await submitRental({
        data: { customer, lines: lines.map((line) => ({ slug: line.slug, date: line.date, days: line.days })) },
      });
      if (save) setSaved(customer);
      // Online payment hands over to Razorpay. Cash on delivery goes straight to the confirmation page.
      if (result.payUrl) window.location.assign(result.payUrl);
      else void navigate({ to: "/confirmed", search: { ref: result.ref } });
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Could not start payment. Please try again.");
      setBusy(false);
    }
  }

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="font-display text-4xl text-cream sm:text-5xl">Secure checkout</h1>
        <p className="mt-4 border border-line bg-paper px-4 py-3 text-sm">
          Rented with us before?{" "}
          {saved ? (
            <button type="button" className="text-gold underline" onClick={() => setCustomer(saved)}>
              Use your saved details
            </button>
          ) : (
            <a className="text-gold underline" href={waLink()}>
              WhatsApp us with your mobile
            </a>
          )}
        </p>
        <ol className="mt-6 flex flex-wrap gap-4 text-xs tracking-label uppercase">
          <li className="text-ok">Outfit & date</li>
          <li className="text-gold">Delivery details</li>
          <li className="text-mute">Cash on delivery</li>
        </ol>

        <form id="checkout" onSubmit={submit} className="mt-8 grid items-start gap-10 lg:grid-cols-3 [&>*]:min-w-0">
          <div className="lg:col-span-2">
            <h2 className="mb-5 font-display text-4xl">Delivery details</h2>
            <CustomerFields value={customer} errors={errors} onChange={setCustomer} idPrefix="co" />
            <h2 className="mt-10 mb-5 font-display text-4xl">Delivery preferences</h2>
            <div className="grid gap-5">
              <div>
                <label className="label" htmlFor="co-time">
                  Preferred delivery time <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="co-time"
                  className="field"
                  placeholder="Any time that suits the team"
                  value={customer.time}
                  onChange={(event) => setCustomer({ ...customer, time: event.target.value })}
                />
              </div>
              <div>
                <label className="label" htmlFor="co-notes">
                  Additional notes <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="co-notes"
                  className="field min-h-24"
                  placeholder="Gate code, landmark, fitting notes — anything that helps us"
                  value={customer.notes}
                  onChange={(event) => setCustomer({ ...customer, notes: event.target.value })}
                />
              </div>
            </div>
            <p className="mt-5 border border-dashed border-line bg-paper px-4 py-3 text-sm text-mute">
              We deliver across Indore only. Home delivery and pickup are free. Our team confirms the delivery time with you on WhatsApp after payment.
            </p>
            <label className="mt-5 flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1 size-4" checked={save} onChange={(event) => setSave(event.target.checked)} />
              Save my details on this device for next time (optional)
            </label>
          </div>

          <aside className="border border-line bg-paper p-5 lg:sticky lg:top-28">
            <h2 className="font-display text-3xl">Your Garba rental</h2>
            <ul className="mt-4 divide-y divide-line border-b border-line">
              {lines.map((line) => (
                <li key={line.slug} className="py-4 first:pt-0">
                  <div className="flex gap-3">
                    <img src={line.dress.image} {...imgSize(line.dress.image)} loading="lazy" decoding="async" alt="" className="size-16 object-cover" />
                    <div className="min-w-0">
                      <Link to="/dress/$slug" params={{ slug: line.slug }} className="font-display text-xl leading-tight">
                        {line.dress.name}
                      </Link>
                      <p className="text-sm text-mute">Garba date: {formatLong(line.date)}</p>
                      {blocked.has(line.slug) ? (
                        <p className="field-error mt-0">This date is no longer open. Remove it and add the dress again with a new date.</p>
                      ) : null}
                      <p className="text-sm text-mute">{inr(line.dress.price)} / day</p>
                    </div>
                    <p className="ml-auto text-sm">{inr(line.bill.fee)}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <div className="flex gap-1" role="group" aria-label={`Rental length for ${line.dress.name}`}>
                      {([1, 2, 3] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={"btn min-h-9 px-3 py-1 " + (line.days === option ? "btn-solid" : "btn-line")}
                          aria-pressed={line.days === option}
                          onClick={() => updateRental(line.slug, { days: option })}
                        >
                          {option} day{option > 1 ? "s" : ""}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="ml-auto text-sm text-mute underline"
                      onClick={() => removeRental(line.slug)}
                      aria-label={`Remove ${line.dress.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/shop" className="mt-3 inline-block text-sm text-gold underline">
              Add another outfit
            </Link>
            <dl className="mt-2 text-sm">
              <Line k={`Outfits (${lines.length})`} v={inr(total)} />
              <Line k="Delivery" v="FREE" />
              <div className="mt-2 flex items-baseline justify-between border-t border-line pt-3">
                <dt className="tracking-label uppercase">Total to pay</dt>
                <dd className="font-display text-3xl text-cream">{inr(total)}</dd>
              </div>
            </dl>
            <p className="mt-4 border border-line px-3 py-3 text-sm text-mute">
              Pay in cash when we deliver your outfit. There is no online payment and no deposit. Tap the button below to place your booking and we confirm it on WhatsApp.
            </p>
            <div className="mt-4 border border-line px-3 py-3">
              <p className="text-sm">Payment method</p>
              <p className="mt-1 font-display text-2xl text-cream">Cash on delivery</p>
              <p className="text-sm text-mute">Pay {inr(total)} in cash to our delivery person.</p>
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-1 size-4"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                required
              />
              <span>
                I agree to the <Link to="/terms" className="text-gold underline">Rental Terms & Conditions</Link>. <span className="req">*</span>
              </span>
            </label>
            {formError ? <p className="field-error">{formError}</p> : null}
            <button className="btn btn-solid mt-4 w-full" type="submit" disabled={busy}>
              {busy ? "Placing your booking…" : "Confirm booking · cash on delivery"}
            </button>
            <p className="mt-4 text-xs text-mute">
              Your details are used to fulfil this request and to reach you about delivery. See our{" "}
              <Link to="/privacy" className="underline">privacy policy</Link>.
            </p>
          </aside>
        </form>
      </main>
    </Shell>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="text-mute">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
