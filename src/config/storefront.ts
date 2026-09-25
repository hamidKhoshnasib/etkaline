import { SITE_TYPES, type SiteType } from "@/lib/api-site-type";
import { getProductSlug } from "@/lib/product-slug";
import { SITE_URL } from "@/config/site";

export interface StorefrontConfig {
  siteType: SiteType;
  basePath: "" | "/appliance";
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
  return getProductSlug(slug);
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
    productPathPrefix: "/products/",
    categoryPathPrefix: "/search/category/",
    productHref: (id, slug) =>
      `/products/${encodeURIComponent(String(id))}/${encodeURIComponent(normalizeSlug(slug))}`,
    categoryHref: (id) => `/search/category/${encodeURIComponent(String(id))}`,
    absoluteUrl,
  },
  appliance: {
    siteType: SITE_TYPES.appliance,
    basePath: "/appliance",
    homeHref: "/appliance",
    cartHref: "/appliance/cart",
    searchHref: "/appliance/search",
    productPathPrefix: "/appliance/product/",
    categoryPathPrefix: "/appliance/categories/",
    productHref: (id, slug) =>
      `/appliance/product/${encodeURIComponent(String(id))}/${encodeURIComponent(normalizeSlug(slug))}`,
    categoryHref: (id) => `/appliance/categories/${encodeURIComponent(String(id))}`,
    absoluteUrl,
  },
} satisfies Record<SiteType, StorefrontConfig>;

export function getStorefront(siteType: SiteType): StorefrontConfig {
  return STOREFRONTS[siteType];
}
