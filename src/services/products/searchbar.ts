import { axiosClient } from "@/lib/axios-client";

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

interface SearchbarResponse {
  value?: unknown;
  isSuccess?: boolean;
}

const emptyResults: SearchbarResults = {
  products: [],
  categories: [],
  brands: [],
};

function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

function parseItems(value: unknown): SearchbarItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const { id, title } = item as Record<string, unknown>;
    if (!isInteger(id) || typeof title !== "string" || !title.trim()) {
      return [];
    }

    return [{ id, title: title.trim() }];
  });
}

function parseResults(value: unknown): SearchbarResults | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const results = value as Record<string, unknown>;
  return {
    products: parseItems(results.products),
    categories: parseItems(results.categories),
    brands: parseItems(results.brands),
  };
}

export function getSearchbarQueryKey(text: string) {
  return ["searchbar", text, SEARCH_RESULT_COUNT] as const;
}

export async function getSearchbarResults(
  text: string,
  signal?: AbortSignal,
): Promise<SearchbarResults> {
  const normalizedText = text.trim();
  if (!normalizedText) {
    return emptyResults;
  }

  const { data } = await axiosClient.get<SearchbarResponse>("/api/Products/Searchbar", {
    params: {
      Text: normalizedText,
      ProductCount: SEARCH_RESULT_COUNT,
      CategoryCount: SEARCH_RESULT_COUNT,
      BrandCount: SEARCH_RESULT_COUNT,
    },
    signal,
  });

  const results = data.isSuccess ? parseResults(data.value) : null;
  if (!results) {
    throw new Error("Invalid search response");
  }

  return results;
}
