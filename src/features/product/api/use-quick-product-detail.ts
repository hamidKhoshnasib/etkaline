"use client";

import { useApiQuery } from "@/hooks/use-api-query";

export interface QuickProductDetail {
  storeProductId: number | null;
  title: string | null;
  image: string | null;
  price: number | null;
  originalPrice: number | undefined;
  discount: number | undefined;
  outOfStock: boolean;
}

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function finiteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function parseQuickProductDetail(raw: unknown): QuickProductDetail {
  const response = record(raw);
  const product = response?.isSuccess === true ? record(response.value) : null;
  if (!product) {
    throw new Error("اطلاعات محصول معتبر نیست.");
  }

  const stores = Array.isArray(product.storeInfos)
    ? product.storeInfos
        .map(record)
        .filter((item): item is Record<string, unknown> => Boolean(item))
    : [];
  const store = stores.find((item) => item.isOffer === true) ?? stores[0] ?? null;
  const mainPrice = finiteNumber(store?.mainPrice);
  const offPrice = finiteNumber(store?.offPrice);
  const price = offPrice && offPrice > 0 ? offPrice : mainPrice;
  const pictures = Array.isArray(product.pictures)
    ? product.pictures.map(record).filter((item): item is Record<string, unknown> => Boolean(item))
    : [];
  const picture = pictures.find((item) => item.isMain === true) ?? pictures[0] ?? null;
  const inventory = finiteNumber(store?.inventory) ?? 0;

  return {
    storeProductId: finiteNumber(store?.storeProductId),
    title: typeof product.title === "string" && product.title.trim() ? product.title.trim() : null,
    image:
      typeof picture?.picUrl === "string" && picture.picUrl.trim() ? picture.picUrl.trim() : null,
    price,
    originalPrice: mainPrice && price !== null && mainPrice > price ? mainPrice : undefined,
    discount:
      typeof store?.offPercent === "number" && store.offPercent > 0 ? store.offPercent : undefined,
    outOfStock: product.isExist !== true || inventory <= 0,
  };
}

export function useQuickProductDetail(productId: number | string | undefined) {
  const normalizedId = Number(productId);
  return useApiQuery<unknown, QuickProductDetail>({
    url: `/api/Products/${normalizedId}`,
    queryKey: ["quick-product-detail", normalizedId],
    select: parseQuickProductDetail,
    enabled: Number.isSafeInteger(normalizedId) && normalizedId > 0,
    staleTime: 30_000,
    retry: false,
  });
}
