"use client";

import { FilterIcon, XSquareIcon } from "lucide-react";

import { FilterSection } from "./FilterSection";
import { PriceFilter } from "./PriceFilter";
import { Toggle } from "./Toggle";

const FILTER_SECTIONS = [
  { id: "color", label: "رنگ" },
  { id: "brand", label: "برند" },
  { id: "type", label: "نوع یخچال فریزر" },
  { id: "capacity", label: "گنجایش کل به فوت" },
  { id: "features", label: "امکانات اختصاصی یخچال" },
];

interface FilterSidebarProps {
  onlyAvailable: boolean;
  onToggleAvailable: (value: boolean) => void;
  onApplyPrice: (range: { minPrice: number; maxPrice: number }) => void;
  priceFilterResetKey: number;
  onClearFilters: () => void;
}

export function FilterSidebar({
  onlyAvailable,
  onToggleAvailable,
  onApplyPrice,
  priceFilterResetKey,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <aside className="hidden w-56 shrink-0 lg:block xl:w-60">
      <div className="flex items-center justify-between pb-5">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">فیلترها</span>
          <FilterIcon className="text-primary size-5" />
        </div>

        <button
          type="button"
          onClick={onClearFilters}
          className="flex items-center gap-1 text-[11px] text-red-500 transition-colors hover:text-red-600"
        >
          <XSquareIcon className="size-3.5" />
          <span>حذف فیلترها</span>
        </button>
      </div>

      <div className="mb-1 flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3.5">
        <span className="text-sm font-medium text-slate-700">فقط کالاهای موجود</span>
        <Toggle checked={onlyAvailable} onChange={onToggleAvailable} />
      </div>

      <PriceFilter key={priceFilterResetKey} onApply={onApplyPrice} />

      {FILTER_SECTIONS.map((section) => (
        <FilterSection key={section.id} label={section.label} />
      ))}
    </aside>
  );
}
