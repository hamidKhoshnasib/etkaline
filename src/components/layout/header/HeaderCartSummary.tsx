"use client";

import Link from "next/link";
import { Minus, Plus, Refrigerator, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBasketItem, useOpenBasket, useUpdateBasketQuantity } from "@/features/cart";

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

export function HeaderCartSummary() {
  const { data: basket, isError, isPending } = useOpenBasket();
  const { isPending: isUpdatingQuantity, mutateAsync: updateQuantity } = useUpdateBasketQuantity();
  const { isPending: isDeletingItem, mutateAsync: deleteItem } = useDeleteBasketItem();
  const items = basket?.basketItems ?? [];
  const itemCount = basket?.itemCount ?? 0;
  const totalPrice = basket?.totalOffPrice ?? 0;
  const isChangingBasket = isUpdatingQuantity || isDeletingItem;

  async function changeQuantity(storeProductId: number, quantity: number) {
    if (!basket || isChangingBasket) {
      return;
    }

    try {
      await updateQuantity({ storeProductId, quantity, basketId: basket.id });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تغییر تعداد کالا ناموفق بود.");
    }
  }

  async function removeItem(storeProductId: number) {
    if (!basket || isChangingBasket) {
      return;
    }

    try {
      await deleteItem({ storeProductId, basketId: basket.id });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "حذف کالا از سبد خرید ناموفق بود.");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={`سبد خرید، ${itemCount} کالا`}
            className="text-secondary relative flex size-12.5 items-center justify-center"
          />
        }
      >
        <ShoppingCart className="size-5 text-[#94A3B8]" strokeWidth={1.8} aria-hidden="true" />
        {itemCount > 0 && (
          <span className="bg-primary text-primary-foreground absolute inset-s-1 top-1 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
            {itemCount > 99 ? "۹۹+" : formatPrice(itemCount)}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[400px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[28px] p-0"
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-secondary text-lg font-bold">سبد خرید</h2>
          <p className="text-secondary text-sm">{itemCount} کالا</p>
        </div>

        <div className="max-h-[min(470px,calc(100dvh-15rem))] space-y-2 overflow-y-auto bg-white px-4 py-3">
          {isPending ? (
            <p className="text-muted-foreground py-10 text-center" aria-busy="true">
              در حال دریافت سبد خرید...
            </p>
          ) : null}

          {isError ? (
            <p className="text-destructive py-10 text-center">دریافت سبد خرید ناموفق بود.</p>
          ) : null}

          {!isPending && !isError
            ? items.map((item) => {
                const price = item.offPrice > 0 ? item.offPrice : item.mainPrice;

                return (
                  <article key={item.id} className="bg-muted/70 rounded-2xl p-3">
                    <div className="flex gap-3">
                      <div className="flex size-15 shrink-0 items-center justify-center rounded-lg border bg-white">
                        <Refrigerator
                          className="text-secondary/70 size-10"
                          strokeWidth={1.25}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-secondary line-clamp-2 text-sm leading-6 font-medium">
                          {item.productTitle}
                        </h3>
                        <p className="text-secondary/70 mt-1 text-xs">
                          {item.valueTitle || "بدون مشخصات"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-secondary text-sm font-bold">
                        {formatPrice(price)} تومان
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="icon"
                          aria-label={`افزایش تعداد ${item.productTitle}`}
                          aria-busy={isChangingBasket}
                          disabled={isChangingBasket}
                          onClick={() =>
                            void changeQuantity(item.storeProductId, item.productCount + 1)
                          }
                          className="bg-primary text-secondary hover:bg-primary/85 size-8 rounded-full"
                        >
                          <Plus />
                        </Button>
                        <span className="min-w-4 text-center text-xs font-bold">
                          {formatPrice(item.productCount)}
                        </span>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          aria-label={
                            item.productCount === 1 ? "حذف کالا از سبد خرید" : "کاهش تعداد"
                          }
                          aria-busy={isChangingBasket}
                          disabled={isChangingBasket}
                          onClick={() =>
                            item.productCount === 1
                              ? void removeItem(item.storeProductId)
                              : void changeQuantity(item.storeProductId, item.productCount - 1)
                          }
                          className="size-8 rounded-full"
                        >
                          {item.productCount === 1 ? <Trash2 /> : <Minus />}
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })
            : null}

          {!isPending && !isError && items.length === 0 ? (
            <p className="text-muted-foreground py-10 text-center">سبد خرید شما خالی است.</p>
          ) : null}
        </div>

        {items.length > 0 && (
          <footer className="flex items-center justify-between border-t bg-white px-6 py-4">
            <div>
              <p className="text-secondary text-sm font-bold">
                مجموع: {formatPrice(totalPrice)} تومان
              </p>
              <p className="text-secondary/70 mt-1 text-xs">{itemCount} کالا</p>
            </div>
            <Button
              render={<Link href="/cart" />}
              disabled={isPending || isError}
              className="bg-primary text-secondary hover:bg-primary/85 h-11 rounded-full px-5"
            >
              تکمیل خرید
            </Button>
          </footer>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
