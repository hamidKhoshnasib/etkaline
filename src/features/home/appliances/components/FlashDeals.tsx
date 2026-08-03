"use client";

import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import Bazel from "@/assets/icons/bazell.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "@/components/ui/image";
import { formatDiscountPercent, formatProductPrice } from "@/features/product/lib/format-price";
import { ProductCard } from "@/features/product/components/ProductCard";
import ProductSwiper from "@/features/product/components/ProductSwiper";
import type { Product } from "@/features/product/model/product";
import { SITE_TYPES } from "@/lib/api-site-type";
import { cn } from "@/lib/utils";
import { useStorefront } from "@/providers/storefront-provider";

interface FlashDealsProps {
  items: Product[];
}

const dealFilters = [
  { id: "all", label: "همه", width: "w-19", keyword: null },
  { id: "washing-machine", label: "ماشین لباسشویی", width: "w-[142px]", keyword: "لباسشویی" },
  { id: "dishwasher", label: "ماشین ظرف‌شویی", width: "w-[143px]", keyword: "ظرفشویی" },
] as const;

type DealFilterId = (typeof dealFilters)[number]["id"];

function filterDeals(items: Product[], filterId: DealFilterId) {
  const filter = dealFilters.find((item) => item.id === filterId);
  if (!filter?.keyword) {
    return items;
  }

  return items.filter((product) => product.title.includes(filter.keyword));
}

function DealFilters({
  activeFilter,
  onChange,
}: {
  activeFilter: DealFilterId;
  onChange: (filterId: DealFilterId) => void;
}) {
  return (
    <div className="flex [scrollbar-width:none] items-center gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {dealFilters.map((filter) => {
        const isSelected = filter.id === activeFilter;

        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(filter.id)}
            className={cn(
              "flex h-9 shrink-0 items-center justify-center rounded-full border px-6 text-center text-xs leading-[19.6px] whitespace-nowrap transition-colors",
              filter.width,
              isSelected
                ? "border-primary-hover text-secondary bg-slate-50 font-bold"
                : "hover:border-primary-hover border-[#F0EEF0] bg-white text-slate-600",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

function MobileDealCard({ product }: { product: Product }) {
  const storefront = useStorefront();
  return (
    <Link
      href={storefront.productHref(product.id, product.urlTitle ?? product.title)}
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
              <Badge variant="offer">{formatDiscountPercent(product.discount)}٪</Badge>
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

function MobileFlashDeals({
  items,
  activeFilter,
  onFilterChange,
}: FlashDealsProps & {
  activeFilter: DealFilterId;
  onFilterChange: (filterId: DealFilterId) => void;
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      aria-labelledby="mobile-flash-deals-title"
      className="bg-primary-hover relative -mx-4 h-[362px] w-[calc(100%+2rem)] max-w-none overflow-hidden rounded-tr-[32px] rounded-br-[32px] lg:hidden"
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
        <DealFilters activeFilter={activeFilter} onChange={onFilterChange} />
      </div>

      <div className="absolute top-[77px] right-[68px] left-0 h-[228px] overflow-hidden bg-white">
        {items.length ? (
          <Swiper
            key={activeFilter}
            dir="rtl"
            slidesPerView="auto"
            spaceBetween={20}
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
        ) : (
          <p className="text-muted-foreground flex h-full items-center justify-center px-4 text-center text-sm">
            محصولی در این دسته وجود ندارد.
          </p>
        )}
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
        className="bg-background text-foreground hover:bg-background hover:text-foreground border-border absolute right-[18px] bottom-2.5 size-11 rounded-full ring-0 transition-none active:not-aria-[haspopup]:translate-y-0!"
        style={{ transform: "none" }}
      >
        <MoveRight />
      </Button>
      <Button
        type="button"
        variant="secondary-gray"
        size="icon-md"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="محصولات بعدی"
        className="bg-background text-foreground hover:bg-background hover:text-foreground border-border absolute bottom-2.5 left-[17px] size-11 rounded-full ring-0 transition-none active:not-aria-[haspopup]:translate-y-0!"
        style={{ transform: "none" }}
      >
        <MoveLeft />
      </Button>
    </section>
  );
}

export default function FlashDeals({ items }: FlashDealsProps) {
  const [activeFilter, setActiveFilter] = useState<DealFilterId>("all");
  const filteredItems = filterDeals(items, activeFilter);
  const { siteType } = useStorefront();

  return (
    <>
      <MobileFlashDeals
        items={filteredItems}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <section className="bg-primary-hover border-primary-hover hidden w-full overflow-hidden rounded-[32px] border-2 lg:block">
        <div className="bg-border relative flex items-center rounded-[16px]">
          <div className="bg-primary-hover absolute top-0 h-1/2 w-full" />
          <div className="absolute bottom-0 h-1/2 w-full bg-white" />
          <div className="bg-primary-hover z-10 flex h-18.75 shrink-0 items-center gap-2 rounded-l-[16px] px-2 pl-5">
            <Bazel className="size-auto" />
            <span className="headline-large text-white">شگفتانه لحظه‌ای</span>
          </div>

          <div className="z-10 flex h-18.75 flex-1 items-center overflow-hidden rounded-tr-[16px] bg-white px-5">
            <DealFilters activeFilter={activeFilter} onChange={setActiveFilter} />
          </div>
        </div>

        <div className="rounded-tr-[16px] bg-white p-4">
          {filteredItems.length ? (
            <ProductSwiper
              items={filteredItems}
              renderSlide={(product) => (
                <ProductCard
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  className={
                    siteType === SITE_TYPES.supermarket
                      ? "w-full border-0"
                      : "h-[308px] w-full border-0"
                  }
                  imageClassName="lg:h-[190px] lg:w-full"
                  priceClassName="text-primary-hover"
                  priceIconClassName="[&_path]:fill-primary-hover"
                />
              )}
            />
          ) : (
            <p className="text-muted-foreground flex min-h-[308px] items-center justify-center text-center text-sm">
              محصولی در این دسته وجود ندارد.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
