"use client";

import { useApiQuery } from "@/hooks/use-api-query";

import { GET_CATEGORIES } from "./endpoints";
import { catalogQueryKey } from "./query-keys";

interface CategoryReference {
  id: number;
  title: string;
  parentId: number | null;
}

export type CategoryParentTitles = Readonly<Record<number, string>>;

function parseCategoryReferences(
  value: unknown,
  nestedParentId: number | null = null,
): CategoryReference[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item): CategoryReference[] => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const category = item as Record<string, unknown>;
    if (
      typeof category.id !== "number" ||
      !Number.isInteger(category.id) ||
      typeof category.title !== "string" ||
      !category.title.trim()
    ) {
      return [];
    }

    const parentId =
      typeof category.parentId === "number" && Number.isInteger(category.parentId)
        ? category.parentId
        : nestedParentId;

    return [
      { id: category.id, title: category.title.trim(), parentId },
      ...parseCategoryReferences(category.subCategories, category.id),
    ];
  });
}

function parseCategoryParentTitles(value: unknown): CategoryParentTitles {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid categories response");
  }

  const response = value as Record<string, unknown>;
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    throw new Error("Invalid categories response");
  }

  const categories = parseCategoryReferences(response.value);
  const titlesById = new Map(categories.map((category) => [category.id, category.title]));

  return Object.fromEntries(
    categories.flatMap((category) => {
      const parentTitle =
        category.parentId === null ? undefined : titlesById.get(category.parentId);
      return parentTitle ? [[category.id, parentTitle] as const] : [];
    }),
  );
}

export function useCategoryParentTitles(enabled: boolean) {
  return useApiQuery<unknown, CategoryParentTitles>({
    url: GET_CATEGORIES,
    queryKey: catalogQueryKey("category-parent-titles"),
    select: parseCategoryParentTitles,
    enabled,
    staleTime: 5 * 60_000,
    retry: false,
  });
}
