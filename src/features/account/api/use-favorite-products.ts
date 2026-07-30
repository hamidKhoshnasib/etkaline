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

function parseFavoriteProducts(response: FavoriteProductsResponse): FavoriteProduct[] {
  const result = getRecord(response.value);
  if (response.isSuccess !== true || !result || !Array.isArray(result.products)) {
    return [];
  }

  return result.products.flatMap((item) => {
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
}

export function useFavoriteProducts() {
  return useApiQuery<FavoriteProductsResponse, FavoriteProduct[]>({
    url: "/api/Favorites",
    queryKey: ["favorites", "products", { page: 1, pageLength: 300 }],
    axiosConfig: { params: { Page: 1, PageLength: 300 } },
    select: parseFavoriteProducts,
    staleTime: 60_000,
    retry: false,
  });
}
