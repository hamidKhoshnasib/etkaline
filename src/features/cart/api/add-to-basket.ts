"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import {
  type OpenBasket,
  type OpenBasketResponse,
  parseRequiredOpenBasketResponse,
} from "./get-open-basket";
import { basketQueryKeys } from "./basket-query-keys";
import { updateBasketQuantityDebounced } from "./update-basket-quantity";

export interface AddToBasketInput {
  storeProductId: number;
  quantity: number;
}

async function addToBasket(input: AddToBasketInput): Promise<OpenBasket> {
  if (!Number.isSafeInteger(input.storeProductId) || input.storeProductId < 1) {
    throw new Error("شناسه کالا برای افزودن به سبد خرید معتبر نیست.");
  }

  if (!Number.isSafeInteger(input.quantity) || input.quantity < 1) {
    throw new Error("تعداد کالا برای افزودن به سبد خرید معتبر نیست.");
  }

  let data: OpenBasketResponse;

  try {
    ({ data } = await axiosClient.post<OpenBasketResponse>("/api/Baskets/AddToBasket", input));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parseRequiredOpenBasketResponse(data);
}

export function useAddToBasket() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const queryKey = basketQueryKeys.open(session?.user.backendId);

  return useMutation<OpenBasket, Error, AddToBasketInput>({
    mutationKey: [...basketQueryKeys.all, "add"],
    mutationFn: (input) => {
      const basket = queryClient.getQueryData<OpenBasket | null>(queryKey);
      const existingItem = basket?.basketItems.find(
        (item) => item.storeProductId === input.storeProductId,
      );

      if (basket && existingItem) {
        return updateBasketQuantityDebounced({
          basketId: basket.id,
          storeProductId: input.storeProductId,
          quantity: existingItem.productCount + input.quantity,
        });
      }

      return addToBasket(input);
    },
    onSuccess: async (basket) => {
      queryClient.setQueryData(queryKey, basket);
      await queryClient.invalidateQueries({
        queryKey: basketQueryKeys.checkoutDetailsRoot(session?.user.backendId),
      });
    },
  });
}
