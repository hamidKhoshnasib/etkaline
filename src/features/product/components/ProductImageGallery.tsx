"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GitCompareIcon,
  HeartIcon,
  MoreHorizontalIcon,
  PresentationIcon,
  ShareIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppImage } from "@/components/ui/image";
import { useToggleFavorite } from "@/features/product/api/favorites";
import { cn } from "@/lib/utils";
import "swiper/css";

interface ProductImageGalleryProps {
  productId: number;
  images: string[];
  title: string;
  isFavorite: boolean;
}

const ACTIONS = [
  { id: "share", icon: ShareIcon, label: "اشتراک‌گذاری" },
  { id: "favorite", icon: HeartIcon, label: "علاقه‌مندی" },
  { id: "compare", icon: GitCompareIcon, label: "مقایسه" },
  { id: "presentation", icon: PresentationIcon, label: "معرفی" },
] as const;

const NO_IMAGE_URL = "/images/image-placeholder.svg";

export function ProductImageGallery({
  productId,
  images,
  title,
  isFavorite,
}: ProductImageGalleryProps) {
  const [active, setActive] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(isFavorite);
  const bookmarkAfterLoginRef = useRef(false);
  const gallerySwiperRef = useRef<SwiperType | null>(null);
  const { status } = useSession();
  const { isPending, mutateAsync } = useToggleFavorite();

  const updateBookmark = useCallback(async () => {
    if (isPending) {
      return;
    }

    try {
      const nextBookmarked = await mutateAsync({ productId, isBookmarked: bookmarked });
      setBookmarked(nextBookmarked);
      toast.success(nextBookmarked ? "به علاقه‌مندی‌ها اضافه شد." : "از علاقه‌مندی‌ها حذف شد.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تغییر علاقه‌مندی ناموفق بود.");
    }
  }, [bookmarked, isPending, mutateAsync, productId]);

  useEffect(() => {
    function updateBookmarkAfterLogin() {
      if (!bookmarkAfterLoginRef.current) {
        return;
      }

      bookmarkAfterLoginRef.current = false;
      void updateBookmark();
    }

    function clearBookmarkAfterLogin() {
      bookmarkAfterLoginRef.current = false;
    }

    window.addEventListener("etkala:authenticated", updateBookmarkAfterLogin);
    window.addEventListener("etkala:auth-dismissed", clearBookmarkAfterLogin);
    return () => {
      window.removeEventListener("etkala:authenticated", updateBookmarkAfterLogin);
      window.removeEventListener("etkala:auth-dismissed", clearBookmarkAfterLogin);
    };
  }, [updateBookmark]);

  function handleBookmark() {
    if (isPending) {
      return;
    }

    if (status !== "authenticated") {
      bookmarkAfterLoginRef.current = true;
      window.dispatchEvent(new Event("etkala:open-auth"));
      return;
    }

    void updateBookmark();
  }

  function openGallery(imageIndex: number) {
    setActive(imageIndex);
    setIsGalleryOpen(true);
  }

  function showPreviousImage() {
    gallerySwiperRef.current?.slidePrev();
  }

  function showNextImage() {
    gallerySwiperRef.current?.slideNext();
  }

  function selectGalleryImage(imageIndex: number) {
    setActive(imageIndex);
    gallerySwiperRef.current?.slideTo(imageIndex);
  }

  const visibleThumbnails = images.slice(0, 4);
  const hasMoreImages = images.length > visibleThumbnails.length;

  return (
    <>
      <div className="flex w-full flex-col gap-3 lg:w-[432px] lg:shrink-0 lg:gap-4">
        {/* Main image + actions */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 lg:bg-transparent">
          <button
            type="button"
            onClick={() => openGallery(active)}
            className="focus-visible:ring-ring/50 block w-full cursor-pointer rounded-2xl outline-none focus-visible:ring-3"
            aria-label={`نمایش بزرگ ${title}`}
          >
            <AppImage
              src={images[active] ?? NO_IMAGE_URL}
              alt={title}
              width={432}
              height={350}
              className="h-72 w-full object-contain p-2 sm:h-80 lg:h-[350px] lg:p-0"
            />
          </button>

          {/* Action icons stay on the visual right in the RTL layout. */}
          <div className="bg-muted/80 absolute start-2 top-2 flex gap-1 rounded-full p-1 lg:start-2 lg:top-2 lg:flex-col lg:gap-2 lg:p-2">
            {ACTIONS.map(({ id, icon: Icon, label }) => {
              const isFavorite = id === "favorite";

              return (
                <button
                  key={id}
                  type="button"
                  title={label}
                  aria-label={isFavorite && bookmarked ? "حذف از علاقه‌مندی‌ها" : label}
                  aria-pressed={isFavorite ? bookmarked : undefined}
                  aria-busy={isFavorite ? isPending : undefined}
                  disabled={isFavorite ? isPending : undefined}
                  onClick={isFavorite ? handleBookmark : undefined}
                  className="hover:text-primary flex size-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors lg:size-9"
                >
                  <Icon
                    className={cn(
                      "size-5",
                      isFavorite && bookmarked && "fill-primary text-primary",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 lg:gap-2">
          {visibleThumbnails.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => openGallery(index)}
              className="focus-visible:ring-ring/50 size-15 shrink-0 cursor-pointer overflow-hidden rounded-md bg-gray-50 transition-colors outline-none hover:bg-gray-100 focus-visible:ring-3 lg:size-[70px]"
              aria-label={`نمایش تصویر ${index + 1} از ${images.length}`}
            >
              <AppImage
                src={src}
                alt={`${title} - ${index + 1}`}
                width={70}
                height={70}
                className="h-full w-full object-contain p-1"
              />
            </button>
          ))}

          {hasMoreImages ? (
            <button
              type="button"
              onClick={() => openGallery(4)}
              className="focus-visible:ring-ring/50 relative size-15 shrink-0 cursor-pointer overflow-hidden rounded-md bg-gray-950 outline-none focus-visible:ring-3 lg:size-[70px]"
              aria-label={`مشاهده همه ${images.length} تصویر`}
            >
              <AppImage
                src={images[4] ?? NO_IMAGE_URL}
                alt=""
                width={70}
                height={70}
                className="h-full w-full object-cover opacity-40"
              />
              <MoreHorizontalIcon className="absolute inset-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-white" />
            </button>
          ) : null}
        </div>
      </div>

      <Dialog
        open={isGalleryOpen}
        onOpenChange={(open) => {
          setIsGalleryOpen(open);
          if (!open) {
            gallerySwiperRef.current = null;
          }
        }}
      >
        <DialogContent
          dir="rtl"
          showCloseButton={false}
          overlayClassName="bg-black"
          className="flex h-dvh w-screen max-w-none flex-col gap-0 rounded-none border-0 bg-black p-0 text-white ring-0 sm:max-w-none"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              showNextImage();
            }

            if (event.key === "ArrowRight") {
              showPreviousImage();
            }
          }}
        >
          <DialogTitle className="sr-only">گالری تصاویر {title}</DialogTitle>
          <DialogDescription className="sr-only">
            برای جابه‌جایی میان تصاویر از دکمه‌های قبلی و بعدی یا کلیدهای جهت‌دار استفاده کنید.
          </DialogDescription>

          <header className="flex h-16 shrink-0 items-center justify-between px-4 lg:px-6">
            <span className="text-sm text-white/70">
              {(active + 1).toLocaleString("fa-IR")} از {images.length.toLocaleString("fa-IR")}
            </span>
            <DialogClose render={<Button type="button" variant="ghost" size="icon-lg" />}>
              <XIcon data-icon="inline-start" className="text-white" />
              <span className="sr-only">بستن گالری تصاویر</span>
            </DialogClose>
          </header>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 lg:px-24">
            <Swiper
              dir="rtl"
              initialSlide={active}
              allowTouchMove={images.length > 1}
              onSwiper={(swiper) => {
                gallerySwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActive(swiper.activeIndex)}
              className="h-full w-full"
            >
              {images.map((src, index) => (
                <SwiperSlide key={`${src}-slide-${index}`} className="h-full">
                  <div className="flex h-full w-full items-center justify-center">
                    <AppImage
                      src={src}
                      alt={`${title} - تصویر ${(index + 1).toLocaleString("fa-IR")}`}
                      width={1200}
                      height={1200}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {images.length > 1 ? (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon-xl"
                  onClick={showPreviousImage}
                  disabled={active === 0}
                  className="absolute start-4 top-1/2 -translate-y-1/2 rounded-full lg:start-8"
                  aria-label="تصویر قبلی"
                >
                  <ChevronRightIcon data-icon="inline-start" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon-xl"
                  onClick={showNextImage}
                  disabled={active === images.length - 1}
                  className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full lg:end-8"
                  aria-label="تصویر بعدی"
                >
                  <ChevronLeftIcon data-icon="inline-start" />
                </Button>
              </>
            ) : null}
          </div>

          <div className="shrink-0 overflow-x-auto px-4 py-4 lg:px-6">
            <div className="mx-auto flex w-max items-center gap-2">
              {images.map((src, index) => (
                <button
                  key={`${src}-gallery-${index}`}
                  type="button"
                  onClick={() => selectGalleryImage(index)}
                  aria-label={`نمایش تصویر ${index + 1}`}
                  aria-current={active === index ? "true" : undefined}
                  className={cn(
                    "size-16 shrink-0 overflow-hidden rounded-md bg-white transition-opacity outline-none focus-visible:ring-3 focus-visible:ring-white/60 lg:size-[72px]",
                    active === index ? "opacity-100" : "opacity-50 hover:opacity-80",
                  )}
                >
                  <AppImage
                    src={src}
                    alt=""
                    width={72}
                    height={72}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
