"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { ProductCard, type ProductCardProps } from "@/features/product/components/ProductCard";

type ProductItem = Pick<
  ProductCardProps,
  | "title"
  | "image"
  | "price"
  | "originalPrice"
  | "discount"
  | "outOfStock"
  | "storeProductId"
  | "urlTitle"
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
    <section className="w-full rounded-2xl border border-[#E2E8F0] p-3 lg:rounded-[28px] lg:p-5">
      <SectionHeader title={title} description={description} showMoreLink={showMoreLink} />

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            originalPrice={item.originalPrice}
            discount={item.discount}
            outOfStock={item.outOfStock}
            storeProductId={item.storeProductId}
            urlTitle={item.urlTitle}
          />
        ))}
      </div>
    </section>
  );
}
