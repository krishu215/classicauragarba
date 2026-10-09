import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, pageNode, seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";
import { PHONE_DISPLAY } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({
      ...PAGES.terms,
      path: "/terms",
      jsonLd: [graph(breadcrumbNode([["Rental terms", "/terms"]]), pageNode("WebPage", PAGES.terms.title, PAGES.terms.description, "/terms"))],
    }),
  component: TermsPage,
});

const POINTS = [
  "A booking request on this site is not a charge. The outfit is yours once we confirm availability on WhatsApp, and you pay the rental fee in cash when it is delivered.",
  "Rental period is the number of days you chose, starting on your Garba date. Pickup is the morning after the last day unless we agree otherwise.",
  "Two-day rentals are 10% off the daily rate. Three-day rentals are 20% off. Delivery and pickup inside Indore are free.",
  "You may move the date at no charge until 48 hours before delivery, if the new date is open. Inside 48 hours, a move depends on another booking taking the original night.",
  "Cancellations inside 48 hours of delivery are not refunded once the piece has been held off the calendar.",
  "The set is chaniya, choli and dupatta. Jewellery shown in photographs is the model’s own unless we say a piece is included.",
  "Ordinary creasing from dancing is expected. Tears, burns, missing mirrors you pulled off, or stains we cannot lift are charged at repair cost, and we message you the amount before taking it.",
  "We deliver only in Indore, pincodes beginning 452. A wrong address that sends the van outside the city can be refused.",
  "Home trials are free, up to three outfits, with no obligation to rent. Please be home at the agreed window.",
  `Questions about these terms: ${PHONE_DISPLAY}.`,
];

function TermsPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <PageIntro kicker="Legal" title="Rental terms" lede="Plain language for Navratri 2026. If a line here and a WhatsApp message disagree, ask us to confirm in writing." />
        <ol className="list-decimal space-y-4 pl-5 text-mute">
          {POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ol>
      </main>
    </Shell>
  );
}
