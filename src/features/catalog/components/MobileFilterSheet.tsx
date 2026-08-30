"use client";

import { useRef, useState, type PointerEvent } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";

import { PriceFilter } from "./PriceFilter";
import { Toggle } from "./Toggle";
import { FilterSection } from "./FilterSection";
import { FilterOptions } from "./FilterOptions";

import type { SearchableProperty } from "@/features/catalog/api/use-catalog-queries";

interface MobileFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onlyAvailable: boolean;
  selectedValueIds: number[];
  maxPriceLimit?: number;
  minPriceLimit?: number;
  priceRange?: { minPrice: number; maxPrice: number } | null;
  hasActiveFilters: boolean;
  properties: SearchableProperty[];
  onClearFilters: () => void;
  onApply: (filters: {
    onlyAvailable: boolean;
    minPrice?: number;
    maxPrice?: number;
    valueIds: number[];
  }) => void;
}

export function MobileFilterSheet({
  open,
  onOpenChange,
  onlyAvailable,
  selectedValueIds,
  maxPriceLimit,
  minPriceLimit,
  priceRange,
  hasActiveFilters,
  properties,
  onClearFilters,
  onApply,
}: MobileFilterSheetProps) {
  const [draftAvailable, setDraftAvailable] = useState(onlyAvailable);
  const [draftPrice, setDraftPrice] = useState<{ minPrice: number; maxPrice: number } | null>(null);
  const [draftValueIds, setDraftValueIds] = useState(selectedValueIds);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartY = useRef<number | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftAvailable(onlyAvailable);
      setDraftValueIds(selectedValueIds);
      setDraftPrice(priceRange ?? null);
    }
    setDragOffset(0);
    onOpenChange(nextOpen);
  };

  const toggleDraftValue = (valueId: number) => {
    setDraftValueIds((current) =>
      current.includes(valueId) ? current.filter((id) => id !== valueId) : [...current, valueId],
    );
  };

  const handleDragStart = (event: PointerEvent<HTMLButtonElement>) => {
    dragStartY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragStartY.current === null) {
      return;
    }
    setDragOffset(Math.max(0, event.clientY - dragStartY.current));
  };

  const handleDragEnd = () => {
    if (dragOffset > 96) {
      handleOpenChange(false);
      return;
    }
    dragStartY.current = null;
    setDragOffset(0);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="z-[80]! bg-slate-900/30 duration-300" />
        <DialogPrimitive.Popup
          className="bg-popover text-popover-foreground data-closed:animate-out data-closed:slide-out-to-bottom-full data-open:animate-in data-open:slide-in-from-bottom-full fixed inset-x-0 bottom-0 z-[81] w-full rounded-t-[32px] p-4 shadow-2xl duration-300 outline-none motion-reduce:animate-none"
          style={dragOffset ? { transform: `translateY(${dragOffset}px)` } : undefined}
        >
          <button
            type="button"
            aria-label="بستن فیلتر با کشیدن به پایین"
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            className="mx-auto mb-8 flex h-6 w-16 cursor-grab touch-none items-center justify-center active:cursor-grabbing"
          >
            <span className="h-1.5 w-10 rounded-full bg-slate-300" aria-hidden="true" />
          </button>

          <div className="mb-4 flex items-center justify-between">
            <DialogTitle>فیلترها</DialogTitle>
            {hasActiveFilters ? (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  setDraftAvailable(false);
                  setDraftPrice(null);
                  setDraftValueIds([]);
                  onClearFilters();
                }}
              >
                <Trash2Icon data-icon="inline-start" />
                حذف همه
              </Button>
            ) : null}
          </div>

          <div className="max-h-[calc(100dvh-9rem)] overflow-y-auto pb-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-5">
                <span className="text-base font-medium text-slate-950">فقط کالاهای موجود</span>
                <Toggle checked={draftAvailable} onChange={setDraftAvailable} />
              </div>

              <PriceFilter
                key={`${minPriceLimit ?? 0}-${maxPriceLimit ?? 0}-${priceRange?.minPrice ?? 0}-${priceRange?.maxPrice ?? 0}`}
                maxPriceLimit={maxPriceLimit}
                minPriceLimit={minPriceLimit}
                initialRange={priceRange}
                variant="sheet"
                showApplyButton={false}
                onApply={() => undefined}
                onRangeChange={setDraftPrice}
              />

              {properties.map((property) => (
                <FilterSection
                  key={property.propertyId}
                  label={property.propertyTitle}
                  variant="sheet"
                >
                  <FilterOptions
                    property={property}
                    selectedValueIds={draftValueIds}
                    onToggle={toggleDraftValue}
                  />
                </FilterSection>
              ))}
            </div>
          </div>

          <Button
            type="button"
            className="mt-4 h-12 w-full rounded-full text-base font-bold"
            onClick={() => {
              onApply({
                onlyAvailable: draftAvailable,
                ...(draftPrice ?? {}),
                valueIds: draftValueIds,
              });
              onOpenChange(false);
            }}
          >
            اعمال فیلتر
          </Button>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
