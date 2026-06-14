"use client";

import { useState } from "react";
import { TruckIcon, ShieldCheckIcon, ScaleIcon, ShoppingCartIcon } from "lucide-react";
import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import { cn } from "@/lib/utils";

interface Color {
  id: string;
  hex: string;
  label: string;
}

interface ProductInfoCardProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  colors?: Color[];
}

function formatPrice(n: number): string {
  return n.toLocaleString("fa-IR");
}

const GUARANTEES = [
  { icon: TruckIcon, label: "۷ روز ضمانت بازگشت بی قید و شرط" },
  { icon: ShieldCheckIcon, label: "گارانتی ۱۲ ماهه اتکالاین" },
  { icon: ScaleIcon, label: "شرایط مرجوع کالا" },
];

export function ProductInfoCard({
  price,
  originalPrice,
  discount,
  colors = [],
}: ProductInfoCardProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.id ?? "");

  return (
    <div className="w-full shrink-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* Price */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1">
            <TomanIcon className="size-4.5 text-gray-500" />
            <span className="text-xl font-bold text-gray-800">{formatPrice(price)}</span>
          </div>
          {originalPrice && <s className="text-sm text-gray-400">{formatPrice(originalPrice)}</s>}
        </div>
        {discount && (
          <div className="flex size-12 items-center justify-center rounded-xl bg-red-500 text-sm font-bold text-white">
            %{discount}
          </div>
        )}
      </div>

      <div className="my-4 h-px bg-gray-100" />

      {/* Color picker */}
      {colors.length > 0 && (
        <div className="mb-4">
          <p className="mb-3 text-sm text-gray-600">انتخاب رنگ :</p>
          <div className="flex gap-3">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedColor(c.id)}
                title={c.label}
                className={cn(
                  "size-10 rounded-full border-2 transition-all",
                  selectedColor === c.id
                    ? "border-primary scale-110 shadow"
                    : "border-transparent hover:border-gray-300",
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="my-4 h-px bg-gray-100" />

      {/* Guarantees */}
      <ul className="mb-6 space-y-3">
        {GUARANTEES.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center justify-between text-sm text-gray-600">
            <span>{label}</span>
            <Icon className="size-5 text-gray-400" />
          </li>
        ))}
      </ul>

      {/* Add to cart */}
      <button className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        <ShoppingCartIcon className="size-5" />
        <span>افزودن به سبد خرید</span>
      </button>
    </div>
  );
}
