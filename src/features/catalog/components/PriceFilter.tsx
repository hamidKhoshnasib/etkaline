"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const PRICE_FLOOR = 0;
const PRICE_CEILING = 1_500_000_000;
const PRICE_STEP = 1_000_000;
const INITIAL_MIN_PRICE = 100_000_000;
const INITIAL_MAX_PRICE = 1_000_000_000;

interface PriceFilterProps {
  onApply: (range: { minPrice: number; maxPrice: number }) => void;
  onRangeChange?: (range: { minPrice: number; maxPrice: number }) => void;
  variant?: "sidebar" | "sheet";
  showApplyButton?: boolean;
}

function formatPrice(value: number) {
  return `${new Intl.NumberFormat("fa-IR").format(value)} تومان`;
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
  variant = "sidebar",
  showApplyButton = true,
}: PriceFilterProps) {
  const [open, setOpen] = useState(true);
  const [minPrice, setMinPrice] = useState(INITIAL_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(INITIAL_MAX_PRICE);
  const [minInput, setMinInput] = useState(formatPrice(INITIAL_MIN_PRICE));
  const [maxInput, setMaxInput] = useState(formatPrice(INITIAL_MAX_PRICE));

  const minPercent = ((minPrice - PRICE_FLOOR) / (PRICE_CEILING - PRICE_FLOOR)) * 100;
  const maxPercent = ((maxPrice - PRICE_FLOOR) / (PRICE_CEILING - PRICE_FLOOR)) * 100;

  const updateMinPrice = (value: number) => {
    const nextMinPrice = clamp(value, PRICE_FLOOR, maxPrice - PRICE_STEP);
    setMinPrice(nextMinPrice);
    setMinInput(formatPrice(nextMinPrice));
    onRangeChange?.({ minPrice: nextMinPrice, maxPrice });
  };

  const updateMaxPrice = (value: number) => {
    const nextMaxPrice = clamp(value, minPrice + PRICE_STEP, PRICE_CEILING);
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
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-3 py-3"
      >
        <span className="text-sm font-medium text-slate-700">محدوده قیمت</span>
        {open ? (
          <ChevronUpIcon className="text-primary size-4" />
        ) : (
          <ChevronDownIcon className="text-primary size-4" />
        )}
      </button>

      {open ? (
        <div className="flex flex-col gap-3 border-t border-slate-100 px-3 pt-4 pb-3">
          <div className="relative h-5" dir="rtl">
            <div className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-slate-100" />
            <div
              className="bg-primary absolute top-1/2 h-1 -translate-y-1/2 rounded-full"
              style={{ left: `${100 - maxPercent}%`, right: `${minPercent}%` }}
            />
            <input
              aria-label="حداقل قیمت"
              type="range"
              min={PRICE_FLOOR}
              max={PRICE_CEILING}
              step={PRICE_STEP}
              value={minPrice}
              onChange={(event) => updateMinPrice(Number(event.target.value))}
              className="accent-primary [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:bg-primary pointer-events-none absolute inset-0 z-20 h-5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
            />
            <input
              aria-label="حداکثر قیمت"
              type="range"
              min={PRICE_FLOOR}
              max={PRICE_CEILING}
              step={PRICE_STEP}
              value={maxPrice}
              onChange={(event) => updateMaxPrice(Number(event.target.value))}
              className="accent-primary [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:bg-primary pointer-events-none absolute inset-0 z-10 h-5 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-slate-400">محدودیت قیمت از</span>
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
              className="focus:border-primary w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition-colors outline-none"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-slate-400">محدودیت قیمت تا</span>
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
              className="focus:border-primary w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition-colors outline-none"
            />
          </label>

          {showApplyButton ? (
            <button
              type="button"
              onClick={() => onApply({ minPrice, maxPrice })}
              className="border-primary hover:bg-primary/10 w-full rounded-full border py-2 text-sm font-medium text-slate-700 transition-colors"
            >
              اعمال بازه قیمتی
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
