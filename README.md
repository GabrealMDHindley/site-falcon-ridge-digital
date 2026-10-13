# Falcon Ridge Digital — site-falcon-ridge-digital

One-page landing site for [Falcon Ridge Digital](https://falconridgedigital.com), the
real estate digital marketing agency for multifamily, RV parks, self storage, marinas
and other rentable assets. Visitors learn the offers and book a strategy call.

- **Live:** https://site-falcon-ridge-digital.vercel.app
- **Look & layout:** taken from the Train & Scale site (https://site.trainandscale.com,
  repo `GabrealMDHindley/site-train-and-scale`) at the user's request: same layout
  system, section rhythm, pill header, eyebrows, marquee, kinetic headlines, scroll
  timeline, reveals, cursor/magnetic/tilt effects, preloader, booking flow and the
  gated `/confirmation` page. Every Train & Scale asset, video, logo, Vimeo ID and line
  of copy has been removed.
- **Brand:** Falcon Ridge Digital's own kit: their logo (the nav and favicon use a crop
  of `logo.png`, never redrawn), Outfit / Sen / DM Sans, navy `#042839`, teal
  `#0CCCAF` / `#19AB98`, mint `#E8F7FF`. See `docs/design-brief.md`.

## Stack

Next.js 16 App Router + TypeScript + Tailwind CSS v4 · React Three Fiber / drei (the
wireframe ridge hero + ambient field) · GSAP ScrollTrigger (timeline) · Framer Motion
(reveals, kinetic text) · Lenis (smooth scroll). This Next version differs from older
training data. Read `AGENTS.md` and `node_modules/next/dist/docs/` before changing
framework-level code.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Page map (one page, in-page anchors)

`/`: Preloader → Hero → VSL (hidden until a Vimeo ID is set) → module marquee →
"Engineered by Experience" stats → Middleman-tax thesis → Assets We Optimize →
**Offers & Pricing** (`#offers`, 5 tabs) → How It Works timeline (`#how-it-works`) →
What We Deploy modules (`#modules`) → Why Work With Us (`#why`) → FAQs (`#faqs`) →
final CTA → booking (`#book`) → footer.

Other routes: `/confirmation` (post-booking, `noindex`, cookie-gated) · `/api/book`,
`/api/book/availability` (GHL calendar) · `/api/lead` (lead form) · `robots.txt`,
`sitemap.xml`, OG image, icons.

## Content sources

All copy comes from falconridgedigital.com (home, /strategy-proposal/,
/conversion-launchpad-rv/, /fundamentals/middleman-tax/, services pages), fetched
2026-10-12/13, plus the offer sheet the client supplied (studio record
`clients/falcon-ridge-digital/offers.md`). Prices live in `src/data/site.ts` →
`serviceLevels` and must match the offer sheet character for character. There is no
guarantee and there are no testimonials (see open questions).

## Booking: three modes, never a dead button

The `#book` section picks its mode at build time from env vars:

| Mode | When | What happens |
| --- | --- | --- |
| **calendar** | `GHL_API_KEY`, `GHL_LOCATION_ID`, `GHL_CALENDAR_ID` all set | Live slots from the GHL v3 calendar (next 21 days). Booking upserts the contact (tags `website-booking`, `strategy-call`, `asset-<type>`), creates the appointment, sets the `frd_booked` cookie (30 min) and routes to `/confirmation`. If the calendar fails to load or a booking errors, the visitor gets a link to the strategy-proposal form. |
| **lead-form** | no GHL calendar, but at least one of `GHL_WEBHOOK_URL` / `EMAIL_WEBHOOK_URL` / `CRM_WEBHOOK_URL` set | On-site request form → `/api/lead` → every configured webhook. |
| **proposal-link** *(current)* | nothing set | "Book Your Strategy Call" button → https://falconridgedigital.com/strategy-proposal/ (their existing form) in a new tab. |

Every "Book Your Strategy Call" button on the page scrolls to `#book`. The form asks
Falcon Ridge's own `/strategy-proposal/` questions: asset type (required), primary
objective, monthly marketing spend, and notes. When a GHL contact custom field exists
with one of these exact names, the answer is written to it: `What Is Your Property
Asset Type`, `Primary Objective`, `Estimated Monthly Marketing Spend`, `Tell Us About
Your Properties`.

Calendar timezone defaults to `America/Denver` / "MT" (their phone is a Utah 801
number). Override it with `NEXT_PUBLIC_BOOKING_TIMEZONE` and
`NEXT_PUBLIC_BOOKING_TIMEZONE_LABEL`.

