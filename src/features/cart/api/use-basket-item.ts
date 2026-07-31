"use client";

import { useAddToBasket } from "./add-to-basket";
import { useDeleteBasketItem } from "./delete-basket-item";
import { useOpenBasket } from "./get-open-basket";
import { useUpdateBasketQuantity } from "./update-basket-quantity";

export function useBasketItem(storeProductId: number | null) {
  const basketQuery = useOpenBasket();
  const addMutation = useAddToBasket();
  const updateMutation = useUpdateBasketQuantity();
  const deleteMutation = useDeleteBasketItem();
  const basket = basketQuery.data;
  const item =
    storeProductId === null
      ? undefined
      : basket?.basketItems.find((basketItem) => basketItem.storeProductId === storeProductId);

  async function setQuantity(quantity: number) {
    if (storeProductId === null) {
      throw new Error("شناسه کالا برای تغییر سبد خرید معتبر نیست.");
    }

    if (quantity < 1) {
      if (!basket || !item) {
        return;
      }
      await deleteMutation.mutateAsync({ storeProductId, basketId: basket.id });
      return;
    }

    if (item && basket) {
      await updateMutation.mutateAsync({ storeProductId, quantity, basketId: basket.id });
      return;
    }

    await addMutation.mutateAsync({ storeProductId, quantity });
  }

  async function increase(quantity = 1) {
    await setQuantity((item?.productCount ?? 0) + quantity);
  }

  async function decrease(quantity = 1) {
    if (!item) {
      return;
    }
    await setQuantity(item.productCount - quantity);
  }

  async function remove() {
    await setQuantity(0);
  }

  return {
    basket,
    item,
    quantity: item?.productCount ?? 0,
    isLoading: basketQuery.isPending,
    isError: basketQuery.isError,
    error: basketQuery.error,
    isMutating: addMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    setQuantity,
    increase,
    decrease,
    remove,
  };
}
