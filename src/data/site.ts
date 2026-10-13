// Central content data. Every string here comes from Falcon Ridge Digital's
// own live site (falconridgedigital.com, fetched 2026-10-12/13) or from the
// offers the client supplied verbatim (studio record: clients/falcon-ridge-digital/offers.md).
// Nothing is invented — no guarantee, no testimonials, no new claims.

export const site = {
  name: "Falcon Ridge Digital",
  legalName: "Falcon Ridge Digital",
  eyebrow:
    "Real Estate Digital Marketing Services for Multifamily, RV Parks, Storage, and Other Rentable Assets",
  headline: "Fill Vacancies and Maximize NOI with High-Performance Digital Marketing Engines",
  // Words in the headline rendered in brand teal, same treatment as their hero.
  headlineHighlights: ["Fill", "Vacancies", "Maximize", "NOI"],
  sub: "We engineer advanced strategies to reclaim your marketing data and drive direct bookings at the lowest possible cost so you can stop relying on predatory middlemen and locked-down software traps.",
  description:
    "Real estate digital marketing services for multifamily, RV parks, storage, and other rentable assets. Fill vacancies and maximize NOI with high-performance digital marketing engines.",
  email: "help@falconridgedigital.com",
  phone: "(801) 900-6025",
  phoneHref: "tel:+18019006025",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://site-falcon-ridge-digital.vercel.app",
  mainSite: "https://falconridgedigital.com",
  founder: "Bryce MacCabe",
  sisterCompany: { name: "Falcon Ridge Real Estate", url: "https://falconridgerealestate.com" },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/falconridgedigital" },
    { label: "Facebook", href: "https://www.facebook.com/falconridgedigital/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/falcon-ridge-digital/" },
  ],
  legal: [
    { label: "Privacy Policy", href: "https://falconridgedigital.com/privacy-policy/" },
    { label: "Disclaimer", href: "https://falconridgedigital.com/disclaimer/" },
    { label: "Terms & Conditions", href: "https://falconridgedigital.com/terms-conditions/" },
  ],
} as const;

// Shared CTA contract with the scripts site (build-plan.md): exact label.
export const CTA_LABEL = "Book Your Strategy Call";
// Where the booking CTA lands when the on-site GHL calendar isn't configured.
export const STRATEGY_PROPOSAL_URL = "https://falconridgedigital.com/strategy-proposal/";

