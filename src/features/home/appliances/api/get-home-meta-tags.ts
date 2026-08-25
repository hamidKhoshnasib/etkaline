import "server-only";

import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { getServerApiBaseUrl } from "@/lib/api-config";

const API_BASE_URL = getServerApiBaseUrl();

export interface HomeMetaTags {
  homeMetaTitle: string;
  homeMetaDescription: string;
}

interface HomeMetaTagsResponse {
  value?: unknown;
  isSuccess?: boolean;
}

function isHomeMetaTags(value: unknown): value is HomeMetaTags {
  if (!value || typeof value !== "object") {
    return false;
  }

  const { homeMetaTitle, homeMetaDescription } = value as Record<string, unknown>;
  return (
    typeof homeMetaTitle === "string" &&
    homeMetaTitle.trim().length > 0 &&
    typeof homeMetaDescription === "string" &&
    homeMetaDescription.trim().length > 0
  );
}

export async function getHomeMetaTags(siteType: SiteType): Promise<HomeMetaTags | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Home/GetMetaTags`, {
      headers: { Accept: "application/json", ...getSiteTypeHeaders(siteType) },
      next: { revalidate: 300, tags: [`home-meta-tags-${siteType}`] },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      throw new Error(`Home metadata request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as HomeMetaTagsResponse;
    return payload.isSuccess && isHomeMetaTags(payload.value) ? payload.value : null;
  } catch {
    return null;
  }
}
