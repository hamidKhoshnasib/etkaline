import { SITE_TYPES, type SiteType } from "@/lib/api-site-type";
import { SITE_URL } from "@/config/site";

export interface StorefrontConfig {
  siteType: SiteType;
  basePath: "" | "/fresh";
  homeHref: string;
  cartHref: string;
  searchHref: string;
  productPathPrefix: string;
  categoryPathPrefix: string;
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
    basePath: "/fresh",
    homeHref: "/fresh",
    cartHref: "/fresh/cart",
    searchHref: "/fresh/search/category",
    productPathPrefix: "/fresh/products/",
    categoryPathPrefix: "/fresh/search/category/",
    productHref: (id, slug) =>
      `/fresh/products/${encodeURIComponent(String(id))}/${encodeURIComponent(normalizeSlug(slug))}`,
    categoryHref: (id) => `/fresh/search/category/${encodeURIComponent(String(id))}`,
    absoluteUrl,
  },
  appliance: {
    siteType: SITE_TYPES.appliance,
    basePath: "",
    homeHref: "/",
    cartHref: "/cart",
    searchHref: "/search",
    productPathPrefix: "/product/",
    categoryPathPrefix: "/categories/",
    productHref: (id, slug) =>
      `/product/${encodeURIComponent(String(id))}/${encodeURIComponent(normalizeSlug(slug))}`,
    categoryHref: (id) => `/categories/${encodeURIComponent(String(id))}`,
    absoluteUrl,
  },
} satisfies Record<SiteType, StorefrontConfig>;

export function getStorefront(siteType: SiteType): StorefrontConfig {
  return STOREFRONTS[siteType];
}
