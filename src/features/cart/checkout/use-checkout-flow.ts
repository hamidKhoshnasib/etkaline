"use client";

import { useCallback, useState } from "react";
import { CART_ITEMS } from "@/features/cart/fixtures/cart";
import { nextCheckoutStep, type CheckoutStep } from "@/features/cart/model/checkout";
import type { CartItem } from "@/features/cart/model/cart";

// state و transitionهای checkout در یک hook متمرکز می‌شوند تا Cart فقط composition باشد
export function useCheckoutFlow() {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [items, setItems] = useState<CartItem[]>(CART_ITEMS);
  const [addressReady, setAddressReady] = useState(false);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)),
    );
  }, []);
  const markAddressReady = useCallback((ready: boolean) => setAddressReady(ready), []);
  const continueFlow = useCallback(() => {
    setStep((current) => nextCheckoutStep(current, addressReady));
  }, [addressReady]);
  const editAddress = useCallback(() => setStep("address"), []);

  return {
    step,
    items,
    canProceed: step !== "address" || addressReady,
    updateQuantity,
    markAddressReady,
    continueFlow,
    editAddress,
  };
}
