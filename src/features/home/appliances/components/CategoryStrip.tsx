import Link from "next/link";

import { AppImage } from "@/components/ui/image";
import type { CategoryBanner } from "@/features/home/appliances/api/get-category-banners";

interface CategoryStripProps {
  banners: CategoryBanner[];
}

export default function CategoryStrip({ banners }: CategoryStripProps) {
  if (!banners.length) {
    return null;
  }

  return (
    <div className="-mx-4 flex w-[calc(100%+2rem)] touch-pan-x snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-scroll overscroll-x-contain px-4 lg:mx-0 lg:w-full lg:justify-between lg:gap-2 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
      {banners.map(({ id, image, title, href }) => {
        const content = (
          <>
            <AppImage
              src={image}
              alt={title}
              width={56}
              height={56}
              className="size-14 object-contain lg:size-20"
            />
            <span className="label-medium w-full truncate text-center">{title}</span>
          </>
        );

        return (
          <Link
            key={id}
            href={href}
            className="flex w-16 shrink-0 snap-start flex-col items-center gap-1.5 lg:w-auto lg:gap-2"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
