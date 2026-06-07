"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import ProductSwiper from "@/components/ui/ProductSwiper";
import { ProductCard, type ProductCardProps } from "@/components/ui/ProductCard";

type ProductItem = Pick<
  ProductCardProps,
  "title" | "image" | "price" | "originalPrice" | "discount"
> & {
  id: number | string;
};

interface ProductSectionProps {
  title: string;
  description?: string;
  showMoreLink?: string;
  items: ProductItem[];
}

export default function ProductSection({
  title,
  description,
  showMoreLink,
  items,
}: ProductSectionProps) {
  return (
    <section className="w-full rounded-[28px] border border-[#E2E8F0] p-5">
      <SectionHeader title={title} description={description} showMoreLink={showMoreLink} />

      <ProductSwiper
        items={items}
        renderSlide={(item) => (
          <ProductCard
            title={item.title}
            image={item.image}
            price={item.price}
            originalPrice={item.originalPrice}
            discount={item.discount}
            className="h-full w-full"
          />
        )}
      />
    </section>
  );
}