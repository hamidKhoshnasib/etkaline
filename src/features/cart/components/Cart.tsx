"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { Container } from "@/components/ui/Container";
import CartStep from "@/features/cart/components/CartStep";
import AddressStep from "@/features/cart/checkout/AddressStep";
import ReviewStep from "@/features/cart/checkout/ReviewStep";
import OrderSummary from "@/features/cart/checkout/OrderSummary";
import {
  getMockCartItems,
  getMockCartServerSnapshot,
  removeMockCartItem,
  subscribeToMockCart,
  updateMockCartItemQuantity,
} from "@/features/cart/lib/mock-cart-storage";

export type CheckoutStep = "cart" | "address" | "review";

export default function CartPage() {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [addressReady, setAddressReady] = useState(false);
  const items = useSyncExternalStore(
    subscribeToMockCart,
    getMockCartItems,
    getMockCartServerSnapshot,
  );

  const handleQuantityChange = (id: number, quantity: number) =>
    quantity < 1 ? removeMockCartItem(id) : updateMockCartItemQuantity(id, quantity);

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
    <Container
      as="main"
      className="grid grid-cols-1 gap-6 pt-6 pb-12 lg:grid-cols-[minmax(0,1fr)_360px]"
    >
      <div className="min-w-0">
        {step === "cart" && <CartStep items={items} onQuantityChange={handleQuantityChange} />}
        {step === "address" && <AddressStep onReadyChange={handleReadyChange} />}
        {step === "review" && <ReviewStep onEdit={() => setStep("address")} />}
      </div>

      <OrderSummary step={step} items={items} canProceed={canProceed} onPrimary={handlePrimary} />
    </Container>
  );
}
