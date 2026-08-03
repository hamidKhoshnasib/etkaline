import Link from "next/link";
import { cn } from "@/lib/utils";
import { AppImage } from "@/components/ui/image";
import { getStorefront } from "@/config/storefront";
import type { SiteType } from "@/lib/api-site-type";

interface CategoryGridItem {
  id: number | string;
  image: string;
  title: string;
}

interface CategoryGridCardProps {
  title: string;
  description?: string;
  count?: number;
  showMoreLink?: string;
  items: CategoryGridItem[];
  siteType: SiteType;
}

export default function CategoryGridCard({
  title,
  description,
  showMoreLink,
  items,
  siteType,
}: CategoryGridCardProps) {
  const storefront = getStorefront(siteType);
  const previewItems = items.slice(0, 4);
  return (
    <div className="flex flex-col gap-2 rounded-[20px] border border-[#E2E8F0] bg-white p-2.5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h3 className="title-small-bold text-secondary">{title}</h3>
          {description && <p className="label-medium line-clamp-1 text-[#64748b]">{description}</p>}
        </div>
        {showMoreLink ? (
          <Link href={showMoreLink} className="label-medium flex items-center text-[#64748B]">
            بیشتر
          </Link>
        ) : null}
      </div>

      {/* 2×2 product grid */}
      <div className="grid grid-cols-2">
        {previewItems.map((item, i) => (
          <Link
            key={item.id}
            href={storefront.productHref(item.id, item.title)}
            aria-label={`مشاهده ${item.title}`}
            className={cn(
              "flex h-34 flex-col items-center justify-center gap-1.5 p-2",
              i < 2 && "border-b border-[#CBD5E1]",
              i % 2 === 0 && "border-l border-[#CBD5E1]",
            )}
          >
            <AppImage
              width={43}
              height={54}
              src={item.image}
              alt={item.title}
              className="line-clamp-1 h-13.5 w-10.75 object-contain"
            />
            <p className="label-large flex w-full justify-center truncate">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export type { CategoryGridCardProps, CategoryGridItem };
