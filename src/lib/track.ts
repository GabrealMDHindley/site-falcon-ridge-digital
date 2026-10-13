import { analyticsIds, safeId } from "./analytics";

// One helper, every configured platform. Each branch is a no-op when that
// platform's ID is unset (its script never loaded, so its global is absent).
// Server-side destinations (GHL / email service / CRM webhooks) are fired by
// the API routes themselves on lead + booking — see src/lib/forward.ts.

export type TrackEvent = "page_view" | "cta_click" | "lead" | "booked" | "offer_checkout_click";

export type TrackParams = {
  /** Where on the page the interaction happened, e.g. "hero", "offers:replay". */
  location?: string;
  /** Offer name for checkout clicks. */
  offer?: string;
  /** Optional numeric value in USD (none is sent while the site shows no pricing). */
  value?: number;
  path?: string;
  [key: string]: string | number | boolean | undefined;
};

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
    uetq?: { push: (...args: unknown[]) => unknown };
  }
}

const GA4_NAMES: Record<TrackEvent, string> = {
  page_view: "page_view",
  cta_click: "cta_click",
  lead: "generate_lead",
  booked: "book_appointment",
  offer_checkout_click: "begin_checkout",
};

const META_STANDARD: Partial<Record<TrackEvent, string>> = {
  page_view: "PageView",
  lead: "Lead",
  booked: "Schedule",
  offer_checkout_click: "InitiateCheckout",
};

const UET_ACTIONS: Record<TrackEvent, string> = {
  page_view: "page_view",
  cta_click: "cta_click",
  lead: "submit_lead_form",
  booked: "book_appointment",
  offer_checkout_click: "begin_checkout",
};

function clean(params: TrackParams): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined) out[k] = v;
  return out;
}

export function track(event: TrackEvent, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  const p = clean(params);
  const money = typeof params.value === "number" ? { value: params.value, currency: "USD" } : {};

  try {
    // Google Tag Manager — a dataLayer push for every event.
    if (analyticsIds.gtm) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: event, ...p, ...money });
    }

    // GA4 + Google Ads share gtag.js.
    if (window.gtag) {
      if (analyticsIds.ga4) {
        window.gtag("event", GA4_NAMES[event], {
          ...p,
          ...money,
          ...(event === "page_view"
            ? { page_path: params.path ?? window.location.pathname, page_location: window.location.href }
            : {}),
          send_to: safeId(analyticsIds.ga4),
        });
      }
      const adsId = safeId(analyticsIds.googleAds);
      const label =
        event === "lead" || event === "booked" || event === "offer_checkout_click"
          ? analyticsIds.googleAdsLabels[event]
          : "";
      if (adsId && label) {
        window.gtag("event", "conversion", { send_to: `${adsId}/${label}`, ...money });
      }
    }

    // Microsoft Ads (UET).
    if (analyticsIds.uet && window.uetq) {
      if (event === "page_view") {
        // The UET base tag records the initial pageLoad itself; only SPA navigations are pushed.
        if (params.spa) window.uetq.push("event", "page_view", { page_path: params.path ?? window.location.pathname });
      } else {
        window.uetq.push("event", UET_ACTIONS[event], {
          event_label: params.location ?? "",
          ...(typeof params.value === "number" ? { revenue_value: params.value, currency: "USD" } : {}),
        });
      }
    }

    // Meta Pixel.
    if (analyticsIds.metaPixel && window.fbq) {
      const std = META_STANDARD[event];
      if (std) window.fbq("track", std, { ...p, ...money });
      else window.fbq("trackCustom", "CTAClick", p);
    }
  } catch (err) {
    // Tracking must never break the page.
    console.warn("track() failed", err);
  }
}
