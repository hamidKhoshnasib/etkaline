import "server-only";

import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";
import type { ApiResponse, AuthValue } from "@/types/auth";

const AUTH_API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

type AuthEndpoint = "GetCaptcha" | "Login" | "VerifyCode" | "RefreshToken" | "ResendCode";

export type AuthServerResponse<T> = {
  payload: ApiResponse<T>;
  setCookies: string[];
};

export async function requestEtkalaAuthWithCookies<T>(
  endpoint: AuthEndpoint,
  init?: RequestInit,
): Promise<AuthServerResponse<T>> {
  const response = await fetch(`${AUTH_API_BASE_URL}/api/Auth/${endpoint}`, {
    ...init,
    cache: "no-store",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...SITE_TYPE_HEADERS,
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
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  return (await requestEtkalaAuthWithCookies<T>(endpoint, init)).payload;
}

export function verifyCode(mobile: string, code: string) {
  return requestEtkalaAuth<AuthValue>("VerifyCode", {
    method: "POST",
    body: JSON.stringify({ mobile, code }),
  });
}

export function refreshAuthTokens(accessToken: string, refreshToken: string) {
  return requestEtkalaAuth<AuthValue>("RefreshToken", {
    method: "POST",
    body: JSON.stringify({ accessToken, refreshToken }),
  });
}
