import Link from "next/link";
import { AppImage } from "@/components/ui/image";
import { ChevronLeft } from "lucide-react";

interface BlogPromoBannerProps {
  title?: string;
  subtitle?: string;
  image?: string;
  href?: string;
  width?: number;
  height?: number;
}

export default function BlogPromoBanner({
  title = "آشپزخونه ، قلب خونه",
  subtitle = "چیدمان به سبک اتکالاین",
  image = "https://via.placeholder.com/600x420?text=Kitchen",
  href = "#",
  width = 600,
  height = 420,
}: BlogPromoBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-b from-[#5C6466] to-[#2B2F30]">
      {/* Decorative glow */}
      <span className="pointer-events-none absolute -top-16 right-1/4 size-52 rounded-full bg-white/5 blur-2xl" />

      <div className="flex items-center justify-between gap-6 px-10 py-8">
        {/* Copy */}
        <div className="flex flex-col items-end gap-3 text-right">
          <div className="space-y-1">
            <h3 className="title-large-bold text-white">{title}</h3>
            <p className="title-small text-white/70">{subtitle}</p>
          </div>
          <Link
            href={href}
            className="bg-primary-hover label-large-bold mt-2 inline-flex items-center gap-1 rounded-lg px-5 py-2.5 text-white transition-opacity hover:opacity-90"
          >
            <span>مشاهده همه</span>
            <ChevronLeft className="size-4" />
          </Link>
        </div>

        {/* Visual */}
        <div className="relative h-40 w-full max-w-[460px] shrink-0">
          <AppImage
            src={image}
            alt={title}
            width={width}
            height={height}
            sizes="(max-width: 1023px) 100vw, 460px"
            className="h-full w-full object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}

export type { BlogPromoBannerProps };
