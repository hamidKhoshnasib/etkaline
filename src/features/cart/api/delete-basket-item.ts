"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { basketQueryKeys } from "./basket-query-keys";

interface DeleteBasketItemResponse {
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

export interface DeleteBasketItemInput {
  storeProductId: number;
  basketId: number;
}

function responseMessage(response: DeleteBasketItemResponse) {
  const errors = Array.isArray(response.errors)
    ? response.errors.filter(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : [];

  return (
    (typeof response.message === "string" && response.message.trim()) ||
    errors[0] ||
    "حذف کالا از سبد خرید ناموفق بود."
  );
}

async function deleteBasketItem(input: DeleteBasketItemInput) {
  if (!Number.isSafeInteger(input.storeProductId) || input.storeProductId < 1) {
    throw new Error("شناسه کالا برای حذف معتبر نیست.");
  }

  if (!Number.isSafeInteger(input.basketId) || input.basketId < 1) {
    throw new Error("شناسه سبد خرید معتبر نیست.");
  }

  let data: DeleteBasketItemResponse;

  try {
    ({ data } = await axiosClient.post<DeleteBasketItemResponse>("/api/Baskets/DeleteItem", input));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (data.isSuccess !== true) {
    throw new Error(responseMessage(data));
  }
}

export function useDeleteBasketItem() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteBasketItemInput>({
    mutationFn: deleteBasketItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: basketQueryKeys.open }),
  });
}
