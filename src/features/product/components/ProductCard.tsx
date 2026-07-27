"use client";

import { BookmarkIcon, FrownIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import ProductCardLeftActionIcon from "@/assets/icons/product-card-left-action.svg";
import { AppImage } from "@/components/ui/image";
import { useToggleFavorite } from "@/features/product/api/favorites";
import { formatProductPrice } from "@/features/product/lib/format-price";
import type { ProductCardData } from "@/features/product/model/product";
import { cn } from "@/lib/utils";

interface ProductCardProps extends ProductCardData {
  id?: number | string;
  productUrl?: string;
  isBookmarked?: boolean;
  outOfStock?: boolean;
  onBookmark?: () => void;
  onCompare?: () => void;
  onAddToCart?: () => void;
  variant?: "default" | "mobile" | "catalog-mobile";
  className?: string;
  imageClassName?: string;
}

interface ProductCardLinkProps {
  id?: number | string;
  productUrl?: string;
  title: string;
  children: React.ReactNode;
}

function ProductCardLink({ id, productUrl, title, children }: ProductCardLinkProps) {
  const href =
    productUrl ?? (id === undefined ? null : `/products/${encodeURIComponent(String(id))}`);
  if (!href) {
    return children;
  }

  return (
    <Link
      href={href}
      aria-label={`مشاهده ${title}`}
      className="focus-visible:outline-primary block focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {children}
    </Link>
  );
}

function MobileProductCard({
  id,
  productUrl,
  image,
  title,
  price,
  originalPrice,
  discount,
  className,
}: ProductCardProps) {
  return (
    <ProductCardLink id={id} productUrl={productUrl} title={title}>
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
                <s className="label-small text-gray-400">{formatProductPrice(originalPrice)}</s>
                <span className="label-small rounded bg-orange-500 px-1 py-0.5 text-white">
                  {discount}٪
                </span>
              </div>
            )}
            <p className="body-medium-bold text-gray-800">{formatProductPrice(price)}</p>
          </div>
        </div>

        <div className="h-full w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
          <AppImage
            src={image}
            alt={title}
            width={96}
            height={112}
            className="h-full w-full object-contain p-1"
          />
        </div>
      </div>
    </ProductCardLink>
  );
}

