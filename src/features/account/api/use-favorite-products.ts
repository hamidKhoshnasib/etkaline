"use client";

import { useApiQuery } from "@/hooks/use-api-query";

export interface FavoriteProduct {
  id: number;
  title: string;
  urlTitle: string | null;
  mainPrice: number;
  offPrice: number;
  offPercent: number;
  inventory: number;
  isExist: boolean;
  pic: string | null;
  picUrl: string | null;
}

export interface FavoriteProductsPage {
  page: number;
  pageLength: number;
  pageCount: number;
  totalCount: number;
  products: FavoriteProduct[];
}

interface FavoriteProductsResponse {
  value?: unknown;
  isSuccess?: unknown;
}

function getText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function getRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function parseFavoriteProducts(
  response: FavoriteProductsResponse,
  fallbackPage: number,
): FavoriteProductsPage {
  const result = getRecord(response.value);
  if (response.isSuccess !== true || !result || !Array.isArray(result.products)) {
    return { page: fallbackPage, pageLength: 10, pageCount: 0, totalCount: 0, products: [] };
  }

  const products = result.products.flatMap((item) => {
    const value = getRecord(item);
    if (!value) {
      return [];
    }

    const id = getNumber(value.id);
    const title = getText(value.title);
    if (!id || !Number.isInteger(id) || !title) {
      return [];
    }

    const storeInfo = getRecord(value.storeInfo);
    return [
      {
        id,
        title,
        urlTitle: getText(value.urlTitle),
        mainPrice: getNumber(storeInfo?.mainPrice) ?? 0,
        offPrice: getNumber(storeInfo?.offPrice) ?? 0,
        offPercent: getNumber(storeInfo?.offPercent) ?? 0,
        inventory: getNumber(value.inventory) ?? 1,
        isExist: value.isExist !== false,
        pic: getText(value.pic),
        picUrl: getText(value.picUrl),
      },
    ];
  });
  const pageLength = getNumber(result.pageLength) ?? 10;
  const totalCount = getNumber(result.totalCount) ?? products.length;
  const pageCount =
    getNumber(result.pageCount) ?? (pageLength > 0 ? Math.ceil(totalCount / pageLength) : 0);

  return {
    page: getNumber(result.page) ?? fallbackPage,
    pageLength,
    pageCount,
    totalCount,
    products,
  };
}

export function useFavoriteProducts(page: number) {
  return useApiQuery<FavoriteProductsResponse, FavoriteProductsPage>({
    url: "/api/Favorites",
    queryKey: ["favorites", "products", { page, pageLength: 10 }],
    axiosConfig: { params: { Page: page, PageLength: 10 } },
    select: (response) => parseFavoriteProducts(response, page),
    staleTime: 60_000,
    retry: false,
  });
}
