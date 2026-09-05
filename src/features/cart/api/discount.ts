"use client";

import { useMutation } from "@tanstack/react-query";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

interface CheckDiscountResponse {
  value?: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

export interface CheckDiscountInput {
  basketId: number;
  code: string;
}

export interface CheckDiscountResult {
  discountAmount: number | null;
  message: string;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function responseMessage(response: CheckDiscountResponse) {
  const errors = Array.isArray(response.errors)
    ? response.errors.filter(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : [];

  return stringValue(response.message) || errors[0] || "اعمال کد تخفیف ناموفق بود.";
}

async function checkDiscount(
  input: CheckDiscountInput,
  siteType: SiteType,
): Promise<CheckDiscountResult> {
  const code = input.code.trim();
  if (!Number.isSafeInteger(input.basketId) || input.basketId < 1) {
    throw new Error("شناسه سبد خرید معتبر نیست.");
  }
  if (!code) {
    throw new Error("کد تخفیف را وارد کنید.");
  }

  let response: CheckDiscountResponse;
  try {
    ({ data: response } = await axiosClient.post<CheckDiscountResponse>(
      "/api/Baskets/CheckDiscount",
      { basketId: input.basketId, code },
      { headers: getSiteTypeHeaders(siteType) },
    ));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (response.isSuccess !== true) {
    throw new Error(responseMessage(response));
  }

  const discountAmount = response.value;
  if (
    discountAmount !== null &&
    discountAmount !== undefined &&
    (typeof discountAmount !== "number" ||
      !Number.isSafeInteger(discountAmount) ||
      discountAmount < 0)
  ) {
    throw new Error("پاسخ کد تخفیف معتبر نیست.");
  }

  return {
    discountAmount: typeof discountAmount === "number" ? discountAmount : null,
    message: stringValue(response.message) || "کد تخفیف با موفقیت اعمال شد.",
  };
}

export function useCheckDiscount() {
  const { siteType } = useStorefront();

  return useMutation<CheckDiscountResult, Error, CheckDiscountInput>({
    mutationKey: [siteType, "basket", "discount", "check"],
    mutationFn: (input) => checkDiscount(input, siteType),
    retry: false,
  });
}
