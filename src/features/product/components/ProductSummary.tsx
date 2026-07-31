import { StarIcon } from "lucide-react";
import {
  ProductColorPicker,
  type ProductColor,
  ProductGuarantees,
} from "@/features/product/components/ProductInfoCard";
import { cn } from "@/lib/utils";

interface Spec {
  label: string;
  value: string;
}

interface ProductSummaryProps {
  title: string;
  rating: number;
  reviewCount: number;
  specs: Spec[];
  colors: ProductColor[];
  shortDescription: string;
  selectedColorId?: string;
  onColorSelect?: (colorId: string) => void;
}

function toPersian(n: number): string {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

export function ProductSummary({
  title,
  rating,
  reviewCount,
  specs,
  colors,
  shortDescription,
  selectedColorId,
  onColorSelect,
}: ProductSummaryProps) {
  return (
    <div className="min-w-0 flex-1">
      {/* Title */}
      <h1 className="text-secondary mb-3 lg:title-medium lg:mb-4 body-large-bold lg:leading-relaxed">
        {title}
      </h1>

      {/* Rating */}
      <div className="mb-5 flex flex-col flex-wrap gap-3 lg:mb-6">
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-3.5",
                  i < Math.round(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200",
                )}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">{rating}</span>
          <span className="text-sm text-gray-500">({toPersian(reviewCount)} نظر)</span>
        </div>
      </div>

      <div className="mb-6 space-y-5 lg:hidden">
        <ProductGuarantees />
        <ProductColorPicker
          colors={colors}
          className="mb-0"
          selectedColorId={selectedColorId}
          onColorSelect={onColorSelect}
        />
      </div>

      {/* Specs */}
      <div className="mb-6 lg:mb-7">
        <p className="mb-3 text-sm font-semibold text-gray-700 lg:mb-2">مشخصات محصول</p>
        <div className="flex gap-2 lg:gap-2.5">
          {specs.map((s) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col gap-1 rounded-lg bg-[#F8FAFC] px-2 py-3 lg:min-w-22 lg:flex-none lg:px-3 lg:py-2.5"
            >
              <span className="text-xs text-[#475569]">{s.label}</span>
              <span className="text-secondary label-large">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Short description */}
      {shortDescription ? (
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700">توضیح کوتاه محصول:</p>
          <p className="text-sm leading-7 text-gray-600">{shortDescription}</p>
        </div>
      ) : null}
    </div>
  );
}
