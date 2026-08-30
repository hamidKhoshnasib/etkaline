import { StarIcon } from "lucide-react";
import Link from "next/link";
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
  rating?: number;
  reviewCount?: number;
  specs: Spec[];
  brandHref?: string;
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
  brandHref,
  colors,
  shortDescription,
  selectedColorId,
  onColorSelect,
}: ProductSummaryProps) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-w-0 flex-1">
      {/* Title */}
      <h1 className="text-secondary lg:title-medium body-large-bold lg:leading-relaxed">{title}</h1>

      <div className="mt-[51px] flex items-center gap-2">
        <button
          type="button"
          onClick={() => scrollToSection("product-specifications")}
          aria-controls="product-specifications"
          className="border-border bg-background text-secondary hover:bg-muted h-8 rounded-md border px-3 text-sm font-medium transition-colors"
        >
          مشخصات تکمیلی
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("product-reviews")}
          aria-controls="product-reviews"
          className="border-border bg-background text-secondary hover:bg-muted h-8 rounded-md border px-3 text-sm font-medium transition-colors"
        >
          نظرات
        </button>
      </div>

      {rating !== undefined && reviewCount !== undefined ? (
        <div className="mb-5 flex flex-col flex-wrap gap-3 lg:mb-6">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={cn(
                    "size-3.5",
                    i < Math.round(rating)
                      ? "fill-primary text-primary"
                      : "fill-gray-200 text-gray-200",
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">{rating}</span>
            <span className="text-sm text-gray-500">({toPersian(reviewCount)} نظر)</span>
          </div>
        </div>
      ) : null}

      <div className="mt-[25px] mb-6 space-y-5 lg:hidden">
        <ProductGuarantees />
        <ProductColorPicker
          colors={colors}
          className="mb-0"
          selectedColorId={selectedColorId}
          onColorSelect={onColorSelect}
        />
      </div>

      {/* Specs */}
      <div className="mt-[25px] mb-6 lg:mb-7">
        <p className="mb-3 text-sm font-semibold text-gray-700 lg:mb-2">مشخصات محصول</p>
        <div className="flex gap-2 lg:gap-2.5">
          {specs.map((s) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col gap-1 rounded-lg bg-[#F8FAFC] px-2 py-3 lg:min-w-22 lg:flex-none lg:px-3 lg:py-2.5"
            >
              <span className="text-xs text-[#475569]">{s.label}</span>
              {s.label === "برند" && brandHref ? (
                <Link href={brandHref} className="text-secondary label-large hover:text-primary">
                  {s.value}
                </Link>
              ) : (
                <span className="text-secondary label-large">{s.value}</span>
              )}
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
