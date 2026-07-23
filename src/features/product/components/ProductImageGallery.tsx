"use client";

import { useState } from "react";
import { AppImage } from "@/components/ui/image";
import { ShareIcon, HeartIcon, GitCompareIcon, PresentationIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

const ACTIONS = [
  { icon: ShareIcon, label: "اشتراک‌گذاری" },
  { icon: HeartIcon, label: "علاقه‌مندی" },
  { icon: GitCompareIcon, label: "مقایسه" },
  { icon: PresentationIcon, label: "معرفی" },
];

export function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex w-full flex-col gap-3 lg:w-[432px] lg:shrink-0 lg:gap-4">
      {/* Main image + actions */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-50 lg:bg-transparent">
        <AppImage
          src={images[active] ?? "https://via.placeholder.com/432x350?text=Product"}
          alt={title}
          width={432}
          height={350}
          className="h-72 w-full object-contain p-2 sm:h-80 lg:h-[350px] lg:p-0"
        />

        {/* Action icons stay on the visual right in the RTL layout. */}
        <div className="bg-muted/80 absolute start-2 top-2 flex gap-1 rounded-full p-1 lg:start-2 lg:top-2 lg:flex-col lg:gap-2 lg:p-2">
          {ACTIONS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              title={label}
              className="hover:text-primary flex size-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors lg:size-9"
            >
              <Icon className="size-5" />
            </button>
          ))}
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
