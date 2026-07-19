"use client";

import { MinusIcon, Trash2Icon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  addMockCartItem,
  getMockCartItems,
  getMockCartServerSnapshot,
  removeMockCartItem,
  subscribeToMockCart,
  updateMockCartItemQuantity,
} from "@/features/cart/lib/mock-cart-storage";
import type { CartItem } from "@/features/cart/model/cart";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  item: CartItem;
  className?: string;
  quantityClassName?: string;
  showIcon?: boolean;
}

export function AddToCartButton({
  item,
  className,
  quantityClassName,
  showIcon = false,
}: AddToCartButtonProps) {
  const cartItems = useSyncExternalStore(
    subscribeToMockCart,
    getMockCartItems,
    getMockCartServerSnapshot,
  );
  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);

  const handleAddToCart = () => {
    addMockCartItem(item);
  };

  if (cartItem) {
    return (
      <div
        className={cn("flex items-center gap-5", quantityClassName)}
        role="group"
        aria-label="تعداد کالا در سبد خرید"
      >
        <button
          type="button"
          aria-label="افزایش تعداد"
          className="bg-primary text-secondary hover:bg-primary-hover flex size-13 items-center justify-center rounded-full transition-colors"
          onClick={() => updateMockCartItemQuantity(item.id, cartItem.quantity + 1)}
        >
          <PlusIcon className="size-5" />
        </button>
        <span className="text-secondary min-w-4 text-center text-base font-bold">
          {cartItem.quantity.toLocaleString("fa-IR")}
        </span>
        <button
          type="button"
          aria-label={cartItem.quantity === 1 ? "حذف کالا از سبد خرید" : "کاهش تعداد"}
          className="text-destructive hover:bg-muted border-border flex size-13 items-center justify-center rounded-full border transition-colors"
          onClick={() =>
            cartItem.quantity === 1
              ? removeMockCartItem(item.id)
              : updateMockCartItemQuantity(item.id, cartItem.quantity - 1)
          }
        >
          {cartItem.quantity === 1 ? (
            <Trash2Icon className="size-5" />
          ) : (
            <MinusIcon className="size-5" />
          )}
        </button>
      </div>
    );
  }

  return (
    <button type="button" className={cn(className)} onClick={handleAddToCart}>
      {showIcon && <ShoppingCartIcon className="size-4" />}
      افزودن به سبد خرید
    </button>
  );
}