function CatalogMobileProductCard({
  id,
  productUrl,
  image,
  title,
  price,
  originalPrice,
  discount,
  className,
}: ProductCardProps) {
  return (
    <ProductCardLink id={id} productUrl={productUrl} title={title}>
      <article
        className={cn(
          "flex h-36 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm",
          className,
        )}
      >
        <div className="relative flex w-[39%] shrink-0 items-center justify-center overflow-hidden">
          <AppImage
            src={image}
            alt={`عکس-${title}`}
            width={180}
            height={190}
            className="h-full w-full object-contain"
          />
          {discount ? (
            <span className="absolute top-0 right-0 rounded-lg bg-orange-500 px-2 py-1 text-xs font-bold text-white">
              {discount}٪
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-2 py-1">
          <p className="text-secondary line-clamp-2 text-center text-base leading-6 font-medium">
            {title}
          </p>
          <div className="mt-auto flex flex-col gap-1">
            {originalPrice ? (
              <s className="text-sm text-slate-400">{formatProductPrice(originalPrice)}</s>
            ) : null}
            <div className="text-secondary flex items-center gap-1">
              <TomanIcon className="size-4 shrink-0" />
              <span className="text-base font-bold">{formatProductPrice(price)}</span>
            </div>
          </div>
        </div>
      </article>
    </ProductCardLink>
  );
}

function ProductCard({
  id,
  productUrl,
  image,
  title,
  price,
  originalPrice,
  discount,
  isBookmarked = false,
  outOfStock = false,
  onBookmark,
  onCompare,
  variant = "default",
  className,
  imageClassName,
}: ProductCardProps) {
  const { status } = useSession();
  const { isPending, mutateAsync } = useToggleFavorite();
  const [bookmarked, setBookmarked] = React.useState(isBookmarked);
  const bookmarkAfterLoginRef = React.useRef(false);
  const productId = typeof id === "number" ? id : Number(id);
  const hasValidProductId = Number.isSafeInteger(productId) && productId > 0;

  const updateBookmark = React.useCallback(async () => {
    if (!hasValidProductId || isPending) {
      return;
    }

    try {
      const nextBookmarked = await mutateAsync({ productId, isBookmarked: bookmarked });
      setBookmarked(nextBookmarked);
      onBookmark?.();
      toast.success(nextBookmarked ? "به علاقه‌مندی‌ها اضافه شد." : "از علاقه‌مندی‌ها حذف شد.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تغییر علاقه‌مندی ناموفق بود.");
    }
  }, [bookmarked, hasValidProductId, isPending, mutateAsync, onBookmark, productId]);

  React.useEffect(() => {
    function updateBookmarkAfterLogin() {
      if (!bookmarkAfterLoginRef.current) {
        return;
      }

      bookmarkAfterLoginRef.current = false;
      void updateBookmark();
    }

    function clearBookmarkAfterLogin() {
      bookmarkAfterLoginRef.current = false;
    }

    window.addEventListener("etkala:authenticated", updateBookmarkAfterLogin);
    window.addEventListener("etkala:auth-dismissed", clearBookmarkAfterLogin);
    return () => {
      window.removeEventListener("etkala:authenticated", updateBookmarkAfterLogin);
      window.removeEventListener("etkala:auth-dismissed", clearBookmarkAfterLogin);
    };
  }, [updateBookmark]);

  function handleBookmark() {
    if (!hasValidProductId || isPending) {
      return;
    }

    if (status !== "authenticated") {
      bookmarkAfterLoginRef.current = true;
      window.dispatchEvent(new Event("etkala:open-auth"));
      return;
    }

    void updateBookmark();
  }

  if (variant === "mobile") {
    return (
      <MobileProductCard
        {...{ id, productUrl, image, title, price, originalPrice, discount, className }}
      />
    );
  }

  if (variant === "catalog-mobile") {
    return (
      <CatalogMobileProductCard
        {...{ id, productUrl, image, title, price, originalPrice, discount, className }}
      />
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-[#E2E8F0] bg-white lg:rounded-2xl",
        "hover:border-primary transition-all",
        className,
      )}
    >
      <ProductCardLink id={id} productUrl={productUrl} title={title}>
        <div className="relative overflow-hidden bg-gray-50">
          <AppImage
            src={image}
            alt={`عکس-${title}`}
            width={180}
            height={190}
            className={cn(
              "h-28 w-full object-contain p-2 lg:h-auto lg:w-auto lg:p-0",
              imageClassName,
            )}
          />

          {outOfStock && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <FrownIcon className="size-10 text-gray-400" strokeWidth={1.5} />
              <span className="body-small text-gray-500">اتمام موجودی!</span>
            </div>
          )}
        </div>

        <div className="mt-2 px-1.5 pb-2 lg:mt-3 lg:px-2">
          <p className="line-clamp-2 h-8 text-[11px] leading-4 text-gray-700 lg:h-10 lg:text-sm lg:leading-5">
            {title}
          </p>

          <div className="mt-3 w-full">
            <div className="flex h-12.5 flex-col">
              {discount && originalPrice && (
                <div className="flex items-center justify-between gap-1.5">
                  <span className="bg-primary-hover rounded-lg px-1 py-0.5 text-[12px] text-white">
                    {discount}٪
                  </span>
                  <s className="text-[12px] text-gray-400">{formatProductPrice(originalPrice)}</s>
                </div>
              )}
              <div className="mt-auto flex items-center justify-between">
                <p className="text-secondary text-xs font-bold lg:text-base">
                  {formatProductPrice(price)}
                </p>
                <TomanIcon className="size-4.5" />
              </div>
            </div>
          </div>
        </div>
      </ProductCardLink>

      {!outOfStock && (
        <>
          <button
            type="button"
            onClick={onCompare}
            aria-label="مقایسه محصول"
            className="hover:text-primary absolute top-2 left-2 rounded-full bg-white p-1.5 text-gray-400 opacity-0 shadow-sm transition-all group-hover:opacity-100"
          >
            <ProductCardLeftActionIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={handleBookmark}
            aria-pressed={bookmarked}
            aria-busy={isPending}
            disabled={isPending || !hasValidProductId}
            aria-label={bookmarked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
            className={cn(
              "absolute top-2 right-2 rounded-full bg-white p-1.5 shadow-sm transition-all",
              bookmarked
                ? "text-primary hover:text-primary-hover"
                : "hover:text-primary text-gray-400 opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
            )}
          >
            <BookmarkIcon className={cn("size-4", bookmarked && "fill-primary")} />
          </button>
        </>
      )}
    </div>
  );
}

export { ProductCard };
export type { ProductCardProps };
