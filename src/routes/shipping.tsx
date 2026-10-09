import { Prose } from "@/components/prose";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, pageNode, seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";
import { PHONE_DISPLAY } from "@/lib/site";

export const Route = createFileRoute("/shipping")({
  head: () =>
    seo({
      ...PAGES.shipping,
      path: "/shipping",
      jsonLd: [graph(breadcrumbNode([["Shipping", "/shipping"]]), pageNode("WebPage", PAGES.shipping.title, PAGES.shipping.description, "/shipping"))],
    }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <PageIntro
          kicker="Indore"
          title="Shipping and pickup"
          lede="Home delivery and pickup are free inside Indore. We do not ship the rest of India this season."
        />
        <ul className="list-disc space-y-3 pl-5 text-mute">
          <li>Pincodes we cover start with 452. Checkout will stop a pin that does not.</li>
          <li>We confirm a delivery window on WhatsApp after the booking request. Morning slots go first on Garba days.</li>
          <li>Someone should be at the address to receive the outfit. Trials need you there to try them.</li>
          <li>Pickup is the morning after your last rental day, from the same address, unless you tell us otherwise.</li>
          <li>Same-day delivery depends on the van. Call {PHONE_DISPLAY} before you assume it.</li>
        </ul>
        <Prose title="On the day of delivery">
          <p>
            After your booking request, we message a delivery window on WhatsApp. Morning slots go first on Garba days, so reserve early if your night is a weekend. Please have someone at the address to receive the set, and keep the phone you booked with close by so the van can call if the lane is hard to find.
          </p>
          <p>
            Every outfit arrives steam pressed, with the chaniya, choli and dupatta together. If you have asked for a blouse alteration, we confirm the timing on WhatsApp before the date is fixed.
          </p>
        </Prose>
        <Prose title="Pickup after your Garba">
          <p>
            Pickup is the morning after your last rental day, from the same address, unless you tell us a different time. Please keep the three pieces together so the set comes back complete. If you need a different pickup window, message us before delivery and we will fit it to the van route where we can.
          </p>
        </Prose>
        <Prose title="Home trial deliveries">
          <p>
            The free home trial follows the same rules: Indore only, pincodes beginning 452, no delivery fee and no obligation to rent. Someone needs to be home during the agreed window so you can try the outfits. Keep what you love and we take the rest back with us.
          </p>
        </Prose>
      </main>
    </Shell>
  );
}
