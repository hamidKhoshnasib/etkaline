"use client";

import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { Pagination } from "@/components/ui/Pagination";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavoriteProducts } from "@/features/account/api/use-favorite-products";
import { useRemoveFavorites } from "@/features/product/api/favorites";
import { ProductCard } from "@/features/product/components/ProductCard";
import { ProductCardSkeleton } from "@/features/product/components/ProductCardSkeleton";
import { cn } from "@/lib/utils";
import { useStorefront } from "@/providers/storefront-provider";

function WishlistProducts({
  page,
  onPageChange,
  isSelectionMode,
  selectedProductIds,
  onProductSelectionChange,
  isDeleting,
}: {
  page: number;
  onPageChange: (page: number) => void;
  isSelectionMode: boolean;
  selectedProductIds: ReadonlySet<number>;
  onProductSelectionChange: (productId: number, selected: boolean) => void;
  isDeleting: boolean;
}) {
  const storefront = useStorefront();
  const { data, error, isFetching, isLoading } = useFavoriteProducts(page);
  const products = data?.products ?? [];

  if (isLoading || isFetching || (!data && !error)) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" aria-busy="true">
        {Array.from({ length: 5 }, (_, index) => (
          <ProductCardSkeleton key={index} variant="catalog" />
        ))}
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <Empty className="min-h-80">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Heart aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>
            {error ? "دریافت علاقه‌مندی‌ها ناموفق بود" : "هنوز علاقه‌مندی ندارید"}
          </EmptyTitle>
          <EmptyDescription>
            {error ? error.message : "محصولات دلخواهتان را برای مشاهدهٔ سریع‌تر ذخیره کنید."}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <>
      <FieldSet className="gap-0">
        <FieldLegend className="sr-only">انتخاب محصولات برای حذف از علاقه‌مندی‌ها</FieldLegend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => {
            const price = product.offPrice > 0 ? product.offPrice : product.mainPrice;
            const productUrl = storefront.productHref(
              product.id,
              product.urlTitle || product.title,
            );
            const checkboxId = "wishlist-product-" + product.id;
            const isSelected = selectedProductIds.has(product.id);

            return (
              <div
                key={product.id}
                className={cn("relative min-w-0 rounded-xl", isSelected && "ring-primary ring-2")}
              >
                <ProductCard
                  id={product.id}
                  productUrl={productUrl}
                  image={product.picUrl || product.pic || "/images/placeholder-product.png"}
                  title={product.title}
                  price={price}
                  originalPrice={product.mainPrice > price ? product.mainPrice : undefined}
                  discount={product.offPercent > 0 ? product.offPercent : undefined}
                  outOfStock={!product.isExist || product.inventory <= 0}
                  className="min-w-0 border-0 shadow-none"
                  imageClassName="lg:h-[190px] lg:w-full lg:object-contain"
                />
                {isSelectionMode ? (
                  <Field
                    orientation="horizontal"
                    data-disabled={isDeleting || undefined}
                    className="absolute start-2 top-2 z-10 w-auto"
                  >
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDeleting}
                      onChange={(event) =>
                        onProductSelectionChange(product.id, event.target.checked)
                      }
                      className="border-input text-primary focus-visible:border-auth-accent size-4 shrink-0 rounded accent-current focus-visible:outline-none"
                    />
                    <FieldLabel htmlFor={checkboxId} className="sr-only">
                      انتخاب {product.title} برای حذف
                    </FieldLabel>
                  </Field>
                ) : null}
              </div>
            );
          })}
        </div>
      </FieldSet>
      {data.pageCount > 1 ? (
        <Pagination
          page={data.page}
          total={data.pageCount}
          onChange={onPageChange}
          className="justify-center pt-4"
        />
      ) : null}
    </>
  );
}

