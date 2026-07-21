import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryCatalog } from "@/features/catalog";
import { getMenuCategoryById } from "@/features/catalog/api/get-menu-categories";
import { SITE_NAME, SITE_URL } from "@/config/site";

interface CategoryProductsPageProps {
  params: Promise<{ id: string }>;
}

function parseCategoryId(value: string): number | null {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const categoryId = Number(value);
  return Number.isSafeInteger(categoryId) && categoryId > 0 ? categoryId : null;
}

export async function generateMetadata({ params }: CategoryProductsPageProps): Promise<Metadata> {
  const { id } = await params;
  const categoryId = parseCategoryId(id);

  if (categoryId === null) {
    return { title: "دسته‌بندی نامعتبر", robots: { index: false, follow: false } };
  }

  const category = await getMenuCategoryById(categoryId);
  if (!category) {
    return { title: "دسته‌بندی یافت نشد", robots: { index: false, follow: false } };
  }

  const canonical = new URL(`/categories/${category.id}`, SITE_URL);
  const title = `${category.title} | ${SITE_NAME}`;
  const description = `مشاهده محصولات دسته‌بندی ${category.title} در اتکالاین`;

  return {
    title,
    description,
    alternates: { canonical: canonical.toString() },
    openGraph: { title, description, url: canonical.toString() },
  };
}

export default async function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  const { id } = await params;
  const categoryId = parseCategoryId(id);

  if (categoryId === null) {
    notFound();
  }

  const category = await getMenuCategoryById(categoryId);
  if (!category) {
    notFound();
  }

  return <CategoryCatalog title={`محصولات ${category.title}`} categoryId={category.id} />;
}
