"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { ProductCard, type ProductCardProps } from "@/components/ui/ProductCard";

type ProductItem = Pick<
  ProductCardProps,
  "title" | "image" | "price" | "originalPrice" | "discount"
> & {
  id: number | string;
};

interface ProductSectionListProps {
  title: string;
  description?: string;
  showMoreLink?: string;
  items: ProductItem[];
}

export default function ProductSectionList({
  title,
  description,
  showMoreLink,
  items,
}: ProductSectionListProps) {
  return (
    <section className="w-full rounded-[28px] border border-[#E2E8F0] p-5">
      <SectionHeader title={title} description={description} showMoreLink={showMoreLink} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            originalPrice={item.originalPrice}
            discount={item.discount}
          />
        ))}
      </div>
    </section>
  );
}