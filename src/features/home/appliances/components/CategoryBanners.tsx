import { AppImage } from "@/components/ui/image";
import Link from "next/link";

import type { LayoutBanner } from "@/features/home/appliances/api/get-layout-banners";

interface CategoryBannersProps {
  banners: LayoutBanner[];
}

function getBannerColumnSpan(width: number) {
  return Math.min(Math.max(width, 1), 12);
}

export default function CategoryBanners({ banners }: CategoryBannersProps) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-12 gap-3 sm:gap-5">
        {banners.map((banner) => {
          const columnSpan = getBannerColumnSpan(banner.width);
          const image = (
            <AppImage
              src={banner.image}
              alt={banner.title}
              width={banner.width}
              height={banner.height}
              sizes={`${Math.ceil((columnSpan / 12) * 100)}vw`}
              className="h-auto w-full object-cover"
            />
          );

          return banner.href ? (
            <Link
              key={banner.id}
              href={banner.href}
              className="overflow-hidden rounded-2xl"
              style={{ gridColumn: `span ${columnSpan}` }}
            >
              {image}
            </Link>
          ) : (
            <div
              key={banner.id}
              className="overflow-hidden rounded-2xl"
              style={{ gridColumn: `span ${columnSpan}` }}
            >
              {image}
            </div>
          );
        })}
      </div>
    </section>
  );
}
