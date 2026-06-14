"use client";

import { SortDescIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { id: "cheapest", label: "ارزان‌ترین" },
  { id: "bestselling", label: "پرفروش‌ترین" },
  { id: "newest", label: "جدیدترین" },
  { id: "mostviewed", label: "پربازدیدترین" },
  { id: "relevant", label: "مرتبط‌ترین" },
  { id: "mostdiscount", label: "پرتخفیف‌ترین" },
];

function toPersian(n: number): string {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

interface SortBarProps {
  sort: string;
  onSort: (id: string) => void;
  total: number;
}

export function SortBar({ sort, onSort, total }: SortBarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-0.5">
        <button className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-gray-500 transition-colors hover:text-gray-700">
          <SortDescIcon className="size-4" />
          <span>اولویت نمایش</span>
        </button>
        <span className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
        <div className="flex items-center gap-4">
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.id}
              onClick={() => onSort(o.id)}
              className={cn(
                "text-sm transition-colors",
                sort === o.id ? "text-primary font-semibold" : "text-gray-500 hover:text-gray-700",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <span className="text-xs text-gray-500">تعداد محصول: {toPersian(total)} مورد</span>
    </div>
  );
}
