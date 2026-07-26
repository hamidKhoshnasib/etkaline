"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { basketQueryKeys } from "./basket-query-keys";

export interface OpenBasketItem {
  id: number;
  storeProductId: number;
  productId: number;
  productTitle: string;
  barcode: string;
  isHeavyWeight: boolean;
  propertyId: number;
  propertyTitle: string;
  valueId: number;
  valueTitle: string;
  mainPrice: number;
  offPrice: number;
  offPercent: number;
  productCount: number;
  hasInventory: boolean;
  taxPercent: number;
  taxAmount: number;
  pic: string;
  picUrl: string;
}

export interface OpenBasket {
  id: number;
  customerId: number;
  customerName: string;
  storeId: number;
  storeTitle: string;
  productCount: number;
  itemCount: number;
  totalMainPrice: number;
  totalOffPrice: number;
  basketItems: OpenBasketItem[];
}

export interface OpenBasketResponse {
  value: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function booleanValue(value: unknown): boolean {
  return value === true;
}

function parseBasketItems(value: unknown): OpenBasketItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item) || !isNonNegativeInteger(item.id)) {
      return [];
    }

    return [
      {
        id: item.id,
        storeProductId: numberValue(item.storeProductId),
        productId: numberValue(item.productId),
        productTitle: stringValue(item.productTitle),
        barcode: stringValue(item.barcode),
        isHeavyWeight: booleanValue(item.isHeavyWeight),
        propertyId: numberValue(item.propertyId),
        propertyTitle: stringValue(item.propertyTitle),
        valueId: numberValue(item.valueId),
        valueTitle: stringValue(item.valueTitle),
        mainPrice: numberValue(item.mainPrice),
        offPrice: numberValue(item.offPrice),
        offPercent: numberValue(item.offPercent),
        productCount: numberValue(item.productCount),
        hasInventory: booleanValue(item.hasInventory),
        taxPercent: numberValue(item.taxPercent),
        taxAmount: numberValue(item.taxAmount),
        pic: stringValue(item.pic),
        picUrl: stringValue(item.picUrl),
      },
    ];
  });
}

function parseOpenBasket(value: unknown): OpenBasket | null {
  if (value === null) {
    return null;
  }

  if (!isRecord(value) || !isNonNegativeInteger(value.id)) {
    throw new Error("پاسخ سبد خرید معتبر نیست.");
  }

  return {
    id: value.id,
    customerId: numberValue(value.customerId),
    customerName: stringValue(value.customerName),
    storeId: numberValue(value.storeId),
    storeTitle: stringValue(value.storeTitle),
    productCount: numberValue(value.productCount),
    itemCount: numberValue(value.itemCount),
    totalMainPrice: numberValue(value.totalMainPrice),
    totalOffPrice: numberValue(value.totalOffPrice),
    basketItems: parseBasketItems(value.basketItems),
  };
}

function responseMessage(response: OpenBasketResponse) {
  const errors = Array.isArray(response.errors)
    ? response.errors.filter(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : [];

  return stringValue(response.message) || errors[0] || "دریافت سبد خرید ناموفق بود.";
}

export function parseOpenBasketResponse(response: OpenBasketResponse): OpenBasket | null {
  if (response.isSuccess !== true) {
    throw new Error(responseMessage(response));
  }

  return parseOpenBasket(response.value);
}

async function getOpenBasket(): Promise<OpenBasket | null> {
  let data: OpenBasketResponse;

  try {
    ({ data } = await axiosClient.get<OpenBasketResponse>("/api/Baskets/GetOpenBasket"));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parseOpenBasketResponse(data);
}

export function useOpenBasket() {
  const { status } = useSession();

  return useQuery<OpenBasket | null, Error>({
    queryKey: basketQueryKeys.open,
    queryFn: getOpenBasket,
    enabled: status === "authenticated",
  });
}
