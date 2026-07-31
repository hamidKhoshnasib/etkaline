"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { removeCachedBasketItem } from "./basket-cache";
import { basketQueryKeys } from "./basket-query-keys";
import { removeCachedCheckoutItem } from "./checkout-cache";
import type { CheckoutDetails } from "./get-checkout-details";
import type { OpenBasket } from "./get-open-basket";
import { waitForBasketQuantityUpdates } from "./update-basket-quantity";

interface DeleteBasketItemResponse {
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

export interface DeleteBasketItemInput {
  storeProductId: number;
  basketId: number;
}

interface DeleteBasketMutationContext {
  previousBasket: OpenBasket | null | undefined;
  previousCheckoutDetails: Array<[readonly unknown[], CheckoutDetails | undefined]>;
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

  await waitForBasketQuantityUpdates(input.basketId, input.storeProductId);

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
  const { data: session } = useSession();
  const queryKey = basketQueryKeys.open(session?.user.backendId);

  return useMutation<void, Error, DeleteBasketItemInput, DeleteBasketMutationContext>({
    mutationKey: [...basketQueryKeys.all, "delete-item"],
    mutationFn: deleteBasketItem,
    onMutate: async (input) => {
      const checkoutQueryKey = basketQueryKeys.checkoutDetailsRoot(session?.user.backendId);
      await Promise.all([
        queryClient.cancelQueries({ queryKey }),
        queryClient.cancelQueries({ queryKey: checkoutQueryKey }),
      ]);
      const previousBasket = queryClient.getQueryData<OpenBasket | null>(queryKey);
      const previousCheckoutDetails = queryClient.getQueriesData<CheckoutDetails>({
        queryKey: checkoutQueryKey,
      });
      queryClient.setQueryData<OpenBasket | null>(queryKey, (basket) =>
        removeCachedBasketItem(basket, input.storeProductId),
      );
      queryClient.setQueriesData<CheckoutDetails>({ queryKey: checkoutQueryKey }, (details) =>
        removeCachedCheckoutItem(details, input.storeProductId),
      );
      return { previousBasket, previousCheckoutDetails };
    },
    onError: (_error, _input, context) => {
      queryClient.setQueryData(queryKey, context?.previousBasket);
      context?.previousCheckoutDetails.forEach(([checkoutQueryKey, details]) => {
        queryClient.setQueryData(checkoutQueryKey, details);
      });
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey }),
        queryClient.invalidateQueries({
          queryKey: basketQueryKeys.checkoutDetailsRoot(session?.user.backendId),
        }),
      ]);
    },
  });
}
