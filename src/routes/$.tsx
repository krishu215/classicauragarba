import { PAGES } from "@/lib/pages";
import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/$")({
  head: () => seo({ ...PAGES.notFound, path: "/", noindex: true }),
  component: MissingPage,
});

function MissingPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-xl px-5 py-20">
        <p className="kicker">404</p>
        <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">This page is not on the rail</h1>
        <p className="mt-4 text-mute">The dress or the note you wanted is not here. The collection is.</p>
        <Link to="/shop" className="btn btn-solid mt-6">
          New arrivals
        </Link>
      </main>
    </Shell>
  );
}
