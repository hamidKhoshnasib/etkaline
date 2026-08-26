"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpLeft, Menu, Search, X } from "lucide-react";
import IconStore from "@/assets/icons/icons8_online_store_2 1.svg";
import { Spinner } from "@/components/ui/spinner";
import { useSearchbar } from "@/features/search/api/use-searchbar";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { SITE_TYPES } from "@/lib/api-site-type";
import { cn } from "@/lib/utils";
import { useStorefront } from "@/providers/storefront-provider";

const RECENT_SEARCHES_STORAGE_KEY = "etkaline:recent-searches";
const RECENT_SEARCHES_LIMIT = 10;

function getStoredRecentSearches(): string[] {
  try {
    const storedSearches = window.localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
    if (!storedSearches) {
      return [];
    }

    const parsedSearches: unknown = JSON.parse(storedSearches);
    if (!Array.isArray(parsedSearches)) {
      return [];
    }

    const searches = parsedSearches.flatMap((search): string[] => {
      if (typeof search !== "string") {
        return [];
      }

      const normalizedSearch = search.trim();
      return normalizedSearch ? [normalizedSearch] : [];
    });

    return [...new Set(searches)].slice(0, RECENT_SEARCHES_LIMIT);
  } catch {
    return [];
  }
}

function persistRecentSearches(searches: string[]) {
  try {
    window.localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(searches));
  } catch {
    // Search still works when browser storage is unavailable.
  }
}

type HeaderSearchProps = {
  className?: string;
  variant?: "default" | "mobile";
};

export function HeaderSearch({ className, variant = "default" }: HeaderSearchProps) {
  const storefront = useStorefront();
  const isMobile = variant === "mobile";
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : getStoredRecentSearches(),
  );
  const recentSearchesRef = useRef(recentSearches);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim();
  const debouncedQuery = useDebouncedValue(normalizedQuery);
  const hasSearchQuery = normalizedQuery.length >= 2;
  const isCurrentQuery = debouncedQuery === normalizedQuery;
  const { data, error, isFetching } = useSearchbar(
    debouncedQuery,
    isOpen && hasSearchQuery && isCurrentQuery,
  );

  const showResults = isOpen && (isMobile || normalizedQuery.length > 0);
  const isSearching = hasSearchQuery && (isFetching || !isCurrentQuery);
  const hasResults = Boolean(data && (data.categories.length || data.products.length));

  const saveRecentSearch = (search: string) => {
    const normalizedSearch = search.trim();
    if (!normalizedSearch) {
      return;
    }

    const nextSearches = [
      normalizedSearch,
      ...recentSearchesRef.current.filter((item) => item !== normalizedSearch),
    ].slice(0, RECENT_SEARCHES_LIMIT);

    recentSearchesRef.current = nextSearches;
    persistRecentSearches(nextSearches);
    setRecentSearches(nextSearches);
  };

  const handleNavigation = () => {
    saveRecentSearch(normalizedQuery);
    setQuery("");
    setIsOpen(false);
  };

  const closeMobileSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen || isMobile) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !searchRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (!isMobile || !isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobile, isOpen]);

  return (
    <div
      ref={searchRef}
      className={cn(
        "relative z-[70] flex flex-1 justify-center",
        isMobile && isOpen
          ? "bg-background fixed inset-0 z-[100] block overflow-y-auto px-4 py-3"
          : isMobile
            ? "px-0"
            : "px-4",
        className,
      )}
    >
      <div className="relative w-full max-w-154.5">
        {isMobile && isOpen ? (
          <button
            type="button"
            onClick={closeMobileSearch}
            className="focus-visible:outline-ring mb-4 flex size-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label="بستن جستجو"
          >
            <ArrowRight className="size-6" aria-hidden="true" />
          </button>
        ) : null}
        <div
          className={cn(
            "flex w-full items-center overflow-hidden",
            isMobile
              ? "h-12 rounded-[28px] border border-[#F1F5F9] bg-transparent"
              : "h-12.5 rounded-full bg-white",
          )}
        >
          {!query && !(isMobile && isOpen) && (
            <div
              className={cn(
                "text-primary flex shrink-0 items-center gap-2",
                isMobile ? "px-5" : "px-4 py-2.5",
              )}
            >
              <IconStore
                size={isMobile ? 20 : 18}
                strokeWidth={1.5}
                className={cn(
                  isMobile && "shrink-0",
                  storefront.siteType === SITE_TYPES.supermarket && "[&_path]:fill-[#43A047]",
                )}
              />
              <span
                className={cn(
                  "whitespace-nowrap",
                  isMobile ? "text-sm text-[#94A3B8]" : "text-sm font-medium text-gray-400",
                )}
              >
                خرید از
                <span className="text-secondary font-bold"> انبار مرکزی اتکالاین </span>
              </span>
            </div>
          )}

          {!query && !isMobile && <div className="bg-secondary/20 h-6 w-px shrink-0" />}

          <div className="relative flex-1">
            <input
              type="text"
              ref={inputRef}
              value={query}
              onFocus={() => setIsOpen(true)}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsOpen(true);
              }}
              placeholder={isMobile && !query && !isOpen ? "" : "جستجو در فروشگاه"}
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
            className={cn(
              "text-secondary animate-in fade-in-0 slide-in-from-top-2 zoom-in-95 duration-200 ease-out motion-reduce:animate-none",
              isMobile
                ? "bg-background relative mt-5 pb-8"
                : "absolute inset-x-0 top-[calc(100%+8px)] z-[70] rounded-[28px] bg-white p-4 shadow-2xl",
            )}
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
                          href={storefront.categoryHref(category.id)}
                          onClick={handleNavigation}
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
                  <SearchResultSection
                    title="کالاها"
                    items={data.products}
                    getItemHref={(item) => storefront.productHref(item.id, item.title)}
                    onNavigate={handleNavigation}
                  />
                ) : null}
              </div>
            ) : null}

            {recentSearches.length ? (
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
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SearchResultSection({
  title,
  items,
  getItemHref,
  onNavigate,
  onSelect,
}: {
  title: string;
  items: { id: number; title: string }[];
  getItemHref?: (item: { id: number; title: string }) => string;
  onNavigate?: () => void;
  onSelect?: (title: string) => void;
}) {
  return (
    <section className="border-border border-t pt-2">
      <h3 className="px-2 py-1 text-sm font-bold">{title}</h3>
      {items.map((item) =>
        getItemHref ? (
          <Link
            key={item.id}
            href={getItemHref(item)}
            onClick={onNavigate}
            className="hover:bg-muted focus-visible:outline-ring flex w-full items-center justify-between px-2 py-3 text-start text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span>{item.title}</span>
            <ArrowUpLeft className="size-5 shrink-0" aria-hidden="true" />
          </Link>
        ) : (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item.title)}
            className="hover:bg-muted focus-visible:outline-ring flex w-full items-center justify-between px-2 py-3 text-start text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span>{item.title}</span>
            <ArrowUpLeft className="size-5 shrink-0" aria-hidden="true" />
          </button>
        ),
      )}
    </section>
  );
}
