import Link from "next/link";
import { AppImage } from "@/components/ui/image";
import { Clock, Eye, Play } from "lucide-react";

interface CompactBlogCardProps {
  title: string;
  time: string;
  views: string;
  image: string;
  href?: string;
  hasVideo?: boolean;
}

function Meta({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1 text-[#676F71]">
      <span className="label-medium">{text}</span>
      {icon}
    </span>
  );
}

export default function CompactBlogCard({
  title,
  time,
  views,
  image,
  href = "#",
  hasVideo = false,
}: CompactBlogCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-[16px] border border-[#D1D4D4] bg-white p-4 transition-shadow hover:shadow-sm"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <p className="body-medium line-clamp-1 text-black">{title}</p>
        <div className="flex flex-col gap-1">
          <Meta icon={<Clock className="size-4" />} text={time} />
          <Meta icon={<Eye className="size-4" />} text={views} />
        </div>
      </div>

      <div className="relative h-19 w-[81px] shrink-0 overflow-hidden rounded-lg">
        <AppImage src={image} alt={title} fill className="object-cover" />
        {hasVideo && (
          <span className="absolute inset-0 grid place-items-center bg-black/20">
            <Play className="size-5 fill-white text-white" />
          </span>
        )}
      </div>
    </Link>
  );
}

export type { CompactBlogCardProps };
