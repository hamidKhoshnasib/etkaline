"use client";

import { useMutation } from "@tanstack/react-query";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";
import { basketQueryKeys } from "./basket-query-keys";

export interface SaveBasketInput {
  basketId: number;
  customerDescription: string;
}

export interface SavedBasket {
  id: number;
  totalMainPrice: number;
  totalOffPrice: number;
  offDiscountAmount: number;
  discountAmount: number;
  deliveryAmount: number;
  serviceAmount: number;
}

interface SaveBasketResponse {
  value?: unknown;
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

function responseMessage(response: SaveBasketResponse) {
  const errors = Array.isArray(response.errors)
    ? response.errors.filter(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : [];

  return (
    (typeof response.message === "string" && response.message.trim()) ||
    errors[0] ||
    "ثبت سبد خرید ناموفق بود."
  );
}

function parseSavedBasket(response: SaveBasketResponse): SavedBasket {
  const isEnvelope = "isSuccess" in response || "value" in response;
  if (isEnvelope && response.isSuccess !== true) {
    throw new Error(responseMessage(response));
  }

  const payload = isEnvelope ? response.value : response;
  if (!isRecord(payload)) {
    throw new Error("پاسخ ثبت سبد خرید معتبر نیست.");
  }

  const id = payload.id;
  if (!isNonNegativeInteger(id)) {
    throw new Error("شناسه سبد خرید در پاسخ معتبر نیست.");
  }

  return {
    id,
    totalMainPrice: numberValue(payload.totalMainPrice),
    totalOffPrice: numberValue(payload.totalOffPrice),
    offDiscountAmount: numberValue(payload.offDiscountAmount),
    discountAmount: numberValue(payload.discountAmount),
    deliveryAmount: numberValue(payload.deliveryAmount),
    serviceAmount: numberValue(payload.serviceAmount),
  };
}

async function saveBasket(input: SaveBasketInput, siteType: SiteType) {
  if (!Number.isSafeInteger(input.basketId) || input.basketId < 1) {
    throw new Error("شناسه سبد خرید معتبر نیست.");
  }

  let data: SaveBasketResponse;

  try {
    ({ data } = await axiosClient.post<SaveBasketResponse>("/api/Baskets/SaveBasket", input, {
      headers: getSiteTypeHeaders(siteType),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parseSavedBasket(data);
}

export function useSaveBasket() {
  const { siteType } = useStorefront();

  return useMutation<SavedBasket, Error, SaveBasketInput>({
    mutationKey: [...basketQueryKeys.all(siteType), "save"],
    mutationFn: (input) => saveBasket(input, siteType),
  });
}
