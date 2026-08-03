import "server-only";

import {
  mapBackendLayoutProduct,
  type BackendLayoutProduct,
  type Product,
} from "@/features/product/model/product";
import { getServerApiHeaders } from "@/lib/get-server-api-headers";
import type { SiteType } from "@/lib/api-site-type";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

interface LayoutProductsResponse {
  value: BackendLayoutProduct[];
  isSuccess: boolean;
  errors?: string[];
  message?: string;
}

export async function getProductsByLayoutId(
  layoutId: number,
  siteType: SiteType,
  count = 12,
): Promise<Product[]> {
  if (
    !Number.isSafeInteger(layoutId) ||
    layoutId <= 0 ||
    !Number.isSafeInteger(count) ||
    count <= 0
  ) {
    return [];
  }

  const url = new URL("/api/Products/GetProdutsByLayoutId", API_BASE_URL);
  url.searchParams.set("LayoutId", String(layoutId));
  url.searchParams.set("Count", String(count));

  const response = await fetch(url, {
    headers: await getServerApiHeaders(siteType),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Layout products request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as LayoutProductsResponse;
  if (!payload.isSuccess || !Array.isArray(payload.value)) {
    throw new Error(payload.message || payload.errors?.[0] || "Invalid layout products response");
  }

  return payload.value.map(mapBackendLayoutProduct);
}
