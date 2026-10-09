import { imgSize } from "@/lib/images";
import { Prose } from "@/components/prose";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, pageNode, seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";
import { DRESSES } from "@/lib/dresses";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      ...PAGES.about,
      path: "/about",
      jsonLd: [graph(breadcrumbNode([["About", "/about"]]), pageNode("AboutPage", PAGES.about.title, PAGES.about.description, "/about"))],
    }),
  component: AboutPage,
});

function AboutPage() {
  const low = Math.min(...DRESSES.map((dress) => dress.price));
  const high = Math.max(...DRESSES.map((dress) => dress.price));
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <img
            src="/dresses/noir-arch.jpg"
            {...imgSize("/dresses/noir-arch.jpg")}
            alt="Black and red arch-hem lehenga in front of a carved door"
            className="portrait w-full"
            fetchPriority="high"
          />
          <div>
            <PageIntro
              kicker="Indore"
              title="Made for the circle"
              lede="Classic Aura rents Garba dresses that are cut to move. We are not a catalogue of glued mirrors. The work is stitched, the flare is light, and the outfit comes back to us after your night."
            />
            <p className="text-mute">
              Navratri 2026, we are booking 8–22 October, with free delivery and pickup inside Indore and a home trial of up to three outfits. One number for all of it:{" "}
              <a className="text-gold underline" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn btn-solid">Shop dresses</Link>
              <Link to="/contact" className="btn btn-line">Contact</Link>
            </div>
          </div>
        </div>

        <Prose title="Why we rent Garba dresses">
          <p>
            A Garba outfit is worn for a handful of nights and then waits in a cupboard for the rest of the year. Renting lets you dance in a properly stitched chaniya choli at Navratri without paying for it to sit unused. Classic Aura keeps a small rail of handcrafted pieces and rents them out for one, two or three days at a time.
          </p>
          <p>
            Because the rail is small, every piece is chosen for how it moves. We look at the weight of the flare, the way the hem is finished and whether the mirror work will still be in place after hours of spinning in a circle.
          </p>
        </Prose>

        <Prose title="What goes into every set">
          <p>
            Each rental is a full set: chaniya, choli and dupatta. The mirror work is stitched on, not glued, so it survives the dance floor. The flare is wide and light, which matters far more at eleven at night than it does in a photograph.
          </p>
          <p>
            Every outfit is steam pressed before it leaves us, and the blouse can be altered to your measurements when you book early enough. Ordinary creasing from dancing is expected and is never charged.
          </p>
        </Prose>

        <Prose title="Delivered across Indore">
          <p>
            We deliver and collect across Indore, pincodes beginning 452, at no extra charge. You can try up to three outfits at home first with our <Link to="/trial" className="text-gold underline">free home trial</Link>, then rent only what you love. Dates run from 8 to 22 October 2026, and we confirm every booking on WhatsApp, and you pay cash on delivery.
          </p>
          <p>
            This season the rail has three families, Peacock Border, Mirror Work and Festive Lehengas, with daily rates from ₹{low} to ₹{high}. Two-day rentals take 10% off the daily rate and three-day rentals take 20% off. See them all in the <Link to="/collections" className="text-gold underline">collections</Link>.
          </p>
        </Prose>
      </main>
    </Shell>
  );
}
