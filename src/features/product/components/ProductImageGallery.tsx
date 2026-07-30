"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { AppImage } from "@/components/ui/image";
import { ShareIcon, HeartIcon, GitCompareIcon, PresentationIcon } from "lucide-react";
import { useToggleFavorite } from "@/features/product/api/favorites";
import { cn } from "@/lib/utils";

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
  const [bookmarked, setBookmarked] = useState(isFavorite);
  const bookmarkAfterLoginRef = useRef(false);
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

  return (
    <div className="flex w-full flex-col gap-3 lg:w-[432px] lg:shrink-0 lg:gap-4">
      {/* Main image + actions */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-50 lg:bg-transparent">
        <AppImage
          src={images[active] ?? NO_IMAGE_URL}
          alt={title}
          width={432}
          height={350}
          className="h-72 w-full object-contain p-2 sm:h-80 lg:h-[350px] lg:p-0"
        />

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
                  className={cn("size-5", isFavorite && bookmarked && "fill-primary text-primary")}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 lg:gap-2">
        {images.slice(0, 5).map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "size-15 shrink-0 overflow-hidden rounded-md border-2 bg-gray-50 transition-all lg:size-[70px]",
              active === i ? "border-primary" : "border-transparent hover:border-gray-200",
            )}
          >
            <AppImage
              src={src}
              alt={`${title} - ${i + 1}`}
              width={70}
              height={70}
              className="h-full w-full object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
