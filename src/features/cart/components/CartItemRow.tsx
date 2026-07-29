"use client";

import { AppImage } from "@/components/ui/image";
import { Minus, Plus, Palette, ShieldCheck, Trash2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import Price from "@/features/cart/checkout/Price";
import { type CartItem, toPersian } from "@/features/cart/fixtures/cart";
import { formatDiscountPercent } from "@/features/product/lib/format-price";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: number, quantity: number) => void;
}

export default function CartItemRow({ item, onQuantityChange }: CartItemRowProps) {
  const dec = () => onQuantityChange(item.id, item.quantity - 1);
  const inc = () => onQuantityChange(item.id, item.quantity + 1);

  return (
    <div className="flex gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4">
      {/* Image */}
      <div className="size-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
        <AppImage
          src={item.image}
          alt={item.title}
          width={96}
          height={96}
          className="size-full object-contain p-1"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-2">
        <p className="body-medium line-clamp-2 text-[#1E293B]">{item.title}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#64748B]">
          <span className="body-small flex items-center gap-1">
            <Palette className="size-4" />
            رنگ: {item.color}
          </span>
          <span className="body-small flex items-center gap-1">
            <ShieldCheck className="size-4" />
            {item.warranty}
          </span>
          {item.returnable && (
            <span className="body-small flex items-center gap-1 rounded-md bg-[#FEE2E2] px-2 py-0.5 text-[#EF4444]">
              <RotateCcw className="size-3.5" />
              بازگردانی
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2">
          {item.discount && item.originalPrice && (
            <>
              <span className="label-small rounded bg-[#F57F17] px-1.5 py-0.5 text-white">
                {formatDiscountPercent(item.discount)}٪
              </span>
              <s className="label-small text-gray-400">
                {item.originalPrice.toLocaleString("fa-IR")}
              </s>
            </>
          )}
          <Price value={item.price} className="body-medium-bold text-secondary" />
        </div>
      </div>

      {/* Quantity stepper */}
      <div className="flex flex-col items-center justify-between">
        <button
          onClick={inc}
          aria-label="افزایش تعداد"
          className="bg-primary text-secondary hover:bg-primary-hover flex size-8 items-center justify-center rounded-full transition-colors"
        >
          <Plus className="size-4" />
        </button>

        <span className="body-medium-bold text-secondary">{toPersian(item.quantity)}</span>

        <button
          onClick={dec}
          aria-label={item.quantity === 1 ? "حذف کالا" : "کاهش تعداد"}
          className={cn(
            "flex size-8 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50",
            item.quantity === 1 ? "text-[#EF4444]" : "text-secondary",
          )}
        >
          {item.quantity === 1 ? <Trash2 className="size-4" /> : <Minus className="size-4" />}
        </button>
      </div>
    </div>
  );
}
