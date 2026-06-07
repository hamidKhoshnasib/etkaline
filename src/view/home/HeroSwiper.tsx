"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import "swiper/css";
import swiper1 from "@/assets/images/swiper1.png";
import swiper2 from "@/assets/images/swiper2.jpg";

const slides = [swiper1, swiper2, swiper1,swiper1,swiper1];

export default function HeroSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  return (
    <div className="relative h-full w-full">
      <Swiper
        modules={[Autoplay]}
        onSwiper={setSwiperRef}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={slides.length > 1}
        slidesPerView={1.25}
        spaceBetween={20}
        centeredSlides={true}
        className="h-full w-full"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i} style={{ height: "100%" }}>
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image
                src={src}
                alt={`banner ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 rounded-lg bg-black/15 px-2.5 py-0.75">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef?.slideToLoop(i)}
            className={`h-2.75 w-2.75 rounded-full transition-colors duration-300 ${
              activeIndex === i
                ? "bg-primary border border-[#F8FAFC]"
                : "bg-[#F8FAFC]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}