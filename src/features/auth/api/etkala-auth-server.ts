import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import type { ApiResponse, AuthValue } from "@/types/auth";

type AuthEndpoint = "GetCaptcha" | "Login" | "VerifyCode" | "RefreshToken" | "ResendCode";

export type AuthServerResponse<T> = {
  payload: ApiResponse<T>;
  setCookies: string[];
};

export async function requestEtkalaAuthWithCookies<T>(
  endpoint: AuthEndpoint,
  siteType: SiteType | null,
  init?: RequestInit,
): Promise<AuthServerResponse<T>> {
  const response = await fetch(new URL(`/api/Auth/${endpoint}`, getServerApiBaseUrl()), {
    ...init,
    cache: "no-store",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(siteType ? getSiteTypeHeaders(siteType) : {}),
      ...init?.headers,
    },
    signal: AbortSignal.timeout(15_000),
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(payload.message || payload.errors?.[0] || "ارتباط با سرویس ورود ناموفق بود.");
  }

  const headers = response.headers as Headers & { getSetCookie?: () => string[] };
  return { payload, setCookies: headers.getSetCookie?.() ?? [] };
}

export async function requestEtkalaAuth<T>(
  endpoint: AuthEndpoint,
  siteType: SiteType,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  return (await requestEtkalaAuthWithCookies<T>(endpoint, siteType, init)).payload;
}

export function verifyCode(mobile: string, code: string, siteType: SiteType) {
  return requestEtkalaAuth<AuthValue>("VerifyCode", siteType, {
    method: "POST",
    body: JSON.stringify({ mobile, code }),
  });
}

export function refreshAuthTokens(accessToken: string, refreshToken: string, siteType: SiteType) {
  return requestEtkalaAuth<AuthValue>("RefreshToken", siteType, {
    method: "POST",
    body: JSON.stringify({ accessToken, refreshToken }),
  });
}
