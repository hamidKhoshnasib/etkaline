import "server-only";

import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

interface ProductDetailResponse {
  value?: unknown;
  isSuccess?: unknown;
}

interface ProductPropertyValue {
  id: number;
  title: string;
  description: string;
}

export interface ProductDetailData {
  productId: number;
  title: string;
  shortReview: string;
  expertReview: string;
  category: {
    categoryId: number;
    categoryTitle: string;
    categoryParents: Array<{ parentId: number; parentTitle: string }>;
  } | null;
  brand: { id: number; title: string } | null;
  storeInfos: Array<{
    storeProductId: number;
    mainPrice: number;
    offPrice: number;
    offPercent: number;
    isOffer: boolean;
    inventory: number;
  }>;
  pictures: Array<{ picName: string; picUrl: string; isMain: boolean }>;
  properties: Array<{
    propertyId: number;
    propertyTitle: string;
    isColor: boolean;
    valueText: string;
    values: ProductPropertyValue[];
  }>;
  effectiveProperty: {
    propertyId: number;
    propertyTitle: string;
    isColor: boolean;
    items: ProductPropertyValue[];
  } | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function booleanValue(value: unknown): boolean {
  return value === true;
}

function parsePropertyValues(value: unknown): ProductPropertyValue[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const title = stringValue(item.title);
    if (!title) {
      return [];
    }

    return [{ id: numberValue(item.id), title, description: stringValue(item.description) }];
  });
}

function parseProductDetail(value: unknown): ProductDetailData | null {
  if (!isRecord(value) || !isInteger(value.productId) || !stringValue(value.title)) {
    return null;
  }

  const category = isRecord(value.category)
    ? {
        categoryId: numberValue(value.category.categoryId),
        categoryTitle: stringValue(value.category.categoryTitle),
        categoryParents: Array.isArray(value.category.categoryParents)
          ? value.category.categoryParents.flatMap((parent) => {
              if (!isRecord(parent) || !stringValue(parent.parentTitle)) {
                return [];
              }

              return [
                {
                  parentId: numberValue(parent.parentId),
                  parentTitle: stringValue(parent.parentTitle),
                },
              ];
            })
          : [],
      }
    : null;

  const brand =
    isRecord(value.brand) && stringValue(value.brand.title)
      ? { id: numberValue(value.brand.id), title: stringValue(value.brand.title) }
      : null;

  return {
    productId: value.productId,
    title: stringValue(value.title),
    shortReview: stringValue(value.shortReview),
    expertReview: stringValue(value.expertReview),
    category,
    brand,
    storeInfos: Array.isArray(value.storeInfos)
      ? value.storeInfos.flatMap((store) => {
          if (!isRecord(store) || !isInteger(store.storeProductId)) {
            return [];
          }

          return [
            {
              storeProductId: store.storeProductId,
              mainPrice: numberValue(store.mainPrice),
              offPrice: numberValue(store.offPrice),
              offPercent: numberValue(store.offPercent),
              isOffer: booleanValue(store.isOffer),
              inventory: numberValue(store.inventory),
            },
          ];
        })
      : [],
    pictures: Array.isArray(value.pictures)
      ? value.pictures.flatMap((picture) => {
          if (!isRecord(picture) || !stringValue(picture.picUrl)) {
            return [];
          }

          return [
            {
              picName: stringValue(picture.picName),
              picUrl: stringValue(picture.picUrl),
              isMain: booleanValue(picture.isMain),
            },
          ];
        })
      : [],
    properties: Array.isArray(value.properties)
      ? value.properties.flatMap((property) => {
          if (!isRecord(property) || !isInteger(property.propertyId)) {
            return [];
          }

          return [
            {
              propertyId: property.propertyId,
              propertyTitle: stringValue(property.propertyTitle),
              isColor: booleanValue(property.isColor),
              valueText: stringValue(property.valueText),
              values: parsePropertyValues(property.values),
            },
          ];
        })
      : [],
    effectiveProperty: isRecord(value.effectiveProperty)
      ? {
          propertyId: numberValue(value.effectiveProperty.propertyId),
          propertyTitle: stringValue(value.effectiveProperty.propertyTitle),
          isColor: booleanValue(value.effectiveProperty.isColor),
          items: parsePropertyValues(value.effectiveProperty.items),
        }
      : null,
  };
}

export async function getProductDetail(productId: string): Promise<ProductDetailData | null> {
  if (!/^\d+$/.test(productId)) {
    return null;
  }

  try {
    const response = await fetch(new URL(`/api/Products/${productId}`, API_BASE_URL), {
      headers: { Accept: "application/json", ...SITE_TYPE_HEADERS },
      next: { revalidate: 300, tags: [`product:${productId}`] },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as ProductDetailResponse;
    return payload.isSuccess === true ? parseProductDetail(payload.value) : null;
  } catch {
    return null;
  }
}
