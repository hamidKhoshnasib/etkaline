"use client";

import { SortDescIcon } from "lucide-react";

import { SITE_TYPES } from "@/lib/api-site-type";
import { cn } from "@/lib/utils";
import { useStorefront } from "@/providers/storefront-provider";

const SORT_OPTIONS = [
  { id: "popular", label: "محبوب‌ترین" },
  { id: "mostdiscount", label: "پرتخفیف‌ترین" },
  { id: "cheapest", label: "ارزان‌ترین" },
  { id: "mostexpensive", label: "گران‌ترین" },
  { id: "specialoffer", label: "پیشنهاد ویژه" },
  { id: "bestselling", label: "پرفروش‌ترین" },
];

function toPersian(value: number): string {
  return new Intl.NumberFormat("fa-IR").format(value);
}

interface SortBarProps {
  sort: string;
  onSort: (id: string) => void;
  total: number;
}

export function SortBar({ sort, onSort, total }: SortBarProps) {
  const { siteType } = useStorefront();
  const selectedMobileClass =
    siteType === SITE_TYPES.supermarket
      ? "border-[#43A047] bg-white text-[#43A047]"
      : "border-orange-500 bg-white text-orange-500";
  const selectedDesktopClass =
    siteType === SITE_TYPES.supermarket ? "font-bold text-[#43A047]" : "font-bold text-orange-500";

  return (
    <>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-4 lg:hidden">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSort(option.id)}
            className={cn(
              "shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
              sort === option.id ? selectedMobileClass : "border-slate-100 bg-white text-slate-600",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="hidden min-h-8 items-center justify-between gap-4 lg:flex">
        <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 whitespace-nowrap">
          <button
            type="button"
            className="flex shrink-0 items-center gap-1 rounded-lg py-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-800"
          >
            <SortDescIcon className="size-4 text-slate-600" />
            <span>اولویت نمایش</span>
          </button>
          <span className="mx-1 h-4 w-px shrink-0 bg-slate-300" />
          <div className="flex shrink-0 items-center gap-5">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onSort(option.id)}
                className={cn(
                  "text-xs transition-colors xl:text-sm",
                  sort === option.id ? selectedDesktopClass : "text-slate-500 hover:text-slate-700",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <span className="shrink-0 text-xs text-slate-500">
          تعداد محصول: {toPersian(total)} مورد
        </span>
      </div>
    </>
  );
}
