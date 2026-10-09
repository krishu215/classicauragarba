# Classic Aura — Garba Dresses

TanStack Start + Tailwind v4 site (Netlify preset).

```bash
npm install
npm run dev     # http://localhost:8080
npm run build
```

Hero image: `public/hero.jpg` (replace the file to change it).

## Backend: bookings, payments, emails, admin

Server code lives in `src/server` (TanStack Start server functions and two API routes). Orders, order items and
the email delivery queue are stored in Netlify Database using Drizzle. The schema is in `db/schema.ts` and
deploy-time migrations are in `netlify/database/migrations`.

- Checkout calls `submitRental`, which re-prices the order from `src/lib/dresses.ts`, checks the dates, saves the
  booking as `pending_payment`, creates a Razorpay Payment Link and sends the customer to it when online payments are enabled.
  With the current cash-on-delivery setting, checkout saves a request and sends a receipt; it does not incorrectly call the request confirmed.
- Razorpay returns the customer to `/api/razorpay-return` (signature checked) and also calls the webhook
  `/api/razorpay-webhook`. Whichever arrives first marks the booking `paid` once and queues the confirmation email.
- The free home trial calls `submitTrial` (status `requested`, no payment) and emails the customer and you.
- `/admin` is a private dashboard (Supabase Auth, only emails in `ADMIN_EMAILS`): see every booking, change its
  status, add notes, export CSV.

Setup: configure the server environment variables in Netlify, add the webhook in Razorpay
(URL `https://<your-site>/api/razorpay-webhook`, events `payment_link.paid` and `payment_link.expired`), verify your
sending domain in Resend, and retain the existing admin user in Supabase.

### Existing data and account compatibility

The first order read or write imports the existing Supabase bookings and their items into Netlify Database.
The import is paginated, transaction-protected and guarded by a database lock and completion marker. It preserves
references, IDs, statuses, payment details, delivery slots, notes and timestamps. It never changes or deletes the
source data, and it never sends historical order emails. A failed import rolls back and is retried on the next request.
Keep `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_ANON_KEY` configured. Pause order processing during
the production cutover so an old deployment cannot save additional orders after the import snapshot.

New customer accounts use Netlify Identity. The import snapshots existing account IDs and emails, without passwords
or session data, so the compatibility login cannot be used to register new Supabase accounts after the cutover.
Existing verified Supabase customer accounts can still sign in with
their existing passwords and see all their orders; existing reset links and password recovery remain supported.
Passwords are not exported, copied or stored by this migration. Admin authentication and `ADMIN_EMAILS` continue
using the existing account setup so the team does not lose dashboard access.

### Verified signup and branded account emails

Netlify Identity is enabled through `.netlify/features/netlify-identity`. In the site's Identity settings:

- Enable email/password signup and leave **autoconfirm off**. Signup fails closed if confirmation is disabled.
- Set the confirmation email template path to `/emails/confirmation.html`, with subject `Confirm your email · Classic Aura`.
- Set the password recovery email template path to `/emails/recovery.html`, with subject `Reset your password · Classic Aura`.
- Configure the correct HTTPS site URL and allow `/login` as the email callback destination.

The template files are publicly hosted template sources, not preview pages. Identity expands their Go template
placeholders when sending mail. Confirmation links are verified by Identity, then the customer returns to the login
screen. Customer order endpoints independently validate the Identity session and confirmed email with the Identity
API; browser state or unverified JWT claims cannot unlock order history. Signup and login event handlers add
server-side confirmation checks. To resend verification, enter the account's email and password on the sign-in form.

### Order confirmation and delivery emails

Set `RESEND_API_KEY` and `MAIL_FROM` as server-side Netlify environment variables. `MAIL_FROM` must use a sender
verified in Resend, for example your configured Classic Aura sending address. Optionally configure
`ADMIN_NOTIFY_EMAIL` for owner alerts and customer reply-to, and `SITE_URL` for your canonical HTTPS domain.
Never put mail credentials in client code or commit their values.

Changing an order to `confirmed` queues **Your order is confirmed** immediately; changing it to `delivered` queues
**Your order is delivered**. Both use the website's espresso, cream and gold design and include the order reference,
outfits, amount, delivery address and account link. Confirmation includes the delivery slot when available.
Paid Razorpay orders use the same confirmation event, preventing duplicate confirmation emails from callbacks
or repeated admin saves. Order updates and email queue inserts share a transaction.

Emails are attempted immediately after the order transaction commits. `netlify/functions/email-retry.mts` retries
pending emails every five minutes in production with bounded backoff. Unique event keys, database leases and
Resend idempotency keys prevent duplicate sends. Provider errors are recorded without raw responses or credentials.
Missing mail configuration leaves emails queued without consuming retries, rather than losing them or undoing an order.
After ten unsuccessful delivery attempts, the row is marked `failed` for investigation. Real sending requires the
mail environment variables and Identity template settings; deploying the code alone does not configure a verified sender.

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
After deploying, check with `curl -I https://classicauragarba.netlify.app/`.
