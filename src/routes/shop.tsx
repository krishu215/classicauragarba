import { Prose } from "@/components/prose";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, itemListNode, pageNode, seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DressCard } from "@/components/dress-card";
import { PageIntro, Shell } from "@/components/shell";
import { COLLECTIONS, DRESSES, type CollectionId } from "@/lib/dresses";

type ShopSearch = { c?: CollectionId; q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const c = search.c;
    const known = c === "peacock" || c === "mirror" || c === "festive" ? c : undefined;
    return {
      c: known,
      q: typeof search.q === "string" ? search.q : undefined,
    };
  },
  head: () =>
    seo({
      ...PAGES.shop,
      path: "/shop",
      jsonLd: [
        graph(
          breadcrumbNode([["New arrivals", "/shop"]]),
          pageNode("CollectionPage", PAGES.shop.title, PAGES.shop.description, "/shop"),
          itemListNode(DRESSES),
        ),
      ],
    }),
  component: ShopPage,
});

function ShopPage() {
  const { c, q } = Route.useSearch();
  const needle = (q ?? "").trim().toLowerCase();
  const list = DRESSES.filter((dress) => {
    if (c && dress.collection !== c) return false;
    if (!needle) return true;
    return `${dress.name} ${dress.colors} ${dress.work}`.toLowerCase().includes(needle);
  });

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-5 py-12">
        <PageIntro
          kicker="Women · Chaniya choli"
          title="New arrivals"
          lede="Rent for one night or three. Free delivery in Indore, and a free home trial if you want to decide in the room."
        />
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterChip current={c} label="All" />
          {COLLECTIONS.map((collection) => (
            <FilterChip key={collection.id} current={c} id={collection.id} label={collection.name} />
          ))}
        </div>
        {needle ? <p className="mb-6 text-sm text-mute">Showing matches for “{q}”.</p> : null}
        {list.length === 0 ? (
          <p className="text-mute">
            Nothing in this edit. <Link to="/shop" className="underline">Clear filters</Link> or{" "}
            <Link to="/contact" className="underline">ask us</Link>.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
            {list.map((dress) => (
              <DressCard key={dress.slug} dress={dress} />
            ))}
          </div>
        )}
        <Prose title="Rent a chaniya choli in Indore for Navratri">
          <p>
            Every outfit in this edit is a full set of chaniya, choli and dupatta, rented by the day. Daily rates run from ₹{Math.min(...DRESSES.map((dress) => dress.price))} to ₹{Math.max(...DRESSES.map((dress) => dress.price))}. A two-day booking takes 10% off the daily rate and three days take 20% off. Pick a Garba date between 8 and 22 October 2026 on the dress page and the summary shows your total before you send anything.
          </p>
          <p>
            Not sure which colour suits you? The peacock borders and the magenta buti are the pieces people ask for first, so they reach “last one” quickly on weekend nights. If you cannot decide, choose up to three looks for our <Link to="/trial" className="text-gold underline">free home trial</Link> and we will bring them to your door in Indore. Try them on, keep what you love, and we take the rest back.
          </p>
          <p>
            Delivery and pickup are free inside Indore, pincodes beginning 452. We confirm every request on WhatsApp, you pay cash on delivery and we steam press the outfit before it leaves us. For fit questions, read the <Link to="/size-guide" className="text-gold underline">size guide</Link> or message us your measurements.
          </p>
          <p>
            Sizes run from XS to XXL, and most cholis can be altered to your measurements when you book with time to spare. If a date shows “Rented”, that dress is already taken for the night, so try the same look on another date or pick a sister colour. Prices on every card are per day, with the full set included.
          </p>
        </Prose>
        <Prose title="Three collections, one rail">
          <ul className="space-y-3">
            {COLLECTIONS.map((collection) => (
              <li key={collection.id}>
                <Link to="/shop" search={{ c: collection.id }} className="font-display text-2xl text-cream underline underline-offset-4">
                  {collection.name}
                </Link>
                <span className="block">{collection.line}</span>
              </li>
            ))}
          </ul>
        </Prose>
      </main>
    </Shell>
  );
}

function FilterChip({ current, id, label }: { current?: CollectionId; id?: CollectionId; label: string }) {
  const on = current === id || (!current && !id);
  return (
    <Link
      to="/shop"
      search={{ c: id }}
      className={"btn " + (on ? "btn-solid" : "btn-line")}
      aria-current={on ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
