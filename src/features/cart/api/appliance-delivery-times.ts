"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { SITE_TYPES } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

interface ApiResponse {
  value?: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

export interface ApplianceDeliveryTime {
  id: number;
  title: string;
  startDayOfMonth: number;
  endDayOfMonth: number;
  isFull: boolean;
}

export interface ApplianceDeliveryDate {
  title: string;
  year: number;
  month: number;
  deliveryTimes: ApplianceDeliveryTime[];
}

export interface ApplianceDeliveryTimes {
  heavyWeightDeliveryDates: ApplianceDeliveryDate[];
  lightWeightDeliveryDates: ApplianceDeliveryDate[];
}

export interface ApplianceDeliveryTimeSelection {
  year: number;
  month: number;
  deliveryTimeId: number;
}

export interface SetApplianceDeliveryTimeInput {
  basketId: number;
  heavyWeightDeliveryTime?: ApplianceDeliveryTimeSelection;
  lightWeightDeliveryTime?: ApplianceDeliveryTimeSelection;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
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

function parseDeliveryTimes(value: unknown): ApplianceDeliveryTime[] {
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
        startDayOfMonth: numberValue(item.startDayOfMonth),
        endDayOfMonth: numberValue(item.endDayOfMonth),
        isFull: item.isFull === true,
      },
    ];
  });
}

function parseDeliveryDates(value: unknown): ApplianceDeliveryDate[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const year = item.year;
    const month = item.month;
    if (
      typeof year !== "number" ||
      typeof month !== "number" ||
      !Number.isSafeInteger(year) ||
      !Number.isSafeInteger(month)
    ) {
      return [];
    }

    return [
      {
        title: stringValue(item.title),
        year,
        month,
        deliveryTimes: parseDeliveryTimes(item.deliveryTimes),
      },
    ];
  });
}

function parseApplianceDeliveryTimes(response: ApiResponse): ApplianceDeliveryTimes {
  if (response.isSuccess !== true || !isRecord(response.value)) {
    throw new Error(responseMessage(response));
  }

  return {
    heavyWeightDeliveryDates: parseDeliveryDates(response.value.heavyWeightDeliveryDates),
    lightWeightDeliveryDates: parseDeliveryDates(response.value.lightWeightDeliveryDates),
  };
}

async function getApplianceDeliveryTimes(basketId: number): Promise<ApplianceDeliveryTimes> {
  let data: ApiResponse;

  try {
    ({ data } = await axiosClient.get<ApiResponse>("/api/DeliveryTimes/GetApplianceDeliveryTimes", {
      params: { BasketId: basketId, JustFreeTimes: false },
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parseApplianceDeliveryTimes(data);
}

async function setApplianceDeliveryTime(input: SetApplianceDeliveryTimeInput) {
  let data: ApiResponse;

  try {
    ({ data } = await axiosClient.post<ApiResponse>(
      "/api/DeliveryTimes/SetApplianceDeliveryTime",
      input,
    ));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (data.isSuccess !== true) {
    throw new Error(responseMessage(data));
  }
}

export function useApplianceDeliveryTimes(basketId: number) {
  const { status } = useSession();
  const { siteType } = useStorefront();

  return useQuery<ApplianceDeliveryTimes, Error>({
    queryKey: [siteType, "delivery-times", "appliance", basketId, { justFreeTimes: false }],
    queryFn: () => getApplianceDeliveryTimes(basketId),
    enabled:
      siteType === SITE_TYPES.appliance &&
      status === "authenticated" &&
      Number.isSafeInteger(basketId) &&
      basketId > 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function useSetApplianceDeliveryTime() {
  const { siteType } = useStorefront();

  return useMutation<void, Error, SetApplianceDeliveryTimeInput>({
    mutationKey: [siteType, "delivery-times", "appliance", "set"],
    mutationFn: setApplianceDeliveryTime,
  });
}
