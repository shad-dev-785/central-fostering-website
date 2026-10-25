import type { MetadataRoute } from "next";
import { absoluteUrl, isLiveSite } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Until a real domain is set in NEXT_PUBLIC_SITE_URL, ask every crawler to stay away.
  if (!isLiveSite) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
