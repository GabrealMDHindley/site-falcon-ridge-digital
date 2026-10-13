import type { Metadata } from "next";
import { Outfit, Sen, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import FieldBackdrop from "@/components/FieldBackdrop";
import Analytics from "@/components/Analytics";
import RouteTracker from "@/components/RouteTracker";
import { site } from "@/data/site";
import "./globals.css";

// Falcon Ridge Digital's brand fonts, as loaded by falconridgedigital.com:
// Outfit (primary), Sen (labels/buttons), DM Sans (body copy).
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const TITLE = "Falcon Ridge Digital — Real Estate Digital Marketing Services";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: "%s — Falcon Ridge Digital",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: site.description,
  },
};

// Real data only (all from falconridgedigital.com). No address, ratings or
// reviews are published, so none are claimed.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.mainSite}/#organization`,
      name: site.legalName,
      url: site.mainSite,
      logo: `${site.url}/brand/logo.png`,
      email: site.email,
      telephone: "+1-801-900-6025",
      founder: { "@type": "Person", name: site.founder },
      sameAs: site.socials.map((s) => s.href),
    },
    {
      "@type": "ProfessionalService",
      name: site.legalName,
      url: site.url,
      image: `${site.url}/brand/logo.png`,
      email: site.email,
      telephone: "+1-801-900-6025",
      description: site.description,
      parentOrganization: { "@id": `${site.mainSite}/#organization` },
      serviceType: [
        "Marketing CRM & Lead Tracking",
        "Performance Dashboards",
        "Local SEO",
        "Paid Ads Management",
        "Organic SEO",
        "Content Writing",
        "Email / SMS Marketing",
        "Conversion Rate Optimization",
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "Owners and operators of multifamily, RV parks & resorts, self storage, marinas, mobile home communities, glamping, hotels and vacation rental groups",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sen.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ground text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <RouteTracker />
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <div className="ambient-field" aria-hidden="true">
          <span className="ambient-blob ambient-blob-a" />
          <span className="ambient-blob ambient-blob-b" />
          <span className="ambient-blob ambient-blob-c" />
        </div>
        <FieldBackdrop />
        <div className="grain-overlay" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
