"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpLeft, Menu, Search, X } from "lucide-react";
import IconStore from "@/assets/icons/icons8_online_store_2 1.svg";
import { Spinner } from "@/components/ui/spinner";
import { useSearchbar } from "@/features/search/api/use-searchbar";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

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

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = query.trim();
  const debouncedQuery = useDebouncedValue(normalizedQuery);
  const hasSearchQuery = normalizedQuery.length >= 2;
  const isCurrentQuery = debouncedQuery === normalizedQuery;
  const { data, error, isFetching } = useSearchbar(
    debouncedQuery,
    isOpen && hasSearchQuery && isCurrentQuery,
  );

  const showResults = isOpen && normalizedQuery.length > 0;
  const isSearching = hasSearchQuery && (isFetching || !isCurrentQuery);
  const hasResults = Boolean(
    data && (data.categories.length || data.products.length || data.brands.length),
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !searchRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <div ref={searchRef} className="relative z-[70] flex flex-1 justify-center px-4">
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

        {showResults ? (
          <div
            className="text-secondary animate-in fade-in-0 slide-in-from-top-2 zoom-in-95 absolute inset-x-0 top-[calc(100%+8px)] z-[70] rounded-[28px] bg-white p-4 shadow-2xl duration-200 ease-out motion-reduce:animate-none"
            aria-busy={isSearching}
          >
            {normalizedQuery.length < 2 ? (
              <p className="text-muted-foreground px-2 py-3 text-sm">حداقل دو حرف وارد کنید.</p>
            ) : null}

            {isSearching ? (
              <div className="text-muted-foreground flex items-center gap-2 px-2 py-3 text-sm">
                <Spinner className="text-primary size-4" />
                <span>در حال جستجو...</span>
              </div>
            ) : null}

            {!isFetching && isCurrentQuery && error ? (
              <p className="text-destructive px-2 py-3 text-sm">دریافت نتایج جستجو ممکن نشد.</p>
            ) : null}

            {!isFetching && isCurrentQuery && !error && !hasResults ? (
              <p className="text-muted-foreground px-2 py-3 text-sm">نتیجه‌ای پیدا نشد.</p>
            ) : null}

            {!isFetching && isCurrentQuery && hasResults && data ? (
              <div className="flex flex-col gap-4">
                {data.categories.length ? (
                  <section className="rounded-xl px-3 py-2">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Menu className="size-5" aria-hidden="true" />
                      <span>دسته‌بندی‌ها</span>
                    </div>
                    <div className="divide-border mt-2">
                      {data.categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.id}`}
                          className="hover:text-primary focus-visible:outline-ring flex items-center justify-between py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          <div className="flex gap-2">
                            <Search className="size-5 shrink-0" aria-hidden="true" />
                            <span>{category.title}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : null}

                {data.products.length ? (
                  <SearchResultSection title="کالاها" items={data.products} onSelect={setQuery} />
                ) : null}

                {data.brands.length ? (
                  <SearchResultSection title="برندها" items={data.brands} onSelect={setQuery} />
                ) : null}
              </div>
            ) : null}

            <section className="border-border mt-4 border-t pt-4">
              <h3 className="mb-3 text-sm font-bold">جستجوهای اخیر</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="bg-muted hover:bg-muted/80 focus-visible:outline-ring rounded-full px-3 py-1.5 text-xs focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SearchResultSection({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: { id: number; title: string }[];
  onSelect: (title: string) => void;
}) {
  return (
    <section className="border-border border-t pt-2">
      <h3 className="px-2 py-1 text-sm font-bold">{title}</h3>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.title)}
          className="hover:bg-muted focus-visible:outline-ring flex w-full items-center justify-between px-2 py-3 text-start text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span>{item.title}</span>
          <ArrowUpLeft className="size-5 shrink-0" aria-hidden="true" />
        </button>
      ))}
    </section>
  );
}
