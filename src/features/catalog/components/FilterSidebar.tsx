"use client";

import { useState } from "react";
import { FilterIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  maxPriceLimit?: number;
  minPriceLimit?: number;
  priceRange?: { minPrice: number; maxPrice: number } | null;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  properties: SearchableProperty[];
  selectedValueIds: number[];
  onToggleValue: (valueId: number) => void;
}

export function FilterSidebar({
  onlyAvailable,
  onToggleAvailable,
  onApplyPrice,
  priceFilterResetKey,
  maxPriceLimit,
  minPriceLimit,
  priceRange,
  onClearFilters,
  hasActiveFilters,
  properties,
  selectedValueIds,
  onToggleValue,
}: FilterSidebarProps) {
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);

  return (
    <aside className="hidden w-[270px] shrink-0 lg:block">
      <div className="flex items-center justify-between pb-5">
        <div className="flex items-center gap-2">
          <FilterIcon className="text-secondary size-5" />
          <span className="text-secondary font-bold">فیلترها</span>
        </div>

        {hasActiveFilters ? (
          <Button type="button" variant="destructive" size="xs" onClick={onClearFilters}>
            <Trash2Icon data-icon="inline-start" />
            <span>حذف همه</span>
          </Button>
        ) : null}
      </div>

      <div className="mb-1 flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3.5">
        <span className="text-sm font-medium text-slate-700">فقط کالاهای موجود</span>
        <Toggle checked={onlyAvailable} onChange={onToggleAvailable} />
      </div>

      <PriceFilter
        key={`${priceFilterResetKey}-${minPriceLimit ?? 0}-${maxPriceLimit ?? 0}`}
        maxPriceLimit={maxPriceLimit}
        minPriceLimit={minPriceLimit}
        initialRange={priceRange}
        onApply={onApplyPrice}
        open={isPriceFilterOpen}
        onOpenChange={setIsPriceFilterOpen}
      />

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
