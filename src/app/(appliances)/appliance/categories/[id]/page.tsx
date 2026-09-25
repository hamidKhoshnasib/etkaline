import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getStorefront } from "@/config/storefront";
import { CategoryCatalog } from "@/features/catalog";
import { getMenuCategoryPathById } from "@/features/catalog/api/get-menu-categories";
import { SITE_TYPES } from "@/lib/api-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

type Props = { params: Promise<{ id: string }> };

function parseId(value: string) {
  const id = /^\d+$/.test(value) ? Number(value) : 0;
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseId((await params).id);
  if (!id) {
    return { robots: { index: false, follow: false } };
  }
  const path = await getMenuCategoryPathById(id, SITE_TYPES.appliance).catch(() => null);
  const category = path?.at(-1);
  if (!category) {
    return {
      title: `دسته‌بندی ${id}`,
      robots: { index: false, follow: false },
    };
  }
  return createStorefrontMetadata({
    siteType: SITE_TYPES.appliance,
    pathname: getStorefront(SITE_TYPES.appliance).categoryHref(id),
    title: category.metaTitle,
    fallbackTitle: category.title,
    description: category.seoDescription,
    fallbackDescription: `خرید آنلاین محصولات ${category.title} از اتکالاین`,
  });
}

export default async function ApplianceCategoryPage({ params }: Props) {
  const id = parseId((await params).id);
  if (!id) {
    notFound();
  }
  const path = await getMenuCategoryPathById(id, SITE_TYPES.appliance).catch(() => null);
  const category = path?.at(-1);

  return (
    <CategoryCatalog
      title={category ? `محصولات ${category.title}` : `محصولات دسته‌بندی ${id}`}
      categoryId={id}
      categoryPath={path ?? []}
    />
  );
}
