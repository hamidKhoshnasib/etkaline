import "server-only";

import type { ApiResponse, AuthValue } from "@/types/auth";

const AUTH_API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

type AuthEndpoint = "GetCaptcha" | "Login" | "VerifyCode" | "RefreshToken" | "ResendCode";

export async function requestEtkalaAuth<T>(
  endpoint: AuthEndpoint,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const response = await fetch(`${AUTH_API_BASE_URL}/api/Auth/${endpoint}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
    signal: AbortSignal.timeout(15_000),
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(payload.message || payload.errors?.[0] || "ارتباط با سرویس ورود ناموفق بود.");
  }

  return payload;
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
