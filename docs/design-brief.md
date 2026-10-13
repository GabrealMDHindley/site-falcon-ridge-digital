# Design brief — Falcon Ridge Digital landing page

Build session A, 2026-10-13. Studio client folder: `clients/falcon-ridge-digital/`
(owned by the orchestrator session). Shared contract with the scripts site:
`build-plan.md` in that folder.

## 0. User overrides (recorded per studio rules)

- **Unique-design-per-client rule overridden by the user:** "the Train and Scale site
  has the right look and layout." This site starts from a copy of
  `GabrealMDHindley/site-train-and-scale` (the user's own site) and keeps its layout
  system, section rhythm and interaction set. Every Train & Scale asset, video, logo,
  Vimeo ID and line of copy is gone.
- **Brand = Falcon Ridge Digital's own kit**, not Train & Scale's.
- **One page** with in-page anchors instead of Home/About/Contact pages. The only
  extra routes are `/confirmation` and the API routes.

## 1. Register & audience

Owners, asset managers and operators of rentable real estate: multifamily, RV parks &
resorts, self storage, marinas, mobile home communities, glamping, hotels, vacation
rental groups. They think in occupancy, NOI, cap rates and cost per lease or booking,
and they resent ILS/OTA commissions. The register is financial and engineered: an
investor's operating system more than a creative agency. The TAS dark "engineered
product" look fits this register once it's re-skinned in FRD's navy and teal.

## 2. Competitor scan

Skipped as a design input, because the user fixed the layout. FRD's own site
(WordPress + Thrive Architect) already carries the positioning: anti-middleman,
data-sovereignty, "engines" not "campaigns". This page sharpens it into one scroll.

## 3. Palette (from their live CSS + logo, re-verified 2026-10-13)

| Token | Hex | Role |
| --- | --- | --- |
| `ground` | `#042839` | FRD navy (header bar / dark sections on their site). The page ground. Replaces TAS `#05070a` |
| `surface` / `surface-2` | `#063349` / `#094562` | `#094562` is their CSS deep blue-teal. Glass panels, inputs |
| `accent` | `#0CCCAF` | their button/highlight teal. Primary CTAs, key phrases. Replaces TAS ice blue |
| `accent-deep` | `#19AB98` | logo teal. Eyebrows, rails, wireframe |
| `ink` / `ink-dim` | `#F3FBF9` / `#A3C3C9` | their pale-mint light, plus a dimmed mint for body text on navy |
| `mint` | `#E8F7FF` | their light section bg (CSS 48 uses). Particle highlights |
| `coral` | `#F1615A` | their accent (CSS 42 uses). Used sparingly: the "Middleman Tax" eyebrow |
| blue | `#1481B5` | their link blue. A secondary aurora blob and gyro ring |

## 4. Typography

- **Outfit**: display + UI (their primary, 68 `font-family` rules on their site).
  Headlines move from TAS's uppercase Space Grotesk to Outfit bold in sentence/title
  case, matching their hero.
- **Sen**: takes TAS's mono slot for eyebrows, stat labels, button text and
  form labels (their label/button font). The eyebrow *treatment* (tiny, uppercase, wide
  tracking, tracking-in animation) is unchanged. Only the face is now theirs.
- **DM Sans**: long body copy (their tertiary).

## 5. Logo

`public/brand/logo.png` is their 1024² transparent logo, trimmed to its bounds (crop
only). `public/brand/mark.png` and `src/app/icon.png` / `apple-icon.png` are the
falcon+ridge mark cropped from the same file. The icons sit on a navy square, with no
recolor or redraw. The nav pill pairs the mark with the business name set in Outfit.
That's plain type, not a redrawn wordmark. The full stacked logo appears in the footer.

## 6. Hero / 3D concept

TAS's hero is a wireframe range of three ascending peaks with crest nodes, light
pulses, a summit crystal, gyro rings and assembling particles. Here it's **re-shaped
into one long ridge line**, the swept silhouette under the falcon in their logo: a
gentle climb from the left to a single crest right of center, then a quicker fall.
The ridge is narrow in depth, so it reads as a ridge line, and it flattens into a
ground grid in front and behind. Crest nodes, pulses and the summit marker now ride
that ridge. Colors are navy/teal. Mouse parallax and scroll tilt are unchanged.
Static SVG fallback without WebGL.

Hero copy is their positioning, verbatim: "Fill Vacancies and Maximize NOI with
High-Performance Digital Marketing Engines" with **Fill Vacancies** and **Maximize
NOI** in teal (their treatment), plus their subhead. CTAs: **"Book Your Strategy
Call"** (exact label from build-plan.md) → `#book`, and "See the offers" → `#offers`.

## 7. Motion language

Unchanged from TAS: preloader (once per session, skippable, reduced-motion aware),
Lenis smooth scroll synced to GSAP, kinetic per-word headline reveals, eyebrow
tracking-in, staggered 3D card cascades, tilt + mouse-follow highlight, magnetic CTAs,
custom cursor (fine pointers only), scroll-progress rail, scrubbed timeline rail,
ambient aurora + particle field. Preloader fallback: a ridge line draws, then their
mark rises in above it.

## 8. Section map (TAS → FRD)

| TAS section | FRD section | Source |
| --- | --- | --- |
| Hero | Hero, positioning + 2 CTAs | home |
| Vsl | VSL slot under hero (hidden: no Vimeo ID yet) | build-plan |
| Marquee | 8 service modules | home |
| Stats | "Engineered by Experience", 6 stats + their detail lines, attributed | home |
| Mission | "You're volunteering your property as a financial hostage" thesis + manifesto link | home, /fundamentals/middleman-tax/ |
| Industries | "Assets We Optimize", 8 asset types | home |
| InstallGrid (tabs) | **Offers & Pricing**, 5 tabs: Paid Instruction · Software Only · Website + CRM · Consulting Retainer · Full-Service Retainer | offers.md |
| Timeline (toggle) | "The Path To Asset Dominance" (3 steps) ⇄ "What Happens Next" (3 phases) | home, /strategy-proposal/ |
| InstallGrid | "What We Deploy": 8 module cards, "Discuss the Module →" | home |
| Guarantee | **Why Work With Us**: intro + 8 cards. FRD has no guarantee and none is invented | home |
| Results | none: no verifiable testimonials (see open questions) | — |
| TrainingSupport | FAQs (their 4) | home |
| FinalCta | "Ready to Upgrade Your Asset's Performance?" | home |
| /book page | `#book` section on the page (3 modes) | — |
| /confirmation | `/confirmation`, cookie-gated, confirmation-video slot | — |

## 9. Offers display rules

- **No pricing anywhere on the site** (user instruction, 2026-10-13). That means no
  prices, anchors, units, per-property notes, ad-spend percentages or "price coming
  soon". Prices stay in the studio's `offers.md` only, and the call is where pricing
  is discussed.
- Offer names and inclusions are verbatim from offers.md. Consulting tiers say
  "N Services" only. No modules are picked.
- Workshop-replay CTAs → the URL the user gave
  (`/plug-the-leaks-blueprint-rv-park/`) and fire `offer_checkout_click` (no value).
  Everything else → `#book`.

## 10. CTAs & integrations

- Booking: GHL v3 calendar (env) → `/confirmation`. If unset → lead form (if a webhook
  is set) → otherwise FRD's own `/strategy-proposal/` form. Never a dead button.
- Tracking: `track()` fan-out to GTM, GA4, Google Ads, Microsoft UET and Meta, plus
  server webhooks (GHL / email / CRM-conditional). All env-gated, all unset for now.
- Footer: logo, email, phone, Instagram/Facebook/LinkedIn, FRD's Privacy Policy /
  Disclaimer / Terms & Conditions pages.
- JSON-LD: `Organization` + `ProfessionalService` with real data only (no address,
  hours or ratings, because none are published).

## 11. Anti-goals

No Train & Scale copy, logo or video. No invented guarantee, testimonials, results or
client names. No stock photography. No pricing on the site at all. No redrawn or
recolored logo. No tracking traffic into the client's accounts without approval.

## Open questions (needs the user)

1. **Pricing removed (2026-10-13).** The offer-sheet questions on the Full Stack anchor,
   the course price (~$147), and how the Website + CRM figures combine only matter if
   pricing goes back on the site. They're kept in offers.md.
2. *(merged into 1)*
3. **Workshop-replay URLs**: both point to the free "Plug The Leaks" Blueprint page,
   while the workshop's sales page is `/conversion-launchpad-rv/`. That page sells the
   *live* workshop and calls the coaching tier
   "Conversion Accelerator". Confirm the checkout URL and naming for the replay offers.
4. *(merged into 1)*
5. **"Free" strategy call**: the CTA copy relies on their home page line ("Best of all,
   the audit is completely free!"). Confirm the call itself is free.
6. **Testimonials**: two quotes on `/conversion-launchpad-rv/` (Maria Stephens, Digital
   Marketing Manager; Heather Phillips, Marketing Director) could not be verified as
   real clients. The same page has leftover template text, so they're hidden
   (`SHOW_TESTIMONIALS = false`). Confirm they're real and approved, and they can be
   added. `/insights/case-studies/` is empty.
7. **Software naming**: their `/services/seo/` page calls the local-listings tool
   "Visibility Engine". The offer sheet calls it "Local Listing Manager". The sheet's name is used.
8. **Booking timezone**: assumed Mountain Time (Utah 801 number). The workshop page
   uses Central Time. Confirm.
9. **Credentials**: GHL API key / location / calendar IDs, webhook URLs (GHL, email
   service, CRM), GA4 and Google Ads IDs + conversion labels. Also approval to switch
   on their GTM / UET / Meta IDs for this site.
10. **Videos**: Vimeo IDs for the VSL and the confirmation video (scripts are being
    written by session B).
11. **Domain**: the site runs on the Vercel default URL. Point a domain at it (e.g. a
    subdomain of falconridgedigital.com) and set `NEXT_PUBLIC_SITE_URL`.
