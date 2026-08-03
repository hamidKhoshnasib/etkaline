import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getStorefront } from "@/config/storefront";
import { CategoryCatalog } from "@/features/catalog";
import { getMenuCategoryPathById } from "@/features/catalog/api/get-menu-categories";
import { SITE_TYPES } from "@/lib/api-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

interface Props {
  params: Promise<{ slugs?: string[] }>;
}

function categoryIdFromSlugs(slugs: string[] | undefined) {
  const candidate = [...(slugs ?? [])].reverse().find((part) => /^\d+$/.test(part));
  if (!candidate) {
    return 0;
  }
  const id = Number(candidate);
  return Number.isSafeInteger(id) && id > 0 ? id : 0;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugs } = await params;
  const categoryId = categoryIdFromSlugs(slugs);
  const storefront = getStorefront(SITE_TYPES.supermarket);
  if (!categoryId) {
    return createStorefrontMetadata({
      siteType: SITE_TYPES.supermarket,
      pathname: storefront.searchHref,
      fallbackTitle: "همه محصولات",
      fallbackDescription: "مشاهده و خرید محصولات سوپرمارکتی اتکالاین",
    });
  }

  const path = await getMenuCategoryPathById(categoryId, SITE_TYPES.supermarket);
  const category = path?.at(-1);
  if (!category) {
    return { title: "دسته‌بندی یافت نشد", robots: { index: false, follow: false } };
  }
  return createStorefrontMetadata({
    siteType: SITE_TYPES.supermarket,
    pathname: storefront.categoryHref(categoryId),
    title: category.metaTitle,
    fallbackTitle: category.title,
    description: category.seoDescription,
    fallbackDescription: `خرید آنلاین محصولات ${category.title} از اتکالاین`,
  });
}

export default async function SupermarketCategoryPage({ params }: Props) {
  const { slugs } = await params;
  const categoryId = categoryIdFromSlugs(slugs);
  if (!categoryId) {
    return <CategoryCatalog />;
  }

  const path = await getMenuCategoryPathById(categoryId, SITE_TYPES.supermarket);
  const category = path?.at(-1);
  if (!path || !category) {
    notFound();
  }
  return (
    <CategoryCatalog
      title={`محصولات ${category.title}`}
      categoryId={categoryId}
      categoryPath={path}
    />
  );
}
