"use client";

import { FilterIcon, XSquareIcon } from "lucide-react";
import { Toggle } from "./Toggle";
import { PriceFilter } from "./PriceFilter";
import { FilterSection } from "./FilterSection";

const FILTER_SECTIONS = [
  { id: "color", label: "رنگ" },
  { id: "brand", label: "برند" },
  { id: "type", label: "نوع یخچال فریزر" },
  { id: "capacity", label: "گنجایش کل به فوت" },
  { id: "features", label: "امکانات اختصاصی یخچال" },
];

interface FilterSidebarProps {
  onlyAvailable: boolean;
  onToggleAvailable: (v: boolean) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  onlyAvailable,
  onToggleAvailable,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <aside className="w-67.5 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">فیلتر ها</span>
          <FilterIcon className="size-5 text-gray-700" />
        </div>

        <button
          onClick={onClearFilters}
          className="flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-gray-600"
        >
          <XSquareIcon className="size-4" />
          <span>حذف فیلتر ها</span>
        </button>
      </div>

      {/* Only available toggle */}
      <div className="flex items-center justify-between border-b border-gray-100 py-4">
        <span className="text-sm text-gray-700">فقط کالاهای موجود</span>
        <Toggle checked={onlyAvailable} onChange={onToggleAvailable} />
      </div>

      {/* Price filter */}
      <PriceFilter />

      {/* Other filter sections */}
      {FILTER_SECTIONS.map((s) => (
        <FilterSection key={s.id} label={s.label} />
      ))}
    </aside>
  );
}
