import type { CheckoutDetails } from "./get-checkout-details";

export function updateCachedCheckoutQuantity(
  details: CheckoutDetails | undefined,
  storeProductId: number,
  quantity: number,
): CheckoutDetails | undefined {
  if (!details) {
    return details;
  }

  const item = details.basketItems.find(
    (basketItem) => basketItem.storeProductId === storeProductId,
  );
  if (!item || item.productCount === quantity) {
    return details;
  }

  return {
    ...details,
    count: Math.max(0, details.count + quantity - item.productCount),
    basketItems: details.basketItems.map((basketItem) =>
      basketItem.storeProductId === storeProductId
        ? { ...basketItem, productCount: quantity }
        : basketItem,
    ),
  };
}

export function removeCachedCheckoutItem(
  details: CheckoutDetails | undefined,
  storeProductId: number,
): CheckoutDetails | undefined {
  if (!details) {
    return details;
  }

  const item = details.basketItems.find(
    (basketItem) => basketItem.storeProductId === storeProductId,
  );
  if (!item) {
    return details;
  }

  return {
    ...details,
    count: Math.max(0, details.count - item.productCount),
    basketItems: details.basketItems.filter(
      (basketItem) => basketItem.storeProductId !== storeProductId,
    ),
  };
}
