import { imgSize } from "@/lib/images";
import { PAGES } from "@/lib/pages";
import { businessNode, graph, pageNode, seo, websiteNode } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { DressCard } from "@/components/dress-card";
import { Shell } from "@/components/shell";
import { COLLECTIONS, DRESSES, dressesIn } from "@/lib/dresses";
import { FAQS } from "@/lib/faq";
import { PHONE_DISPLAY, PHONE_TEL, waLink } from "@/lib/site";

const INFO: { to: "/how-it-works" | "/size-guide" | "/shipping" | "/exchange" | "/terms"; title: string; line: string }[] = [
  { to: "/how-it-works", title: "How a rental works", line: "Choose, try at home, then check out in three steps." },
  { to: "/size-guide", title: "Size guide", line: "XS to XXL with bust and waist in inches." },
  { to: "/shipping", title: "Shipping and pickup", line: "Free inside Indore, pincodes starting 452." },
  { to: "/exchange", title: "Exchange", line: "Swap a size or a dress before your Garba." },
  { to: "/terms", title: "Rental terms", line: "Dates, cancellations and care, in plain language." },
];

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      ...PAGES.home,
      path: "/",
      jsonLd: [graph(businessNode(), websiteNode(), pageNode("WebPage", PAGES.home.title, PAGES.home.description, "/"))],
    }),
  component: Home,
});

