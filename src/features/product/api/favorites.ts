"use client";

import { useMutation } from "@tanstack/react-query";

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

async function toggleFavorite(
  { productId, isBookmarked }: ToggleFavoriteInput,
  siteType: ReturnType<typeof useStorefront>["siteType"],
) {
  let data: FavoriteResponse;

  try {
    ({ data } = isBookmarked
      ? await axiosClient.delete<FavoriteResponse>("/api/Favorites", {
          data: { productId },
          headers: getSiteTypeHeaders(siteType),
        })
      : await axiosClient.post<FavoriteResponse>(
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

  return !isBookmarked;
}

export function useToggleFavorite() {
  const { siteType } = useStorefront();
  return useMutation<boolean, Error, ToggleFavoriteInput>({
    mutationFn: (input) => toggleFavorite(input, siteType),
  });
}
