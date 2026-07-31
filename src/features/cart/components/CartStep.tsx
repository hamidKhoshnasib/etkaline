"use client";

import { LayoutGrid, Rows3 } from "lucide-react";

import type { OpenBasketItem } from "@/features/cart/api/get-open-basket";
import CartItemRow from "@/features/cart/components/CartItemRow";
import { RECOMMENDED_PRODUCTS } from "@/features/cart/fixtures/cart";
import { ProductCard } from "@/features/product/components/ProductCard";
import ProductSwiper from "@/features/product/components/ProductSwiper";

interface CartStepProps {
  items: OpenBasketItem[];
  deletingStoreProductId?: number;
  onQuantityChange: (item: OpenBasketItem, quantity: number) => void;
}

export default function CartStep({
  items,
  deletingStoreProductId,
  onQuantityChange,
}: CartStepProps) {
  return (
    <div className="flex min-w-0 flex-col gap-7">
      <section aria-labelledby="cart-items-heading">
        <header className="mb-5 flex items-center justify-between gap-4 px-1">
          <h1 id="cart-items-heading" className="text-secondary text-xl font-bold">
            سبد خرید
          </h1>
          <div className="text-muted-foreground flex items-center gap-3" aria-hidden="true">
            <Rows3 className="text-primary size-6" />
            <LayoutGrid className="size-5" />
          </div>
        </header>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              isDeleting={deletingStoreProductId === item.storeProductId}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="recent-products-heading">
        <h2 id="recent-products-heading" className="text-secondary mb-5 text-xl font-bold">
          اخیراً بازدید کردید
        </h2>
        <ProductSwiper
          items={RECOMMENDED_PRODUCTS}
          slidesPerView={2}
          spaceBetween={8}
          breakpoints={{
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          renderSlide={(product) => (
            <ProductCard
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              disableHover
              stickPriceToBottom
              className="h-full w-full rounded-xl"
              imageContainerClassName="bg-card"
              imageClassName="lg:h-44"
            />
          )}
        />
      </section>
    </div>
  );
}
