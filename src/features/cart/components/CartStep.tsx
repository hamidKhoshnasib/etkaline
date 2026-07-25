"use client";

import { LayoutGrid } from "lucide-react";
import { ProductCard } from "@/features/product/components/ProductCard";
import ProductSwiper from "@/features/product/components/ProductSwiper";
import CartItemRow from "@/features/cart/components/CartItemRow";
import { RECOMMENDED_PRODUCTS, type CartItem } from "@/features/cart/fixtures/cart";

interface CartStepProps {
  items: CartItem[];
  onQuantityChange: (id: number, quantity: number) => void;
}

export default function CartStep({ items, onQuantityChange }: CartStepProps) {
  return (
    <div className="space-y-6">
      {/* Item list */}
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <div className="mb-4 flex items-center justify-end gap-2">
          <h1 className="title-medium-bold text-secondary">سبد خرید</h1>
          <LayoutGrid className="text-secondary size-5" />
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} onQuantityChange={onQuantityChange} />
          ))}
        </div>
      </section>

      {/* Recently viewed */}
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <h2 className="title-medium-bold text-secondary mb-4 text-right">اخیرا بازدید کردید</h2>
        <ProductSwiper
          items={RECOMMENDED_PRODUCTS}
          breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
          renderSlide={(product) => (
            <ProductCard
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              className="h-full w-full"
            />
          )}
        />
      </section>
    </div>
  );
}
