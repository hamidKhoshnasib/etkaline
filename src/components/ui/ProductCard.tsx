"use client";

import { BookmarkIcon, ScaleIcon, FrownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import { Image } from "next/dist/client/image-component";

function formatPrice(n: number): string {
  return n.toLocaleString("fa-IR");
}

function toPersian(n: number): string {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  isBookmarked?: boolean;
  outOfStock?: boolean;
  onBookmark?: () => void;
  onCompare?: () => void;
  onAddToCart?: () => void;
  variant?: "default" | "mobile";
  className?: string;
}

// ─── Mobile variant ───────────────────────────────────────────────────────────

function MobileProductCard({
  image,
  title,
  price,
  originalPrice,
  discount,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "flex h-28 gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm",
        className,
      )}
    >
      <div className="flex flex-1 flex-col justify-between">
        <p className="body-small line-clamp-2 text-gray-800">{title}</p>
        <div>
          {discount && originalPrice && (
            <div className="flex items-center gap-1.5">
              <s className="label-small text-gray-400">{formatPrice(originalPrice)}</s>
              <span className="label-small rounded bg-orange-500 px-1 py-0.5 text-white">
                {toPersian(discount)}٪
              </span>
            </div>
          )}
          <p className="body-medium-bold text-gray-800">{formatPrice(price)}</p>
        </div>
      </div>

      <div className="h-full w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="h-full w-full object-contain p-1" />
      </div>
    </div>
  );
}

// ─── Default card ─────────────────────────────────────────────────────────────

function ProductCard({
  image,
  title,
  price,
  originalPrice,
  discount,
  isBookmarked = false,
  outOfStock = false,
  onBookmark,
  onCompare,
  // onAddToCart,
  variant = "default",
  className,
}: ProductCardProps) {
  if (variant === "mobile") {
    return (
      <MobileProductCard
        image={image}
        title={title}
        price={price}
        originalPrice={originalPrice}
        discount={discount}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-gray-500 bg-white p-4",
        "hover:border-primary transition-all hover:shadow-md",
        className,
      )}
    >
      {/* Image area */}
      <div className="relative overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={image}
          alt={`عکس-${title}`}
          width={180}
          height={190}
          // className={cn(
          //   "h-48 w-full object-contain p-4 transition-opacity",
          //   outOfStock && "opacity-30",
          // )}
        />

        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <FrownIcon className="size-10 text-gray-400" strokeWidth={1.5} />
            <span className="body-small text-gray-500">اتمام موجودی!</span>
          </div>
        )}

        {/* Action icons */}
        {!outOfStock && (
          <>
            <button
              onClick={onCompare}
              className="hover:text-primary absolute top-2 left-2 rounded-full bg-white p-1.5 text-gray-400 opacity-0 shadow-sm transition-all group-hover:opacity-100"
            >
              <ScaleIcon className="size-4" />
            </button>

            <button
              onClick={onBookmark}
              className={cn(
                "absolute top-2 right-2 rounded-full bg-white p-1.5 shadow-sm transition-all",
                isBookmarked
                  ? "text-primary"
                  : "hover:text-primary text-gray-400 opacity-0 group-hover:opacity-100",
              )}
            >
              <BookmarkIcon className={cn("size-4", isBookmarked && "fill-primary")} />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="mt-3">
        <p className="title-small text-gray-700">{title}</p>

        <div className="mt-3 w-full">
          <div className="text-right">
            {discount && originalPrice && (
              <div className="flex items-center justify-between gap-1.5">
                <span className="label-small bg-primary-hover rounded px-1.5 py-0.5 text-white">
                  {toPersian(discount)}٪
                </span>
                <s className="body-small text-gray-400">{formatPrice(originalPrice)}</s>
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="title-medium-bold text-secondary">{formatPrice(price)}</p>
              <TomanIcon className="size-4.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
export type { ProductCardProps };
