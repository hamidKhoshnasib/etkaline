"use client";

import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import Bazel from "@/assets/icons/bazell.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "@/components/ui/image";
import { formatProductPrice } from "@/features/product/lib/format-price";
import { ProductCard } from "@/features/product/components/ProductCard";
import ProductSwiper from "@/features/product/components/ProductSwiper";
import type { Product } from "@/features/product/model/product";
import { cn } from "@/lib/utils";

interface FlashDealsProps {
  items: Product[];
}

const mobileFilters = [
  { label: "همه", width: "w-19", selected: true },
  { label: "ماشین لباسشویی", width: "w-[142px]", selected: false },
  { label: "ماشین ظرف‌شویی", width: "w-[143px]", selected: false },
];

function MobileDealCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${encodeURIComponent(String(product.id))}`}
      aria-label={`مشاهده ${product.title}`}
      className="focus-visible:outline-primary flex h-[226px] w-[113px] flex-col overflow-hidden rounded-lg bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="flex h-[119px] shrink-0 items-center justify-center overflow-hidden rounded-[28px]">
        <AppImage
          src={product.image}
          alt={product.title}
          width={113}
          height={119}
          sizes="113px"
          className="size-full object-contain"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-1 py-2">
        <p className="line-clamp-2 h-10 shrink-0 text-right text-xs leading-[19.6px] text-slate-700">
          {product.title}
        </p>

        <div className="flex h-10 shrink-0 flex-col">
          {product.discount && product.originalPrice ? (
            <div className="flex h-5 min-w-0 items-center justify-between px-[3px]">
              <Badge variant="offer">{product.discount.toLocaleString("fa-IR")}٪</Badge>
              <s className="truncate text-xs leading-[19.6px] text-slate-500">
                {formatProductPrice(product.originalPrice)}
              </s>
            </div>
          ) : (
            <div className="h-5" aria-hidden="true" />
          )}

          <div className="text-primary-hover flex h-5 min-w-0 items-center justify-between">
            <span className="truncate text-xs leading-[19.6px] font-bold">
              {formatProductPrice(product.price)}
            </span>
            <TomanIcon className="size-4.5 shrink-0 [&_path]:fill-current" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function MobileFlashDeals({ items }: FlashDealsProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      aria-labelledby="mobile-flash-deals-title"
      className="bg-primary-hover relative -mx-4 h-[362px] w-[calc(100%+2rem)] max-w-none overflow-hidden rounded-tr-[32px] rounded-br-[32px] sm:hidden"
    >
      <div
        className="border-primary-hover absolute top-0 right-0 left-0 h-[87px] rounded-tr-[32px] rounded-br-[16px] border-t-2 border-r-2 bg-white"
        aria-hidden="true"
      />
      <div
        className="border-primary-hover absolute top-[87px] right-0 left-0 h-[188px] border-r-2 bg-white"
        aria-hidden="true"
      />
      <div
        className="border-primary-hover absolute top-[275px] right-0 bottom-0 left-0 rounded-tr-[16px] rounded-br-[32px] border-r-2 border-b-2 bg-white"
        aria-hidden="true"
      />

      <div className="absolute top-[19px] right-[18px] flex h-9 w-[379px] gap-3 overflow-hidden">
        {mobileFilters.map((filter) => (
          <span
            key={filter.label}
            className={cn(
              "flex h-9 shrink-0 items-center justify-center rounded-full border px-6 text-center text-xs leading-[19.6px] whitespace-nowrap",
              filter.width,
              filter.selected
                ? "border-primary-hover text-secondary bg-slate-50 font-bold"
                : "border-[#F0EEF0] bg-white text-slate-600",
            )}
          >
            {filter.label}
          </span>
        ))}
      </div>

      <div className="absolute top-[77px] right-[68px] left-0 h-[228px] overflow-hidden bg-white">
        <Swiper
          dir="rtl"
          slidesPerView="auto"
          spaceBetween={8}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="h-full"
        >
          {items.map((product) => (
            <SwiperSlide key={product.id} className="h-[226px]! w-[113px]!">
              <MobileDealCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="bg-primary-hover absolute top-[87px] right-0 flex h-[188px] w-[59px] items-center justify-center rounded-l-[16px]">
        <h2
          id="mobile-flash-deals-title"
          className="rotate-90 text-xl leading-7 font-bold whitespace-nowrap text-white"
        >
          شگفتانه لحظه‌ای
        </h2>
      </div>

      <Button
        type="button"
        variant="secondary-gray"
        size="icon-md"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="محصولات قبلی"
        className="absolute right-[18px] bottom-2.5 size-11 rounded-full"
      >
        <MoveRight />
      </Button>
      <Button
        type="button"
        variant="secondary-gray"
        size="icon-md"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="محصولات بعدی"
        className="absolute bottom-2.5 left-[17px] size-11 rounded-full"
      >
        <MoveLeft />
      </Button>
    </section>
  );
}

export default function FlashDeals({ items }: FlashDealsProps) {
  return (
    <>
      <MobileFlashDeals items={items} />

      <section className="bg-primary-hover border-primary-hover hidden w-full overflow-hidden rounded-[32px] border-2 sm:block">
        <div className="bg-border relative flex items-center rounded-[16px]">
          <div className="bg-primary-hover absolute top-0 h-1/2 w-full" />
          <div className="absolute bottom-0 h-1/2 w-full bg-white" />
          <div className="bg-primary-hover z-10 flex h-18.75 shrink-0 items-center gap-2 rounded-l-[16px] px-2 pl-5">
            <Bazel className="size-auto" />
            <span className="headline-large text-white">شگفتانه لحظه‌ای</span>
          </div>

          <div className="z-10 h-18.75 flex-1 rounded-tr-[16px] bg-white" />
        </div>

        <div className="rounded-tr-[16px] bg-white p-4">
          <ProductSwiper
            items={items}
            renderSlide={(product) => (
              <ProductCard
                id={product.id}
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
    </>
  );
}
