import { Prose } from "@/components/prose";
import { imgSize } from "@/lib/images";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, itemListNode, pageNode, seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";
import { COLLECTIONS, DRESSES, dressesIn } from "@/lib/dresses";

export const Route = createFileRoute("/collections")({
  head: () =>
    seo({
      ...PAGES.collections,
      path: "/collections",
      jsonLd: [
        graph(
          breadcrumbNode([["Collections", "/collections"]]),
          pageNode("CollectionPage", PAGES.collections.title, PAGES.collections.description, "/collections"),
          itemListNode(DRESSES),
        ),
      ],
    }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-5 py-12">
        <PageIntro
          kicker="The rail"
          title="Collections"
          lede="Three families this Navratri. Each dress still has its own page, date and price."
        />
        <div className="grid gap-10">
          {COLLECTIONS.map((collection) => (
            <article key={collection.id} className="grid items-center gap-6 border-b border-line pb-10 md:grid-cols-2">
              <img src={collection.image} {...imgSize(collection.image)} loading="lazy" decoding="async" alt={collection.alt} className="portrait w-full" />
              <div>
                <p className="kicker">{dressesIn(collection.id).length} designs</p>
                <h2 className="mt-2 font-display text-4xl text-cream sm:text-5xl">{collection.name}</h2>
                <p className="mt-3 text-mute">{collection.line}</p>
                <ul className="mt-4 space-y-1">
                  {dressesIn(collection.id).map((dress) => (
                    <li key={dress.slug}>
                      <Link to="/dress/$slug" params={{ slug: dress.slug }} className="underline underline-offset-4">
                        {dress.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/shop" search={{ c: collection.id }} className="btn btn-solid mt-6">
                  Shop {collection.name}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <Prose title="How to choose your Navratri look">
          <p>
            Start with the hem. The Peacock Border collection puts wide bands of peacocks, florals and mirror tiles at the bottom of the flare, so the pattern shows most when you spin. Mirror Work leans on panels set with squares of mirror that catch the string lights. Festive Lehengas use butis, stripes and patchwork for a lighter, more playful skirt.
          </p>
          <p>
            Then think about the night. For a long Garba, a lighter flare such as the magenta buti is easier to dance in for hours. For a sangeet or a festive evening, the black and gold lehengas read well from across the room. Every piece is a full set with chaniya, choli and dupatta, steam pressed before it reaches you.
          </p>
          <p>
            Prices are per day and shown on every dress page. Two-day rentals take 10% off the daily rate, three-day rentals take 20% off, and delivery and pickup inside Indore are free. We confirm each date on WhatsApp, and you pay cash on delivery.
          </p>
          <p>
            Still deciding? Pick up to three outfits for the <Link to="/trial" className="text-gold underline">free home trial</Link>, or read <Link to="/how-it-works" className="text-gold underline">how a rental works</Link> before you book.
          </p>
        </Prose>
      </main>
    </Shell>
  );
}
