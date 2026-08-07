"use client";

import { MinusIcon, Trash2Icon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useBasketItem } from "@/features/cart/api/use-basket-item";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  storeProductId: number | null;
  className?: string;
  quantityClassName?: string;
  showIcon?: boolean;
  unavailable?: boolean;
}

export function AddToCartButton({
  storeProductId,
  className,
  quantityClassName,
  showIcon = false,
  unavailable = false,
}: AddToCartButtonProps) {
  const { status } = useSession();
  const basketItem = useBasketItem(storeProductId);
  const isInitialMutation = basketItem.isAdding || basketItem.isDeleting;

  async function handleAddToCart() {
    if (isInitialMutation || storeProductId === null || unavailable) {
      return;
    }

    if (status !== "authenticated") {
      window.dispatchEvent(new Event("etkala:open-auth"));
      return;
    }

    try {
      const wasInBasket = basketItem.quantity > 0;
      await basketItem.increase();
      if (!wasInBasket) {
        toast.success("کالا به سبد خرید اضافه شد.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "افزودن کالا به سبد خرید ناموفق بود.");
    }
  }

  function handleQuantityIncrease() {
    void handleAddToCart();
  }

  async function handleQuantityDecrease() {
    try {
      await basketItem.decrease();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تغییر تعداد کالا ناموفق بود.");
    }
  }

  if (basketItem.quantity > 0) {
    return (
      <div
        className={cn("flex items-center gap-5", quantityClassName)}
        role="group"
        aria-label="تعداد کالا در سبد خرید"
      >
        <button
          type="button"
          aria-label="افزایش تعداد"
          className="bg-primary text-secondary hover:bg-primary-hover flex size-13 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleQuantityIncrease}
          disabled={isInitialMutation || storeProductId === null || unavailable}
        >
          <PlusIcon className="size-5" />
        </button>
        <span className="text-secondary min-w-4 text-center text-base font-bold">
          {basketItem.quantity.toLocaleString("fa-IR")}
        </span>
        <button
          type="button"
          aria-label={basketItem.quantity === 1 ? "حذف کالا از سبد خرید" : "کاهش تعداد"}
          className="text-destructive hover:bg-muted border-border flex size-13 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isInitialMutation}
          onClick={() => void handleQuantityDecrease()}
        >
          {basketItem.quantity === 1 ? (
            <Trash2Icon className="size-5" />
          ) : (
            <MinusIcon className="size-5" />
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cn("disabled:cursor-not-allowed disabled:opacity-60", className)}
      onClick={() => void handleAddToCart()}
      disabled={isInitialMutation || storeProductId === null || unavailable}
      aria-busy={isInitialMutation}
    >
      {showIcon && <ShoppingCartIcon className="size-4" />}
      {unavailable ? "ناموجود" : isInitialMutation ? "در حال افزودن..." : "افزودن به سبد خرید"}
    </button>
  );
}
