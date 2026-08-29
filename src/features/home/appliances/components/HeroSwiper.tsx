"use client";

import { useState } from "react";
import { AppImage } from "@/components/ui/image";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import type { HomeBanner } from "../api/get-home-banners";

interface HeroSwiperProps {
  banners: HomeBanner[];
}

export default function HeroSwiper({ banners }: HeroSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  if (!banners.length) {
    return null;
  }

  return (
    <section
      className="relative mt-[7px] h-40 w-full sm:h-48 lg:mt-6 lg:h-[460px]"
      aria-label="بنرهای صفحهٔ اصلی"
    >
      <Container className="h-full">
        <Swiper
          modules={[Autoplay]}
          onSwiper={setSwiperRef}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={banners.length > 1}
          slidesPerView={1.12}
          breakpoints={{ 1024: { slidesPerView: "auto", spaceBetween: 20 } }}
          spaceBetween={8}
          centeredSlides
          className="h-full w-full"
        >
          {banners.map((banner, index) => {
            const image = (
              <AppImage
                src={banner.image}
                alt={banner.title}
                fill
                sizes="(max-width: 1023px) 100vw, 900px"
                className="object-cover"
                priority={index === 0}
              />
            );

            return (
              <SwiperSlide key={banner.id} className="h-full lg:!w-[900px]">
                <div className="relative h-full overflow-hidden rounded-lg">
                  {banner.href ? <Link href={banner.href}>{image}</Link> : image}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>

      {banners.length > 1 ? (
        <div className="absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2.5 rounded-lg bg-black/15 px-2.5 py-0.75 lg:flex">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`نمایش بنر ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => swiperRef?.slideToLoop(index)}
              className={`size-2.75 rounded-full transition-colors duration-300 ${
                activeIndex === index ? "bg-primary border border-[#F8FAFC]" : "bg-[#F8FAFC]"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
