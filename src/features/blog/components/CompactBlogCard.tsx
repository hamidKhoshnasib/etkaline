import Link from "next/link";
import { AppImage } from "@/components/ui/image";
import { Clock, Eye } from "lucide-react";

interface CompactBlogCardProps {
  title: string;
  time?: string;
  views?: string;
  image: string;
  href?: string;
  hasVideo?: boolean;
}

function Meta({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1 text-[#676F71]">
      {icon}
      <span className="label-medium">{text}</span>
    </span>
  );
}

export default function CompactBlogCard({
  title,
  time,
  views,
  image,
  href = "#",
}: CompactBlogCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-[16px] border border-b-4 border-[#D1D4D4] bg-white p-2"
    >
      <div className="relative h-19 w-[81px] shrink-0 overflow-hidden rounded-lg">
        <AppImage src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <p className="body-medium truncate text-black">{title}</p>
        {(time || views) && (
          <div className="flex flex-col gap-1">
            {time && <Meta icon={<Clock className="size-4" />} text={time} />}
            {views && <Meta icon={<Eye className="size-4" />} text={views} />}
          </div>
        )}
      </div>
    </Link>
  );
}

export type { CompactBlogCardProps };
