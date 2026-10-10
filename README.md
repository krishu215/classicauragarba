# Classic Aura — Garba Dresses

TanStack Start + Tailwind v4 site (Netlify preset).

```bash
npm install
npm run dev     # http://localhost:8080
npm run build
```

Hero image: `public/hero.jpg` (replace the file to change it).

## Hosting

The site builds for Vercel (Nitro preset `vercel`, picked automatically when the `VERCEL` variable is set) and for Netlify. Add the variables from `.env.example` in the host's settings and redeploy after changing them.

## Backend: bookings, payments, emails, admin

Server code lives in `src/server` (TanStack Start server functions and two API routes). Data is in Supabase
(`bookings` and `booking_items`, row level security on, only the server uses the service key).

- Checkout calls `submitRental`, which re-prices the order from `src/lib/dresses.ts`, checks the dates, saves the
  booking as `pending_payment`, creates a Razorpay Payment Link and sends the customer to it.
- Razorpay returns the customer to `/api/razorpay-return` (signature checked) and also calls the webhook
  `/api/razorpay-webhook`. Whichever arrives first marks the booking `paid` once and sends the emails.
- The free home trial calls `submitTrial` (status `requested`, no payment) and emails the customer and you.
- `/admin` is a private dashboard (Supabase Auth, only emails in `ADMIN_EMAILS`): see every booking, change its
  status, add notes, export CSV.

Setup: copy the variables in `.env.example` into Netlify, add the webhook in Razorpay
(URL `https://<your-site>/api/razorpay-webhook`, events `payment_link.paid` and `payment_link.expired`), verify your
sending domain in Resend, and create the admin user in Supabase.

Note: dress availability on the calendar is still the sample logic in `src/lib/site.ts` (`dayStatus`). The server
only blocks a dress for dates that already have a paid booking.

## SEO

- Page titles and descriptions: `src/lib/pages.ts` (titles 50–60 chars, descriptions 120–160, all unique). Dress pages build theirs from the dress data.
- Canonical URL, social tags and JSON-LD (business, breadcrumbs, FAQ, HowTo, Product): `src/lib/seo.ts`.
- If you move to your own domain, change `SITE_URL` in `src/lib/seo.ts` and the URLs in `public/sitemap.xml` and `public/robots.txt`.
- Image sizes for `width`/`height`: `src/lib/images.ts`. Add an entry when you add a new photo.
- Checkout and confirmation pages are `noindex` on purpose.

## Security headers

Set in `vite.config.ts` (`securityHeaders`): CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
Permissions-Policy, HSTS and COOP. If you add a new third-party script, font or image host, add it to the CSP there.
After deploying, check with `curl -I https://classicauragarba.vercel.app/`.
