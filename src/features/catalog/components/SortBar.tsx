"use client";

import { SortDescIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { id: "mostdiscount", label: "پرتخفیف‌ترین" },
  { id: "relevant", label: "مرتبط‌ترین" },
  { id: "newest", label: "جدیدترین" },
  { id: "mostviewed", label: "پربازدیدترین" },
  { id: "bestselling", label: "پرفروش‌ترین" },
  { id: "cheapest", label: "ارزان‌ترین" },
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
              sort === option.id
                ? "border-orange-500 bg-white text-orange-500"
                : "border-slate-100 bg-white text-slate-600",
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
                  sort === option.id
                    ? "font-bold text-orange-500"
                    : "text-slate-500 hover:text-slate-700",
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
