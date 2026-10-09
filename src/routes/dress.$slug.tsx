import { Prose } from "@/components/prose";
import { imgSize } from "@/lib/images";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, dressDescription, dressTitle, graph, pageNode, productNode, seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { DressCard } from "@/components/dress-card";
import { Shell } from "@/components/shell";
import { useBooking } from "@/lib/booking-store";
import { dressBySlug, relatedDresses } from "@/lib/dresses";
import { dayStatus, firstOpenDate, formatLong, inr, quote, SEASON, todayIso, waLink, type DayStatus } from "@/lib/site";

export const Route = createFileRoute("/dress/$slug")({
  head: ({ params }) => {
    const dress = dressBySlug(params.slug);
    if (!dress) return seo({ ...PAGES.notFound, path: `/dress/${params.slug}`, noindex: true });
    const title = dressTitle(dress);
    const description = dressDescription(dress);
    const path = `/dress/${dress.slug}`;
    return seo({
      title,
      description,
      path,
      image: dress.image,
      jsonLd: [
        graph(
          breadcrumbNode([
            ["New arrivals", "/shop"],
            [dress.name, path],
          ]),
          pageNode("ItemPage", title, description, path),
          productNode(dress),
        ),
      ],
    });
  },
  component: DressPage,
});

function DressPage() {
  const { slug } = Route.useParams();
  const dress = dressBySlug(slug);
  if (!dress) {
    return (
      <Shell>
        <main className="mx-auto max-w-3xl px-5 py-20">
          <h1 className="font-display text-4xl text-cream sm:text-5xl">That dress is not on the rail</h1>
          <Link to="/shop" className="btn btn-solid mt-6">
            Back to new arrivals
          </Link>
        </main>
      </Shell>
    );
  }
  return <DressDetail slug={dress.slug} />;
}

