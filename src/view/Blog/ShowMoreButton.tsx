import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowMoreButtonProps {
  href?: string;
  className?: string;
}

export default function ShowMoreButton({ href = "#", className }: ShowMoreButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg px-4 py-1.5",
        "label-medium text-[#3E4344] transition-colors hover:text-primary-hover",
        className,
      )}
    >
      <span>مشاهده همه</span>
      <ArrowLeft className="size-4" />
    </Link>
  );
}
