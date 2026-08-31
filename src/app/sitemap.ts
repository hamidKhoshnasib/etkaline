import type { MetadataRoute } from "next";

import { getStorefront } from "@/config/storefront";
import { getMenuCategories } from "@/features/catalog/api/get-menu-categories";
import type { MenuCategory } from "@/features/catalog/model/menu-category";
import { getProductSlug } from "@/features/product/lib/product-slug";
import { getServerApiBaseUrl } from "@/lib/api-config";
import { getServerApiHeaders } from "@/lib/get-server-api-headers";
import { SITE_TYPES, type SiteType } from "@/lib/api-site-type";

const storefrontSiteTypes = [SITE_TYPES.appliance, SITE_TYPES.supermarket] as const;
const sharedStaticRoutes = ["/blog", "/contact-us"] as const;

function flattenCategories(categories: MenuCategory[]): MenuCategory[] {
  return categories.flatMap((category) => [category, ...flattenCategories(category.children)]);
}

async function getProductEntries(siteType: SiteType): Promise<MetadataRoute.Sitemap> {
  const storefront = getStorefront(siteType);
  try {
    const response = await fetch(new URL("/api/Products/Search", getServerApiBaseUrl()), {
      method: "POST",
      headers: {
        ...(await getServerApiHeaders(siteType)),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page: 1, pageLength: 1000, sortType: 1, categoryId: 0 }),
      next: { revalidate: 3600, tags: [`${siteType}-product-sitemap`] },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as Record<string, unknown>;
    const value =
      payload.value && typeof payload.value === "object"
        ? (payload.value as Record<string, unknown>)
        : payload;
    if (!Array.isArray(value.products)) {
      return [];
    }

    return value.products.flatMap((item): MetadataRoute.Sitemap => {
      if (!item || typeof item !== "object") {
        return [];
      }
      const product = item as Record<string, unknown>;
      const id = typeof product.id === "number" ? product.id : product.productId;
      const title = typeof product.title === "string" ? product.title : "product";
      const urlTitle = typeof product.urlTitle === "string" ? product.urlTitle : null;
      if (typeof id !== "number" || !Number.isSafeInteger(id) || id < 1) {
        return [];
      }
      return [
        {
          url: storefront.absoluteUrl(storefront.productHref(id, getProductSlug(urlTitle, title))),
          changeFrequency: "daily",
          priority: 0.8,
        },
      ];
    });
  } catch {
    return [];
  }
}

async function getStorefrontEntries(siteType: SiteType): Promise<MetadataRoute.Sitemap> {
  const storefront = getStorefront(siteType);
  const [products, categories] = await Promise.all([
    getProductEntries(siteType),
    getMenuCategories(siteType).catch(() => []),
  ]);
  const categoryEntries: MetadataRoute.Sitemap = flattenCategories(categories).map((category) => ({
    url: storefront.absoluteUrl(storefront.categoryHref(category.id)),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: storefront.absoluteUrl(storefront.homeHref),
      changeFrequency: "daily",
      priority: siteType === SITE_TYPES.appliance ? 1 : 0.9,
    },
    ...categoryEntries,
    ...products,
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultStorefront = getStorefront(SITE_TYPES.appliance);
  const sharedEntries: MetadataRoute.Sitemap = sharedStaticRoutes.map((pathname) => ({
    url: defaultStorefront.absoluteUrl(pathname),
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const storefrontEntries = await Promise.all(storefrontSiteTypes.map(getStorefrontEntries));

  return [...storefrontEntries.flat(), ...sharedEntries];
}
