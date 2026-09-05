"use client";

import { FrownIcon, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import * as React from "react";
import { toast } from "sonner";

import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import EtkalineCartIcon from "@/assets/icons/etkaline-cart.svg";
import { AppImage } from "@/components/ui/image";
import { useBasketItem } from "@/features/cart/api/use-basket-item";
import { formatDiscountPercent, formatProductPrice } from "@/features/product/lib/format-price";
import type { ProductCardData } from "@/features/product/model/product";
import { useQuickAdd } from "@/features/product/components/QuickAddDialogProvider";
import { cn } from "@/lib/utils";
import { useStorefront } from "@/providers/storefront-provider";

interface ProductCardProps extends ProductCardData {
  id?: number | string;
  productUrl?: string;
  outOfStock?: boolean;
  onAddToCart?: () => void;
  disableHover?: boolean;
  stickPriceToBottom?: boolean;
  variant?: "default" | "mobile" | "catalog-mobile";
  className?: string;
  imageClassName?: string;
  imageContainerClassName?: string;
  priceClassName?: string;
  priceIconClassName?: string;
}

interface ProductCardLinkProps {
  id?: number | string;
  productUrl?: string;
  urlTitle?: string | null;
  title: string;
  children: React.ReactNode;
  className?: string;
}

function ProductCardLink({
  id,
  productUrl,
  urlTitle,
  title,
  children,
  className,
}: ProductCardLinkProps) {
  const storefront = useStorefront();
  const href =
    productUrl ?? (id === undefined ? null : storefront.productHref(id, urlTitle ?? title));
  if (!href) {
    return children;
  }

  return (
    <Link
      href={href}
      aria-label={`مشاهده ${title}`}
      className={cn(
        "focus-visible:outline-primary block focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function SupermarketProductCard({
  id,
  image,
  title,
  price,
  originalPrice,
  discount,
  outOfStock = false,
  storeProductId,
  urlTitle,
  onAddToCart,
  className,
}: ProductCardProps) {
  const quickAdd = useQuickAdd();
  const { status } = useSession();
  const basketItem = useBasketItem(storeProductId ?? null);
  const isBasketActionPending = basketItem.isMutating;

  const openQuickAdd = () => {
    if (id !== undefined) {
      quickAdd?.openQuickAdd({
        id,
        image,
        title,
        price,
        originalPrice,
        discount,
        outOfStock,
        storeProductId,
        urlTitle,
      });
    }
  };

  const runBasketAction = async (action: () => Promise<void>) => {
    if (status !== "authenticated") {
      window.dispatchEvent(new Event("etkala:open-auth"));
      return;
    }

    try {
      await action();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تغییر سبد خرید ناموفق بود.");
    }
  };

  const addToBasket = () => {
    if (onAddToCart) {
      onAddToCart();
      return;
    }
    void runBasketAction(() => basketItem.increase());
  };

  return (
    <article
      className={cn(
        "group relative flex h-[262px] flex-col justify-between overflow-hidden rounded-[16px] border border-[#E2E8F0]",
        className,
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="relative h-[148px] shrink-0">
          <AppImage
            src={image}
            alt={title}
            width={153}
            height={148}
            className={cn("h-[148px] w-full object-cover", outOfStock && "opacity-45")}
          />
          {outOfStock ? (
            <span className="text-muted-foreground absolute inset-x-3 bottom-2 rounded-lg bg-white/90 py-1 text-center text-xs">
              اتمام موجودی
            </span>
          ) : null}
        </div>

        <div className="flex h-24 shrink-0 flex-col gap-1 px-[9px]">
          <h3 className="line-clamp-2 h-12 shrink-0 text-sm leading-6 font-bold text-[#000814]">
            {title}
          </h3>
          <div className="flex h-11 shrink-0 flex-col">
            <div className="flex h-5 items-center justify-between px-[3px]" dir="ltr">
              {originalPrice ? (
                <s className="truncate text-xs leading-[19.6px] text-[#64748B]" dir="rtl">
                  {formatProductPrice(originalPrice)}
                </s>
              ) : (
                <span />
              )}
              {discount ? (
                <span
                  className="flex h-4 min-w-[26px] items-center justify-center rounded bg-[#43A047] px-0.5 text-xs leading-4 font-bold text-white"
                  dir="rtl"
                >
                  {formatDiscountPercent(discount)}٪
                </span>
              ) : null}
            </div>
            <div className="flex h-6 items-center text-[#43A047]" dir="ltr">
              <TomanIcon className="size-4.5 shrink-0 [&_path]:fill-current" aria-hidden="true" />
              <span className="flex-1 text-base leading-6 font-bold">
                {formatProductPrice(price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={openQuickAdd}
        aria-label={`مشاهده سریع ${title}`}
        className="focus-visible:outline-primary absolute inset-0 rounded-[16px] focus-visible:outline-2 focus-visible:outline-offset-2"
      />

      {!outOfStock ? (
        basketItem.quantity > 0 ? (
          <div
            role="group"
            aria-label={`تعداد ${title} در سبد خرید`}
            className="border-primary bg-background text-primary absolute top-[58px] right-0 z-10 flex h-[88px] w-10 flex-col items-center justify-between rounded-full border py-1"
          >
            <button
              type="button"
              onClick={() => void runBasketAction(() => basketItem.increase())}
              disabled={isBasketActionPending}
              aria-label={`افزایش تعداد ${title}`}
              className="hover:bg-primary/10 flex size-7 items-center justify-center rounded-full disabled:opacity-50"
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
            <span aria-live="polite" className="text-xs font-medium">
              {basketItem.quantity.toLocaleString("fa-IR")}
            </span>
            <button
              type="button"
              onClick={() =>
                void runBasketAction(() =>
                  basketItem.quantity === 1 ? basketItem.remove() : basketItem.decrease(),
                )
              }
              disabled={isBasketActionPending}
              aria-label={
                basketItem.quantity === 1 ? `حذف ${title} از سبد خرید` : `کاهش تعداد ${title}`
              }
              className="hover:bg-primary/10 flex size-7 items-center justify-center rounded-full disabled:opacity-50"
            >
              {basketItem.quantity === 1 ? (
                <Trash2 className="size-3.5" aria-hidden="true" />
              ) : (
                <Minus className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={addToBasket}
            disabled={isBasketActionPending}
            aria-label={`افزودن ${title} به سبد خرید`}
            className="focus-visible:outline-primary absolute top-[100px] right-0 z-10 flex size-12 items-center justify-center rounded-full border border-[#43A047] bg-white transition-colors hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
          >
            <EtkalineCartIcon className="h-[17px] w-4" aria-hidden="true" />
          </button>
        )
      ) : null}
    </article>
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
                <span className="bg-primary-hover label-small rounded px-1 py-0.5 text-white">
                  {formatDiscountPercent(discount)}٪
                </span>
              </div>
            )}
            <p className="body-medium-bold text-gray-800">{formatProductPrice(price)}</p>
          </div>
        </div>

        <div className="h-full w-24 shrink-0 overflow-hidden rounded-xl">
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
          "flex h-[130px] gap-2 overflow-hidden rounded-[8px] border border-slate-200 bg-white p-2",
          className,
        )}
      >
        <div className="relative flex h-full w-[113px] shrink-0 items-center justify-center overflow-hidden">
          <AppImage
            src={image}
            alt={`عکس-${title}`}
            width={180}
            height={190}
            className="h-full w-full object-contain"
          />
          {discount ? (
            <span className="bg-primary-hover absolute top-0 right-0 rounded-lg px-2 py-1 text-xs font-bold text-white">
              {formatDiscountPercent(discount)}٪
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col py-1">
          <p className="text-secondary title-medium line-clamp-2 w-full text-right leading-6">
            {title}
          </p>
          <div className="mt-auto flex flex-col items-end gap-1">
            {originalPrice ? (
              <s className="text-sm text-slate-400">{formatProductPrice(originalPrice)}</s>
            ) : null}
            <div className="text-secondary flex items-center gap-1" dir="ltr">
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
  outOfStock = false,
  storeProductId,
  urlTitle,
  onAddToCart,
  disableHover = false,
  stickPriceToBottom = false,
  variant = "default",
  className,
  imageClassName,
  imageContainerClassName,
  priceClassName,
  priceIconClassName,
}: ProductCardProps) {
  const { siteType } = useStorefront();

  if (siteType === "supermarket") {
    return (
      <SupermarketProductCard
        {...{
          id,
          productUrl,
          image,
          title,
          price,
          originalPrice,
          discount,
          outOfStock,
          storeProductId,
          urlTitle,
          onAddToCart,
          className,
        }}
      />
    );
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
        "relative overflow-hidden rounded-xl border border-[#E2E8F0] bg-white lg:rounded-2xl",
        !disableHover && "group hover:border-primary transition-all",
        stickPriceToBottom && "flex flex-col",
        className,
      )}
    >
      <ProductCardLink
        id={id}
        productUrl={productUrl}
        urlTitle={urlTitle}
        title={title}
        className={stickPriceToBottom ? "flex flex-1 flex-col" : undefined}
      >
        <div className={cn("relative overflow-hidden", imageContainerClassName)}>
          <AppImage
            src={image}
            alt={`عکس-${title}`}
            width={180}
            height={190}
            className={cn(
              "h-[119px] w-full object-contain p-2 lg:h-[190px] lg:p-0",
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

        <div
          className={cn(
            "mt-2 px-1.5 pb-2 lg:mt-3 lg:px-2",
            stickPriceToBottom && "flex flex-1 flex-col",
          )}
        >
          <p className="line-clamp-2 h-8 text-[11px] leading-4 text-gray-700 lg:h-10 lg:text-sm lg:leading-5">
            {title}
          </p>

          <div className={cn("mt-3 w-full", stickPriceToBottom && "mt-auto pt-3")}>
            <div className="flex h-12.5 flex-col">
              {discount && originalPrice && (
                <div className="flex items-center justify-between gap-1.5">
                  <span className="bg-primary-hover rounded-lg px-1 py-0.5 text-[12px] text-white">
                    {formatDiscountPercent(discount)}٪
                  </span>
                  <s className="text-[12px] text-gray-400">{formatProductPrice(originalPrice)}</s>
                </div>
              )}
              <div className="mt-auto flex items-center justify-between">
                <p className={cn("text-secondary text-xs font-bold lg:text-base", priceClassName)}>
                  {formatProductPrice(price)}
                </p>
                <TomanIcon className={cn("size-4.5", priceIconClassName)} />
              </div>
            </div>
          </div>
        </div>
      </ProductCardLink>
    </div>
  );
}

export { ProductCard };
export type { ProductCardProps };
