import type { MetadataRoute } from "next";

import { SITE_URL } from "@/shared/config/site";

const publicRoutes = ["/", "/products", "/blog", "/contact-us"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((pathname, index) => ({
    url: new URL(pathname, SITE_URL).toString(),
    changeFrequency: pathname === "/" ? "daily" : "weekly",
    priority: index === 0 ? 1 : 0.7,
  }));
}
