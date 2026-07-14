"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  href?: string;
}

export default function BlogCard({ image, title, description, date, href = "#" }: BlogCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-shadow hover:shadow-md lg:rounded-[16px]"
    >
      <div className="aspect-[1.15] w-full overflow-hidden border-b border-[#E2E8F0] lg:aspect-auto lg:h-61.5 lg:w-71">
        <Image
          src={image}
          alt={title}
          width={284}
          height={246}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2.5 lg:p-4">
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
