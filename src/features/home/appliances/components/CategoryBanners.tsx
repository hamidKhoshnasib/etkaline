import Image from "next/image";
import Link from "next/link";

import type { LayoutBanner } from "@/features/home/appliances/api/get-layout-banners";

interface CategoryBannersProps {
  banners: LayoutBanner[];
}

export default function CategoryBanners({ banners }: CategoryBannersProps) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-5">
        {banners.map((banner) => {
          const image = (
            <Image
              src={banner.image}
              alt={banner.title}
              width={banner.width}
              height={banner.height}
              sizes="(min-width: 640px) 20vw, 50vw"
              className="h-auto w-full object-cover"
            />
          );

          return banner.href ? (
            <Link key={banner.id} href={banner.href} className="flex-1 overflow-hidden rounded-2xl">
              {image}
            </Link>
          ) : (
            <div key={banner.id} className="flex-1 overflow-hidden rounded-2xl">
              {image}
            </div>
          );
        })}
      </div>
    </section>
  );
}
