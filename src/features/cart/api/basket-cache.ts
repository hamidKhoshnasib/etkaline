import type { OpenBasket } from "./get-open-basket";

export function updateCachedBasketQuantity(
  basket: OpenBasket | null | undefined,
  storeProductId: number,
  quantity: number,
): OpenBasket | null | undefined {
  if (!basket) {
    return basket;
  }

  const item = basket.basketItems.find(
    (basketItem) => basketItem.storeProductId === storeProductId,
  );
  if (!item || item.productCount === quantity) {
    return basket;
  }

  const quantityDelta = quantity - item.productCount;
  const finalUnitPrice = item.offPrice > 0 ? item.offPrice : item.mainPrice;

  return {
    ...basket,
    itemCount: Math.max(0, basket.itemCount + quantityDelta),
    totalMainPrice: Math.max(0, basket.totalMainPrice + quantityDelta * item.mainPrice),
    totalOffPrice: Math.max(0, basket.totalOffPrice + quantityDelta * finalUnitPrice),
    basketItems: basket.basketItems.map((basketItem) =>
      basketItem.storeProductId === storeProductId
        ? { ...basketItem, productCount: quantity }
        : basketItem,
    ),
  };
}

export function removeCachedBasketItem(
  basket: OpenBasket | null | undefined,
  storeProductId: number,
): OpenBasket | null | undefined {
  if (!basket) {
    return basket;
  }

  const item = basket.basketItems.find(
    (basketItem) => basketItem.storeProductId === storeProductId,
  );
  if (!item) {
    return basket;
  }

  const finalUnitPrice = item.offPrice > 0 ? item.offPrice : item.mainPrice;

  return {
    ...basket,
    productCount: Math.max(0, basket.productCount - 1),
    itemCount: Math.max(0, basket.itemCount - item.productCount),
    totalMainPrice: Math.max(0, basket.totalMainPrice - item.productCount * item.mainPrice),
    totalOffPrice: Math.max(0, basket.totalOffPrice - item.productCount * finalUnitPrice),
    basketItems: basket.basketItems.filter(
      (basketItem) => basketItem.storeProductId !== storeProductId,
    ),
  };
}
