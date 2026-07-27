import "server-only";

import { mapHomeBrand, type HomeBrand } from "@/features/home/appliances/model/brand";
import { getServerApiHeaders } from "@/lib/get-server-api-headers";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

// برندهای خانه از backend خوانده می‌شوند و در صورت قطعی API، صفحه بدون شکست رندر می‌شود.
export async function getHomeBrands(): Promise<HomeBrand[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Brands/GetHomeBrand`, {
      headers: await getServerApiHeaders(),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      throw new Error(`Home brands request failed: ${response.status}`);
    }
    const payload = (await response.json()) as { value?: unknown; isSuccess?: boolean };
    if (!payload.isSuccess || !Array.isArray(payload.value)) {
      return [];
    }
    return payload.value
      .filter((brand): brand is Record<string, unknown> =>
        Boolean(brand && typeof brand === "object"),
      )
      .map(mapHomeBrand)
      .filter((brand): brand is HomeBrand => Boolean(brand));
  } catch {
    return [];
  }
}
