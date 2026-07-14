"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import "swiper/css";

interface ProductSwiperProps<T extends { id: number | string }> {
  items: T[];
  renderSlide: (item: T) => React.ReactNode;
  swiperKey?: string;
  breakpoints?: Record<number, { slidesPerView: number }>;
  spaceBetween?: number;
  slidesPerView?: number;
  btnVariant?: VariantProps<typeof buttonVariants>["variant"];
}

export default function ProductSwiper<T extends { id: number | string }>({
  items,
  renderSlide,
  swiperKey,
  breakpoints = {
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
    1280: { slidesPerView: 7 },
  },
  spaceBetween = 8,
  slidesPerView = 3,
  btnVariant = "secondary-gray",
}: ProductSwiperProps<T>) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative">
      <Button
        variant={btnVariant}
        size="icon-md"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-1/2 right-1 z-10 -translate-y-1/2"
      >
        <MoveRight />
      </Button>

      <Swiper
        key={swiperKey}
        modules={[Navigation]}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="h-auto!">
            {renderSlide(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        variant={btnVariant}
        size="icon-md"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-1/2 left-1 z-10 -translate-y-1/2"
      >
        <MoveLeft />
      </Button>
    </div>
  );
}
