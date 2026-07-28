"use client";

import Link from "next/link";
import { AppImage } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  href?: string;
  showBottomBorder?: boolean;
}

export default function BlogCard({
  image,
  title,
  description,
  date,
  href = "#",
  showBottomBorder = false,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#D1D4D4] bg-white",
        showBottomBorder && "border-b-4",
      )}
    >
      <div className="aspect-[1.15] w-full overflow-hidden border-b border-[#D1D4D4] lg:aspect-auto lg:h-[246px]">
        <AppImage
          src={image}
          alt={title}
          width={284}
          height={246}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2.5 lg:min-h-[130px] lg:gap-2 lg:p-4">
        <p className="lg:title-small-bold line-clamp-2 text-xs leading-5 font-bold">{title}</p>
        <p className="lg:body-medium line-clamp-1 text-[11px] leading-4 text-[#64748B]">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2.5 lg:pt-4">
          <span className="label-small text-[#94A3B8]">{date}</span>
          <ArrowLeft className="group-hover:text-primary size-5 text-[#94A3B8] transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export type { BlogCardProps };
