import "server-only";

import {
  mapBackendProduct,
  type BackendHomeProductGroup,
  type Product,
} from "@/features/product/model/product";
import { getServerApiHeaders } from "@/lib/get-server-api-headers";
import type { SiteType } from "@/lib/api-site-type";
import { getServerApiBaseUrl } from "@/lib/api-config";

// آدرس API فقط در لایه سرور خوانده می‌شود تا جزئیات بک‌اند به کلاینت نشت نکند
const API_BASE_URL = getServerApiBaseUrl();

interface HomeProductsResponse {
  value: BackendHomeProductGroup[];
  isSuccess: boolean;
  errors?: string[];
  message?: string;
}

export interface HomeProductsResult {
  products: Product[];
  layoutItems: BackendHomeProductGroup["layoutInfo"][];
}

export async function getHomeProducts(siteType: SiteType, count = 12): Promise<HomeProductsResult> {
  const url = new URL("/api/Products/GetHomeProducts", API_BASE_URL);
  url.searchParams.set("Count", String(count));

  try {
    const response = await fetch(url, {
      headers: await getServerApiHeaders(siteType),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      throw new Error(`Home products request failed with status ${response.status}`);
    }
    const payload = (await response.json()) as HomeProductsResponse;
    if (!payload.isSuccess || !Array.isArray(payload.value)) {
      throw new Error(payload.message || "Invalid home products response");
    }

    return {
      layoutItems: payload.value.map(({ layoutInfo }) => layoutInfo),
      products: payload.value.flatMap(({ products }) => products.map(mapBackendProduct)),
    };
  } catch {
    // در صورت قطعی API، صفحه با آرایه خالی رندر می‌شود و خطای داخلی نمایش داده نمی‌شود
    return { products: [], layoutItems: [] };
  }
}
