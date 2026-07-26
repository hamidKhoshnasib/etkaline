"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { basketQueryKeys } from "./basket-query-keys";

interface AddToBasketResponse {
  isSuccess: boolean;
  errors?: string[];
  message?: string;
}

export interface AddToBasketInput {
  storeProductId: number;
  quantity: number;
}

function responseMessage(response: AddToBasketResponse) {
  return response.message || response.errors?.[0] || "افزودن کالا به سبد خرید ناموفق بود.";
}

async function addToBasket(input: AddToBasketInput) {
  if (!Number.isSafeInteger(input.storeProductId) || input.storeProductId < 1) {
    throw new Error("شناسه کالا برای افزودن به سبد خرید معتبر نیست.");
  }

  if (!Number.isSafeInteger(input.quantity) || input.quantity < 1) {
    throw new Error("تعداد کالا برای افزودن به سبد خرید معتبر نیست.");
  }

  let data: AddToBasketResponse;

  try {
    ({ data } = await axiosClient.post<AddToBasketResponse>("/api/Baskets/AddToBasket", input));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (!data.isSuccess) {
    throw new Error(responseMessage(data));
  }
}

export function useAddToBasket() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, AddToBasketInput>({
    mutationFn: addToBasket,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: basketQueryKeys.open }),
  });
}
