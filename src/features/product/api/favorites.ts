"use client";

import { useMutation } from "@tanstack/react-query";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";

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

async function toggleFavorite({ productId, isBookmarked }: ToggleFavoriteInput) {
  let data: FavoriteResponse;

  try {
    ({ data } = isBookmarked
      ? await axiosClient.delete<FavoriteResponse>(`/api/Favorites/RemoveFavorite/${productId}`)
      : await axiosClient.post<FavoriteResponse>("/api/Favorites/AddFavorite", { productId }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (!data.isSuccess) {
    throw new Error(responseMessage(data));
  }

  return !isBookmarked;
}

export function useToggleFavorite() {
  return useMutation<boolean, Error, ToggleFavoriteInput>({ mutationFn: toggleFavorite });
}
