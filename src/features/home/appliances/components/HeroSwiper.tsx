"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Container } from "@/components/ui/Container";
import { AppImage } from "@/components/ui/image";

import type { HomeBanner } from "../api/get-home-banners";

interface HeroSwiperProps {
  banners: HomeBanner[];
}

function getBannerIndex(slideIndex: number, bannerCount: number) {
  return (slideIndex - 1 + bannerCount) % bannerCount;
}

export default function HeroSwiper({ banners }: HeroSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!banners.length) {
    return null;
  }

  const firstBanner = banners[0];
  const lastBanner = banners[banners.length - 1];
  const hasMultipleBanners = banners.length > 1;
  const slides =
    hasMultipleBanners && firstBanner && lastBanner
      ? [
          { banner: lastBanner, isClone: true, key: `start-clone-${lastBanner.id}` },
          ...banners.map((banner) => ({
            banner,
            isClone: false,
            key: `banner-${banner.id}`,
          })),
          { banner: firstBanner, isClone: true, key: `end-clone-${firstBanner.id}` },
        ]
      : banners.map((banner) => ({
          banner,
          isClone: false,
          key: `banner-${banner.id}`,
        }));

  return (
    <section
      className="relative mt-[7px] h-40 w-full overflow-hidden sm:h-48 lg:mt-6 lg:h-[460px]"
      aria-label="بنرهای صفحهٔ اصلی"
    >
      <Container className="h-full">
        <div className="h-full overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={hasMultipleBanners ? { delay: 4000, disableOnInteraction: false } : false}
            initialSlide={hasMultipleBanners ? 1 : 0}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              if (hasMultipleBanners) {
                setActiveIndex(getBannerIndex(swiper.activeIndex, banners.length));
              }
            }}
            onSlideChangeTransitionEnd={(swiper) => {
              if (!hasMultipleBanners) {
                return;
              }

              if (swiper.activeIndex === 0) {
                swiper.slideTo(banners.length, 0, false);
              } else if (swiper.activeIndex === banners.length + 1) {
                swiper.slideTo(1, 0, false);
              }
            }}
            slidesPerView={1}
            breakpoints={{ 1024: { spaceBetween: 20 } }}
            spaceBetween={8}
            centeredSlides
            className="mx-auto h-full w-[89.2857%] overflow-visible! lg:w-[900px]"
          >
            {slides.map(({ banner, isClone, key }, index) => {
              const image = (
                <AppImage
                  src={banner.image}
                  alt={isClone ? "" : banner.title}
                  fill
                  sizes="(max-width: 1023px) 90vw, 900px"
                  className="object-cover"
                  priority={hasMultipleBanners ? index === 1 : index === 0}
                />
              );

              return (
                <SwiperSlide key={key} className="h-full" aria-hidden={isClone || undefined}>
                  <div className="relative h-full overflow-hidden rounded-lg">
                    {!isClone && banner.href ? <Link href={banner.href}>{image}</Link> : image}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Container>

      {hasMultipleBanners ? (
        <div className="absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2.5 rounded-lg bg-black/15 px-2.5 py-0.75 lg:flex">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`نمایش بنر ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => swiperRef.current?.slideTo(index + 1)}
              className={`border-background bg-background size-2.75 rounded-full transition-colors duration-300 ${
                activeIndex === index ? "bg-primary border" : "border-0"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
