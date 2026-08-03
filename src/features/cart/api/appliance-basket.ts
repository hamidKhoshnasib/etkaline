import "server-only";

import { auth } from "@/features/auth/server";
import { getSiteTypeHeaders, SITE_TYPES } from "@/lib/api-site-type";
import type { ApiResponse } from "@/types/auth";
import type {
  AddToBasketRequest,
  ApplianceBasket,
  DeleteFromBasketRequest,
} from "@/features/cart/model/basket";

// دسترسی به سبد فقط در سرور انجام می‌شود تا access token وارد bundle کلاینت نشود
const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

async function basketRequest<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const session = await auth();
  if (!session?.accessToken) {
    throw new Error("AUTH_REQUIRED");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
      ...getSiteTypeHeaders(SITE_TYPES.appliance),
      ...init?.headers,
    },
  });

  const payload = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !payload.isSuccess) {
    throw new Error(payload.message || payload.errors?.[0] || "BASKET_REQUEST_FAILED");
  }

  return payload;
}

export async function getOpenApplianceBasket() {
  return basketRequest<ApplianceBasket>("/api/ApplianceBaskets/GetOpenBasket");
}

export async function addToApplianceBasket(input: AddToBasketRequest) {
  return basketRequest<ApplianceBasket>("/api/ApplianceBaskets/AddToBasket", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// تغییر تعداد از طریق سرور انجام می‌شود تا موجودی و قیمت دوباره بررسی شود.
export async function updateApplianceBasketItemCount(input: AddToBasketRequest) {
  return basketRequest<ApplianceBasket>("/api/ApplianceBaskets/UpdateBasketItemCount", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// حذف آیتم با شناسه سبد و محصول، بدون اعتماد به وضعیت محلی کلاینت.
export async function deleteFromApplianceBasket(input: DeleteFromBasketRequest) {
  return basketRequest<null>("/api/ApplianceBaskets/DeleteFromBasket", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
