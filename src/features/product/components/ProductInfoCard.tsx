"use client";

import { useState } from "react";
import { ScaleIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";
import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import { AddToCartButton } from "@/features/product/components/AddToCartButton";
import { formatDiscountPercent } from "@/features/product/lib/format-price";
import type { CartItem } from "@/features/cart/model/cart";
import { cn } from "@/lib/utils";

export interface ProductColor {
  id: string;
  hex: string;
  label: string;
}

interface ProductInfoCardProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  colors?: ProductColor[];
  cartItem: CartItem;
  storeProductId: number | null;
  inventory: number;
  isAvailable: boolean;
  selectedColorId?: string;
  onColorSelect?: (colorId: string) => void;
}

function formatPrice(n: number): string {
  return n.toLocaleString("fa-IR");
}

const GUARANTEES = [
  { icon: TruckIcon, label: "۷ روز ضمانت بازگشت بی قید و شرط" },
  { icon: ShieldCheckIcon, label: "گارانتی ۱۲ ماهه اتکالاین" },
  { icon: ScaleIcon, label: "شرایط مرجوع کالا" },
];

export function ProductGuarantees({ className }: { className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {GUARANTEES.map(({ icon: Icon, label }) => (
        <li key={label} className="flex gap-2 text-sm text-gray-600">
          <Icon className="size-5 text-gray-400" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

interface ProductColorPickerProps {
  colors: ProductColor[];
  className?: string;
  selectedColorId?: string;
  onColorSelect?: (colorId: string) => void;
}

export function ProductColorPicker({
  colors,
  className,
  selectedColorId,
  onColorSelect,
}: ProductColorPickerProps) {
  const [uncontrolledSelectedColor, setUncontrolledSelectedColor] = useState(colors[0]?.id ?? "");
  const selectedColor = selectedColorId ?? uncontrolledSelectedColor;

  function selectColor(colorId: string) {
    onColorSelect?.(colorId);

    if (!onColorSelect) {
      setUncontrolledSelectedColor(colorId);
    }
  }

  if (colors.length === 0) {
    return (
      <p className={cn("text-muted-foreground text-sm", className)}>
        تنوع رنگی برای این محصول ثبت نشده است.
      </p>
    );
  }

  return (
    <div className={cn("mb-4", className)}>
      <p className="mb-3 text-sm text-gray-600">انتخاب رنگ :</p>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => selectColor(color.id)}
            title={color.label}
            className={cn(
              "size-10 rounded-full border-2 transition-all",
              selectedColor === color.id ? "border-primary scale-110 shadow" : "border-gray-300",
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}

export function ProductInfoCard({
  price,
  originalPrice,
  discount,
  colors = [],
  cartItem,
  storeProductId,
  inventory,
  isAvailable,
  selectedColorId,
  onColorSelect,
}: ProductInfoCardProps) {
  return (
    <div className="sticky top-36 w-full shrink-0 rounded-[16px] border border-gray-200 bg-white p-4">
      {/* Price */}
      <div className="flex items-start">
        {discount && (
          <div className="bg-primary-hover flex size-12 items-center justify-center rounded-md text-sm font-bold text-white">
            %{formatDiscountPercent(discount)}
          </div>
        )}
        <div className="ms-auto flex flex-col items-end">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-gray-800">{formatPrice(price)}</span>
            <TomanIcon className="size-4.5 text-gray-500" />
          </div>
          {originalPrice && <s className="text-sm text-gray-400">{formatPrice(originalPrice)}</s>}
        </div>
      </div>

      <p
        className={cn(
          "mt-3 text-sm font-medium",
          isAvailable ? "text-emerald-700" : "text-destructive",
        )}
      >
        {isAvailable ? `${formatPrice(inventory)} عدد موجود در انبار` : "این محصول ناموجود است"}
      </p>

      <div className="my-4 h-px bg-gray-100" />

      {/* Color picker */}
      <ProductColorPicker
        colors={colors}
        selectedColorId={selectedColorId}
        onColorSelect={onColorSelect}
      />

      <div className="my-4 h-px bg-gray-100" />

      {/* Guarantees */}
      <ProductGuarantees className="mb-6" />

      {/* Add to cart */}
      <AddToCartButton
        item={cartItem}
        storeProductId={storeProductId}
        unavailable={!isAvailable}
        className="bg-primary flex w-full items-center justify-center gap-2 rounded-[28px] py-3 text-sm font-semibold transition-opacity hover:opacity-90"
        quantityClassName="justify-center"
      />
    </div>
  );
}
