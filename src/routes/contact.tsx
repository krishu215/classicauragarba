import { Prose } from "@/components/prose";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, businessNode, graph, pageNode, seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";
import { EMAIL, INSTAGRAM, PHONE_DISPLAY, PHONE_TEL, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      ...PAGES.contact,
      path: "/contact",
      jsonLd: [
        graph(
          breadcrumbNode([["Contact", "/contact"]]),
          pageNode("ContactPage", PAGES.contact.title, PAGES.contact.description, "/contact"),
          businessNode(),
        ),
      ],
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <PageIntro
          kicker="One number"
          title="Talk to Classic Aura"
          lede="Call or WhatsApp. We confirm delivery times on WhatsApp, not by email thread."
        />
        <p className="font-display text-4xl text-cream sm:text-5xl md:text-6xl">
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="btn btn-solid" href={waLink("Hi Classic Aura, I want to rent a Garba dress.")}>
            WhatsApp
          </a>
          <a className="btn btn-line" href={`tel:${PHONE_TEL}`}>
            Call
          </a>
        </div>
        <dl className="mt-10 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="label">Email</dt>
            <dd><a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
          </div>
          <div>
            <dt className="label">Instagram</dt>
            <dd>{INSTAGRAM}</dd>
          </div>
          <div>
            <dt className="label">Delivery</dt>
            <dd>Indore only, pincodes 452xxx</dd>
          </div>
          <div>
            <dt className="label">Season</dt>
            <dd>8–22 October 2026</dd>
          </div>
        </dl>
        <Prose title="What to send us on WhatsApp">
          <p>
            The quickest way to a confirmed booking is one message with everything in it: the dress name, your Garba date, one, two or three days, your size or measurements, and your Indore address with pincode. We check the calendar and confirm the date. You pay cash on delivery.
          </p>
          <p>
            You can also ask us about alterations, whether a colour is still free on a weekend night, or how the free home trial works. We reply on the same number whether you call or message.
          </p>
        </Prose>
        <Prose title="Navratri 2026 bookings">
          <p>
            We are booking Garba dates from 8 to 22 October 2026. Popular colours, especially the peacock borders and the magenta buti, fill up first on weekend nights, so message early if your date is fixed. Rentals run for one, two or three days, and longer rentals take 10% or 20% off the daily rate.
          </p>
        </Prose>
        <Prose title="Where we deliver">
          <p>
            We deliver and collect across Indore, pincodes beginning 452, with no delivery fee. If you are just outside the city, call and we will tell you honestly whether the address is possible this season.
          </p>
        </Prose>
      </main>
    </Shell>
  );
}
