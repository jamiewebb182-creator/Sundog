import type { MetadataRoute } from "next";
import { seo } from "@/lib/content";

// Tells Google which pages exist. Served at /sitemap.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${seo.siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${seo.siteUrl}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${seo.siteUrl}/commission`, changeFrequency: "yearly", priority: 0.6 },
  ];
}