export function WishlistView() {
  const [page, setPage] = useState(1);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<number>>(() => new Set());
  const removeFavorites = useRemoveFavorites();
  const selectedCount = selectedProductIds.size;

  function handleProductSelectionChange(productId: number, selected: boolean) {
    setSelectedProductIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (selected) {
        nextIds.add(productId);
      } else {
        nextIds.delete(productId);
      }
      return nextIds;
    });
  }

  function exitSelectionMode() {
    setIsSelectionMode(false);
    setSelectedProductIds(new Set());
  }

  async function handleDeleteSelected() {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
      return;
    }

    if (selectedCount === 0) {
      return;
    }

    try {
      await removeFavorites.mutateAsync([...selectedProductIds]);
      toast.success(selectedCount.toLocaleString("fa-IR") + " محصول از علاقه‌مندی‌ها حذف شد.");
      exitSelectionMode();
      setPage(1);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "حذف محصولات ناموفق بود.");
    }
  }

  return (
    <section className="bg-muted/60 min-h-full lg:bg-transparent lg:px-0 lg:pt-2 lg:pb-0">
      <MobilePageHeader fallbackHref="/account/profile" title="لیست‌های من" />
      <div className="px-4 py-6 lg:px-0 lg:py-0">
        <div className="mb-7 flex items-center justify-end gap-4 lg:justify-between">
          <h1 className="text-secondary hidden text-lg font-bold lg:block">لیست‌های من</h1>
          {/*<Button*/}
          {/*  type="button"*/}
          {/*  variant="outline"*/}
          {/*  size="lg"*/}
          {/*  className={ACCOUNT_OUTLINE_ACTION_CLASS}*/}
          {/*>*/}
          {/*  <Plus data-icon="inline-start" />*/}
          {/*  افزودن لیست*/}
          {/*</Button>*/}
        </div>

        <Tabs defaultValue="favorites" className="gap-0">
          <Card className="gap-0 rounded-xl py-0 shadow-none">
            <CardHeader className="grid-cols-[minmax(0,1fr)_auto] border-b px-0 py-0 pb-0!">
              <TabsList
                variant="line"
                aria-label="دسته‌بندی لیست‌های من"
                className="min-w-0 justify-start gap-0 rounded-none p-0 group-data-horizontal/tabs:h-13"
              >
                <TabsTrigger
                  value="favorites"
                  className="after:bg-primary data-active:text-secondary h-full max-w-24 rounded-none px-2 after:bottom-[-2px] data-active:font-bold sm:px-4"
                >
                  علاقه‌مندی‌ها
                </TabsTrigger>
                <TabsTrigger
                  value="later"
                  className="after:bg-primary data-active:text-secondary h-full max-w-24 rounded-none px-2 after:bottom-[-2px] data-active:font-bold sm:px-4"
                >
                  بعداً می‌خرم
                </TabsTrigger>
              </TabsList>
              <CardAction className="flex items-center gap-1 self-center pe-4" aria-live="polite">
                {isSelectionMode ? (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={removeFavorites.isPending}
                      onClick={exitSelectionMode}
                    >
                      انصراف
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={selectedCount === 0 || removeFavorites.isPending}
                      aria-label={
                        selectedCount > 0
                          ? "حذف " + selectedCount.toLocaleString("fa-IR") + " محصول انتخاب‌شده"
                          : "حذف محصولات انتخاب‌شده"
                      }
                      onClick={() => void handleDeleteSelected()}
                    >
                      {removeFavorites.isPending ? (
                        <Spinner data-icon="inline-start" className="size-4" />
                      ) : (
                        <Trash2 data-icon="inline-start" />
                      )}
                      حذف
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="انتخاب برای حذف"
                    title="حذف"
                    className="text-muted-foreground"
                    onClick={() => void handleDeleteSelected()}
                  >
                    <Trash2 />
                  </Button>
                )}
              </CardAction>
            </CardHeader>
            <CardContent className="p-2">
              <TabsContent value="favorites">
                <WishlistProducts
                  page={page}
                  onPageChange={setPage}
                  isSelectionMode={isSelectionMode}
                  selectedProductIds={selectedProductIds}
                  onProductSelectionChange={handleProductSelectionChange}
                  isDeleting={removeFavorites.isPending}
                />
              </TabsContent>
              <TabsContent value="later">
                <Empty className="min-h-80">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Heart aria-hidden="true" />
                    </EmptyMedia>
                    <EmptyTitle>لیست «بعداً می‌خرم» خالی است</EmptyTitle>
                  </EmptyHeader>
                </Empty>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </section>
  );
}
