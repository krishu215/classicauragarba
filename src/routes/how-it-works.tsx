import { Prose } from "@/components/prose";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, howToNode, pageNode, seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    seo({
      ...PAGES.howItWorks,
      path: "/how-it-works",
      jsonLd: [
        graph(
          breadcrumbNode([["How it works", "/how-it-works"]]),
          pageNode("WebPage", PAGES.howItWorks.title, PAGES.howItWorks.description, "/how-it-works"),
          howToNode("How to rent a Garba dress in Indore", STEPS),
        ),
      ],
    }),
  component: HowItWorksPage,
});

type Step = {
  title: string;
  line: string;
  points: string[];
  to: "/shop" | "/trial" | "/checkout";
  cta: string;
};

const STEPS: Step[] = [
  {
    title: "Choose your outfit",
    line: "Pick a chaniya choli, 1 to 3 days and a Garba date between 8 and 22 October.",
    points: [
      "The set includes the chaniya, choli and dupatta.",
      "Two days are 10% off the daily rate, three days are 20% off.",
      "Dates marked rented are taken for that dress; “Last one” means a single outfit is left.",
    ],
    to: "/shop",
    cta: "Browse new arrivals",
  },
  {
    title: "Try at home first",
    line: "Choose up to 3 outfits and we bring them to your door. Free, no obligation.",
    points: [
      "Share a time and your Indore address.",
      "Keep what you love, we take the rest back.",
      "Trial and delivery are both free.",
    ],
    to: "/trial",
    cta: "Book a home trial",
  },
  {
    title: "Check out",
    line: "Place the booking request and we confirm on WhatsApp. You pay cash on delivery.",
    points: [
      "Add more than one outfit; each keeps its own length and Garba date.",
      "We deliver inside Indore and pick the outfit up the morning after your last day.",
      "Nothing is charged until we confirm availability.",
    ],
    to: "/checkout",
    cta: "Go to checkout",
  },
];

function HowItWorksPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-5xl px-5 py-12">
        <PageIntro
          kicker="Rent in three steps"
          title="How a rental works"
          lede="Choose, try if you like, then check out. We deliver and collect inside Indore."
        />
        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex flex-col border border-line bg-paper p-6">
              <p className="text-xs tracking-label text-gold uppercase">Step {index + 1}</p>
              <h2 className="mt-2 font-display text-3xl text-cream">{step.title}</h2>
              <p className="mt-3 text-mist">{step.line}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-mute">
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link to={step.to} className="btn btn-line mt-auto self-start">
                {step.cta}
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-mute">
          More questions? Read the <Link to="/faq" className="text-gold underline">questions and answers</Link>,{" "}
          the <Link to="/size-guide" className="underline">size guide</Link> or the{" "}
          <Link to="/terms" className="underline">rental terms</Link>.
        </p>
        <Prose title="Good to know before you book">
          <p>
            Reserve early if your Garba falls on a weekend. Popular colours reach “last one” first, and a date marked rented is already taken for that dress. If your date is full, message us and we will suggest a sister colour that is still free.
          </p>
          <p>
            The rental fee is the amount due. There is no separate delivery charge inside Indore and no online deposit. You pay the rental fee in cash when we deliver the outfit, after we confirm availability on WhatsApp.
          </p>
          <p>
            You can move your date at no charge until 48 hours before delivery if the new night is open. Damage beyond ordinary wear is billed at repair cost after we tell you the amount. The full wording is in the <Link to="/terms" className="text-gold underline">rental terms</Link>.
          </p>
        </Prose>
      </main>
    </Shell>
  );
}
