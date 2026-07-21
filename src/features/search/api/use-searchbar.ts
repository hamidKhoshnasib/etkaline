"use client";

import { useApiQuery } from "@/hooks/use-api-query";

import { GET_PRODUCT_SEARCHBAR } from "./endpoints";
import { searchQueryKey } from "./query-keys";

const SEARCH_RESULT_COUNT = 5;

export interface SearchbarItem {
  id: number;
  title: string;
}

export interface SearchbarResults {
  products: SearchbarItem[];
  categories: SearchbarItem[];
  brands: SearchbarItem[];
}

const emptyResults: SearchbarResults = { products: [], categories: [], brands: [] };

function parseItems(value: unknown): SearchbarItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item): SearchbarItem[] => {
    if (!item || typeof item !== "object") {
      return [];
    }
    const { id, title } = item as Record<string, unknown>;
    return typeof id === "number" &&
      Number.isInteger(id) &&
      typeof title === "string" &&
      title.trim()
      ? [{ id, title: title.trim() }]
      : [];
  });
}

function parseResults(value: unknown): SearchbarResults {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid search response");
  }
  const response = value as Record<string, unknown>;
  if (response.isSuccess !== true || !response.value || typeof response.value !== "object") {
    throw new Error("Invalid search response");
  }
  const results = response.value as Record<string, unknown>;
  return {
    products: parseItems(results.products),
    categories: parseItems(results.categories),
    brands: parseItems(results.brands),
  };
}

export function useSearchbar(text: string, enabled: boolean) {
  const normalizedText = text.trim();
  return useApiQuery<unknown, SearchbarResults>({
    url: GET_PRODUCT_SEARCHBAR,
    queryKey: searchQueryKey("header", normalizedText, SEARCH_RESULT_COUNT),
    axiosConfig: {
      params: {
        Text: normalizedText,
        ProductCount: SEARCH_RESULT_COUNT,
        CategoryCount: SEARCH_RESULT_COUNT,
        BrandCount: SEARCH_RESULT_COUNT,
      },
    },
    select: normalizedText ? parseResults : () => emptyResults,
    enabled: enabled && normalizedText.length > 0,
    staleTime: 30_000,
    retry: false,
  });
}
