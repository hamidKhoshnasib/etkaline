import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";

interface FooterDescriptionResponse {
  value?: unknown;
  isSuccess?: boolean;
}

export async function getFooterDescription(siteType: SiteType): Promise<string | null> {
  const response = await fetchWithTimeout(
    new URL("/api/Home/GetFooterDescription", getServerApiBaseUrl()),
    {
      headers: { Accept: "application/json", ...getSiteTypeHeaders(siteType) },
      next: { revalidate: 300, tags: [`footer-description-${siteType}`] },
    },
  );

  if (!response.ok) {
    throw new Error(`Footer description request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as FooterDescriptionResponse;
  if (!payload.isSuccess) {
    throw new Error("Footer description response was unsuccessful");
  }

  return typeof payload.value === "string" && payload.value.trim() ? payload.value : null;
}
