import type { MetadataRoute } from "next";

import { getStorefront } from "@/config/storefront";
import { getMenuCategories } from "@/features/catalog/api/get-menu-categories";
import type { MenuCategory } from "@/features/catalog/model/menu-category";
import { getProductSlug } from "@/features/product/lib/product-slug";
import { getServerApiBaseUrl } from "@/lib/api-config";
import { getServerApiHeaders } from "@/lib/get-server-api-headers";
import { SITE_TYPES } from "@/lib/api-site-type";

const staticRoutes = ["/", "/blog", "/contact-us"] as const;

function flattenCategories(categories: MenuCategory[]): MenuCategory[] {
  return categories.flatMap((category) => [category, ...flattenCategories(category.children)]);
}

async function getProductEntries(): Promise<MetadataRoute.Sitemap> {
  const storefront = getStorefront(SITE_TYPES.supermarket);
  try {
    const response = await fetch(new URL("/api/Products/Search", getServerApiBaseUrl()), {
      method: "POST",
      headers: {
        ...(await getServerApiHeaders(SITE_TYPES.supermarket)),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page: 1, pageLength: 1000, sortType: 1, categoryId: 0 }),
      next: { revalidate: 3600, tags: ["supermarket-product-sitemap"] },
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const storefront = getStorefront(SITE_TYPES.supermarket);
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((pathname, index) => ({
    url: storefront.absoluteUrl(pathname),
    changeFrequency: pathname === "/" ? "daily" : "weekly",
    priority: index === 0 ? 1 : 0.7,
  }));

  try {
    const categories = flattenCategories(await getMenuCategories(SITE_TYPES.supermarket));
    const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
      url: storefront.absoluteUrl(storefront.categoryHref(category.id)),
      changeFrequency: "daily",
      priority: 0.8,
    }));
    return [...staticEntries, ...categoryEntries, ...(await getProductEntries())];
  } catch {
    return [...staticEntries, ...(await getProductEntries())];
  }
}
