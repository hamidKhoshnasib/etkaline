"use client";

import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import IconStore from "@/assets/icons/icons8_online_store_2 1.svg";

const suggestions = [
  "جاروبرقی پارس خزر",
  "جاروبرقی پارس خزر",
  "جاروبرقی پارس خزر",
  "جاروبرقی پارس خزر",
];

const recentSearches = [
  "ماشین لباسشویی",
  "تلویزیون ۵۰ اینچ",
  "ماکروویو",
  "جاروبرقی",
  "قهوه ساز",
  "ظرفشویی",
  "بخاری برقی",
  "اندروید باکس",
  "یخچال",
];

const products = ["جاروبرقی", "جاروبرقی"];

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const showResults = isOpen && query.trim().length > 0;

  return (
    <div className="relative flex flex-1 justify-center px-4">
      <div className="relative w-full max-w-154.5">
        <div className="flex w-full items-center overflow-hidden rounded-full bg-white">
          {!query && (
            <div className="text-primary flex shrink-0 items-center gap-2 px-4 py-2.5">
              <IconStore size={18} strokeWidth={1.5} />
              <span className="text-sm font-medium whitespace-nowrap text-gray-400">
                خرید از
                <span className="text-secondary font-bold"> انبار مرکزی اتکالاین </span>
              </span>
            </div>
          )}

          {!query && <div className="bg-secondary/20 h-6 w-px shrink-0" />}

          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onFocus={() => setIsOpen(true)}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsOpen(true);
              }}
              placeholder="جستجو در فروشگاه"
              className="text-secondary placeholder:text-secondary/40 w-full border-0 bg-transparent py-2.5 ps-8 pe-10 text-sm focus:outline-none"
              aria-label="جستجو در فروشگاه"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setIsOpen(false);
                }}
                className="border-primary text-primary absolute top-1/2 left-3 flex size-5 -translate-y-1/2 items-center justify-center rounded-full border p-0.5"
                aria-label="پاک کردن جستجو"
              >
                <X className="size-5" />
              </button>
            ) : (
              <Search
                size={16}
                className="text-secondary/40 absolute inset-e-3 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
            )}
          </div>
        </div>

        {showResults && (
          <div className="text-secondary absolute inset-x-0 top-[calc(100%+8px)] z-50 rounded-[28px] bg-white p-4 shadow-2xl">
            <section className="rounded-xl bg-[#F1F5F9] px-3 py-2">
              <div className="flex items-center justify-between text-sm font-bold">
                <span>همه کالاهای جاروبرقی</span>
                <Menu className="size-5" aria-hidden="true" />
              </div>
              <div className="divide-secondary/10 mt-2 divide-y">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion}-${index}`}
                    type="button"
                    className="flex w-full items-center justify-between py-2 text-start text-sm"
                  >
                    <span>
                      {suggestion}
                      <span className="text-primary mt-1 block text-xs">در دسته‌بندی جاروبرقی</span>
                    </span>
                    <Search className="size-5 shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>

            <section className="border-secondary/15 mt-4 border-t pt-2">
              {products.map((product, index) => (
                <button
                  key={`${product}-${index}`}
                  type="button"
                  className="flex w-full items-center justify-between px-2 py-3 text-sm"
                >
                  <span className="text-3xl leading-none" aria-hidden="true">
                    🧹
                  </span>
                  <span>{product}</span>
                </button>
              ))}
            </section>

            <section className="border-secondary/15 mt-4 border-t pt-4">
              <h3 className="mb-3 text-sm font-bold">جستجوهای اخیر</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item, index) => (
                  <button
                    key={`${item}-${index}`}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="rounded-full bg-[#F1F5F9] px-3 py-1.5 text-xs"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
