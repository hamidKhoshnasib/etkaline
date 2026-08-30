import Link from "next/link";
import Image35 from "@/assets/images/image 35.png";
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
  title,
  subtitle,
  image = Image35.src,
  href = "#",
}: BlogPromoBannerProps) {
  return (
    <section className="relative min-h-56 overflow-hidden rounded-[24px] bg-gradient-to-b from-[#5C6466] to-[#2B2F30]">
      <AppImage
        src={image}
        alt=""
        fill
        sizes="(max-width: 1023px) 100vw, 1200px"
        className="object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/75 via-black/35 to-transparent" />
      {/* Decorative glow */}
      <span className="pointer-events-none absolute -top-16 right-1/4 size-52 rounded-full bg-white/5 blur-2xl" />

      <div className="relative z-10 flex min-h-56 items-center px-10 py-8">
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
      </div>
    </section>
  );
}

export type { BlogPromoBannerProps };
