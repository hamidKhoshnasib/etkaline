"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import ProductSwiper from "@/features/product/components/ProductSwiper";
import { ProductCard, type ProductCardProps } from "@/features/product/components/ProductCard";

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
  cardClassName?: string;
  disableCardHover?: boolean;
  stickCardPriceToBottom?: boolean;
}

export default function ProductSection({
  title,
  description,
  showMoreLink,
  items,
  cardClassName,
  disableCardHover = false,
  stickCardPriceToBottom = true,
}: ProductSectionProps) {
  return (
    <section className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-3 lg:rounded-[28px] lg:p-5">
      <SectionHeader title={title} description={description} showMoreLink={showMoreLink} />

      <ProductSwiper
        items={items}
        renderSlide={(item) => (
          <ProductCard
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            originalPrice={item.originalPrice}
            discount={item.discount}
            className={cardClassName ?? "h-full w-full"}
            disableHover={disableCardHover}
            stickPriceToBottom={stickCardPriceToBottom}
          />
        )}
      />
    </section>
  );
}
