"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { MoveLeft, MoveRight } from "lucide-react";
import { Btn, type BtnProps } from "@/components/ui/Btn";
import "swiper/css";

interface ProductSwiperProps<T extends { id: number | string }> {
  items: T[];
  renderSlide: (item: T) => React.ReactNode;
  swiperKey?: string;
  breakpoints?: Record<number, { slidesPerView: number }>;
  spaceBetween?: number;
  slidesPerView?: number;
  btnVariant?: BtnProps["variant"];
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
  spaceBetween = 20,
  slidesPerView = 2,
  btnVariant = "secondary-gray",
}: ProductSwiperProps<T>) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative">
      <Btn
        variant={btnVariant}
        size="icon-md"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-1/2 right-1 z-10 -translate-y-1/2"
      >
        <MoveRight />
      </Btn>

      <Swiper
        key={swiperKey}
        modules={[Navigation]}
        onSwiper={(s) => { swiperRef.current = s; }}
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

      <Btn
        variant={btnVariant}
        size="icon-md"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-1/2 left-1 z-10 -translate-y-1/2"
      >
        <MoveLeft />
      </Btn>
    </div>
  );
}