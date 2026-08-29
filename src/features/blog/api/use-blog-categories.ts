"use client";

import { useApiQuery } from "@/hooks/use-api-query";

import { GET_BLOG_CATEGORIES } from "./endpoints";
import { blogQueryKey } from "./query-keys";

export interface BlogCategory {
  id: number;
  title: string;
  urlTitle: string | null;
  order: number;
  iconName: string;
}

interface BlogCategoriesResponse {
  value?: unknown;
  isSuccess?: unknown;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function asInteger(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) ? value : null;
}

function asText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function parseBlogCategories(raw: unknown): BlogCategory[] {
  const response = raw as BlogCategoriesResponse;
  if (response.isSuccess !== true) {
    throw new Error("Blog categories response was unsuccessful");
  }

  if (response.value === null || response.value === undefined) {
    return [];
  }

  if (!Array.isArray(response.value)) {
    throw new Error("Blog categories response has an invalid value");
  }

  return response.value
    .flatMap((value): BlogCategory[] => {
      const category = asRecord(value);
      const id = category && asInteger(category.id);
      const title = category && asText(category.title);
      const urlTitle = category && asText(category.urlTitle);

      if (id === null || !title) {
        return [];
      }

      return [
        {
          id,
          title,
          urlTitle,
          order: asInteger(category.order) ?? 0,
          iconName: asText(category.iconName) ?? "",
        },
      ];
    })
    .sort((first, second) => first.order - second.order || first.id - second.id);
}

export function useBlogCategories() {
  return useApiQuery<unknown, BlogCategory[]>({
    url: GET_BLOG_CATEGORIES,
    queryKey: blogQueryKey("categories"),
    select: parseBlogCategories,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
