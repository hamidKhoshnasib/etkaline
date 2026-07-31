import type { CartItem } from "./cart";

// وضعیت‌های مجاز checkout در یک ماشین حالت ساده و قابل تست
export type CheckoutStep = "cart" | "address" | "review";
export type ParcelKind = "heavy" | "light";

export interface DeliverySelection {
  dateIso: string;
  dateLabel: string;
  time: string;
  pickup: boolean;
}

export type DeliverySelections = Partial<Record<ParcelKind, DeliverySelection>>;
export const CHECKOUT_COSTS = {
  shipping: 183_000_000,
  service: 183_000_000,
  discount: 5_000_000,
  hekmatDiscount: 1_000_000,
} as const;

export function calculateCartTotals(items: CartItem[], step: CheckoutStep) {
  const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hekmatDiscount = step === "cart" ? 0 : CHECKOUT_COSTS.hekmatDiscount;
  return {
    itemsTotal,
    shipping: CHECKOUT_COSTS.shipping,
    service: CHECKOUT_COSTS.service,
    discount: CHECKOUT_COSTS.discount,
    hekmatDiscount,
    grandTotal:
      itemsTotal + CHECKOUT_COSTS.shipping + CHECKOUT_COSTS.service - CHECKOUT_COSTS.discount,
  };
}

export function nextCheckoutStep(step: CheckoutStep, addressReady: boolean): CheckoutStep {
  if (step === "cart") {
    return "address";
  }
  if (step === "address" && addressReady) {
    return "review";
  }
  return step;
}
