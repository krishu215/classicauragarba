import { Prose } from "@/components/prose";
import { imgSize } from "@/lib/images";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, pageNode, seo } from "@/lib/seo";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CustomerFields } from "@/components/customer-form";
import { PageIntro, Shell } from "@/components/shell";
import { useBooking } from "@/lib/booking-store";
import { emptyCustomer, validateCustomer, type Customer, type FieldErrors } from "@/lib/customer";
import { DRESSES, dressBySlug } from "@/lib/dresses";
import { inr } from "@/lib/site";
import { submitTrial } from "@/server/bookings";

export const Route = createFileRoute("/trial")({
  head: () =>
    seo({
      ...PAGES.trial,
      path: "/trial",
      jsonLd: [graph(breadcrumbNode([["Free home trial", "/trial"]]), pageNode("WebPage", PAGES.trial.title, PAGES.trial.description, "/trial"))],
    }),
  component: TrialPage,
});

type Filter = "all" | "women" | "men";

function TrialPage() {
  const navigate = useNavigate();
  const trial = useBooking((state) => state.trial);
  const toggleTrial = useBooking((state) => state.toggleTrial);
  const saved = useBooking((state) => state.saved);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [filter, setFilter] = useState<Filter>("all");
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const looks = [0, 1, 2].map((index) => dressBySlug(trial[index] ?? ""));

  function add(slug: string) {
    const result = toggleTrial(slug);
    if (result === "full") setFormError("You can take 3 outfits on a trial. Remove one to swap.");
    else setFormError("");
  }

  function toDetails() {
    if (trial.length === 0) {
      setFormError("Choose at least one outfit.");
      return;
    }
    setFormError("");
    setStep(2);
  }

  function toReview() {
    const next = validateCustomer(customer);
    setErrors(next);
    if (Object.keys(next).length) {
      setFormError("Please check the highlighted fields.");
      return;
    }
    setFormError("");
    setStep(3);
  }

  async function confirm() {
    if (busy) return;
    setBusy(true);
    setFormError("");
    try {
      const result = await submitTrial({ data: { customer, slugs: trial } });
      void navigate({ to: "/confirmed", search: { ref: result.ref } });
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Could not send your request. Please try again.");
      setBusy(false);
    }
  }

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm text-mute">
          <Link to="/" className="underline">Home</Link> / Free home trial
        </p>
        <PageIntro
          kicker="Free home trial · Indore"
          title="Try up to 3 outfits at home — free"
          lede="Choose your favourite looks, pick a time, and our team brings them to your door. No payment, no obligation — rent only what you love."
        />
        <ul className="mb-8 flex flex-wrap gap-2 text-sm">
          {["Delivery free", "Trial free", "Indore only"].map((item) => (
            <li key={item} className="border border-line bg-paper px-3 py-2">
              {item}
            </li>
          ))}
        </ul>

        <ol className="mb-8 flex flex-wrap gap-2 text-xs tracking-label uppercase">
          {[
            [1, "Choose outfits"],
            [2, "Your details"],
            [3, "Review"],
          ].map(([number, label]) => (
            <li key={label} className={"border px-3 py-2 " + (step === number ? "border-wine bg-wine text-ivory" : "border-line text-mute")}>
              {number} {label}
            </li>
          ))}
        </ol>

        {step === 1 ? (
          <section>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-4xl text-cream">Choose up to 3 outfits</h2>
                <p className="text-mute">You can select up to 3 outfits for your free home trial.</p>
              </div>
              <p className="text-sm">{trial.length} / 3 selected</p>
            </div>
            <div className="grid gap-3">
              {looks.map((dress, index) => (
                <div key={index} className="border border-dashed border-line bg-paper px-4 py-5 text-center text-sm tracking-label uppercase text-mute">
                  {dress ? (
                    <span className="flex flex-wrap items-center justify-between gap-3 normal-case tracking-normal">
                      <span className="flex min-w-0 items-center gap-3 text-left text-cream">
                        <img src={dress.image} {...imgSize(dress.image)} loading="lazy" decoding="async" alt="" className="size-14 object-cover" />
                        <span className="min-w-0">
                          Look {index + 1} — {dress.name}
                          <span className="block text-mute">{inr(dress.price)} / day if you keep it</span>
                        </span>
                      </span>
                      <button type="button" className="btn btn-line" onClick={() => add(dress.slug)}>
                        Remove
                      </button>
                    </span>
                  ) : (
                    `Look ${index + 1} — add from below`
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {(
                [
                  ["all", "All"],
                  ["women", "Women"],
                  ["men", "Men"],
                ] as const
              ).map(([id, label]) => (
                <button key={id} type="button" className={"btn " + (filter === id ? "btn-solid" : "btn-line")} onClick={() => setFilter(id)}>
                  {label}
                </button>
              ))}
            </div>
            {filter === "men" ? (
              <p className="mt-8 max-w-xl text-mute">
                Men’s kediyu and kurta sets are not on the rail this Navratri. WhatsApp +91 74770 87755 if you need one for the same night — we will tell you straight if we can arrange it.
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                {DRESSES.map((dress) => {
                  const selected = trial.includes(dress.slug);
                  return (
                    <article key={dress.slug} className="flex flex-col">
                      <Link to="/dress/$slug" params={{ slug: dress.slug }}>
                        <img src={dress.image} {...imgSize(dress.image)} loading="lazy" decoding="async" alt={dress.alt} className="portrait w-full" />
                      </Link>
                      <h3 className="mt-3 font-display text-2xl leading-tight">{dress.name}</h3>
                      <p className="text-sm text-mute">{inr(dress.price)} / day</p>
                      <button type="button" className={"btn mt-3 " + (selected ? "btn-solid" : "btn-line")} onClick={() => add(dress.slug)}>
                        {selected ? "Selected" : "Add to trial"}
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
            {formError ? <p className="field-error mt-4">{formError}</p> : null}
            <button type="button" className="btn btn-solid mt-8" onClick={toDetails}>
              Continue
            </button>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="max-w-xl">
            <h2 className="mb-2 font-display text-4xl">Your details</h2>
            <p className="mb-6 text-mute">Where should we bring the trial? Indore only.</p>
            {saved ? (
              <button type="button" className="btn btn-line mb-6" onClick={() => setCustomer(saved)}>
                Use my saved details
              </button>
            ) : null}
            <CustomerFields value={customer} errors={errors} onChange={setCustomer} idPrefix="trial" />
            <div className="mt-5">
              <label className="label" htmlFor="trial-time">
                Preferred time <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id="trial-time"
                className="field"
                placeholder="Any time that suits the team"
                maxLength={120}
                value={customer.time}
                onChange={(event) => setCustomer({ ...customer, time: event.target.value })}
              />
            </div>
            {formError ? <p className="field-error mt-4">{formError}</p> : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="btn btn-line" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="button" className="btn btn-solid" onClick={toReview}>
                Review trial
              </button>
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="max-w-xl">
            <h2 className="mb-4 font-display text-4xl">Review</h2>
            <ul className="divide-y divide-line border-y border-line">
              {trial.map((slug) => {
                const dress = dressBySlug(slug);
                if (!dress) return null;
                return (
                  <li key={slug} className="flex items-center gap-3 py-3">
                    <img src={dress.image} {...imgSize(dress.image)} loading="lazy" decoding="async" alt="" className="size-16 object-cover" />
                    <span className="min-w-0">
                      <span className="block font-display text-2xl">{dress.name}</span>
                      <span className="text-sm text-mute">Trial · free</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm">
              {customer.name} · {customer.mobile}
              <br />
              {customer.address}, {customer.area}, {customer.city} {customer.pincode}
              {customer.time ? <><br />Time: {customer.time}</> : null}
            </p>
            <p className="mt-4 text-sm text-mute">No payment now. If you keep an outfit, we book it from the dress page after the trial.</p>
            {formError ? <p className="field-error mt-3">{formError}</p> : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="btn btn-line" onClick={() => setStep(2)}>
                Back
              </button>
              <button type="button" className="btn btn-solid" onClick={() => void confirm()} disabled={busy}>
                {busy ? "Sending…" : "Request my trial"}
              </button>
            </div>
          </section>
        ) : null}
        <Prose title="How the free home trial works">
          <p>
            Choose up to three outfits, share your Indore address and a time that suits you, and we bring the looks to your door. There is no payment and no obligation. Try each one with the dupatta, check the fit in the choli and the length of the chaniya, then keep what you love. We take the rest back with us.
          </p>
          <p>
            The trial and the delivery are both free. It works best when you book a few days before your Garba, because that leaves time for a blouse alteration or a swap if the size is not quite right. Someone needs to be home during the agreed window.
          </p>
          <p>
            If you decide to rent after the trial, book the outfit from its dress page. We confirm your date on WhatsApp, and you pay cash on delivery. See the <Link to="/size-guide" className="text-gold underline">size guide</Link> or the <Link to="/exchange" className="text-gold underline">exchange rules</Link> if you want to read more first.
          </p>
        </Prose>
      </main>
    </Shell>
  );
}