function DressDetail({ slug }: { slug: string }) {
  const dress = dressBySlug(slug)!;
  const navigate = useNavigate();
  const today = todayIso();
  const trial = useBooking((state) => state.trial);
  const toggleTrial = useBooking((state) => state.toggleTrial);
  const rentals = useBooking((state) => state.rentals);
  const addRental = useBooking((state) => state.addRental);
  const open = useMemo(() => firstOpenDate(slug, today), [slug, today]);
  const [days, setDays] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState<string | null>(open);
  const [note, setNote] = useState("");
  const bill = quote(dress.price, days);
  const status: DayStatus | null = date ? dayStatus(slug, date, today) : null;
  const bookable = status === "available" || status === "last";
  const inTrial = trial.includes(slug);
  const related = relatedDresses(slug);

  const existing = rentals.find((item) => item.slug === slug);
  const inBooking = existing !== undefined;
  const [restored, setRestored] = useState(false);

  // The saved booking loads after the page renders; show its length and date instead of the defaults.
  useEffect(() => {
    if (existing && !restored) {
      setDays(existing.days);
      setDate(existing.date);
      setRestored(true);
    }
  }, [existing, restored]);

  function addToBooking() {
    if (!date || !bookable) {
      setNote("Choose an open Garba date first.");
      return false;
    }
    addRental({ slug, days, date });
    return true;
  }

  function rent() {
    if (addToBooking()) void navigate({ to: "/checkout" });
  }

  function addAndBrowse() {
    if (!addToBooking()) return;
    const count = useBooking.getState().rentals.length;
    setNote(`${inBooking ? "Updated" : "Added"} in your booking. ${count} outfit${count > 1 ? "s" : ""} so far.`);
  }

  function onTrial() {
    const result = toggleTrial(slug);
    if (result === "full") setNote("Your trial already has 3 outfits. Remove one to add this.");
    else setNote(result === "added" ? "Added to your free home trial." : "Removed from your trial.");
  }

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-5 py-8 md:py-12">
        <p className="text-sm break-words text-mute">
          <Link to="/" className="underline">Home</Link>
          {" / "}
          <Link to="/shop" className="underline">Women</Link>
          {" / "}
          {dress.name}
        </p>
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-10 [&>*]:min-w-0">
          <img src={dress.image} {...imgSize(dress.image)} fetchPriority="high" alt={dress.alt} className="portrait bg-sand lg:sticky lg:top-28" />
          <div className="min-w-0">
            <p className="kicker">Women · Chaniya choli</p>
            <h1 className="mt-2 font-display text-4xl text-cream md:text-5xl">{dress.name}</h1>
            <p className="mt-4 text-lg">
              <s className="text-mute">{inr(dress.was)}</s>{" "}
              <span className="text-gold">{inr(dress.price)} / day</span>
            </p>
            <ul className="mt-4 space-y-1 text-sm text-mute">
              <li>Free home delivery in Indore</li>
              <li>
                <Link to="/trial" className="underline">Free home trial</Link> — up to 3 outfits
              </li>
            </ul>

            <fieldset className="mt-8">
              <legend className="label">Rental length</legend>
              <div className="flex flex-wrap gap-2">
                {([1, 2, 3] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={"btn " + (days === option ? "btn-solid" : "btn-line")}
                    onClick={() => setDays(option)}
                  >
                    {option} day{option > 1 ? "s" : ""}
                    {option === 2 ? " · 10% off" : option === 3 ? " · 20% off" : ""}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="label">Choose your Garba date</legend>
              <div className="date-row">
                {SEASON.map((day) => {
                  const state = dayStatus(slug, day.iso, today);
                  const disabled = state === "rented" || state === "closed";
                  return (
                    <button
                      key={day.iso}
                      type="button"
                      className={"date-chip " + (date === day.iso ? "on" : "")}
                      disabled={disabled}
                      aria-pressed={date === day.iso}
                      onClick={() => setDate(day.iso)}
                    >
                      <small>{day.wd}</small>
                      <strong>{day.day}</strong>
                      <small>{day.mon}</small>
                      <small>
                        {state === "last" ? "Last one" : state === "rented" ? "Rented" : state === "closed" ? "Closed" : "Open"}
                      </small>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-sm text-mute">
                Navratri 2026 bookings are open for 8–22 Oct. Reserve before your date fills.
              </p>
              <p className="mt-2 flex flex-wrap gap-3 text-xs tracking-label uppercase text-mute">
                <span>Open</span>
                <span>Rented</span>
                <span>Closed</span>
              </p>
            </fieldset>

            {date && status === "last" ? (
              <p className="mt-4 text-sm text-ok">Only 1 outfit available for {formatLong(date)}.</p>
            ) : null}
            {note ? (
              <p className="mt-3 text-sm text-gold" role="status">
                {note}
              </p>
            ) : null}

            <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
              <Row label={`Rental fee (${days} day${days > 1 ? "s" : ""}${bill.off ? `, ${bill.off * 100}% off` : ""})`} value={inr(bill.fee)} />
              <Row label="Home delivery" value="FREE" ok />
              <Row label="Payment method" value="Cash on delivery" />
              <Row label="Total to pay" value={inr(bill.fee)} strong />
            </dl>

            <button type="button" className="btn btn-solid mt-6 w-full" onClick={rent} disabled={!bookable}>
              {inBooking ? "Update and go to checkout" : "Rent now"}
            </button>
            <button type="button" className="btn btn-line mt-3 w-full" onClick={addAndBrowse} disabled={!bookable}>
              {inBooking ? "Update my booking" : "Add to booking and keep browsing"}
            </button>
            {rentals.length > 0 ? (
              <p className="mt-3 text-sm text-mute">
                {rentals.length} outfit{rentals.length > 1 ? "s" : ""} in your booking.{" "}
                <Link to="/checkout" className="text-gold underline">Go to checkout</Link>
              </p>
            ) : null}
            <button type="button" className="btn btn-line mt-3 w-full" onClick={onTrial}>
              {inTrial ? "In your trial" : "Get free home trial"}
            </button>
            <p className="mt-4 text-sm text-mute">
              We confirm the date with you on WhatsApp before any payment.{" "}
              <a className="underline" href={waLink(`Hi Classic Aura, I have a fit question about ${dress.name}.`)}>
                Ask about the fit
              </a>
            </p>

            <section className="mt-10">
              <h2 className="label">Details</h2>
              <p>{dress.details}</p>
              <p className="mt-3 font-display text-2xl italic text-cream">{dress.story}</p>
              <dl className="mt-4 grid grid-cols-[7rem_1fr] gap-y-2 text-sm">
                <dt className="text-mute">Colour</dt>
                <dd>{dress.colors}</dd>
                <dt className="text-mute">Work</dt>
                <dd>{dress.work}</dd>
                <dt className="text-mute">Occasion</dt>
                <dd>{dress.occasion}</dd>
              </dl>
            </section>

            <details className="mt-6 border-t border-line py-4" open>
              <summary className="flex cursor-pointer items-center justify-between font-display text-2xl">
                What’s included
                <span aria-hidden="true">+</span>
              </summary>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mute">
                <li>Chaniya, choli and dupatta</li>
                <li>Steam press before delivery</li>
                <li>Free delivery and pickup inside Indore</li>
                <li>Blouse alteration when you book with time to spare</li>
              </ul>
            </details>
            <details className="border-t border-line py-4">
              <summary className="flex cursor-pointer items-center justify-between font-display text-2xl">
                Rental terms
                <span aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm text-mute">
                Dates can move free of charge up to 48 hours before delivery if the new night is open. Damage beyond ordinary wear is billed at repair cost after we tell you. Full terms live on the{" "}
                <Link to="/terms" className="underline">rental terms</Link> page.
              </p>
            </details>
          </div>
        </div>

        <Prose title={`Renting the ${dress.name}`}>
          <p>
            The {dress.name} comes as a full set of chaniya, choli and dupatta in {dress.colors.toLowerCase()}. The work is {dress.work.toLowerCase()}, chosen for {dress.occasion.toLowerCase()}. The daily rate is ₹{dress.price}, with 10% off for two days and 20% off for three.
          </p>
          <p>
            Pick a Garba date between 8 and 22 October 2026 above and the booking summary updates your total. We confirm the date on WhatsApp, steam press the outfit and deliver it free across Indore, pincodes beginning 452. You pay cash on delivery. Pickup is the morning after your last rental day.
          </p>
          <p>
            Not sure about the size? Check the <Link to="/size-guide" className="text-gold underline">size guide</Link>, or add this look to a <Link to="/trial" className="text-gold underline">free home trial</Link> with up to two others and try them in your own room before you commit.
          </p>
        </Prose>

        <section className="mt-16">
          <p className="kicker">You may also love</p>
          <h2 className="mt-2 font-display text-4xl text-cream">More women’s looks</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {related.map((item) => (
              <DressCard key={item.slug} dress={item} />
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}

function Row({ label, value, ok, strong }: { label: string; value: string; ok?: boolean; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-mute">{label}</dt>
      <dd className={(strong ? "font-display text-3xl text-cream " : "") + (ok ? "text-ok" : "")}>{value}</dd>
    </div>
  );
}
