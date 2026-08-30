import "server-only";

import { mapHomeBrand, type HomeBrand } from "@/features/home/appliances/model/brand";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";
import { getServerApiHeaders } from "@/lib/get-server-api-headers";
import type { SiteType } from "@/lib/api-site-type";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

export async function getHomeBrands(siteType: SiteType): Promise<HomeBrand[]> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/Brands/GetHomeBrands`, {
    headers: await getServerApiHeaders(siteType),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Home brands request failed: ${response.status}`);
  }

  const payload = (await response.json()) as { value?: unknown; isSuccess?: boolean };
  if (!payload.isSuccess || !Array.isArray(payload.value)) {
    throw new Error("Home brands response was unsuccessful");
  }

  return payload.value
    .filter((brand): brand is Record<string, unknown> =>
      Boolean(brand && typeof brand === "object"),
    )
    .map(mapHomeBrand)
    .filter((brand): brand is HomeBrand => Boolean(brand));
}
