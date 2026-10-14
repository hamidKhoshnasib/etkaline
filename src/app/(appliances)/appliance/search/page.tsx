import type { Metadata } from "next";

import { CategoryCatalog } from "@/features/catalog";
import { getMenuCategoryPathById } from "@/features/catalog/api/get-menu-categories";
import { parseCatalogCategoryId } from "@/features/catalog/lib/catalog-query";
import { SITE_TYPES } from "@/lib/api-site-type";

interface Props {
  searchParams: Promise<{ category?: string | string[] }>;
}

export const metadata: Metadata = {
  title: "جستجوی محصولات",
  description: "جستجو و مشاهده محصولات فروشگاه لوازم خانگی اتکالاین",
  robots: { index: false, follow: true },
};

export default async function ApplianceSearchPage({ searchParams }: Props) {
  const categoryId = parseCatalogCategoryId((await searchParams).category);
  const path = categoryId
    ? await getMenuCategoryPathById(categoryId, SITE_TYPES.appliance).catch(() => null)
    : null;

  return <CategoryCatalog title="نتایج جستجو" categoryPath={path ?? []} />;
}
