"use client";

import { ProductCard } from "@/features/product/components/ProductCard";
import type { Product } from "@/features/product/model/product";
import Bazel from "@/assets/icons/bazell.svg";
import ProductSwiper from "@/features/product/components/ProductSwiper";

interface FlashDealsProps {
  items: Product[];
}

export default function FlashDeals({ items }: FlashDealsProps) {
  return (
    <section className="bg-primary-hover border-primary-hover w-full overflow-hidden rounded-[32px] border-2">
      <div className="bg-border relative flex items-center rounded-[16px]">
        <div className="bg-primary-hover absolute top-0 h-1/2 w-full" />
        <div className="absolute bottom-0 h-1/2 w-full bg-white" />
        {/* Title badge */}
        <div className="bg-primary-hover z-10 flex h-14 shrink-0 items-center gap-1.5 rounded-l-[16px] px-2 sm:h-18.75 sm:gap-2 sm:pl-5">
          <Bazel className="size-7 sm:size-auto" />
          <span className="title-medium-bold sm:headline-large text-white">شگفتانه لحظه‌ای</span>
        </div>

        <div className="z-10 h-14 flex-1 rounded-tr-[16px] bg-white sm:h-18.75" />
      </div>

      {/* Swiper */}
      <div className="rounded-tr-[16px] bg-white p-4">
        <ProductSwiper
          items={items}
          renderSlide={(product) => (
            <ProductCard
              title={product.title}
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              className="h-full w-full border-0"
            />
          )}
        />
      </div>
    </section>
  );
}
