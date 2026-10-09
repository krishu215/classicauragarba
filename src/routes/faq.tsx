import { PAGES } from "@/lib/pages";
import { breadcrumbNode, faqNode, graph, pageNode, seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";
import { FAQS } from "@/lib/faq";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo({
      ...PAGES.faq,
      path: "/faq",
      jsonLd: [graph(breadcrumbNode([["FAQ", "/faq"]]), pageNode("FAQPage", PAGES.faq.title, PAGES.faq.description, "/faq"), faqNode())],
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <PageIntro
          kicker="Help"
          title="Questions, answered"
          lede="Rentals, trials, dates, damage and delivery — the things people actually ask before Navratri."
        />
        <div className="border-t border-line">
          {FAQS.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-display text-2xl md:text-3xl">
                {item.q}
                <span className="text-gold transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-5 text-mute">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-mute">
          Still stuck? Call <a className="text-gold underline" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> or read the{" "}
          <Link to="/terms" className="underline">rental terms</Link>.
        </p>
      </main>
    </Shell>
  );
}
