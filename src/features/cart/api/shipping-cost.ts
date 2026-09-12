"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

interface ShippingCostResponse {
  value?: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

function responseMessage(response: ShippingCostResponse) {
  const errors = Array.isArray(response.errors)
    ? response.errors.filter(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : [];

  return (
    (typeof response.message === "string" ? response.message.trim() : "") ||
    errors[0] ||
    "دریافت هزینه ارسال ناموفق بود."
  );
}

async function getShippingCost(basketId: number, siteType: SiteType): Promise<number> {
  let data: ShippingCostResponse;

  try {
    ({ data } = await axiosClient.get<ShippingCostResponse>(
      `/api/Baskets/GetShippingCost/${basketId}`,
      { headers: getSiteTypeHeaders(siteType) },
    ));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (data.isSuccess !== true || typeof data.value !== "number" || !Number.isFinite(data.value)) {
    throw new Error(responseMessage(data));
  }

  return data.value;
}

export function useShippingCost(basketId: number) {
  const { status } = useSession();
  const { siteType } = useStorefront();

  return useQuery<number, Error>({
    queryKey: [siteType, "basket", "shipping-cost", basketId],
    queryFn: () => getShippingCost(basketId, siteType),
    enabled: status === "authenticated" && Number.isSafeInteger(basketId) && basketId > 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
