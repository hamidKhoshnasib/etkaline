import { axiosClient } from "@/lib/axios-client";
import type { ProductCardData } from "@/features/product/model/product";

export interface ProductSearchRequest {
  page: number;
  pageLength: number;
  sortType: number;
  categoryId: number;
  tagId: number;
  layoutTagId: number;
  brandIds: number[];
  minPrice: number;
  maxPrice: number;
  searchText: string;
  justExist: boolean;
  justOffer: boolean;
  justDiscounted: boolean;
  currentProductId: number;
  valueIds: number[];
}

export interface ProductSearchResult {
  page: number;
  pageLength: number;
  totalCount: number;
  pageCount: number;
  maxPrice: number;
  products: Array<ProductCardData & { id: number }>;
}

function numberValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function stringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
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

function parseProducts(value: unknown): Array<ProductCardData & { id: number }> {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    const product = recordValue(item);
    if (!product) {
      return [];
    }

    const id = firstNumber(product, ["id", "productId", "storeProductId"]);
    const title = firstString(product, ["title", "productTitle"]);
    const image = firstString(product, ["picUrl", "image", "imageUrl", "pic"]);
    const mainPrice = firstNumber(product, ["mainPrice", "price"]);
    const offPrice = firstNumber(product, ["offPrice", "finalPrice"]);
    const discount = firstNumber(product, ["offPercent", "discount", "discountPercent"]);

    if (id === null || !title || !image || mainPrice === null) {
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
      },
    ];
  });
}

export function getProductSearchQueryKey(request: ProductSearchRequest) {
  return ["products", "search", request] as const;
}

export async function searchProducts(
  request: ProductSearchRequest,
  signal?: AbortSignal,
): Promise<ProductSearchResult> {
  const { data } = await axiosClient.post<unknown>("/api/Products/Search", request, { signal });
  const response = recordValue(data);

  if (!response) {
    throw new Error("Invalid product search response");
  }

  return {
    page: firstNumber(response, ["page"]) ?? request.page,
    pageLength: firstNumber(response, ["pageLength"]) ?? request.pageLength,
    totalCount: firstNumber(response, ["totalCount"]) ?? 0,
    pageCount: firstNumber(response, ["pageCount"]) ?? 0,
    maxPrice: firstNumber(response, ["maxPrice"]) ?? 0,
    products: parseProducts(response.products),
  };
}
