"use client";

import { LayoutGrid } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import ProductSwiper from "@/components/ui/ProductSwiper";
import CartItemRow from "@/view/cart/CartItemRow";
import { RECOMMENDED_PRODUCTS, type CartItem } from "@/view/cart/cart.data";

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
