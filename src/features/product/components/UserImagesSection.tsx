"use client";

import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { AppImage } from "@/components/ui/image";
import "swiper/css";

interface UserImagesSectionProps {
  images: string[];
}

export function UserImagesSection({ images }: UserImagesSectionProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const closeGallery = () => {
    swiperRef.current = null;
    setSelectedImageIndex(null);
  };

  return (
    <div>
      <h3 className="mb-4 text-right text-base font-bold text-gray-800">تصاویر ارسالی کاربران</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            className="focus-visible:outline-primary size-[84px] shrink-0 overflow-hidden rounded-2xl bg-gray-100 outline-offset-2 focus-visible:outline-2"
            onClick={() => setSelectedImageIndex(i)}
            aria-label={`نمایش بزرگ تصویر کاربر ${i + 1}`}
          >
            <AppImage
              src={src}
              alt={`تصویر کاربر ${i + 1}`}
              width={84}
              height={84}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeGallery();
          }
        }}
      >
        <DialogContent
          className="max-w-[calc(100%-2rem)] rounded-none border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-3xl"
          overlayClassName="bg-black/50 supports-backdrop-filter:backdrop-blur-sm"
          overlayProps={{ onClick: closeGallery }}
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">نمایش بزرگ تصویر ارسالی کاربر</DialogTitle>
          <DialogDescription className="sr-only">
            برای بستن تصویر، کلید Escape را بزنید یا دکمه بستن را انتخاب کنید.
          </DialogDescription>
          {selectedImageIndex !== null && (
            <>
              <Swiper
                initialSlide={selectedImageIndex}
                loop={images.length > 1}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="h-[80vh] w-full"
              >
                {images.map((src, index) => (
                  <SwiperSlide key={`${src}-${index}`} className="h-full">
                    <div className="relative h-full w-full">
                      <AppImage
                        src={src}
                        alt={`نمایش بزرگ تصویر ارسالی کاربر ${index + 1}`}
                        fill
                        sizes="(min-width: 640px) 768px, calc(100vw - 2rem)"
                        className="rounded-2xl object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {images.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="bg-background hover:bg-background absolute top-1/2 left-3 z-20 -translate-y-1/2 rounded-full text-black shadow-md transition-none active:not-aria-[haspopup]:translate-y-0!"
                    style={{ transform: "translateY(-50%)" }}
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="نمایش تصویر بعدی"
                  >
                    <ChevronLeftIcon />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="bg-background hover:bg-background absolute top-1/2 right-3 z-20 -translate-y-1/2 rounded-full text-black shadow-md transition-none active:not-aria-[haspopup]:translate-y-0!"
                    style={{ transform: "translateY(-50%)" }}
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="نمایش تصویر قبلی"
                  >
                    <ChevronRightIcon />
                  </Button>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
