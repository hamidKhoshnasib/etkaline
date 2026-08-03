"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";
import { updateCachedBasketQuantity } from "./basket-cache";
import { basketQueryKeys } from "./basket-query-keys";
import { updateCachedCheckoutQuantity } from "./checkout-cache";
import type { CheckoutDetails } from "./get-checkout-details";
import {
  type OpenBasket,
  type OpenBasketResponse,
  parseRequiredOpenBasketResponse,
} from "./get-open-basket";

export interface UpdateBasketQuantityInput {
  storeProductId: number;
  quantity: number;
  basketId: number;
}

type QueuedBasketQuantityInput = UpdateBasketQuantityInput & { siteType: SiteType };

interface QuantityUpdateWaiter {
  resolve: (basket: OpenBasket) => void;
  reject: (error: unknown) => void;
}

interface QuantityUpdateQueue {
  pendingInput?: QueuedBasketQuantityInput;
  pendingWaiters: QuantityUpdateWaiter[];
  idleWaiters: Array<() => void>;
  lastQueuedAt: number;
  timerId?: ReturnType<typeof setTimeout>;
  inFlight: boolean;
}

const quantityUpdateQueues = new Map<string, QuantityUpdateQueue>();
const QUANTITY_DEBOUNCE_MS = 350;

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

async function updateBasketQuantity(input: QueuedBasketQuantityInput): Promise<OpenBasket> {
  validateInput(input);

  let data: OpenBasketResponse;

  try {
    ({ data } = await axiosClient.post<OpenBasketResponse>("/api/Baskets/UpdateQuantity", input, {
      headers: getSiteTypeHeaders(input.siteType),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parseRequiredOpenBasketResponse(data);
}

function quantityUpdateKey(basketId: number, storeProductId: number, siteType: SiteType) {
  return `${siteType}:${basketId}:${storeProductId}`;
}

function finishQuantityQueue(key: string, queue: QuantityUpdateQueue) {
  if (queue.inFlight || queue.pendingInput || queue.timerId) {
    return;
  }

  quantityUpdateQueues.delete(key);
  queue.idleWaiters.splice(0).forEach((resolve) => resolve());
}

function scheduleQuantityQueue(key: string, queue: QuantityUpdateQueue) {
  if (queue.inFlight || !queue.pendingInput) {
    return;
  }

  if (queue.timerId) {
    clearTimeout(queue.timerId);
  }

  const remainingDelay = Math.max(0, queue.lastQueuedAt + QUANTITY_DEBOUNCE_MS - Date.now());
  queue.timerId = setTimeout(() => {
    queue.timerId = undefined;
    const requestInput = queue.pendingInput;
    if (!requestInput) {
      finishQuantityQueue(key, queue);
      return;
    }

    const requestWaiters = queue.pendingWaiters.splice(0);
    queue.pendingInput = undefined;
    queue.inFlight = true;

    void updateBasketQuantity(requestInput)
      .then((basket) => {
        requestWaiters.forEach(({ resolve }) => resolve(basket));
      })
      .catch((error: unknown) => {
        requestWaiters.forEach(({ reject }) => reject(error));
      })
      .finally(() => {
        queue.inFlight = false;
        if (queue.pendingInput) {
          scheduleQuantityQueue(key, queue);
        } else {
          finishQuantityQueue(key, queue);
        }
      });
  }, remainingDelay);
}

export function updateBasketQuantityDebounced(
  input: QueuedBasketQuantityInput,
): Promise<OpenBasket> {
  validateInput(input);

  const key = quantityUpdateKey(input.basketId, input.storeProductId, input.siteType);
  const queue = quantityUpdateQueues.get(key) ?? {
    pendingWaiters: [],
    idleWaiters: [],
    lastQueuedAt: Date.now(),
    inFlight: false,
  };

  queue.pendingInput = input;
  queue.lastQueuedAt = Date.now();
  quantityUpdateQueues.set(key, queue);
  scheduleQuantityQueue(key, queue);

  return new Promise((resolve, reject) => {
    queue.pendingWaiters.push({ resolve, reject });
  });
}

export function waitForBasketQuantityUpdates(
  basketId: number,
  storeProductId: number,
  siteType: SiteType,
) {
  const queue = quantityUpdateQueues.get(quantityUpdateKey(basketId, storeProductId, siteType));
  if (!queue) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    queue.idleWaiters.push(resolve);
  });
}

export function useUpdateBasketQuantity() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { siteType } = useStorefront();
  const queryKey = basketQueryKeys.open(siteType, session?.user.backendId);

  return useMutation<OpenBasket, Error, UpdateBasketQuantityInput>({
    mutationKey: [...basketQueryKeys.all(siteType), "update-quantity"],
    mutationFn: (input) => updateBasketQuantityDebounced({ ...input, siteType }),
    onMutate: async (input) => {
      const checkoutQueryKey = basketQueryKeys.checkoutDetailsRoot(
        siteType,
        session?.user.backendId,
      );
      await Promise.all([
        queryClient.cancelQueries({ queryKey }),
        queryClient.cancelQueries({ queryKey: checkoutQueryKey }),
      ]);
      queryClient.setQueryData<OpenBasket | null>(queryKey, (basket) =>
        updateCachedBasketQuantity(basket, input.storeProductId, input.quantity),
      );
      queryClient.setQueriesData<CheckoutDetails>({ queryKey: checkoutQueryKey }, (details) =>
        updateCachedCheckoutQuantity(details, input.storeProductId, input.quantity),
      );
    },
    onSuccess: (basket, input) => {
      const cachedBasket = queryClient.getQueryData<OpenBasket | null>(queryKey);
      const cachedItem = cachedBasket?.basketItems.find(
        (item) => item.storeProductId === input.storeProductId,
      );

      if (cachedItem?.productCount === input.quantity) {
        queryClient.setQueryData(queryKey, basket);
        void queryClient.invalidateQueries({
          queryKey: basketQueryKeys.checkoutDetailsRoot(siteType, session?.user.backendId),
        });
      }
    },
    onError: async () => {
      await Promise.all([
        queryClient.resetQueries({ queryKey, exact: true }),
        queryClient.resetQueries({
          queryKey: basketQueryKeys.checkoutDetailsRoot(siteType, session?.user.backendId),
        }),
      ]);
    },
  });
}
