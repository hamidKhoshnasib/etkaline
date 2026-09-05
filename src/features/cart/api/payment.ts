"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

interface ApiResponse {
  value?: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

export interface PayType {
  id: number;
  title: string;
}

export interface Paygate {
  id: number;
  title: string;
  pic: string;
  picUrl: string;
  order: number;
  isInstallment: boolean;
}

export interface PayBasketInput {
  basketId: number;
  payType: number;
  paygateId: number;
  installmentCount: number;
  callbackUrl?: string;
}

export interface PayBasketResult {
  basketId: number;
  isPaid: boolean;
  needPayGate: boolean;
  payUrl: string;
  message: string;
  factorNumber: string;
  deliveryCode: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function integerValue(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) ? value : null;
}

function responseMessage(response: ApiResponse, fallback: string) {
  const errors = Array.isArray(response.errors)
    ? response.errors.filter(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : [];

  return stringValue(response.message) || errors[0] || fallback;
}

function parsePayTypes(response: ApiResponse): PayType[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    throw new Error(responseMessage(response, "دریافت روش‌های پرداخت ناموفق بود."));
  }

  return response.value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }
    const id = integerValue(item.id);
    if (id === null || id < 1) {
      return [];
    }
    return [{ id, title: stringValue(item.title) || "روش پرداخت" }];
  });
}

function parsePaygates(response: ApiResponse): Paygate[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    throw new Error(responseMessage(response, "دریافت درگاه‌های پرداخت ناموفق بود."));
  }

  return response.value
    .flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }
      const id = integerValue(item.id);
      if (id === null || id < 1) {
        return [];
      }
      return [
        {
          id,
          title: stringValue(item.title) || "درگاه پرداخت",
          pic: stringValue(item.pic),
          picUrl: stringValue(item.picUrl),
          order: integerValue(item.order) ?? 0,
          isInstallment: item.isInstallment === true,
        },
      ];
    })
    .sort((first, second) => first.order - second.order);
}

function parsePayBasketResult(response: ApiResponse): PayBasketResult {
  if (response.isSuccess !== true || !isRecord(response.value)) {
    throw new Error(responseMessage(response, "پرداخت سفارش ناموفق بود."));
  }

  const basketId = integerValue(response.value.basketId);
  if (basketId === null || basketId < 1) {
    throw new Error("پاسخ پرداخت سفارش معتبر نیست.");
  }

  return {
    basketId,
    isPaid: response.value.isPaid === true,
    needPayGate: response.value.needPayGate === true,
    payUrl: stringValue(response.value.payUrl),
    message: stringValue(response.value.message),
    factorNumber: stringValue(response.value.factorNumber),
    deliveryCode: stringValue(response.value.deliveryCode),
  };
}

async function getPayTypes(basketId: number, siteType: SiteType) {
  let data: ApiResponse;

  try {
    ({ data } = await axiosClient.get<ApiResponse>(`/api/Baskets/GetPayTypes/${basketId}`, {
      headers: getSiteTypeHeaders(siteType),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parsePayTypes(data);
}

async function getPaygates(siteType: SiteType) {
  let data: ApiResponse;

  try {
    ({ data } = await axiosClient.get<ApiResponse>("/api/Baskets/GetPaygates", {
      headers: getSiteTypeHeaders(siteType),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parsePaygates(data);
}

async function payBasket(input: PayBasketInput, siteType: SiteType) {
  let data: ApiResponse;

  try {
    ({ data } = await axiosClient.post<ApiResponse>("/api/Baskets/PayBasket", input, {
      headers: getSiteTypeHeaders(siteType),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parsePayBasketResult(data);
}

export function usePayTypes(basketId: number) {
  const { status } = useSession();
  const { siteType } = useStorefront();

  return useQuery<PayType[], Error>({
    queryKey: [siteType, "basket", "pay-types", basketId],
    queryFn: () => getPayTypes(basketId, siteType),
    enabled: status === "authenticated" && Number.isSafeInteger(basketId) && basketId > 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function usePaygates(enabled: boolean) {
  const { status } = useSession();
  const { siteType } = useStorefront();

  return useQuery<Paygate[], Error>({
    queryKey: [siteType, "basket", "paygates"],
    queryFn: () => getPaygates(siteType),
    enabled: enabled && status === "authenticated",
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function usePayBasket() {
  const { siteType } = useStorefront();

  return useMutation<PayBasketResult, Error, PayBasketInput>({
    mutationKey: [siteType, "basket", "pay"],
    mutationFn: (input) => payBasket(input, siteType),
  });
}
