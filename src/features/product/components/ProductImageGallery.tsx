"use client";

import { useState } from "react";
import Image from "next/image";
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
    <div className="flex flex-col gap-4">
      {/* Main image + actions */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-50">
        <Image
          src={images[active] ?? "https://via.placeholder.com/432x350?text=Product"}
          alt={title}
          width={432}
          height={350}
          className="h-[350px] w-full object-contain p-4"
        />

        {/* Action icons — left side (RTL start = right visually, but placed left in Figma) */}
        <div className="absolute top-4 left-4 flex flex-col gap-3">
          {ACTIONS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              title={label}
              className="hover:text-primary flex size-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors"
            >
              <Icon className="size-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.slice(0, 5).map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "size-[70px] shrink-0 overflow-hidden rounded-xl border-2 bg-gray-50 transition-all",
              active === i ? "border-primary" : "border-transparent hover:border-gray-200",
            )}
          >
            <Image
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
