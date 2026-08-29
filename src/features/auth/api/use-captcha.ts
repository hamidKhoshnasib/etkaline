"use client";

import { useQuery } from "@tanstack/react-query";

import { responseMessage } from "@/features/auth/model/auth";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";
import type { ApiResponse, CaptchaValue } from "@/types/auth";

async function getCaptcha(siteType: SiteType): Promise<CaptchaValue> {
  const response = await fetch("/api/etkala-auth/captcha", {
    cache: "no-store",
    credentials: "include",
    headers: getSiteTypeHeaders(siteType),
  });
  const payload = (await response.json().catch(() => null)) as ApiResponse<CaptchaValue> | null;

  if (!response.ok || payload?.isSuccess !== true || !payload.value?.img || !payload.value.cpCode) {
    throw new Error(
      payload
        ? responseMessage(payload, "دریافت تصویر امنیتی ناموفق بود.")
        : "دریافت تصویر امنیتی ناموفق بود.",
    );
  }

  return payload.value;
}

export function useCaptcha() {
  const { siteType } = useStorefront();

  return useQuery<CaptchaValue, Error>({
    queryKey: [siteType, "auth", "captcha"],
    queryFn: () => getCaptcha(siteType),
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
