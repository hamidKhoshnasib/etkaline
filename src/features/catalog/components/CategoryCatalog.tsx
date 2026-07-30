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
import { Container } from "@/components/ui/Container";
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

interface CategoryPathEntry {
  id: number;
  title: string;
}

function CatalogBreadcrumbSeparator() {
  return (
    <BreadcrumbSeparator className="[&>svg]:size-3.5!">
      <ArrowLeftIcon className="text-auth-accent size-3.5 stroke-[2.5]" />
    </BreadcrumbSeparator>
  );
}

function CatalogBreadcrumbs({
  title,
  categoryPath,
}: {
  title: string;
  categoryPath: CategoryPathEntry[];
}) {
  const crumbs: CatalogBreadcrumbEntry[] = [
    { label: "خانه", href: "/" },
    ...(categoryPath.length > 0
      ? categoryPath.map((category, index) => ({
          label: category.title,
          href: index === categoryPath.length - 1 ? undefined : `/categories/${category.id}`,
        }))
      : [{ label: title.replace("محصولات ", "") }]),
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
  categoryPath?: CategoryPathEntry[];
}

export default function CategoryCatalog({
  title = "همه محصولات",
  categoryId = 0,
  categoryPath = [],
}: CategoryCatalogProps) {
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [priceRange, setPriceRange] = useState<{ minPrice: number; maxPrice: number } | null>(null);
  const [priceFilterResetKey, setPriceFilterResetKey] = useState(0);
  const [selectedValueIds, setSelectedValueIds] = useState<number[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const request = {
    page,
    pageLength: PAGE_LENGTH,
    sortType: SORT_TYPE_BY_ID[sort] ?? SORT_TYPE_BY_ID.newest,
    categoryId,
    ...(priceRange ?? {}),
    ...(onlyAvailable ? { justExist: true } : {}),
    ...(selectedValueIds.length > 0 ? { valueIds: selectedValueIds } : {}),
  };

  const { data, error, isFetching, isPending } = useProductSearch(request);
  const { data: properties = [] } = useSearchableCategoryProperties(categoryId);
  const maxPriceLimit = data?.maxPrice && data.maxPrice > 0 ? data.maxPrice : undefined;
  const isLoadingProducts = isPending || isFetching;

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
    setPriceRange(null);
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
    minPrice?: number;
    maxPrice?: number;
    valueIds: number[];
  }) => {
    setOnlyAvailable(filters.onlyAvailable);
    setPriceRange(
      filters.minPrice === undefined || filters.maxPrice === undefined
        ? null
        : { minPrice: filters.minPrice, maxPrice: filters.maxPrice },
    );
    setSelectedValueIds(filters.valueIds);
    setPage(1);
  };

  const totalPages = data?.pageCount ?? 0;

  return (
    <Container
      as="main"
      className="min-h-screen pt-16 pb-24 lg:bg-transparent lg:px-6 lg:py-6 lg:pb-6"
    >
      <h1 className="sr-only">{title}</h1>

      <MobilePageHeader
        fixed
        fallbackHref="/"
        title={title.replace("محصولات ", "")}
        endContent={
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

      <CatalogBreadcrumbs title={title} categoryPath={categoryPath} />

      <MobileFilterSheet
        open={isMobileFilterOpen}
        onOpenChange={setIsMobileFilterOpen}
        onlyAvailable={onlyAvailable}
        selectedValueIds={selectedValueIds}
        maxPriceLimit={maxPriceLimit}
        properties={properties}
        onApply={applyMobileFilters}
      />

      <div className="flex items-start gap-5 lg:gap-7">
        <FilterSidebar
          onlyAvailable={onlyAvailable}
          onToggleAvailable={updateAvailability}
          onApplyPrice={applyPriceRange}
          priceFilterResetKey={priceFilterResetKey}
          maxPriceLimit={maxPriceLimit}
          onClearFilters={clearFilters}
          properties={properties}
          selectedValueIds={selectedValueIds}
          onToggleValue={toggleValue}
        />

        <div className="min-w-0 flex-1">
          <SortBar sort={sort} onSort={updateSort} total={data?.totalCount ?? 0} />

          <div className="mb-5 hidden h-px bg-slate-200 lg:block" />

          {isLoadingProducts ? (
            <div
              className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4 lg:gap-2 lg:gap-y-3 xl:grid-cols-6"
              aria-busy="true"
              aria-label="در حال بارگذاری محصولات"
            >
              {Array.from({ length: PAGE_LENGTH }, (_, index) => (
                <ProductCardSkeleton key={index} variant="catalog" />
              ))}
            </div>
          ) : null}

          {!isLoadingProducts && error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              دریافت محصولات ممکن نشد. لطفاً دوباره تلاش کنید.
            </p>
          ) : null}

          {!isLoadingProducts && !error && data?.products.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              محصولی با این فیلترها پیدا نشد.
            </p>
          ) : null}

          {!isLoadingProducts && !error && data?.products.length ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4 lg:gap-2 lg:gap-y-3 xl:grid-cols-6">
              {data.products.map((product) => (
                <Fragment key={product.id}>
                  <div className="lg:hidden">
                    <ProductCard {...product} variant="catalog-mobile" />
                  </div>
                  <ProductCard
                    {...product}
                    className="hidden border-none! bg-[#F1F5F9]! lg:block lg:h-[310px]"
                    imageClassName="object-cover lg:h-[190px]"
                    imageContainerClassName="bg-[#F1F5F9]!"
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
    </Container>
  );
}
