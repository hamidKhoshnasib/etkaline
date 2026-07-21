"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { ArrowLeftIcon, FilterIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/Pagination";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { ProductCard } from "@/features/product/components/ProductCard";
import { ProductCardSkeleton } from "@/features/product/components/ProductCardSkeleton";
import {
  useProductSearch,
  useSearchableCategoryProperties,
} from "@/features/catalog/api/use-catalog-queries";

import { FilterSidebar } from "./FilterSidebar";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { SortBar } from "./SortBar";

const PAGE_LENGTH = 30;
const SORT_TYPE_BY_ID: Record<string, number> = {
  newest: 1,
  bestselling: 2,
  mostviewed: 3,
  relevant: 4,
  mostdiscount: 5,
  cheapest: 6,
};

interface CatalogBreadcrumbEntry {
  label: string;
  href?: string;
}

function CatalogBreadcrumbSeparator() {
  return (
    <BreadcrumbSeparator className="[&>svg]:size-3.5!">
      <ArrowLeftIcon className="text-auth-accent size-3.5 stroke-[2.5]" />
    </BreadcrumbSeparator>
  );
}

function CatalogBreadcrumbs({ title }: { title: string }) {
  const crumbs: CatalogBreadcrumbEntry[] = [
    { label: "خانه", href: "/" },
    { label: "لوازم خانگی", href: "/categories" },
    { label: title.replace("محصولات ", "") },
  ];

  return (
    <div className="-mx-4 mb-8 bg-[#F8FAFC] px-4 py-3 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0">
      <Breadcrumb className="mb-0">
        <BreadcrumbList className="flex-nowrap overflow-x-auto text-nowrap">
          {crumbs.map((crumb, index) => {
            const isCurrentPage = index === crumbs.length - 1;

            return (
              <Fragment key={crumb.href ?? crumb.label}>
                <BreadcrumbItem>
                  {isCurrentPage ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={crumb.href ?? "/"} />}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isCurrentPage ? <CatalogBreadcrumbSeparator /> : null}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

interface CategoryCatalogProps {
  title?: string;
  categoryId?: number;
}

export default function CategoryCatalog({
  title = "همه محصولات",
  categoryId = 0,
}: CategoryCatalogProps) {
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 0 });
  const [priceFilterResetKey, setPriceFilterResetKey] = useState(0);
  const [selectedValueIds, setSelectedValueIds] = useState<number[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const request = {
    page,
    pageLength: PAGE_LENGTH,
    sortType: SORT_TYPE_BY_ID[sort] ?? SORT_TYPE_BY_ID.newest,
    categoryId,
    tagId: 0,
    layoutTagId: 0,
    brandIds: [],
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice,
    searchText: "",
    justExist: onlyAvailable,
    justOffer: false,
    justDiscounted: false,
    currentProductId: 0,
    valueIds: selectedValueIds,
  };

  const { data, error, isPending } = useProductSearch(request);
  const { data: properties = [] } = useSearchableCategoryProperties(categoryId);

  const updateSort = (nextSort: string) => {
    setSort(nextSort);
    setPage(1);
  };

  const updateAvailability = (value: boolean) => {
    setOnlyAvailable(value);
    setPage(1);
  };

  const applyPriceRange = (nextRange: { minPrice: number; maxPrice: number }) => {
    setPriceRange(nextRange);
    setPage(1);
  };

  const clearFilters = () => {
    setOnlyAvailable(false);
    setPriceRange({ minPrice: 0, maxPrice: 0 });
    setPriceFilterResetKey((value) => value + 1);
    setSelectedValueIds([]);
    setPage(1);
  };

  const toggleValue = (valueId: number) => {
    setSelectedValueIds((current) =>
      current.includes(valueId) ? current.filter((id) => id !== valueId) : [...current, valueId],
    );
    setPage(1);
  };

  const applyMobileFilters = (filters: {
    onlyAvailable: boolean;
    minPrice: number;
    maxPrice: number;
    valueIds: number[];
  }) => {
    setOnlyAvailable(filters.onlyAvailable);
    setPriceRange({ minPrice: filters.minPrice, maxPrice: filters.maxPrice });
    setSelectedValueIds(filters.valueIds);
    setPage(1);
  };

  const totalPages = data?.pageCount ?? 0;

  return (
    <main className="container mx-auto min-h-screen bg-[#F8FAFC] px-4 pt-16 pb-24 lg:bg-transparent lg:px-6 lg:py-6 lg:pb-6">
      <h1 className="sr-only">{title}</h1>

      <MobilePageHeader
        title={title.replace("محصولات ", "")}
        leftContent={
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 text-sm font-bold"
          >
            <FilterIcon className="size-5" />
            <span>فیلترها</span>
          </button>
        }
      />

      <CatalogBreadcrumbs title={title} />

      <MobileFilterSheet
        open={isMobileFilterOpen}
        onOpenChange={setIsMobileFilterOpen}
        onlyAvailable={onlyAvailable}
        selectedValueIds={selectedValueIds}
        properties={properties}
        onApply={applyMobileFilters}
      />

      <div className="flex items-start gap-5 lg:gap-7">
        <FilterSidebar
          onlyAvailable={onlyAvailable}
          onToggleAvailable={updateAvailability}
          onApplyPrice={applyPriceRange}
          priceFilterResetKey={priceFilterResetKey}
          onClearFilters={clearFilters}
          properties={properties}
          selectedValueIds={selectedValueIds}
          onToggleValue={toggleValue}
        />

        <div className="min-w-0 flex-1">
          <SortBar sort={sort} onSort={updateSort} total={data?.totalCount ?? 0} />

          <div className="mb-5 hidden h-px bg-slate-200 lg:block" />

          {isPending ? (
            <div
              className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-7 lg:grid-cols-6 lg:gap-x-3 lg:gap-y-9"
              aria-busy="true"
              aria-label="در حال بارگذاری محصولات"
            >
              {Array.from({ length: PAGE_LENGTH }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : null}

          {!isPending && error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              دریافت محصولات ممکن نشد. لطفاً دوباره تلاش کنید.
            </p>
          ) : null}

          {!isPending && !error && data?.products.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              محصولی با این فیلترها پیدا نشد.
            </p>
          ) : null}

          {!isPending && !error && data?.products.length ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-7 lg:grid-cols-6 lg:gap-x-3 lg:gap-y-9">
              {data.products.map((product) => (
                <Fragment key={product.id}>
                  <ProductCard {...product} variant="catalog-mobile" className="lg:hidden" />
                  <ProductCard
                    {...product}
                    className="hidden border-none! lg:block lg:h-[308px]"
                    imageClassName="object-cover lg:h-[190px]"
                  />
                </Fragment>
              ))}
            </div>
          ) : null}

          {totalPages > 1 ? (
            <div className="flex justify-center py-10">
              <Pagination page={page} total={totalPages} onChange={setPage} />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
