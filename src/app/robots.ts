import type { MetadataRoute } from "next";

import { SITE_URL } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account/", "/cart/", "/appliances/cart/", "/checkout/", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
