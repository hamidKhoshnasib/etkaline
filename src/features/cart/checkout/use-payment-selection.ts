"use client";

import { useCallback, useState } from "react";

export type PaymentMethod = "gateway" | "wallet";
export const WALLET_BALANCE = 5_000_000;

// انتخاب روش پرداخت از UI جدا شده تا بعداً به API سفارش و درگاه متصل شود
export function usePaymentSelection(total = 183_000_000) {
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const walletInsufficient = WALLET_BALANCE < total;

  const selectMethod = useCallback(
    (next: PaymentMethod) => {
      if (next === "wallet" && walletInsufficient) {
        return;
      }
      setMethod(next);
    },
    [walletInsufficient],
  );

  return { method, walletInsufficient, selectMethod };
}