export const nav = [
  { label: "Offers", href: "/#offers" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Modules", href: "/#modules" },
  { label: "Why Us", href: "/#why" },
  { label: "FAQs", href: "/#faqs" },
];

// "Engineered by Experience" — Falcon Ridge Digital's own published claims.
export type Stat = {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

export const stats: Stat[] = [
  {
    target: 1500,
    suffix: "+",
    label: "Real Estate Assets Optimized",
    detail: "Our team has managed the digital performance and occupancy growth of over 1,500 rentable properties.",
  },
  {
    target: 6.7,
    decimals: 1,
    prefix: "$",
    suffix: "B",
    label: "Economic Value Generated",
    detail: "We have architected strategies that have driven billions in verified economic value for our partners and clients.",
  },
  {
    target: 850,
    prefix: "$",
    suffix: "M",
    label: "Paid Ads Spend Managed",
    detail: "Our systems are built leveraging data harvested from managing nearly $1B in performance-based paid advertising spend.",
  },
  {
    target: 13374,
    suffix: "%",
    label: "Peak ROI",
    detail: "While we focus on consistent growth, our systems have delivered outlier returns as high as 13,374% in specialized campaigns.",
  },
  {
    target: 95,
    suffix: "%",
    label: "Acquisition Savings",
    detail: "Reliably delivered acquisition costs at up to 95% lower than industry benchmarks, ensuring marketing directly improves your NOI.",
  },
  {
    target: 15,
    suffix: "+",
    label: "Years Stress-Testing",
    detail: "This isn't a new experiment. It's the culmination of over 15 years in the trenches of high-stakes, real estate performance marketing.",
  },
];

export const mission = {
  eyebrow: "The Middleman Tax",
  headline: "You're volunteering your property as a financial hostage.",
  lead: "You are repeatedly paying for leads you should already own.",
  body: "Every paying customer you land through a 3rd-party booking site comes with enormous hidden costs that go far beyond their fees. These giants intercept the relationship with your customers, intentionally block you from accessing your own data, and try to force you into a cycle of permanent dependency.",
  link: { label: "Read the Manifesto & Take Back Your Freedom", href: "https://falconridgedigital.com/fundamentals/middleman-tax/" },
};

// "Assets We Optimize" — home page, verbatim.
export type Audience = { title: string; description: string };

export const industries: Audience[] = [
  {
    title: "Multifamily Portfolios",
    description:
      "Reduce dependence on ILSs and reach your leasing & occupancy goals, lower your cost per lease, and improve your retention for long-term profitability.",
  },
  {
    title: "RV Parks & Resorts",
    description:
      "Increase your occupancy & improve NOI by driving down direct booking costs and reclaiming your conversion data from predatory OTAs.",
  },
  {
    title: "Self Storage Facilities",
    description:
      "Maximize your unit velocity and capture high-intent local demand while lowering acquisition costs and building a marketing engine you control.",
  },
  {
    title: "Lifestyle Marinas",
    description:
      "Increase slip occupancy and reduce reliance on 3rd-party listing sites by building a direct-booking engine that captures your high-value boater data.",
  },
  {
    title: "Mobile Home Communities",
    description:
      "Secure consistent lot occupancy and lower your cost per lead with a streamlined, professional marketing engine that captures and protects your data.",
  },
  {
    title: "Luxury Glamping",
    description:
      "Maximize your margins and protect high ADRs by driving direct bookings, eliminating 3rd-party platform fees, and owning your guest data from day one.",
  },
  {
    title: "Hospitality & Hotels",
    description:
      "Eliminate the expensive OTA tax by deploying a direct-booking architecture that lowers your cost per acquisition and builds a conversion database you own.",
  },
  {
    title: "Vacation Rental Groups",
    description:
      "Reduce your dependency on AirBNB / VRBO by building a high-performance direct-booking system that lowers acquisition costs.",
  },
];

// Two real process descriptions from their site, shown as the TAS-style
// timeline toggle: home page "The Path to Asset Dominance" and the
// /strategy-proposal/ "Here's What Happens Next".
export type TimelinePhase = { kicker: string; label: string; body: string };

export const timelines: { path: TimelinePhase[]; next: TimelinePhase[] } = {
  path: [
    {
      kicker: "Step 1",
      label: "The Strategy Audit",
      body: "We audit your public-facing digital footprint to find exactly where you're losing money. You get a thorough, expert review of your conversion and lead source tracking, local listings, ad platforms, and more to find the gaps in your current strategy. Best of all, the audit is completely free!",
    },
    {
      kicker: "Step 2",
      label: "Build the Engine",
      body: "We deploy a dedicated lead & conversion engine to organize your leads, calls, and offline conversions, giving you clear visibility into your pipeline. We take the controls for your accounts, handling the technical work and guided strategy so you can stay focused on running your property.",
    },
    {
      kicker: "Step 3",
      label: "Consistent Tuning",
      body: "Winning doesn't happen with one large push. We consistently deploy meaningful updates to your accounts, using your own data to out-maneuver and out-smart your competitors. We transform your property into your market's most envied asset that everyone else is trying to figure out.",
    },
  ],
  next: [
    {
      kicker: "Phase 1",
      label: "The Tech Audit & Integration",
      body: "We audit your current tech to bridge the gap between your website and guest data.",
    },
    {
      kicker: "Phase 2",
      label: "The Multi-Channel Engine",
      body: "We deploy a dedicated conversion engine + high-performance digital marketing strategies to drive quality leads that lead to bookings / leases / etc.",
    },
    {
      kicker: "Phase 3",
      label: "Ownership & Scale",
      body: "We optimize for direct conversions, ensuring you own the relationship and the data, leading to sustainable, long-term NOI growth.",
    },
  ],
};

// The service modules — home page "High-Performance Real Estate Digital Marketing Services".
export type Module = { title: string; description: string };

export const modulesIntro = {
  title: "High-Performance Real Estate Digital Marketing Services",
  body: "We believe that high-performance marketing should be accessible to every asset owner. As such, we deploy our services as agile modules, allowing you to solve your most immediate pressure points first and reinvest that resulting revenue into your asset's total market dominance.",
  note: "We have a recommended stack to get you started, but you have the flexibility to deploy any module, in any order, based on your current P&L needs.",
};

export const modules: Module[] = [
  {
    title: "Marketing CRM & Lead Tracking",
    description: "Tracking architecture that reclaims your guest data and proves which marketing channels drive your NOI.",
  },
  {
    title: "Performance Dashboards",
    description: "Consolidate your marketing platform data into a singular experience to track your ROI & Customer Acquisition Cost.",
  },
  {
    title: "Local SEO & Map Dominance",
    description: "Engineered map listings to capture high-intent local bookings at your lowest possible cost per acquisition.",
  },
  {
    title: "Paid Ads Management (Search / Social / Video)",
    description: "Aggressive strategies that hunt for the most profitable new guests at the lowest possible acquisition cost.",
  },
  {
    title: "Organic SEO",
    description: "Multi-layered organic search strategies to ensure your asset is the definitive answer for every relevant search.",
  },
  {
    title: "Content Writing",
    description: "High-signal, rich context for guests while building technical structure search engines need to trust your asset.",
  },
  {
    title: "Email / SMS Marketing",
    description: "Automated nurture loops that re-engage past guests to drive repeat bookings and maximize every lead's LTV.",
  },
  {
    title: "Conv. Rate Optimization",
    description: "Tuning of your digital funnel through behavioral testing to generate more revenue out of your traffic.",
  },
];

// Short tags for the marquee strip and the intro screen.
export const serviceTags = [
  "Marketing CRM & Lead Tracking",
  "Performance Dashboards",
  "Local SEO & Map Dominance",
  "Paid Ads Management",
  "Organic SEO",
  "Content Writing",
  "Email / SMS Marketing",
  "Conversion Rate Optimization",
];

// ---------------------------------------------------------------------------
// OFFERS — names and inclusions verbatim from offers.md. Per the user
// (2026-10-13): NO pricing anywhere on the site — no prices, anchors, units
// or "price coming soon". Prices stay in offers.md only.
// ---------------------------------------------------------------------------

export type OfferCta =
  | { kind: "checkout"; label: string; href: string }
  | { kind: "book" };

export type Offer = {
  id: string;
  name: string;
  note?: string;
  includes: string[];
  cta?: OfferCta;
  featured?: boolean;
};

export type OfferGroup = { title: string; offers: Offer[] };

export type ServiceLevel = {
  id: string;
  label: string;
  title: string;
  blurb?: string;
  groups: OfferGroup[];
};

const WORKSHOP_URL = "https://falconridgedigital.com/plug-the-leaks-blueprint-rv-park/";

export const serviceLevels: ServiceLevel[] = [
  {
    id: "instruction",
    label: "Paid Instruction",
    title: "Paid instruction",
    blurb: "Online courses, workshops, coaching, etc.",
    groups: [
      {
        title: "Conversion Launchpad",
        offers: [
          {
            id: "replay",
            name: "Conversion Launchpad Workshop Replay",
            includes: ["Access to workshop recording"],
            cta: { kind: "checkout", label: "Get The Replay", href: WORKSHOP_URL },
          },
          {
            id: "replay-consulting",
            name: "Conversion Launchpad Workshop Replay + 1-1 Consulting",
            includes: [
              "Access to workshop recording",
              "Access To The Program When Its Finished",
              "2 1-1 Consulting Calls",
            ],
            cta: { kind: "checkout", label: "Get The Replay + Consulting", href: WORKSHOP_URL },
            featured: true,
          },
          {
            id: "course",
            name: "Conversion Launchpad Course",
            note: "Replay + resources + all future lessons",
            includes: [],
            cta: { kind: "book" },
          },
        ],
      },
    ],
  },
  {
    id: "software",
    label: "Software Only",
    title: "Software only",
    blurb: "Great for smaller properties that don't have a big budget.",
    groups: [
      {
        title: "Software",
        offers: [
          {
            id: "reporting",
            name: "Reporting Dashboard",
            includes: [],
            cta: { kind: "book" },
          },
          {
            id: "listings",
            name: "Local Listing Manager",
            includes: [],
            cta: { kind: "book" },
          },
          {
            id: "conversion-stack",
            name: "Conversion Stack",
            note: "GHL sub-account",
            includes: [],
            cta: { kind: "book" },
          },
          {
            id: "intelligence-suite",
            name: "Marketing Intelligence Suite",
            note: "Reporting + local listings + GHL bundle",
            includes: [],
            cta: { kind: "book" },
            featured: true,
          },
        ],
      },
    ],
  },
  {
    id: "website",
    label: "Website + CRM",
    title: "Website + CRM + SMS Automations + Email Automations",
    groups: [
      {
        title: "Website + CRM + SMS Automations + Email Automations",
        offers: [
          {
            id: "website-crm",
            name: "Website + CRM + SMS Automations + Email Automations",
            includes: [
              "Conversion Tracking / Data",
              "Website",
              "CRM",
              "SMS Automations",
              "Email Automation",
              "1 1-1 Consulting Calls",
            ],
            cta: { kind: "book" },
            featured: true,
          },
        ],
      },
    ],
  },
  {
    id: "consulting",
    label: "Consulting Retainer",
    title: "Consulting retainer",
    groups: [
      {
        title: "Consulting",
        offers: [
          {
            id: "consulting-2",
            name: "2 Services",
            includes: ["1-1 Consulting Calls", "2 Services"],
            cta: { kind: "book" },
          },
          {
            id: "consulting-4",
            name: "4 Services",
            includes: ["1-1 Consulting Calls", "4 Services"],
            cta: { kind: "book" },
          },
          {
            id: "consulting-6",
            name: "6 Services",
            includes: ["1-1 Consulting Calls", "6 Services"],
            cta: { kind: "book" },
          },
          {
            id: "consulting-8",
            name: "8 Services",
            includes: ["1-1 Consulting Calls", "8 Services"],
            cta: { kind: "book" },
          },
          {
            id: "consulting-full-stack",
            name: "14 Services (Full Stack)",
            includes: ["1-1 Consulting Calls", "14 Services (Full Stack)"],
            cta: { kind: "book" },
            featured: true,
          },
        ],
      },
    ],
  },
  {
    id: "full-service",
    label: "Full-Service Retainer",
    title: "Full service retainer",
    groups: [
      {
        title: "SEO",
        offers: [
          { id: "seo-technical", name: "Technical", includes: [], cta: { kind: "book" } },
          {
            id: "seo-local",
            name: "Local",
            includes: ["Active management of all major local listing platforms - e.g. Google Maps, Apple Maps, etc."],
            cta: { kind: "book" },
          },
          {
            id: "seo-content",
            name: "Content",
            includes: ["Provides 2 elite content pieces"],
            cta: { kind: "book" },
          },
          {
            id: "seo-video",
            name: "Video",
            includes: [
              "Provides 3 elite video optimizations",
              "Note: this is optimizing videos on marketing platforms, not creating or editing the videos themselves",
            ],
            cta: { kind: "book" },
          },
        ],
      },
      {
        title: "Paid Ads",
        offers: [
          { id: "ads-1", name: "1 platform", includes: [], cta: { kind: "book" } },
          { id: "ads-2", name: "2 platform", includes: [], cta: { kind: "book" } },
          { id: "ads-3", name: "3 platform", includes: [], cta: { kind: "book" } },
        ],
      },
      {
        title: "Email / SMS Marketing",
        offers: [
          {
            id: "email-sms",
            name: "Email / SMS Marketing",
            includes: [],
            cta: { kind: "book" },
          },
        ],
      },
      {
        title: "Conversion Rate Optimization",
        offers: [
          {
            id: "cro",
            name: "Conversion Rate Optimization",
            includes: [],
            cta: { kind: "book" },
          },
        ],
      },
    ],
  },
];

// "Why Work With Us" — home page, verbatim. Takes the slot of TAS's
// Guarantee section. Falcon Ridge Digital publishes no guarantee; none is shown.
export const why = {
  eyebrow: "Why Work With Us",
  headline:
    "You don't need another agency to talk to you about rankings or traffic while your occupancy stays flat.",
  lead: "You need a powerful engine that drives direct bookings and reclaims your data from predatory 3rd-party booking sites.",
  body: "At Falcon Ridge Digital, we don't just do SEO, run your Paid Ads or rebuild your website. We are experts in real estate digital marketing services. We architect the growth systems that put you back in control of your asset's future.",
  cards: [
    {
      title: "The Investor Edge",
      body: "We own properties via our sister company, Falcon Ridge Real Estate. We built this marketing engine to drive occupancy and improve Net Operating Income because we know the stresses of owning properties firsthand.",
    },
    {
      title: "Total Data Sovereignty",
      body: "We want to help you stop renting your customers from predatory listing sites. Our systems are built to reclaim your guest data from day one, giving you a 100% owned database that permanently lowers your long-term Customer Acquisition Cost (CAC).",
    },
    {
      title: "Built for How People Book",
      body: "While we utilize mountains of data, we are fundamentally different from a traditional agency. We design every step around human behavior, making it fast and easy for guests to find you and book without any technical friction.",
    },
    {
      title: "Architected Intelligence",
      body: "You get to leverage our decades of experience working with hundreds of properties on high-performance digital marketing for rentable real estate assets.",
    },
    {
      title: "Yield-First Strategy",
      body: "We ignore vanity metrics that don't pay bills. The system is engineered to prioritize occupancy and Net Operating Income (NOI) by driving more bookings, at higher rates, and at the lowest possible cost.",
    },
    {
      title: "Bridging the Offline Gap",
      body: "Most advertisers stop at the click or session but that leaves a massive gap in your conversion data and raises your CAC. Our engine is designed to connect the dots from digital search and offline conversion so no revenue is left on the table.",
    },
    {
      title: "Omni-Channel Approach",
      body: "Our service hunts for demand on every relevant online platform: search, video, email, ads and more. We leave no stone unturned so you capture profitable bookings before your competitors even know they exist.",
    },
    {
      title: "Built to Grow With You",
      body: "Whether you have one property or a massive portfolio, our services are modular and ready to deploy wherever they are most valuable to you.",
    },
  ],
};

export const faqs: { q: string; a: string[] }[] = [
  {
    q: "Do I need to switch my management software?",
    a: [
      "No. Our systems are engineered to work alongside your existing stack without disrupting your current operations. You'll continue to use your CRM / management system as you always do. Our intelligence engine will supplement those efforts.",
    ],
  },
  {
    q: "How long does it take to see an impact?",
    a: [
      "Most partners see a measurable lift in direct bookings and lower acquisition costs within the first 60 to 90 days. This is the window where the initial technical architecture starts collecting clean data, and our performance models go live.",
      "Building a high-performance engine requires consistent calibration over time. It typically takes 6 to 12 months of strategic building to reach peak performance. This ensures the system is fully dialed in for your specific market and is working to maximize your NOI at all times.",
    ],
  },
  {
    q: "Who owns the data you generate?",
    a: [
      "You do! 100% of it. We build the architecture to reclaim your guest data from third-party OTAs and funnel it directly into your own centralized system.",
    ],
  },
  {
    q: "Do you work with new assets vs. established?",
    a: [
      "Both! We can build all of the foundational infrastructure for a brand-new asset in need of aggressive marketing pushes or audit and optimize the leaky pipes of a stabilized property.",
    ],
  },
];

// Testimonials: two quotes appear on /conversion-launchpad-rv/ ("Maria
// Stephens", "Heather Phillips"). They are NOT shown until the client confirms
// they're real, attributable clients — the same page carries leftover template
// copy elsewhere, so they can't be verified from the page alone.
export const SHOW_TESTIMONIALS = false;

// The video sales letter — set a real Vimeo ID once the VSL is filmed and the
// section renders automatically on the next deploy. No ID → no section.
export const vsl: { vimeoId: string | null; title: string } = {
  vimeoId: null,
  title: "See how the engine works",
};

// Shown only on the gated /confirmation page (reached by booking on-site).
export const confirmationVideo: { vimeoId: string | null; title: string } = {
  vimeoId: null,
  title: "You're booked — watch this before we talk",
};

// Strategy-proposal qualifying questions, verbatim from /strategy-proposal/.
export const ASSET_TYPES = ["Multifamily", "RV Park", "Mobile Home Park", "Marina", "Self Storage", "Other"] as const;
export const OBJECTIVES = [
  "Rapid Fill / New Launch",
  "Consistent Occupancy Maintenance",
  "Peak Season / Revenue Optimization",
  "Software & Direct Booking Shift",
  "Offseason Boost",
] as const;
export const SPEND_OPTIONS = ["Under $1k / mo", "$1k - $3k / mo", "$3k - $10k / mo", "$10k+ / mo."] as const;
