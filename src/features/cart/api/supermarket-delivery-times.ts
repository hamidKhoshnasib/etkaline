"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders, SITE_TYPES, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

interface ApiResponse {
  value?: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

export interface SupermarketDeliveryTime {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  isFull: boolean;
}

export interface SupermarketDeliveryDate {
  deliveryDate: string;
  deliveryDateFa: string;
  deliveryTimes: SupermarketDeliveryTime[];
}

export interface SetSupermarketDeliveryTimeInput {
  basketId: number;
  deliveryDate: string;
  deliveryTimeId: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function responseMessage(response: ApiResponse) {
  const errors = Array.isArray(response.errors)
    ? response.errors.filter(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : [];

  return stringValue(response.message) || errors[0] || "دریافت زمان‌های ارسال ناموفق بود.";
}

function parseDeliveryTimes(value: unknown): SupermarketDeliveryTime[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const id = item.id;
    if (typeof id !== "number" || !Number.isSafeInteger(id) || id < 1) {
      return [];
    }

    return [
      {
        id,
        title: stringValue(item.title),
        startTime: stringValue(item.startTime),
        endTime: stringValue(item.endTime),
        isFull: item.isFull === true,
      },
    ];
  });
}

function parseSupermarketDeliveryTimes(response: ApiResponse): SupermarketDeliveryDate[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    throw new Error(responseMessage(response));
  }

  return response.value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const deliveryDate = stringValue(item.deliveryDate);
    if (!deliveryDate || Number.isNaN(new Date(deliveryDate).getTime())) {
      return [];
    }

    return [
      {
        deliveryDate,
        deliveryDateFa: stringValue(item.deliveryDateFa),
        deliveryTimes: parseDeliveryTimes(item.deliveryTimes),
      },
    ];
  });
}

async function getSupermarketDeliveryTimes(
  basketId: number,
  siteType: SiteType,
): Promise<SupermarketDeliveryDate[]> {
  let data: ApiResponse;

  try {
    ({ data } = await axiosClient.get<ApiResponse>(
      "/api/DeliveryTimes/GetSuperMarketDeliveryTimes",
      {
        params: { BasketId: basketId, JustFreeTimes: false },
        headers: getSiteTypeHeaders(siteType),
      },
    ));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parseSupermarketDeliveryTimes(data);
}

async function setSupermarketDeliveryTime(
  input: SetSupermarketDeliveryTimeInput,
  siteType: SiteType,
) {
  let data: ApiResponse;

  try {
    ({ data } = await axiosClient.post<ApiResponse>(
      "/api/DeliveryTimes/SetSuperMarketDeliveryTime",
      input,
      { headers: getSiteTypeHeaders(siteType) },
    ));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (data.isSuccess !== true) {
    throw new Error(responseMessage(data));
  }
}

export function useSupermarketDeliveryTimes(basketId: number) {
  const { status } = useSession();
  const { siteType } = useStorefront();

  return useQuery<SupermarketDeliveryDate[], Error>({
    queryKey: [siteType, "delivery-times", "supermarket", basketId, { justFreeTimes: false }],
    queryFn: () => getSupermarketDeliveryTimes(basketId, siteType),
    enabled:
      siteType === SITE_TYPES.supermarket &&
      status === "authenticated" &&
      Number.isSafeInteger(basketId) &&
      basketId > 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function useSetSupermarketDeliveryTime() {
  const { siteType } = useStorefront();

  return useMutation<void, Error, SetSupermarketDeliveryTimeInput>({
    mutationKey: [siteType, "delivery-times", "supermarket", "set"],
    mutationFn: (input) => setSupermarketDeliveryTime(input, siteType),
  });
}
