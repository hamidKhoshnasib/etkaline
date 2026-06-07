import Link from "next/link";
import { GripVertical, MoveLeft } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  showMoreLink?: string;
}

export default function SectionHeader({ title, description, showMoreLink }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between">
      <div className="flex gap-2">
        <GripVertical className="text-primary size-6" />
        <div className="space-y-1">
          <h3 className="title-large text-secondary">{title}</h3>
          {description && <p className="title-small text-[#475569]">{description}</p>}
        </div>
      </div>

      {showMoreLink && (
        <div className="text-primary flex items-center gap-4">
          <Link href={showMoreLink} className="text-[14px] text-[#64748B]">
            مشاهده همه
          </Link>
          <MoveLeft className="size-5" />
        </div>
      )}
    </div>
  );
}
