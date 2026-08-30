import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";

export type HomeLayoutType = 1 | 2;
export type HomePlatformType = 1 | 2;

export const HOME_COMPONENT_TYPE = {
  BANNER: 1,
  SINGLE_ROW_SLIDER: 2,
  TWO_ROW_GRID: 3,
  GRID_2X2: 4,
  OFFER: 5,
} as const;

export type HomeComponentType = (typeof HOME_COMPONENT_TYPE)[keyof typeof HOME_COMPONENT_TYPE];

export interface HomeLayoutItem {
  targetType: number;
  targetId: number | null;
  targetTitle: string | null;
  title: string;
  subTitle: string | null;
  urlTitle: string | null;
  componentType: HomeComponentType;
  componentTypeFa: string;
  id: number;
}

interface HomeLayoutResponse {
  value: HomeLayoutItem[] | null;
  isSuccess: boolean;
  errors: string[];
  message: string;
}

export async function getHomeLayout(
  layoutType: HomeLayoutType,
  platformType: HomePlatformType,
  siteType: SiteType,
): Promise<HomeLayoutItem[]> {
  const url = new URL("/api/Home/GetLayout", getServerApiBaseUrl());
  url.searchParams.set("LayoutType", String(layoutType));
  url.searchParams.set("PlatformType", String(platformType));

  const response = await fetchWithTimeout(url, {
    headers: { Accept: "application/json", ...getSiteTypeHeaders(siteType) },
    next: { revalidate: 300, tags: [`home-layout-${siteType}-${layoutType}-${platformType}`] },
  });

  if (!response.ok) {
    throw new Error(`Home layout request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as HomeLayoutResponse;
  if (payload.value === null) {
    return [];
  }

  if (!payload.isSuccess || !Array.isArray(payload.value)) {
    throw new Error(payload.message || payload.errors?.[0] || "Invalid home layout response");
  }

  return payload.value;
}
