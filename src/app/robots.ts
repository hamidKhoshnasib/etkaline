import type { MetadataRoute } from "next";

import { getStorefront } from "@/config/storefront";
import { SITE_TYPES } from "@/lib/api-site-type";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account/", "/cart/", "/appliances/cart/", "/checkout/", "/api/"],
    },
    sitemap: getStorefront(SITE_TYPES.supermarket).absoluteUrl("/sitemap.xml"),
  };
}
