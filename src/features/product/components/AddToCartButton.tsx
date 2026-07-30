"use client";

import { MinusIcon, Trash2Icon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSyncExternalStore } from "react";
import { toast } from "sonner";
import { useAddToBasket } from "@/features/cart/api/add-to-basket";
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
  storeProductId: number | null;
  className?: string;
  quantityClassName?: string;
  showIcon?: boolean;
}

export function AddToCartButton({
  item,
  storeProductId,
  className,
  quantityClassName,
  showIcon = false,
}: AddToCartButtonProps) {
  const { status } = useSession();
  const { isPending, mutateAsync } = useAddToBasket();
  const cartItems = useSyncExternalStore(
    subscribeToMockCart,
    getMockCartItems,
    getMockCartServerSnapshot,
  );
  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);

  async function handleAddToCart() {
    if (isPending || storeProductId === null) {
      return;
    }

    if (status !== "authenticated") {
      window.dispatchEvent(new Event("etkala:open-auth"));
      return;
    }

    try {
      await mutateAsync({ storeProductId, quantity: 1 });
      addMockCartItem(item);
      toast.success("کالا به سبد خرید اضافه شد.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "افزودن کالا به سبد خرید ناموفق بود.");
    }
  }

  function handleQuantityIncrease() {
    void handleAddToCart();
  }

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
          className="bg-primary text-secondary hover:bg-primary-hover flex size-13 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleQuantityIncrease}
          disabled={isPending || storeProductId === null}
        >
          <PlusIcon className="size-5" />
        </button>
        <span className="text-secondary min-w-4 text-center text-base font-bold">
          {cartItem.quantity.toLocaleString("fa-IR")}
        </span>
        <button
          type="button"
          aria-label={cartItem.quantity === 1 ? "حذف کالا از سبد خرید" : "کاهش تعداد"}
          className="text-destructive hover:bg-muted border-border flex size-13 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
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
    <button
      type="button"
      className={cn("disabled:cursor-not-allowed disabled:opacity-60", className)}
      onClick={() => void handleAddToCart()}
      disabled={isPending || storeProductId === null}
      aria-busy={isPending}
    >
      {showIcon && <ShoppingCartIcon className="size-4" />}
      {isPending ? "در حال افزودن..." : "افزودن به سبد خرید"}
    </button>
  );
}
