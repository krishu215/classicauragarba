import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, pageNode, seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Prose } from "@/components/prose";
import { PageIntro, Shell } from "@/components/shell";
import { PHONE_DISPLAY } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      ...PAGES.privacy,
      path: "/privacy",
      jsonLd: [graph(breadcrumbNode([["Privacy", "/privacy"]]), pageNode("WebPage", PAGES.privacy.title, PAGES.privacy.description, "/privacy"))],
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <PageIntro
          kicker="Privacy"
          title="What we do with your details"
          lede="We use your name, mobile, email and address to deliver a rental or a home trial, and to confirm your booking. We do not sell the list."
        />
        <div className="space-y-4 text-mute">
          <p>
            “Save my details” keeps them in this browser only, so the next checkout on this phone can refill. It is not an account, and clearing the browser removes it.
          </p>
          <p>
            Rentals are paid in cash on delivery, so no card or UPI details are collected on this website.
          </p>
          <p>
            To ask what we still have from a booking, WhatsApp {PHONE_DISPLAY} from the same mobile you used.
          </p>
        </div>
        <Prose title="What the forms ask for">
          <p>
            The checkout and home trial forms ask for your name, mobile number, an optional WhatsApp number, email, full address, area, pincode and city. You can also add a preferred delivery time and notes. We use these only to deliver, collect and confirm your booking.
          </p>
        </Prose>
        <Prose title="How your request reaches us">
          <p>
            This website has no booking database. When you confirm, it prepares a message and you send it to us on WhatsApp. That message is the request we receive, so please check it before you send it. Nothing is charged on this site.
          </p>
        </Prose>
        <Prose title="What stays on your device">
          <p>
            Your selected outfits, the details you chose to save and your light or dark theme setting are kept in your own browser so the site can remember them next time. You can remove them at any time by clearing the site data in your browser settings.
          </p>
        </Prose>
        <Prose title="Fonts and third parties">
          <p>
            The page text is set in fonts loaded from Google Fonts, so your browser contacts Google to fetch them. We do not pass your details to anyone else for marketing.
          </p>
        </Prose>
      </main>
    </Shell>
  );
}
