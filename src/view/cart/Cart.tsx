"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import CartStep from "@/view/cart/CartStep";
import AddressStep from "@/view/cart/AddressStep";
import ReviewStep from "@/view/cart/ReviewStep";
import OrderSummary from "@/view/cart/OrderSummary";
import { CART_ITEMS, type CartItem } from "@/view/cart/cart.data";

export type CheckoutStep = "cart" | "address" | "review";

export default function CartPage() {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [items, setItems] = useState<CartItem[]>(CART_ITEMS);
  const [addressReady, setAddressReady] = useState(false);

  const handleQuantityChange = (id: number, quantity: number) =>
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));

  const handleReadyChange = useCallback((ready: boolean) => setAddressReady(ready), []);

  const handlePrimary = () => {
    if (step === "cart") {
      setStep("address");
    } else if (step === "address") {
      setStep("review");
    } else {
      toast.success("سفارش شما با موفقیت ثبت شد.");
    }
  };

  const canProceed = step === "address" ? addressReady : true;

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 pt-6 pb-12 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0">
        {step === "cart" && <CartStep items={items} onQuantityChange={handleQuantityChange} />}
        {step === "address" && <AddressStep onReadyChange={handleReadyChange} />}
        {step === "review" && <ReviewStep onEdit={() => setStep("address")} />}
      </div>

      <OrderSummary step={step} items={items} canProceed={canProceed} onPrimary={handlePrimary} />
    </main>
  );
}
