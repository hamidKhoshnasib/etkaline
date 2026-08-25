import "server-only";

import { cache } from "react";
import { getServerApiHeaders } from "@/lib/get-server-api-headers";
import type { SiteType } from "@/lib/api-site-type";
import { getServerApiBaseUrl } from "@/lib/api-config";

const API_BASE_URL = getServerApiBaseUrl();

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
  urlTitle: string;
  metaTitle: string;
  seoDesc: string;
  isFavorite: boolean;
  isExist: boolean;
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
    effectiveValueId: number | null;
    effectiveValueTitle: string | null;
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

function optionalNumberValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
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
    urlTitle: stringValue(value.urlTitle),
    metaTitle: stringValue(value.metaTitle),
    seoDesc: stringValue(value.seoDesc),
    isFavorite: booleanValue(value.isFavorite),
    isExist: booleanValue(value.isExist),
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
              effectiveValueId: optionalNumberValue(store.effectiveValueId),
              effectiveValueTitle: stringValue(store.effectiveValueTitle) || null,
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

export const getProductDetail = cache(
  async (productId: string, siteType: SiteType): Promise<ProductDetailData | null> => {
    if (!/^\d+$/.test(productId)) {
      return null;
    }

    try {
      const response = await fetch(new URL(`/api/Products/${productId}`, API_BASE_URL), {
        headers: await getServerApiHeaders(siteType),
        cache: "no-store",
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
  },
);
