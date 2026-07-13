"use client";

import { useState } from "react";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Spec {
  label: string;
  value: string;
}

interface ProductSummaryProps {
  title: string;
  rating: number;
  reviewCount: number;
  specs: Spec[];
  shortDescription: string;
}

const TABS = [
  { id: "reviews", label: "نظرات" },
  { id: "specs", label: "مشخصات تکمیلی" },
];

function toPersian(n: number): string {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

export function ProductSummary({
  title,
  rating,
  reviewCount,
  specs,
  shortDescription,
}: ProductSummaryProps) {
  const [activeTab, setActiveTab] = useState("reviews");

  return (
    <div className="min-w-0 flex-1">
      {/* Title */}
      <h1 className="mb-4 text-lg leading-relaxed font-bold text-gray-800">{title}</h1>

      {/* Rating + tabs row */}
      <div className="mb-6 flex items-center justify-between">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-gray-500">({toPersian(reviewCount)} نظر)</span>
          <span className="text-sm font-semibold text-gray-700">{rating}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-3.5",
                  i < Math.round(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200",
                )}
              />
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-hidden rounded-xl border border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-1.5 text-sm transition-colors",
                activeTab === tab.id
                  ? "bg-primary font-medium text-white"
                  : "text-gray-600 hover:bg-gray-50",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Specs */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-gray-700">مشخصات محصول</p>
        <div className="flex gap-4">
          {specs.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 rounded-xl border border-gray-100 px-4 py-2"
            >
              <span className="text-xs text-gray-400">{s.label}</span>
              <span className="text-sm font-semibold text-gray-700">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Short description */}
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">توضیح کوتاه محصول:</p>
        <p className="text-sm leading-7 text-gray-600">{shortDescription}</p>
      </div>
    </div>
  );
}
