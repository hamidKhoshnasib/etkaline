import { Plus, Trash2 } from "lucide-react";

import ovenImage from "@/assets/images/gaz.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/features/product";

const MOCK_WISHLIST_PRODUCTS = Array.from({ length: 5 }, (_, index) => ({
  id: `wishlist-product-${index + 1}`,
  title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
  image: ovenImage.src,
  price: 580_000_000,
  originalPrice: index === 1 || index === 2 ? undefined : 680_000_000,
  discount: index === 1 || index === 2 ? undefined : 30,
}));

function WishlistProducts() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {MOCK_WISHLIST_PRODUCTS.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          className="min-w-0 border-0 shadow-none"
          imageClassName="lg:h-[190px] lg:w-full lg:object-contain"
        />
      ))}
    </div>
  );
}

export function WishlistView() {
  return (
    <section className="bg-muted/60 min-h-full px-4 py-6 lg:bg-transparent lg:px-0 lg:pt-2 lg:pb-0">
      <div className="mb-7 flex items-center justify-between gap-4">
        <h1 className="text-secondary text-lg font-bold">لیست‌های من</h1>
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
                className="after:bg-primary data-active:text-secondary h-full max-w-24 rounded-none px-4 data-active:font-bold"
              >
                علاقه‌مندی‌ها
              </TabsTrigger>
              <TabsTrigger
                value="later"
                className="after:bg-primary data-active:text-secondary h-full max-w-24 rounded-none px-4 data-active:font-bold"
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
              <WishlistProducts />
            </TabsContent>
            <TabsContent value="later">
              <WishlistProducts />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </section>
  );
}
