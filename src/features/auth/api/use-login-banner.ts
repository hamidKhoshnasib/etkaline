"use client";

import { useApiQuery } from "@/hooks/use-api-query";
import { createFeatureQueryKey } from "@/lib/query-cache/create-feature-query-key";

const LOGIN_BANNER_TYPE = 4;
const authQueryKey = createFeatureQueryKey("auth", "dialog");

interface LoginBanner {
  image: string;
}

function readText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function parseLoginBanner(value: unknown): LoginBanner | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const response = value as Record<string, unknown>;
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    return null;
  }

  for (const item of response.value) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const banner = item as Record<string, unknown>;
    const image = readText(banner.picUrl) ?? readText(banner.pic);
    if (image) {
      return { image };
    }
  }

  return null;
}

export function useLoginBanner(enabled: boolean) {
  return useApiQuery<unknown, LoginBanner | null>({
    url: "/api/Banners/GetByType",
    queryKey: authQueryKey("login-banner"),
    axiosConfig: { params: { Type: LOGIN_BANNER_TYPE } },
    select: parseLoginBanner,
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
