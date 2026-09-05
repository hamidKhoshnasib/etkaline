"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { ProductCard } from "@/features/product/components/ProductCard";
import ProductSwiper from "@/features/product/components/ProductSwiper";
import { useRecentlyViewedProducts } from "@/features/product/hooks/use-recently-viewed-products";
import { useStorefront } from "@/providers/storefront-provider";

export function RecentlyViewedProductsSection() {
  const storefront = useStorefront();
  const recentProducts = useRecentlyViewedProducts(storefront.siteType);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="search-recommendations-heading"
      className="bg-card mt-[146px] rounded-2xl border p-3 lg:rounded-[28px] lg:p-5"
    >
      <div id="search-recommendations-heading">
        <SectionHeader
          title="شاید این محصولات مورد علاقه شما باشد"
          description="محصولاتی که اخیراً در فروشگاه مشاهده کرده‌اید"
        />
      </div>
      <ProductSwiper
        items={recentProducts}
        slidesPerView={2}
        spaceBetween={8}
        breakpoints={{
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1280: { slidesPerView: 6 },
        }}
        renderSlide={(product) => (
          <ProductCard
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            outOfStock={product.outOfStock}
            storeProductId={product.storeProductId}
            urlTitle={product.urlTitle}
            stickPriceToBottom
            className="h-full w-full border-none! bg-transparent!"
            imageContainerClassName="bg-transparent!"
          />
        )}
      />
    </section>
  );
}
