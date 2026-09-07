"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FAVORITES_QUERY_ROOT } from "@/features/product/api/favorite-query-keys";
import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

interface FavoriteResponse {
  isSuccess: boolean;
  errors?: string[];
  message?: string;
}

interface ToggleFavoriteInput {
  productId: number;
  isBookmarked: boolean;
}

function responseMessage(response: FavoriteResponse) {
  return response.message || response.errors?.[0] || "تغییر علاقه‌مندی ناموفق بود.";
}

function validProductIds(productIds: number[]) {
  return [...new Set(productIds)].filter(
    (productId) => Number.isSafeInteger(productId) && productId > 0,
  );
}

async function removeFavorites(
  productIds: number[],
  siteType: ReturnType<typeof useStorefront>["siteType"],
) {
  const ids = validProductIds(productIds);
  if (ids.length === 0) {
    throw new Error("حداقل یک محصول معتبر برای حذف انتخاب کنید.");
  }

  let data: FavoriteResponse;
  try {
    ({ data } = await axiosClient.delete<FavoriteResponse>("/api/Favorites", {
      data: { productIds: ids },
      headers: getSiteTypeHeaders(siteType),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (!data.isSuccess) {
    throw new Error(responseMessage(data));
  }
}

async function toggleFavorite(
  { productId, isBookmarked }: ToggleFavoriteInput,
  siteType: ReturnType<typeof useStorefront>["siteType"],
) {
  if (isBookmarked) {
    await removeFavorites([productId], siteType);
  } else {
    let data: FavoriteResponse;
    try {
      ({ data } = await axiosClient.post<FavoriteResponse>(
        "/api/Favorites",
        { productId },
        {
          headers: getSiteTypeHeaders(siteType),
        },
      ));
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }

    if (!data.isSuccess) {
      throw new Error(responseMessage(data));
    }
  }

  return !isBookmarked;
}

export function useToggleFavorite() {
  const { siteType } = useStorefront();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, ToggleFavoriteInput>({
    mutationFn: (input) => toggleFavorite(input, siteType),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [siteType, ...FAVORITES_QUERY_ROOT] });
    },
    retry: false,
  });
}

export function useRemoveFavorites() {
  const { siteType } = useStorefront();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number[]>({
    mutationFn: (productIds) => removeFavorites(productIds, siteType),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [siteType, ...FAVORITES_QUERY_ROOT] });
    },
    retry: false,
  });
}