## Conversion tracking

`src/lib/track.ts`: one `track(event, params)` helper sends each event to every
configured platform. A platform with no ID loads no script and gets no events.
`NEXT_PUBLIC_*` values are inlined at build time, so redeploy after changing them.

| Event | Fired when | GA4 | Google Ads | Microsoft (UET) | Meta | GTM dataLayer |
| --- | --- | --- | --- | --- | --- | --- |
| `page_view` | first load + each route change | `page_view` | (via gtag config) | auto `pageLoad`, SPA `page_view` | `PageView` | `page_view` |
| `cta_click` | any "Book Your Strategy Call" / "Discuss the Module" click | `cta_click` | none | `cta_click` | custom `CTAClick` | `cta_click` |
| `lead` | booking or lead form submitted OK | `generate_lead` | conversion w/ lead label | `submit_lead_form` | `Lead` | `lead` |
| `booked` | `/confirmation` renders (cookie-gated) | `book_appointment` | conversion w/ booked label | `book_appointment` | `Schedule` | `booked` |
| `offer_checkout_click` | workshop-replay "Get The Replay…" buttons | `begin_checkout` (+value) | conversion w/ checkout label | `begin_checkout` (+revenue) | `InitiateCheckout` (+value) | `offer_checkout_click` |

Server side, `/api/book` (on a successful booking) and `/api/lead` POST a JSON payload
(`event`, contact fields, qualifiers, `startTime`, `source`, `site`, `at`) to each
configured webhook. That covers the GHL inbound webhook, the email marketing service,
and the CRM, which fires only when `CRM_WEBHOOK_URL` is set. Webhook failures are
logged and never block the visitor.

### Environment variables

| Variable | Purpose | Suggested value | Status |
| --- | --- | --- | --- |
| `GHL_API_KEY` | GHL Private Integration token (calendar mode) | the client's | unset |
| `GHL_LOCATION_ID` | GHL sub-account/location ID | the client's | unset |
| `GHL_CALENDAR_ID` | the strategy-call calendar | the client's | unset |
| `GHL_WEBHOOK_URL` | GHL inbound webhook for lead/booked payloads | the client's | unset |
| `EMAIL_WEBHOOK_URL` | email marketing service webhook | the client's | unset |
| `CRM_WEBHOOK_URL` | CRM webhook (conditional) | the client's | unset |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container | `GTM-NSXJ8D8T` (on their live site) | unset |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement ID (`G-…`) | not found on their site (likely inside GTM) | unset |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag (`AW-…`) | not found on their site | unset |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` / `_BOOKED_LABEL` / `_CHECKOUT_LABEL` | conversion labels | from their Ads account | unset |
| `NEXT_PUBLIC_UET_ID` | Microsoft Ads UET tag | `187243053` (on their live site) | unset |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel | `1445433837205699` (on their live site) | unset |
| `NEXT_PUBLIC_SITE_URL` | canonical URL for metadata/sitemap | `https://site-falcon-ridge-digital.vercel.app` (default) | unset |
| `NEXT_PUBLIC_BOOKING_TIMEZONE` / `_LABEL` | calendar timezone | `America/Denver` / `MT` (default) | unset |

The IDs from their live site are listed as suggestions. They are left unset on
purpose, so staging traffic doesn't land in the client's ad and analytics accounts
until the user says so. If you use GTM *and* the direct GA4/Ads/UET/Meta IDs, don't
also fire the same tags inside GTM, or every event will count twice.

## Media slots

- **VSL**: set `vsl.vimeoId` in `src/data/site.ts`. The section appears under the hero
  on the next deploy. With no ID, there's no section.
- **Confirmation video**: set `confirmationVideo.vimeoId`. It shows on `/confirmation`.
- **Logo-reveal preloader clip** (optional): drop `public/videos/brand/logo-reveal.mp4`
  (+ `poster.jpg`). The preloader uses it automatically. Without it, a code-only ridge
  draw-in plays around their logo mark.

## Open questions / needs the user

See `docs/design-brief.md` → "Open questions". The short version: confirm the Full
Stack anchor, the course price, the workshop-replay URLs, how the Website + CRM
figures combine, and the "free" call. Supply GHL / webhook / tracking credentials and
the VSL and confirmation video Vimeo IDs.

Media rights: the logo and all copy come from falconridgedigital.com. The client
should confirm they hold the rights to reuse their media.
