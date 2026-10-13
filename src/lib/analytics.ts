// Client-side tracking IDs. All optional: a platform whose ID is unset never
// loads a script and never receives an event. NEXT_PUBLIC_* values are inlined
// at build time, so changing one in Vercel needs a redeploy.

export const analyticsIds = {
  gtm: process.env.NEXT_PUBLIC_GTM_ID?.trim() || "",
  ga4: process.env.NEXT_PUBLIC_GA4_ID?.trim() || "",
  googleAds: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "",
  googleAdsLabels: {
    lead: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL?.trim() || "",
    booked: process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKED_LABEL?.trim() || "",
    offer_checkout_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_CHECKOUT_LABEL?.trim() || "",
  },
  uet: process.env.NEXT_PUBLIC_UET_ID?.trim() || "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "",
};

/** Accepts only plain tag IDs (letters, digits, dashes) so nothing odd is ever interpolated into a script. */
export function safeId(id: string): string {
  return /^[A-Za-z0-9-]+$/.test(id) ? id : "";
}
