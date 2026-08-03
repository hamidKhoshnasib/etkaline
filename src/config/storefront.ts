import { SITE_TYPES, type SiteType } from "@/lib/api-site-type";
import { SITE_URL } from "@/config/site";

export interface StorefrontConfig {
  siteType: SiteType;
  basePath: "" | "/appliances";
  homeHref: string;
  cartHref: string;
  searchHref: string;
  productHref: (id: number | string, slug?: string | null) => string;
  categoryHref: (id: number | string) => string;
  absoluteUrl: (href: string) => string;
}

function normalizeSlug(slug: string | null | undefined) {
  return slug?.trim().replace(/^\/+|\/+$/g, "") || "product";
}

function absoluteUrl(href: string) {
  return new URL(href, SITE_URL).toString();
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
    absoluteUrl,
  },
  appliance: {
    siteType: SITE_TYPES.appliance,
    basePath: "/appliances",
    homeHref: "/appliances",
    cartHref: "/appliances/cart",
    searchHref: "/appliances/search",
    productHref: (id, slug) =>
      `/appliances/product/${encodeURIComponent(String(id))}/${encodeURIComponent(normalizeSlug(slug))}`,
    categoryHref: (id) => `/appliances/categories/${encodeURIComponent(String(id))}`,
    absoluteUrl,
  },
} satisfies Record<SiteType, StorefrontConfig>;

export function getStorefront(siteType: SiteType): StorefrontConfig {
  return STOREFRONTS[siteType];
}
