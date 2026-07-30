"use client";

import { Heart, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pagination } from "@/components/ui/Pagination";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavoriteProducts } from "@/features/account/api/use-favorite-products";
import { ProductCard } from "@/features/product/components/ProductCard";
import { ProductCardSkeleton } from "@/features/product/components/ProductCardSkeleton";

function WishlistProducts({
  page,
  onPageChange,
}: {
  page: number;
  onPageChange: (page: number) => void;
}) {
  const { data, error, isFetching, isLoading } = useFavoriteProducts(page);
  const products = data?.products ?? [];

  if (isLoading || isFetching || (!data && !error)) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" aria-busy="true">
        {Array.from({ length: 5 }, (_, index) => (
          <ProductCardSkeleton key={index} variant="wishlist" />
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
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => {
          const price = product.offPrice > 0 ? product.offPrice : product.mainPrice;
          const productUrl = product.urlTitle
            ? `/products/${encodeURIComponent(product.urlTitle)}`
            : undefined;

          return (
            <ProductCard
              key={product.id}
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
          );
        })}
      </div>
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

  return (
    <section className="bg-muted/60 min-h-full lg:bg-transparent lg:px-0 lg:pt-2 lg:pb-0">
      <MobilePageHeader fallbackHref="/account/profile" title="لیست‌های من" />
      <div className="px-4 py-6 lg:px-0 lg:py-0">
        <div className="mb-7 flex items-center justify-end gap-4 lg:justify-between">
          <h1 className="text-secondary hidden text-lg font-bold lg:block">لیست‌های من</h1>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="border-primary-hover text-primary-hover bg-transparent"
          >
            <Plus data-icon="inline-start" />
            افزودن لیست
          </Button>
        </div>

        <Tabs defaultValue="favorites" className="gap-0">
          <Card className="gap-0 rounded-xl py-0 shadow-none">
            <CardHeader className="relative border-b px-0 py-0 pb-0!">
              <TabsList
                variant="line"
                aria-label="دسته‌بندی لیست‌های من"
                className="w-full justify-start gap-0 rounded-none p-0 pe-4 group-data-horizontal/tabs:h-13"
              >
                <TabsTrigger
                  value="favorites"
                  className="after:bg-primary data-active:text-secondary h-full max-w-24 rounded-none px-4 after:bottom-[-2px] data-active:font-bold"
                >
                  علاقه‌مندی‌ها
                </TabsTrigger>
                <TabsTrigger
                  value="later"
                  className="after:bg-primary data-active:text-secondary h-full max-w-24 rounded-none px-4 after:bottom-[-2px] data-active:font-bold"
                >
                  بعداً می‌خرم
                </TabsTrigger>
              </TabsList>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="حذف لیست"
                title="حذف"
                className="text-muted-foreground absolute end-4 top-2"
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </CardHeader>
            <CardContent className="p-2">
              <TabsContent value="favorites">
                <WishlistProducts page={page} onPageChange={setPage} />
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
