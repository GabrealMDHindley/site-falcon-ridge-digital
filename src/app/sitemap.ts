import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// One page. /confirmation is deliberately excluded (noindex, cookie-gated).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/`, lastModified: new Date() }];
}
