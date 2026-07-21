"use client";

import { useRef, useState, type PointerEvent } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

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
  properties: SearchableProperty[];
  onApply: (filters: {
    onlyAvailable: boolean;
    minPrice: number;
    maxPrice: number;
    valueIds: number[];
  }) => void;
}

export function MobileFilterSheet({
  open,
  onOpenChange,
  onlyAvailable,
  selectedValueIds,
  properties,
  onApply,
}: MobileFilterSheetProps) {
  const [draftAvailable, setDraftAvailable] = useState(onlyAvailable);
  const [draftPrice, setDraftPrice] = useState({ minPrice: 100_000_000, maxPrice: 1_000_000_000 });
  const [draftValueIds, setDraftValueIds] = useState(selectedValueIds);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartY = useRef<number | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftAvailable(onlyAvailable);
      setDraftValueIds(selectedValueIds);
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
          <DialogTitle className="sr-only">فیلتر محصولات</DialogTitle>
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

          <div className="max-h-[calc(100dvh-9rem)] overflow-y-auto pb-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-5">
                <span className="text-base font-medium text-slate-950">فقط کالاهای موجود</span>
                <Toggle checked={draftAvailable} onChange={setDraftAvailable} />
              </div>

              <PriceFilter
                variant="sheet"
                showApplyButton={false}
                onApply={() => undefined}
                onRangeChange={setDraftPrice}
              />

              {properties.map((property) => (
                <FilterSection key={property.propertyId} label={property.propertyTitle}>
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
              onApply({ onlyAvailable: draftAvailable, ...draftPrice, valueIds: draftValueIds });
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
