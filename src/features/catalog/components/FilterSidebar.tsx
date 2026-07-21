"use client";

import { FilterIcon, XSquareIcon } from "lucide-react";

import { FilterSection } from "./FilterSection";
import { FilterOptions } from "./FilterOptions";
import { PriceFilter } from "./PriceFilter";
import { Toggle } from "./Toggle";

import type { SearchableProperty } from "@/features/catalog/api/use-catalog-queries";

interface FilterSidebarProps {
  onlyAvailable: boolean;
  onToggleAvailable: (value: boolean) => void;
  onApplyPrice: (range: { minPrice: number; maxPrice: number }) => void;
  priceFilterResetKey: number;
  onClearFilters: () => void;
  properties: SearchableProperty[];
  selectedValueIds: number[];
  onToggleValue: (valueId: number) => void;
}

export function FilterSidebar({
  onlyAvailable,
  onToggleAvailable,
  onApplyPrice,
  priceFilterResetKey,
  onClearFilters,
  properties,
  selectedValueIds,
  onToggleValue,
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

      {properties.map((property) => (
        <FilterSection key={property.propertyId} label={property.propertyTitle}>
          <FilterOptions
            property={property}
            selectedValueIds={selectedValueIds}
            onToggle={onToggleValue}
          />
        </FilterSection>
      ))}
    </aside>
  );
}