function Home() {
  return (
    <Shell>
      <main>
        <section className="relative flex min-h-svh items-end overflow-hidden bg-night text-ivory md:items-center">
          <img
            src="/hero.jpg"
            {...imgSize("/hero.jpg")}
            alt="Model twirling in a handcrafted black and crimson garba lehenga"
            className="absolute inset-0 size-full object-cover object-[72%_center] md:object-[70%_center]"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-night/95 via-night/35 to-night/40 md:bg-linear-to-r md:from-night/60 md:via-night/25 md:to-transparent"
            aria-hidden="true"
          />
          <div className="relative mx-auto w-full max-w-[1500px] px-5 pt-32 pb-14 md:translate-y-[6vh] md:px-[6vw] md:pt-28 md:pb-0">
            <p className="text-sm font-light tracking-[0.4em] md:text-lg">CLASSIC AURA</p>
            <h1 className="mt-4 font-display text-[clamp(2.9rem,11vw,3.8rem)] leading-[1.1] font-normal text-ivory md:text-[clamp(3.2rem,5.3vw,5.25rem)]">
              The Art of
              <br />
              Garba Dressing
            </h1>
            <p className="mt-5 max-w-[26rem] text-base font-light md:mt-6 md:max-w-md md:text-xl md:leading-relaxed">
              Handcrafted silhouettes. Rich traditional details. Made for nights that deserve to be remembered.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
              <Link
                to="/shop"
                className="btn btn-ghost min-h-12 gap-4 px-6 text-[0.8rem] tracking-[0.12em] text-ivory hover:border-ivory hover:bg-ivory hover:text-night md:text-sm"
              >
                Explore the collection
                <ArrowRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link
                to="/trial"
                className="btn min-h-12 px-4 text-[0.8rem] tracking-[0.12em] text-ivory underline underline-offset-4 md:text-sm"
              >
                Free home trial
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y hair">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Handcrafted", "Mirror work, stitched — not glued"],
              ["Free in Indore", "Delivery and pickup, no extra fee"],
              ["Home trial", "Up to 3 outfits, no obligation"],
              ["Navratri 2026", "Book 8–22 October"],
            ].map(([title, line]) => (
              <p key={title} className="text-sm text-mist">
                <span className="block font-display text-2xl text-cream">{title}</span>
                {line}
              </p>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl text-cream md:text-5xl">Collections</h2>
              <p className="mt-2 text-mist">Three ways to dress for the nine nights.</p>
            </div>
            <Link to="/collections" className="btn btn-ghost">
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {COLLECTIONS.map((collection) => (
              <Link key={collection.id} to="/shop" search={{ c: collection.id }} className="group block">
                <div className="portrait overflow-hidden">
                  <img
                    src={collection.image} {...imgSize(collection.image)} loading="lazy" decoding="async"
                    alt={collection.alt}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 font-display text-3xl text-cream">{collection.name}</h3>
                <p className="text-sm text-mist">
                  {dressesIn(collection.id).length} designs · {collection.line}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section id="new-arrivals" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl text-cream md:text-5xl">New arrivals</h2>
              <p className="mt-2 max-w-xl text-mist">This season’s chaniya cholis, cut for movement and made to twirl.</p>
            </div>
            <Link to="/shop" className="btn btn-ghost">
              Shop all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {DRESSES.map((dress) => (
              <DressCard key={dress.slug} dress={dress} tone="dark" />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-4xl text-cream md:text-5xl">Before you book</h2>
          <p className="mt-2 max-w-xl text-mist">Fit, delivery and exchange, in plain words.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INFO.map(({ to, title, line }) => (
              <Link key={to} to={to} className="block border border-line bg-paper p-5 transition hover:border-gold">
                <h3 className="font-display text-2xl text-cream">{title}</h3>
                <p className="mt-2 text-sm text-mist">{line}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-8 md:grid-cols-2 md:py-16">
          <img
            src="/dresses/teal-patch.jpg"
            {...imgSize("/dresses/teal-patch.jpg")}
            loading="lazy"
            decoding="async"
            alt="Teal patchwork lehenga beside a carved wooden door"
            className="portrait w-full"
          />
          <div>
            <h2 className="font-display text-4xl text-cream md:text-5xl">Made for the circle, built to last the night</h2>
            <p className="mt-4 text-mist">
              Every Classic Aura lehenga starts with a wide, light flare that moves with each step of the dance. Mirror work is stitched on, not glued, and the blouse can be altered to you.
            </p>
            <ul className="mt-4 space-y-2 text-mist">
              <li>Lightweight panels, comfortable through hours of dancing</li>
              <li>Free delivery and pickup inside Indore</li>
              <li>Try up to three outfits at home before you commit</li>
            </ul>
            <Link to="/about" className="btn btn-ghost mt-8">
              Our story
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16">
          <h2 className="font-display text-4xl text-cream md:text-5xl">Questions, answered</h2>
          <div className="mt-8 border-t border-line">
            {FAQS.slice(0, 4).map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-display text-2xl">
                  {item.q}
                  <span className="text-gold transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 text-mist">{item.a}</p>
              </details>
            ))}
          </div>
          <Link to="/faq" className="btn btn-ghost mt-8">
            All questions
          </Link>
        </section>

        <section className="border-y hair">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center">
            <h2 className="font-display text-4xl text-cream md:text-5xl">Talk to Classic Aura</h2>
            <p className="mt-3 text-mist">One number for dates, sizes and delivery. We confirm on WhatsApp.</p>
            <p className="mt-6 font-display text-4xl text-cream md:text-5xl">
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a className="btn btn-solid" href={waLink("Hi Classic Aura, I want to rent a Garba dress.")}>
                WhatsApp
              </a>
              <a className="btn btn-line" href={`tel:${PHONE_TEL}`}>
                Call
              </a>
              <Link to="/contact" className="btn btn-ghost">
                Contact page
              </Link>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
    </Shell>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <section>
      <div className="mx-auto max-w-xl px-5 py-16 text-center">
        <h2 className="font-display text-4xl text-cream">Get first look at every new drop</h2>
        <p className="mt-3 text-mist">Join the list for early access to new colours and Navratri dates.</p>
        {done ? (
          <p className="mt-6 text-cream" role="status">
            WhatsApp should have opened with your request. Send the message and we will add you to the list.
          </p>
        ) : (
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              // There is no mailing-list service behind this form, so the sign-up reaches us as a WhatsApp message.
              window.open(waLink(`Hi Classic Aura, please add ${email.trim()} to your new-drop list.`), "_blank", "noopener");
              setDone(true);
            }}
          >
            <label className="sr-only" htmlFor="list-email">
              Email address
            </label>
            <input
              id="list-email"
              required
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="field bg-transparent text-cream placeholder:text-mist"
            />
            <button className="btn btn-solid" type="submit">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
