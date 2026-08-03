import { SITE_TYPES, type SiteType } from "@/lib/api-site-type";

export interface StorefrontConfig {
  siteType: SiteType;
  basePath: "" | "/appliances";
  homeHref: string;
  cartHref: string;
  searchHref: string;
  productHref: (id: number | string, slug?: string | null) => string;
  categoryHref: (id: number | string) => string;
}

function normalizeSlug(slug: string | null | undefined) {
  return slug?.trim().replace(/^\/+|\/+$/g, "") || "product";
}

export const STOREFRONTS = {
  supermarket: {
    siteType: SITE_TYPES.supermarket,
    basePath: "",
    homeHref: "/",
    cartHref: "/cart",
    searchHref: "/search/category",
    productHref: (id, slug) =>
      `/products/${encodeURIComponent(String(id))}/${encodeURIComponent(normalizeSlug(slug))}`,
    categoryHref: (id) => `/search/category/${encodeURIComponent(String(id))}`,
  },
  appliance: {
    siteType: SITE_TYPES.appliance,
    basePath: "/appliances",
    homeHref: "/appliances",
    cartHref: "/appliances/cart",
    searchHref: "/appliances/search",
    productHref: (id) => `/appliances/product/${encodeURIComponent(String(id))}`,
    categoryHref: (id) => `/appliances/categories/${encodeURIComponent(String(id))}`,
  },
} satisfies Record<SiteType, StorefrontConfig>;

export function getStorefront(siteType: SiteType): StorefrontConfig {
  return STOREFRONTS[siteType];
}
