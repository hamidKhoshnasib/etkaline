"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";
import { basketQueryKeys } from "./basket-query-keys";
import { type OpenBasketItem, parseBasketItems } from "./get-open-basket";

interface CheckoutDetailsResponse {
  value: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

export interface CheckoutDetails {
  id: number;
  type: number;
  storeId: number;
  storeTitle: string;
  count: number;
  totalMainPrice: number;
  totalOffPrice: number;
  offDiscountAmount: number;
  discountCode: string;
  discountAmount: number;
  hekmatDiscountAmount: number;
  hekmatBonAmount: number;
  hekmatSubsidAmount: number;
  hekmatBuyCreditAmount: number;
  deliveryAmount: number;
  serviceAmount: number;
  payableAmount: number;
  hekmatIsPaid: boolean;
  deliveryStartDate: string;
  deliveryEndDate: string;
  deliveryTime: string;
  basketItems: OpenBasketItem[];
}

export interface GetCheckoutDetailsInput {
  basketId: number;
}

const REMOVE_DISCOUNT = true;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function responseMessage(response: CheckoutDetailsResponse) {
  const errors = Array.isArray(response.errors)
    ? response.errors.filter(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : [];

  return stringValue(response.message) || errors[0] || "دریافت اطلاعات نهایی سبد خرید ناموفق بود.";
}

function parseCheckoutDetailsResponse(response: CheckoutDetailsResponse): CheckoutDetails {
  if (response.isSuccess !== true) {
    throw new Error(responseMessage(response));
  }

  if (!isRecord(response.value)) {
    throw new Error("پاسخ اطلاعات نهایی سبد خرید معتبر نیست.");
  }

  const value = response.value;
  const id = numberValue(value.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error("شناسه سبد خرید در پاسخ معتبر نیست.");
  }

  return {
    id,
    type: numberValue(value.type),
    storeId: numberValue(value.storeId),
    storeTitle: stringValue(value.storeTitle),
    count: numberValue(value.count),
    totalMainPrice: numberValue(value.totalMainPrice),
    totalOffPrice: numberValue(value.totalOffPrice),
    offDiscountAmount: numberValue(value.offDiscountAmount),
    discountCode: stringValue(value.discountCode),
    discountAmount: numberValue(value.discountAmount),
    hekmatDiscountAmount: numberValue(value.hekmatDiscountAmount),
    hekmatBonAmount: numberValue(value.hekmatBonAmount),
    hekmatSubsidAmount: numberValue(value.hekmatSubsidAmount),
    hekmatBuyCreditAmount: numberValue(value.hekmatBuyCreditAmount),
    deliveryAmount: numberValue(value.deliveryAmount),
    serviceAmount: numberValue(value.serviceAmount),
    payableAmount: numberValue(value.payableAmount),
    hekmatIsPaid: value.hekmatIsPaid === true,
    deliveryStartDate: stringValue(value.deliveryStartDate),
    deliveryEndDate: stringValue(value.deliveryEndDate),
    deliveryTime: stringValue(value.deliveryTime),
    basketItems: parseBasketItems(value.basketItems),
  };
}

async function getCheckoutDetails(
  input: GetCheckoutDetailsInput,
  siteType: SiteType,
): Promise<CheckoutDetails> {
  if (!Number.isSafeInteger(input.basketId) || input.basketId < 1) {
    throw new Error("شناسه سبد خرید معتبر نیست.");
  }

  let data: CheckoutDetailsResponse;

  try {
    ({ data } = await axiosClient.get<CheckoutDetailsResponse>("/api/Baskets/GetCheckoutDetails", {
      params: {
        BasketId: input.basketId,
        RemoveDiscount: REMOVE_DISCOUNT,
      },
      headers: getSiteTypeHeaders(siteType),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parseCheckoutDetailsResponse(data);
}

export function useCheckoutDetails(input: GetCheckoutDetailsInput | null) {
  const { siteType } = useStorefront();
  const { data: session, status } = useSession();
  const customerId = session?.user.backendId;
  const basketId = input?.basketId ?? 0;

  return useQuery<CheckoutDetails, Error>({
    queryKey: basketQueryKeys.checkoutDetails(siteType, customerId, basketId, REMOVE_DISCOUNT),
    queryFn: () => getCheckoutDetails({ basketId }, siteType),
    enabled:
      input !== null &&
      status === "authenticated" &&
      Number.isSafeInteger(customerId) &&
      (customerId ?? 0) > 0 &&
      Number.isSafeInteger(basketId) &&
      basketId > 0,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}
