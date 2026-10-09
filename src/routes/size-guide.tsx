import { Prose } from "@/components/prose";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, pageNode, seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";

export const Route = createFileRoute("/size-guide")({
  head: () =>
    seo({
      ...PAGES.sizeGuide,
      path: "/size-guide",
      jsonLd: [graph(breadcrumbNode([["Size guide", "/size-guide"]]), pageNode("WebPage", PAGES.sizeGuide.title, PAGES.sizeGuide.description, "/size-guide"))],
    }),
  component: SizePage,
});

const ROWS = [
  ["XS", "32", "32 in", "26 in"],
  ["S", "34", "34 in", "28 in"],
  ["M", "36", "36 in", "30 in"],
  ["L", "38", "38 in", "32 in"],
  ["XL", "40", "40 in", "34 in"],
  ["XXL", "42", "42 in", "36 in"],
];

function SizePage() {
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <PageIntro
          kicker="Fit"
          title="Size guide"
          lede="Choli sizes are a starting point. Most waists on the chaniya draw in. If you are between two sizes, book the free home trial."
        />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-label uppercase text-mute">
                <th className="py-3 font-medium">Size</th>
                <th className="py-3 font-medium">Bust label</th>
                <th className="py-3 font-medium">Bust</th>
                <th className="py-3 font-medium">Waist</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row[0]} className="border-b border-line">
                  {row.map((cell) => (
                    <td key={cell} className="py-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-mute">
          <li>Chaniya length on these sets is about 40–42 inches. Tell us if you need it shorter.</li>
          <li>Blouse sleeves on the peacock sets are elbow length. The buti and stripe cholis are shorter.</li>
          <li>Alteration is possible when the Garba date is not the next morning. Say so in the checkout notes.</li>
        </ul>
        <Link to="/trial" className="btn btn-solid mt-8">
          Book a fitting trial
        </Link>
        <Prose title="How to measure at home">
          <p>
            Use a soft tape and wear thin clothing. For the bust, measure around the fullest part of the chest with the tape level at the back. For the waist, measure around the narrowest part of your torso, usually just above the navel. For chaniya length, stand barefoot and measure from your waist to the floor.
          </p>
          <p>
            Write the numbers in inches and compare them with the table above. The choli is the fitted piece, so choose its size by your bust. The chaniya waist draws in, so it is more forgiving.
          </p>
        </Prose>
        <Prose title="Between two sizes">
          <p>
            If your numbers sit between two rows, the free home trial is the surest way to decide. We bring the outfit to your door in Indore, you try it with the dupatta and the right footwear, and we take back whatever you do not want. If you book with time to spare, the blouse can also be altered to you.
          </p>
        </Prose>
      </main>
    </Shell>
  );
}
