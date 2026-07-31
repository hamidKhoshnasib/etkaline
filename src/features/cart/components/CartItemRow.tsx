"use client";

import { Minus, Palette, Plus, ShieldCheck, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "@/components/ui/image";
import Price from "@/features/cart/checkout/Price";
import type { OpenBasketItem } from "@/features/cart";
import { formatDiscountPercent } from "@/features/product/lib/format-price";
import { cn } from "@/lib/utils";

interface CartItemRowProps {
  item: OpenBasketItem;
  isDeleting: boolean;
  onQuantityChange: (item: OpenBasketItem, quantity: number) => void;
}

export default function CartItemRow({ item, isDeleting, onQuantityChange }: CartItemRowProps) {
  const image = item.picUrl || item.pic || "/images/image-placeholder.svg";
  const finalPrice = item.offPrice > 0 ? item.offPrice : item.mainPrice;
  const hasDiscount = item.offPercent > 0 && item.offPrice > 0;
  const property = [item.propertyTitle, item.valueTitle].filter(Boolean).join(": ");

  return (
    <article
      className={cn(
        "bg-card border-border grid min-h-32 grid-cols-[5.5rem_minmax(0,1fr)] gap-x-3 gap-y-4 rounded-xl border p-3 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:p-4",
        !item.hasInventory && "opacity-55",
      )}
      aria-busy={isDeleting}
    >
      <div className="bg-muted row-span-2 flex size-22 items-center justify-center overflow-hidden rounded-lg sm:size-26">
        <AppImage
          src={image}
          alt={item.productTitle}
          width={104}
          height={104}
          sizes="(min-width: 640px) 104px, 88px"
          className="size-full object-contain p-2"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:pe-2">
        <h2 className="text-secondary line-clamp-2 text-sm leading-6 font-medium">
          {item.productTitle}
        </h2>

        <div className="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          {property ? (
            <span className="flex items-center gap-1.5">
              <Palette className="size-4" aria-hidden="true" />
              {property}
            </span>
          ) : null}
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4" aria-hidden="true" />
            {item.hasInventory ? "موجود در انبار" : "ناموجود"}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-end gap-2">
          <Price value={finalPrice} className="text-secondary text-sm font-bold sm:text-base" />
          {hasDiscount ? (
            <>
              <Badge variant="offer">{formatDiscountPercent(item.offPercent)}٪</Badge>
              <s className="text-muted-foreground text-xs">
                {item.mainPrice.toLocaleString("fa-IR")}
              </s>
            </>
          ) : null}
        </div>
      </div>

      <div className="col-start-2 flex min-h-9 items-center justify-end gap-2 self-end sm:col-start-3 sm:row-start-1 sm:row-end-3 sm:min-w-28">
        {item.hasInventory ? (
          <>
            <Button
              type="button"
              size="icon-sm"
              className="rounded-full"
              aria-label={`افزایش تعداد ${item.productTitle}`}
              onClick={() => onQuantityChange(item, item.productCount + 1)}
            >
              <Plus />
            </Button>
            <span
              className="text-secondary min-w-5 text-center text-sm font-bold"
              aria-live="polite"
            >
              {item.productCount.toLocaleString("fa-IR")}
            </span>
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              className="rounded-full"
              aria-label={
                item.productCount === 1
                  ? `حذف ${item.productTitle} از سبد خرید`
                  : `کاهش تعداد ${item.productTitle}`
              }
              disabled={isDeleting}
              onClick={() => onQuantityChange(item, item.productCount - 1)}
            >
              {item.productCount === 1 ? <Trash2 /> : <Minus />}
            </Button>
          </>
        ) : (
          <Badge variant="destructive">ناموجود</Badge>
        )}
      </div>
    </article>
  );
}
