"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { useStorefront } from "@/providers/storefront-provider";

const PAGE_LENGTH = 30;
const SORT_TYPE_BY_ID: Record<string, number> = {
  popular: 1,
  mostdiscount: 2,
  cheapest: 3,
  mostexpensive: 4,
  specialoffer: 5,
  bestselling: 6,
};
const DEFAULT_SORT = "popular";
const FILTER_QUERY_KEYS = [
  "available",
  "minPrice",
  "maxPrice",
  "valueIds",
  "searchText",
  "brandIds",
] as const;

function parsePositiveIds(value: string | null) {
  return (value ?? "")
    .split(",")
    .map(Number)
    .filter((item) => Number.isSafeInteger(item) && item > 0);
}

function parsePriceRange(searchParams: Pick<URLSearchParams, "get">) {
  const minParam = searchParams.get("minPrice");
  const maxParam = searchParams.get("maxPrice");
  if (minParam === null || maxParam === null) {
    return null;
  }

  const minPrice = Number(minParam);
  const maxPrice = Number(maxParam);
  return Number.isFinite(minPrice) && Number.isFinite(maxPrice) && maxPrice > minPrice
    ? { minPrice, maxPrice }
    : null;
}

function parseSort(value: string | null) {
  return value && Object.hasOwn(SORT_TYPE_BY_ID, value) ? value : DEFAULT_SORT;
}

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
  const storefront = useStorefront();
  const crumbs: CatalogBreadcrumbEntry[] = [
    { label: "خانه", href: storefront.homeHref },
    ...(categoryPath.length > 0
      ? categoryPath.map((category, index) => ({
          label: category.title,
          href:
            index === categoryPath.length - 1 ? undefined : storefront.categoryHref(category.id),
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
  const storefront = useStorefront();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = parseSort(searchParams.get("sort"));
  const [page, setPage] = useState(1);
  const onlyAvailable = searchParams.get("available") === "1";
  const priceRange = parsePriceRange(searchParams);
  const [priceFilterResetKey, setPriceFilterResetKey] = useState(0);
  const selectedValueIds = parsePositiveIds(searchParams.get("valueIds"));
  const brandIds = parsePositiveIds(searchParams.get("brandIds"));
  const searchText = searchParams.get("searchText")?.trim() ?? "";
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const replaceFilterParams = (update: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    update(params);
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  const request = {
    page,
    pageLength: PAGE_LENGTH,
    sortType: SORT_TYPE_BY_ID[sort] ?? SORT_TYPE_BY_ID.popular,
    ...(categoryId > 0 ? { categoryId } : {}),
    ...(priceRange ?? {}),
    ...(searchText ? { searchText } : {}),
    ...(brandIds.length > 0 ? { brandIds } : {}),
    ...(onlyAvailable ? { justExist: true } : {}),
    ...(selectedValueIds.length > 0 ? { valueIds: selectedValueIds } : {}),
  };

  const { data, error, isFetching, isPending } = useProductSearch(request);
  const [appliedPriceLimits, setAppliedPriceLimits] = useState<{
    categoryId: number;
    minPrice?: number;
    maxPrice?: number;
  } | null>(null);
  const products = Array.from(
    new Map((data?.products ?? []).map((product) => [String(product.id), product])).values(),
  );
  const { data: properties = [] } = useSearchableCategoryProperties(categoryId);
  const isLoadingProducts = isPending || isFetching;
  const responseMaxPrice = data?.maxPrice && data.maxPrice > 0 ? data.maxPrice : undefined;
  const responseMinPrice = data?.minPrice && data.minPrice > 0 ? data.minPrice : undefined;
  const storedPriceLimits =
    appliedPriceLimits?.categoryId === categoryId ? appliedPriceLimits : null;
  const maxPriceLimit = storedPriceLimits?.maxPrice ?? responseMaxPrice;
  const minPriceLimit = storedPriceLimits?.minPrice ?? responseMinPrice;

  const updateSort = (nextSort: string) => {
    replaceFilterParams((params) => {
      if (nextSort === DEFAULT_SORT) {
        params.delete("sort");
      } else {
        params.set("sort", nextSort);
      }
    });
    setPage(1);
  };

  const updateAvailability = (value: boolean) => {
    replaceFilterParams((params) => {
      if (value) {
        params.set("available", "1");
      } else {
        params.delete("available");
      }
    });
    setPage(1);
  };

  const applyPriceRange = (nextRange: { minPrice: number; maxPrice: number }) => {
    setAppliedPriceLimits({
      categoryId,
      minPrice: minPriceLimit,
      maxPrice: maxPriceLimit,
    });
    replaceFilterParams((params) => {
      params.set("minPrice", String(nextRange.minPrice));
      params.set("maxPrice", String(nextRange.maxPrice));
    });
    setPage(1);
  };

  const clearFilters = () => {
    replaceFilterParams((params) => {
      FILTER_QUERY_KEYS.forEach((key) => params.delete(key));
    });
    setAppliedPriceLimits(null);
    setPriceFilterResetKey((value) => value + 1);
    setPage(1);
  };

  const toggleValue = (valueId: number) => {
    const nextValueIds = selectedValueIds.includes(valueId)
      ? selectedValueIds.filter((id) => id !== valueId)
      : [...selectedValueIds, valueId];
    replaceFilterParams((params) => {
      if (nextValueIds.length) {
        params.set("valueIds", nextValueIds.join(","));
      } else {
        params.delete("valueIds");
      }
    });
    setPage(1);
  };

  const applyMobileFilters = (filters: {
    onlyAvailable: boolean;
    minPrice?: number;
    maxPrice?: number;
    valueIds: number[];
  }) => {
    setAppliedPriceLimits(
      filters.minPrice === undefined || filters.maxPrice === undefined
        ? null
        : {
            categoryId,
            minPrice: minPriceLimit,
            maxPrice: maxPriceLimit,
          },
    );
    replaceFilterParams((params) => {
      if (filters.onlyAvailable) {
        params.set("available", "1");
      } else {
        params.delete("available");
      }
      if (filters.minPrice === undefined || filters.maxPrice === undefined) {
        params.delete("minPrice");
        params.delete("maxPrice");
      } else {
        params.set("minPrice", String(filters.minPrice));
        params.set("maxPrice", String(filters.maxPrice));
      }
      if (filters.valueIds.length) {
        params.set("valueIds", filters.valueIds.join(","));
      } else {
        params.delete("valueIds");
      }
    });
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
        minPriceLimit={minPriceLimit}
        priceRange={priceRange}
        hasActiveFilters={Boolean(
          onlyAvailable || priceRange || selectedValueIds.length || searchText || brandIds.length,
        )}
        properties={properties}
        onClearFilters={clearFilters}
        onApply={applyMobileFilters}
      />

      <div className="flex items-start gap-5 lg:gap-7">
        <FilterSidebar
          onlyAvailable={onlyAvailable}
          onToggleAvailable={updateAvailability}
          onApplyPrice={applyPriceRange}
          priceFilterResetKey={priceFilterResetKey}
          maxPriceLimit={maxPriceLimit}
          minPriceLimit={minPriceLimit}
          priceRange={priceRange}
          hasActiveFilters={Boolean(
            onlyAvailable || priceRange || selectedValueIds.length || searchText || brandIds.length,
          )}
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

          {!isLoadingProducts && !error && products.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              محصولی با این فیلترها پیدا نشد.
            </p>
          ) : null}

          {!isLoadingProducts && !error && products.length ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4 lg:gap-2 lg:gap-y-3 xl:grid-cols-6">
              {products.map((product) => (
                <Fragment key={product.id}>
                  <div className="lg:hidden">
                    <ProductCard {...product} variant="catalog-mobile" />
                  </div>
                  <ProductCard
                    {...product}
                    className={
                      storefront.siteType === "supermarket"
                        ? "hidden lg:flex"
                        : "hidden border-none! bg-transparent! lg:block lg:h-[310px]"
                    }
                    imageClassName={
                      storefront.siteType === "supermarket"
                        ? undefined
                        : "object-cover lg:h-[190px]"
                    }
                    imageContainerClassName={
                      storefront.siteType === "supermarket" ? undefined : "bg-transparent!"
                    }
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
