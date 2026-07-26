"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import {
  type OpenBasket,
  type OpenBasketResponse,
  parseOpenBasketResponse,
} from "./get-open-basket";
import { basketQueryKeys } from "./basket-query-keys";

export interface UpdateBasketQuantityInput {
  storeProductId: number;
  quantity: number;
  basketId: number;
}

function validateInput(input: UpdateBasketQuantityInput) {
  if (!Number.isSafeInteger(input.storeProductId) || input.storeProductId < 1) {
    throw new Error("شناسه کالا برای تغییر تعداد معتبر نیست.");
  }

  if (!Number.isSafeInteger(input.basketId) || input.basketId < 1) {
    throw new Error("شناسه سبد خرید معتبر نیست.");
  }

  if (!Number.isSafeInteger(input.quantity) || input.quantity < 1) {
    throw new Error("تعداد کالا باید حداقل یک باشد.");
  }
}

async function updateBasketQuantity(input: UpdateBasketQuantityInput): Promise<OpenBasket | null> {
  validateInput(input);

  let data: OpenBasketResponse;

  try {
    ({ data } = await axiosClient.post<OpenBasketResponse>("/api/Baskets/UpdateQuantity", input));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parseOpenBasketResponse(data);
}

export function useUpdateBasketQuantity() {
  const queryClient = useQueryClient();

  return useMutation<OpenBasket | null, Error, UpdateBasketQuantityInput>({
    mutationFn: updateBasketQuantity,
    onSuccess: (basket) => queryClient.setQueryData(basketQueryKeys.open, basket),
  });
}
