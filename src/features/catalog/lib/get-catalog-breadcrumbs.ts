import { getStorefront } from "@/config/storefront";
import type { SiteType } from "@/lib/api-site-type";

export interface CatalogBreadcrumbEntry {
  label: string;
  href?: string;
}

export interface CategoryPathEntry {
  id: number;
  title: string;
}

interface CatalogBreadcrumbOptions {
  siteType: SiteType;
  title: string;
  categoryId: number;
  categoryPath: CategoryPathEntry[];
  searchText: string;
}

export function getCatalogBreadcrumbs({
  siteType,
  title,
  categoryId,
  categoryPath,
  searchText,
}: CatalogBreadcrumbOptions): CatalogBreadcrumbEntry[] {
  const storefront = getStorefront(siteType);
  const query = searchText.trim();
  const activePath = categoryPath.at(-1)?.id === categoryId ? categoryPath : [];
  const crumbs: CatalogBreadcrumbEntry[] = [
    { label: "خانه", href: storefront.homeHref },
    ...activePath.map((category, index) => ({
      label: category.title,
      href:
        index === activePath.length - 1 && !query
          ? undefined
          : storefront.categoryHref(category.id),
    })),
  ];

  if (query) {
    crumbs.push({ label: query });
  } else if (activePath.length === 0) {
    crumbs.push({ label: title.replace("محصولات ", "") });
  }

  return crumbs;
}
