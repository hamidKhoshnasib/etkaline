"use client";

import { Heart, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useSession } from "next-auth/react";
import * as React from "react";

import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppImage } from "@/components/ui/image";
import { useBasketItem } from "@/features/cart/api/use-basket-item";
import { useToggleFavorite } from "@/features/product/api/favorites";
import { useQuickProductDetail } from "@/features/product/api/use-quick-product-detail";
import { formatDiscountPercent, formatProductPrice } from "@/features/product/lib/format-price";
import type { Product } from "@/features/product/model/product";
import { cn } from "@/lib/utils";

interface QuickAddContextValue {
  openQuickAdd: (product: Product) => void;
}

const QuickAddContext = React.createContext<QuickAddContextValue | null>(null);

export function useQuickAdd() {
  return React.use(QuickAddContext);
}

export function QuickAddDialogProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const detailQuery = useQuickProductDetail(product?.id);
  const detail = detailQuery.data;
  const resolvedProduct = product
    ? {
        ...product,
        title: detail?.title ?? product.title,
        image: detail?.image ?? product.image,
        price: detail?.price ?? product.price,
        originalPrice: detail?.originalPrice ?? product.originalPrice,
        discount: detail?.discount ?? product.discount,
        outOfStock: detail?.outOfStock ?? product.outOfStock,
        storeProductId: detail?.storeProductId ?? product.storeProductId,
      }
    : null;
  const basketItem = useBasketItem(resolvedProduct?.storeProductId ?? null);
  const isBasketActionPending = basketItem.isAdding || basketItem.isDeleting;
  const favoriteMutation = useToggleFavorite();
  const isLoadingDetail = product !== null && detailQuery.isPending;
  const isUnavailable =
    !isLoadingDetail &&
    (!resolvedProduct?.storeProductId || resolvedProduct.outOfStock || detailQuery.isError);

  const openQuickAdd = React.useCallback((nextProduct: Product) => {
    setProduct(nextProduct);
    setIsFavorite(false);
  }, []);

  const addToBasket = async () => {
    if (status !== "authenticated") {
      setProduct(null);
      window.dispatchEvent(new Event("etkala:open-auth"));
      return;
    }

    await basketItem.increase();
  };

  const toggleFavorite = async () => {
    if (!product) {
      return;
    }
    if (status !== "authenticated") {
      window.dispatchEvent(new Event("etkala:open-auth"));
      return;
    }

    const nextValue = await favoriteMutation.mutateAsync({
      productId: Number(product.id),
      isBookmarked: isFavorite,
    });
    setIsFavorite(nextValue);
  };

  return (
    <QuickAddContext value={{ openQuickAdd }}>
      {children}
      <Dialog open={product !== null} onOpenChange={(open) => !open && setProduct(null)}>
        <DialogContent
          data-site="supermarket"
          dir="rtl"
          showCloseButton={false}
          className="gap-0 overflow-hidden rounded-[28px] border-0 bg-white p-0 ring-0 sm:max-w-[430px]"
          overlayClassName="bg-slate-950/35 backdrop-blur-[2px]"
        >
          {resolvedProduct ? (
            <>
              <DialogTitle className="sr-only">{resolvedProduct.title}</DialogTitle>
              <DialogDescription className="sr-only">
                افزودن سریع محصول به سبد خرید
              </DialogDescription>

              <div className="relative flex min-h-80 items-center justify-center bg-white p-10">
                <DialogClose
                  aria-label="بستن"
                  className="bg-muted text-muted-foreground hover:text-foreground absolute top-4 left-4 flex size-11 items-center justify-center rounded-full transition-colors"
                >
                  <X className="size-5" />
                </DialogClose>
                <button
                  type="button"
                  aria-label={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                  aria-pressed={isFavorite}
                  onClick={() => void toggleFavorite()}
                  disabled={favoriteMutation.isPending}
                  className="bg-muted text-muted-foreground hover:text-primary absolute top-4 right-4 flex size-11 items-center justify-center rounded-full transition-colors disabled:opacity-50"
                >
                  <Heart className={cn("size-5", isFavorite && "fill-primary text-primary")} />
                </button>
                <AppImage
                  src={resolvedProduct.image}
                  alt={resolvedProduct.title}
                  width={300}
                  height={300}
                  className="h-64 w-full object-contain"
                />
              </div>

              <div className="bg-slate-50 p-5">
                <h2 className="line-clamp-2 min-h-14 text-base leading-7 font-bold text-slate-900">
                  {resolvedProduct.title}
                </h2>

                <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="text-primary flex items-center gap-1" dir="ltr">
                      <TomanIcon className="size-5 shrink-0 [&_path]:fill-current" />
                      <span className="text-lg font-bold">
                        {formatProductPrice(resolvedProduct.price)}
                      </span>
                    </div>
                    {resolvedProduct.discount ? (
                      <span className="bg-primary/15 text-primary rounded-md px-2 py-1 text-xs font-bold">
                        {formatDiscountPercent(resolvedProduct.discount)}٪
                      </span>
                    ) : null}
                  </div>

                  {basketItem.quantity > 0 ? (
                    <div className="bg-primary text-primary-foreground flex h-12 items-center gap-4 rounded-2xl px-3">
                      <button
                        type="button"
                        aria-label="افزایش تعداد"
                        onClick={() => void basketItem.increase()}
                        disabled={isBasketActionPending}
                        className="flex size-8 items-center justify-center rounded-full hover:bg-white/15"
                      >
                        <Plus className="size-4" />
                      </button>
                      <span aria-live="polite" className="min-w-4 text-center font-bold">
                        {basketItem.quantity.toLocaleString("fa-IR")}
                      </span>
                      <button
                        type="button"
                        aria-label="کاهش تعداد"
                        onClick={() => void basketItem.decrease()}
                        disabled={isBasketActionPending}
                        className="flex size-8 items-center justify-center rounded-full hover:bg-white/15"
                      >
                        <Minus className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      size="xl"
                      onClick={() => void addToBasket()}
                      disabled={isLoadingDetail || isUnavailable || isBasketActionPending}
                      className="rounded-2xl px-6 text-sm font-bold"
                    >
                      <ShoppingBag className="size-5" />
                      {isLoadingDetail
                        ? "در حال دریافت..."
                        : isUnavailable
                          ? "ناموجود"
                          : "افزودن به سبد خرید"}
                    </Button>
                  )}
                </div>

                {basketItem.error ? (
                  <p role="alert" className="text-destructive mt-3 text-xs">
                    {basketItem.error.message}
                  </p>
                ) : null}
                {detailQuery.isError ? (
                  <p role="alert" className="text-destructive mt-3 text-xs">
                    دریافت اطلاعات به‌روز محصول ممکن نشد.
                  </p>
                ) : null}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </QuickAddContext>
  );
}
