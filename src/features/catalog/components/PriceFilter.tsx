"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PRICE_FLOOR = 0;
const PRICE_CEILING = 1_500_000_000;
const PRICE_STEP = 1_000_000;

interface PriceFilterProps {
  onApply: (range: { minPrice: number; maxPrice: number }) => void;
  onRangeChange?: (range: { minPrice: number; maxPrice: number }) => void;
  maxPriceLimit?: number;
  minPriceLimit?: number;
  initialRange?: { minPrice: number; maxPrice: number } | null;
  variant?: "sidebar" | "sheet";
  showApplyButton?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

function parsePrice(value: string) {
  const normalized = value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[^\d]/g, "");

  return normalized ? Number(normalized) : null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function PriceFilter({
  onApply,
  onRangeChange,
  maxPriceLimit,
  minPriceLimit,
  initialRange,
  variant = "sidebar",
  showApplyButton = true,
  open: controlledOpen,
  onOpenChange,
}: PriceFilterProps) {
  const responsePriceFloor = Math.max(PRICE_FLOOR, minPriceLimit ?? PRICE_FLOOR);
  const priceFloor = Math.min(responsePriceFloor, initialRange?.minPrice ?? responsePriceFloor);
  const responsePriceCeiling = maxPriceLimit ?? PRICE_CEILING;
  const priceCeiling = Math.max(
    priceFloor + PRICE_STEP,
    responsePriceCeiling,
    initialRange?.maxPrice ?? responsePriceCeiling,
  );
  const initialMinPrice = clamp(
    initialRange?.minPrice ?? priceFloor,
    priceFloor,
    priceCeiling - PRICE_STEP,
  );
  const initialMaxPrice = clamp(
    initialRange?.maxPrice ?? priceCeiling,
    initialMinPrice + PRICE_STEP,
    priceCeiling,
  );
  const [uncontrolledOpen, setUncontrolledOpen] = useState(variant === "sheet");
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [minInput, setMinInput] = useState(formatPrice(initialMinPrice));
  const [maxInput, setMaxInput] = useState(formatPrice(initialMaxPrice));
  const open = controlledOpen ?? uncontrolledOpen;

  const toggleOpen = () => {
    const nextOpen = !open;
    onOpenChange?.(nextOpen);

    if (controlledOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }
  };

  const minPercent = ((minPrice - priceFloor) / (priceCeiling - priceFloor)) * 100;
  const maxPercent = ((maxPrice - priceFloor) / (priceCeiling - priceFloor)) * 100;

  const updateMinPrice = (value: number) => {
    const nextMinPrice = clamp(value, priceFloor, maxPrice - PRICE_STEP);
    setMinPrice(nextMinPrice);
    setMinInput(formatPrice(nextMinPrice));
    onRangeChange?.({ minPrice: nextMinPrice, maxPrice });
  };

  const updateMaxPrice = (value: number) => {
    const nextMaxPrice = clamp(value, minPrice + PRICE_STEP, priceCeiling);
    setMaxPrice(nextMaxPrice);
    setMaxInput(formatPrice(nextMaxPrice));
    onRangeChange?.({ minPrice, maxPrice: nextMaxPrice });
  };

  return (
    <section
      className={
        variant === "sheet" ? "rounded-2xl bg-slate-50" : "mb-1 rounded-xl border border-slate-200"
      }
    >
      <button
        type="button"
        onClick={toggleOpen}
        className="flex w-full items-center justify-between px-3 py-3.5"
      >
        <span className="text-sm font-medium text-slate-700">محدوده قیمت</span>
        <ChevronDownIcon
          className={cn(
            "size-4 transition-transform duration-200 ease-out",
            open ? "text-primary rotate-180" : "text-secondary",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className={cn("min-h-0 overflow-hidden", !open && "invisible")}>
          <div className="flex flex-col gap-4 border-t border-slate-100 px-3 pt-5 pb-4">
            <div dir="rtl">
              <div className="relative h-5">
                <div className="absolute top-1/2 right-0 left-0 h-1.5 -translate-y-1/2 rounded-full bg-slate-200" />
                <div
                  className="bg-primary absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
                  style={{ left: `${100 - maxPercent}%`, right: `${minPercent}%` }}
                />
                <input
                  aria-label="حداقل قیمت"
                  type="range"
                  min={priceFloor}
                  max={priceCeiling}
                  step={1}
                  value={minPrice}
                  onChange={(event) => updateMinPrice(Number(event.target.value))}
                  className="accent-primary [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:bg-primary pointer-events-none absolute inset-0 z-20 h-5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
                />
                <input
                  aria-label="حداکثر قیمت"
                  type="range"
                  min={priceFloor}
                  max={priceCeiling}
                  step={1}
                  value={maxPrice}
                  onChange={(event) => updateMaxPrice(Number(event.target.value))}
                  className="accent-primary [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:bg-primary pointer-events-none absolute inset-0 z-10 h-5 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
                />
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-slate-400">محدودیت قیمت از</span>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={minInput}
                  onChange={(event) => setMinInput(event.target.value)}
                  onBlur={() => {
                    const value = parsePrice(minInput);
                    if (value === null) {
                      setMinInput(formatPrice(minPrice));
                      return;
                    }
                    updateMinPrice(value);
                  }}
                  className="focus:border-auth-accent h-12 w-full rounded-[8px] border border-slate-200 ps-3 pe-14 text-sm text-slate-600 transition-colors outline-none"
                />
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-500">
                  تومان
                </span>
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-slate-400">محدودیت قیمت تا</span>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={maxInput}
                  onChange={(event) => setMaxInput(event.target.value)}
                  onBlur={() => {
                    const value = parsePrice(maxInput);
                    if (value === null) {
                      setMaxInput(formatPrice(maxPrice));
                      return;
                    }
                    updateMaxPrice(value);
                  }}
                  className="focus:border-auth-accent h-12 w-full rounded-[8px] border border-slate-200 ps-3 pe-14 text-sm text-slate-600 transition-colors outline-none"
                />
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-500">
                  تومان
                </span>
              </div>
            </label>

            {showApplyButton ? (
              <button
                type="button"
                onClick={() => onApply({ minPrice, maxPrice })}
                className="border-primary hover:bg-primary/10 text-secondary h-11 w-full rounded-full border text-sm font-medium transition-colors"
              >
                اعمال بازه قیمتی
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
