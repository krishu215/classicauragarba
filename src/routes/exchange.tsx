import { Prose } from "@/components/prose";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, pageNode, seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";

export const Route = createFileRoute("/exchange")({
  head: () =>
    seo({
      ...PAGES.exchange,
      path: "/exchange",
      jsonLd: [graph(breadcrumbNode([["Exchange", "/exchange"]]), pageNode("WebPage", PAGES.exchange.title, PAGES.exchange.description, "/exchange"))],
    }),
  component: ExchangePage,
});

function ExchangePage() {
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <PageIntro
          kicker="If the fit is wrong"
          title="Exchange"
          lede="A rental is not a sale, so “exchange” means a different size or a different dress before your Garba — not a 7-day return after the night."
        />
        <ul className="list-disc space-y-3 pl-5 text-mute">
          <li>The sure path is the <Link to="/trial" className="underline">free home trial</Link>: three outfits, you keep one.</li>
          <li>If a confirmed outfit is the wrong size and we still have a day before delivery, we swap it for the same dress in another size when that size is free.</li>
          <li>Swapping to a different design is a new booking. Your original date is released if the new one is paid.</li>
          <li>After the event, we collect the outfit. We do not exchange a worn set for a fresh one.</li>
        </ul>
        <Prose title="How to avoid needing an exchange">
          <p>
            Most size problems can be settled before you pay. Check your bust and waist against the <Link to="/size-guide" className="text-gold underline">size guide</Link>, add your measurements to the checkout notes, or book the free home trial and try up to three outfits in your own room. Alteration of the blouse is possible when your Garba date is not the very next morning.
          </p>
        </Prose>
        <Prose title="If you need to swap">
          <p>
            Message us on WhatsApp with your request number and the size or design you would like instead. If the outfit has not left us yet, we swap it for the same dress in another size when that size is free for your date. If the outfit is already with you, tell us the same day so we can check what is still possible before your Garba.
          </p>
          <p>
            Moving to a different design counts as a new booking, so it follows the usual steps: we confirm the date and release your original date once the new one is confirmed.
          </p>
        </Prose>
        <Prose title="What an exchange does not cover">
          <p>
            A rental is for the nights you chose. Once the event is over we collect the outfit, and we do not exchange a worn set for a fresh one. Damage beyond ordinary wear is handled under the <Link to="/terms" className="text-gold underline">rental terms</Link>, and we always tell you the amount before billing it.
          </p>
        </Prose>
      </main>
    </Shell>
  );
}
