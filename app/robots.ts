import type { MetadataRoute } from "next";
import { seo } from "@/lib/content";

// Lets search engines read the site and points them to the sitemap.
// Served at /robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${seo.siteUrl}/sitemap.xml`,
  };
}
