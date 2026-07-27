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

function parseFavoriteProducts(response: FavoriteProductsResponse): FavoriteProduct[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    return [];
  }

  return response.value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const value = item as Record<string, unknown>;
    const id = getNumber(value.id);
    const title = getText(value.title);
    if (!id || !Number.isInteger(id) || !title) {
      return [];
    }

    return [
      {
        id,
        title,
        urlTitle: getText(value.urlTitle),
        mainPrice: getNumber(value.mainPrice) ?? 0,
        offPrice: getNumber(value.offPrice) ?? 0,
        offPercent: getNumber(value.offPrecent) ?? 0,
        inventory: getNumber(value.inventory) ?? 0,
        isExist: value.isExist === true,
        pic: getText(value.pic),
        picUrl: getText(value.picUrl),
      },
    ];
  });
}

export function useFavoriteProducts() {
  return useApiQuery<FavoriteProductsResponse, FavoriteProduct[]>({
    url: "/api/Favorites/FavoritProducts",
    queryKey: ["favorites", "products"],
    select: parseFavoriteProducts,
    staleTime: 60_000,
    retry: false,
  });
}
