import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
}

interface CategoryCardProps {
  categories: Category[];
}

export default function CategoryCard({ categories }: CategoryCardProps) {
  return (
    <nav className="flex flex-col gap-4 rounded-[16px] border border-[#D1D4D4] bg-white px-6 pt-4 pb-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#F0F1F1] p-4">
        <LayoutGrid className="text-primary-hover size-6" />
        <span className="body-medium text-[#3E4344]">دسته بندی ها</span>
      </div>

      {/* Items */}
      <ul className="flex flex-col gap-4">
        {categories.map(({ label, icon: Icon, href = "#", active }) => (
          <li key={label}>
            <Link
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg border-b px-4 py-3 transition-colors",
                active
                  ? "border-primary-hover bg-[#FFFDE7] border-b-2"
                  : "border-[#F0F1F1] hover:bg-[#FAFAFA]",
              )}
            >
              <Icon
                className={cn("size-6 shrink-0", active ? "text-primary-hover" : "text-[#3E4344]")}
              />
              <span className={cn("body-medium", active ? "text-[#510616]" : "text-[#3E4344]")}>
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export type { Category, CategoryCardProps };
