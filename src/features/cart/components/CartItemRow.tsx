"use client";

import { Minus, Palette, Plus, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "@/components/ui/image";
import Price from "@/features/cart/checkout/Price";
import type { OpenBasketItem } from "@/features/cart";
import { formatDiscountPercent } from "@/features/product/lib/format-price";
import { cn } from "@/lib/utils";
import { useStorefront } from "@/providers/storefront-provider";

interface CartItemRowProps {
  item: OpenBasketItem;
  isDeleting: boolean;
  pendingRemoval?: { seconds: number; progress: number };
  isRestoring?: boolean;
  onQuantityChange: (item: OpenBasketItem, quantity: number) => void;
  onUndoRemoval: (storeProductId: number) => void;
}

export function RestoreButton({
  countdown,
  onClick,
  disabled = false,
}: {
  countdown: { seconds: number; progress: number };
  onClick: () => void;
  disabled?: boolean;
}) {
  const circumference = 2 * Math.PI * 10;
  const dashOffset = circumference * (1 - countdown.progress);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="h-9 gap-2 rounded-full bg-[#FFF1F2] px-3 text-[#E11D48] hover:bg-[#FFF1F2] hover:text-[#E11D48]"
    >
      بازگردانی
      <span className="relative grid size-6 place-items-center" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="absolute size-full -rotate-90">
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.2"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-[stroke-dashoffset] duration-75 ease-linear"
          />
        </svg>
        <span className="text-[10px] font-bold">{countdown.seconds.toLocaleString("fa-IR")}</span>
      </span>
    </Button>
  );
}

export default function CartItemRow({
  item,
  isDeleting,
  pendingRemoval,
  isRestoring = false,
  onQuantityChange,
  onUndoRemoval,
}: CartItemRowProps) {
  const storefront = useStorefront();
  const image = item.picUrl || item.pic || "/images/image-placeholder.svg";
  const finalPrice = item.offPrice > 0 ? item.offPrice : item.mainPrice;
  const hasDiscount = item.offPercent > 0 && item.offPrice > 0;
  const property = [item.propertyTitle, item.valueTitle].filter(Boolean).join(": ");
  const productHref =
    Number.isSafeInteger(item.productId) && item.productId > 0
      ? storefront.productHref(item.productId, item.productTitle)
      : null;

  return (
    <article
      className={cn(
        "bg-card border-border relative grid min-h-32 grid-cols-[5.5rem_minmax(0,1fr)] gap-x-3 gap-y-4 rounded-xl border p-3 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:p-4",
        !item.hasInventory && "opacity-55",
      )}
      aria-busy={isDeleting}
    >
      {productHref ? (
        <Link
          href={productHref}
          aria-label={`مشاهده ${item.productTitle}`}
          className="focus-visible:outline-primary absolute inset-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="sr-only">مشاهده جزئیات محصول</span>
        </Link>
      ) : null}
      <div className="bg-muted row-span-2 flex size-22 items-center justify-center overflow-hidden rounded-lg sm:size-26">
        <AppImage
          src={image}
          alt={item.productTitle}
          width={104}
          height={104}
          sizes="(min-width: 640px) 104px, 88px"
          className="size-full object-cover"
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
            {item.hasInventory ? "گارانتی سلامت و اصالت کالا" : "موجود نیست"}
          </span>
        </div>

        <div className="mt-auto flex flex-col items-start gap-1">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <Badge variant="offer">{formatDiscountPercent(item.offPercent)}٪</Badge>
              <s className="text-muted-foreground text-xs">
                {item.mainPrice.toLocaleString("fa-IR")}
              </s>
            </div>
          ) : null}
          <Price value={finalPrice} className="text-secondary text-sm font-bold sm:text-base" />
        </div>
      </div>

      <div className="relative z-10 col-start-2 flex min-h-9 items-center justify-end gap-2 self-end sm:col-start-3 sm:row-start-1 sm:row-end-3 sm:min-w-28">
        {item.hasInventory ? (
          <>
            <Button
              type="button"
              size="icon-sm"
              className="rounded-full"
              disabled={isDeleting || pendingRemoval !== undefined}
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
            {item.productCount === 1 && pendingRemoval ? (
              <RestoreButton
                countdown={pendingRemoval}
                disabled={isRestoring}
                onClick={() => onUndoRemoval(item.storeProductId)}
              />
            ) : (
              <Button
                type="button"
                size="icon-sm"
                variant={item.productCount === 1 ? "destructive" : "outline-primary"}
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
            )}
          </>
        ) : (
          <>
            {productHref ? (
              <Button
                size="sm"
                variant="outline"
                render={<Link href={productHref} />}
                className="rounded-full"
              >
                مشاهده محصول
              </Button>
            ) : null}
            {pendingRemoval ? (
              <RestoreButton
                countdown={pendingRemoval}
                disabled={isRestoring}
                onClick={() => onUndoRemoval(item.storeProductId)}
              />
            ) : (
              <Button
                type="button"
                size="icon-sm"
                variant="destructive"
                className="rounded-full"
                aria-label={`حذف ${item.productTitle} از سبد خرید`}
                disabled={isDeleting}
                onClick={() => onQuantityChange(item, 0)}
              >
                <Trash2 />
              </Button>
            )}
          </>
        )}
      </div>
    </article>
  );
}
