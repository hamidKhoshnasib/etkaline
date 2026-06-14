"use client";

import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";

export function PriceFilter() {
  const [open, setOpen] = useState(true);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4"
      >
        <span className="text-sm text-gray-700">محدوده قیمت</span>
        {open ? (
          <ChevronUpIcon className="size-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="size-5 text-gray-400" />
        )}
      </button>

      {open && (
        <div className="space-y-3 pb-4">
          <div className="relative h-1.5 w-full rounded-full bg-gray-200">
            <div className="bg-primary absolute inset-y-0 right-0 w-3/4 rounded-full" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-start text-xs text-gray-500">محدودیت قیمت از</label>
            <input
              type="text"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="تومان"
              dir="ltr"
              className="focus:border-primary w-full rounded-xl border border-gray-200 px-3 py-2.5 text-start text-sm transition-colors outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-start text-xs text-gray-500">محدودیت قیمت تا</label>
            <input
              type="text"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="تومان"
              dir="ltr"
              className="focus:border-primary w-full rounded-xl border border-gray-200 px-3 py-2.5 text-start text-sm transition-colors outline-none"
            />
          </div>

          <button className="bg-primary w-full rounded-xl py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
            اعمال بازه قیمتی
          </button>
        </div>
      )}
    </div>
  );
}
