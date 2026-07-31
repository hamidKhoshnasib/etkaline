export const basketQueryKeys = {
  all: ["basket"] as const,
  open: (customerId?: number) => ["basket", "open", customerId ?? "anonymous"] as const,
  checkoutDetailsRoot: (customerId?: number) =>
    ["basket", "checkout-details", customerId ?? "anonymous"] as const,
  checkoutDetails: (customerId: number | undefined, basketId: number, removeDiscount: boolean) =>
    [...basketQueryKeys.checkoutDetailsRoot(customerId), basketId, { removeDiscount }] as const,
};
