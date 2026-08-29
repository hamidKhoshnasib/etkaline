"use client";

import { useApiQuery } from "@/hooks/use-api-query";
import type { ProductCardData } from "@/features/product/model/product";

import { GET_SEARCHABLE_CATEGORY_PROPERTIES, POST_PRODUCT_SEARCH } from "./endpoints";
import { catalogQueryKey } from "./query-keys";

export interface ProductSearchRequest {
  page: number;
  pageLength: number;
  sortType: number;
  categoryId?: number;
  tagId?: number;
  layoutTagId?: number;
  brandIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  searchText?: string;
  justExist?: boolean;
  justOffer?: boolean;
  justDiscounted?: boolean;
  currentProductId?: number;
  valueIds?: number[];
}

export interface ProductSearchResult {
  page: number;
  pageLength: number;
  totalCount: number;
  pageCount: number;
  minPrice: number;
  maxPrice: number;
  products: Array<ProductCardData & { id: number }>;
}

export interface SearchablePropertyValue {
  id: number;
  title: string;
  description: string | null;
}

export interface SearchableProperty {
  propertyId: number;
  propertyTitle: string;
  propertyType: number;
  isColor: boolean;
  values: SearchablePropertyValue[];
  order: number;
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function numberValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function stringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function firstNumber(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = numberValue(record[key]);
    if (value !== null) {
      return value;
    }
  }
  return null;
}

function firstString(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = stringValue(record[key]);
    if (value !== null) {
      return value;
    }
  }
  return null;
}

function parseProductSearch(raw: unknown, request: ProductSearchRequest): ProductSearchResult {
  const response = recordValue(raw);
  if (!response) {
    throw new Error("Invalid product search response");
  }

  const products = Array.isArray(response.products)
    ? response.products.flatMap((item) => {
        const product = recordValue(item);
        if (!product) {
          return [];
        }
        const storeInfo = recordValue(product.storeInfo);
        const id = firstNumber(product, ["id", "productId", "storeProductId"]);
        const title = firstString(product, ["title", "productTitle"]);
        const image =
          firstString(product, ["picUrl", "image", "imageUrl", "pic"]) ??
          "/images/placeholder-product.png";
        const mainPrice =
          firstNumber(product, ["mainPrice", "price"]) ??
          (storeInfo ? firstNumber(storeInfo, ["mainPrice", "price"]) : null);
        const offPrice =
          firstNumber(product, ["offPrice", "finalPrice"]) ??
          (storeInfo ? firstNumber(storeInfo, ["offPrice", "finalPrice"]) : null);
        const discount =
          firstNumber(product, ["offPercent", "discount", "discountPercent"]) ??
          (storeInfo
            ? firstNumber(storeInfo, ["offPercent", "discount", "discountPercent"])
            : null);
        const storeProductId =
          firstNumber(product, ["storeProductId"]) ??
          (storeInfo ? firstNumber(storeInfo, ["storeProductId"]) : null);
        if (id === null || !title || mainPrice === null) {
          return [];
        }
        const price = offPrice && offPrice > 0 ? offPrice : mainPrice;
        return [
          {
            id,
            title,
            image,
            price,
            originalPrice: mainPrice > price ? mainPrice : undefined,
            discount: discount && discount > 0 ? discount : undefined,
            outOfStock: product.isExist === false || product.inventory === 0,
            storeProductId: storeProductId ?? undefined,
            urlTitle: firstString(product, ["urlTitle"]),
          },
        ];
      })
    : [];

  return {
    page: firstNumber(response, ["page"]) ?? request.page,
    pageLength: firstNumber(response, ["pageLength"]) ?? request.pageLength,
    totalCount: firstNumber(response, ["totalCount"]) ?? 0,
    pageCount: firstNumber(response, ["pageCount"]) ?? 0,
    minPrice:
      firstNumber(response, ["minPrice"]) ??
      (products.length ? Math.min(...products.map((product) => product.price)) : 0),
    maxPrice: firstNumber(response, ["maxPrice"]) ?? 0,
    products,
  };
}

function parseSearchableProperties(raw: unknown): SearchableProperty[] {
  const response = recordValue(raw);
  if (!response || response.isSuccess !== true || !Array.isArray(response.value)) {
    throw new Error("Invalid category filter response");
  }

  return response.value
    .flatMap((item): SearchableProperty[] => {
      const property = recordValue(item);
      const propertyId = property && numberValue(property.propertyId);
      const propertyTitle = property && stringValue(property.propertyTitle);
      if (!property || propertyId === null || !propertyTitle || !Array.isArray(property.values)) {
        return [];
      }
      return [
        {
          propertyId,
          propertyTitle,
          propertyType: numberValue(property.propertyType) ?? 0,
          isColor: property.isColor === true,
          values: property.values.flatMap((value): SearchablePropertyValue[] => {
            const itemValue = recordValue(value);
            const id = itemValue && numberValue(itemValue.id);
            const title = itemValue && stringValue(itemValue.title);
            if (!itemValue || id === null || !title) {
              return [];
            }
            return [{ id, title, description: stringValue(itemValue.description) }];
          }),
          order: numberValue(property.order) ?? 0,
        },
      ];
    })
    .sort((first, second) => first.order - second.order);
}

export function useProductSearch(request: ProductSearchRequest) {
  return useApiQuery<unknown, ProductSearchResult>({
    url: POST_PRODUCT_SEARCH,
    method: "POST",
    body: request,
    queryKey: catalogQueryKey("products", request),
    select: (raw) => parseProductSearch(raw, request),
    retry: false,
  });
}

export function useSearchableCategoryProperties(categoryId: number) {
  return useApiQuery<unknown, SearchableProperty[]>({
    url: `${GET_SEARCHABLE_CATEGORY_PROPERTIES}/${categoryId}`,
    queryKey: catalogQueryKey("searchable-properties", categoryId),
    select: parseSearchableProperties,
    enabled: categoryId > 0,
    retry: false,
  });
}
