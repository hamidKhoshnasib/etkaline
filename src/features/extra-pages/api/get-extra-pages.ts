import "server-only";

import { cache } from "react";

import { getServerApiBaseUrl } from "@/lib/api-config";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";

export interface ExtraPageLink {
  id: number;
  title: string;
}

export interface ExtraPages {
  headerItems: ExtraPageLink[];
  footerItems: ExtraPageLink[];
}

function parseItems(value: unknown): ExtraPageLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const { id, title } = item as Record<string, unknown>;
    if (
      typeof id !== "number" ||
      !Number.isInteger(id) ||
      typeof title !== "string" ||
      !title.trim()
    ) {
      return [];
    }

    return [{ id, title: title.trim() }];
  });
}

export const getExtraPages = cache(async function getExtraPages(
  siteType: SiteType,
): Promise<ExtraPages> {
  const response = await fetchWithTimeout(new URL("/api/ExtraPages", getServerApiBaseUrl()), {
    headers: { Accept: "application/json", ...getSiteTypeHeaders(siteType) },
    next: { revalidate: 300, tags: [`extra-pages-${siteType}`] },
  });

  if (!response.ok) {
    throw new Error(`Extra pages request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { isSuccess?: unknown; value?: unknown };
  if (payload.isSuccess !== true || !payload.value || typeof payload.value !== "object") {
    throw new Error("Extra pages response was unsuccessful");
  }

  const value = payload.value as Record<string, unknown>;
  return {
    headerItems: parseItems(value.headerItems),
    footerItems: parseItems(value.footerItems),
  };
});
