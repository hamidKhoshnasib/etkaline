import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

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
  value: HomeLayoutItem[];
  isSuccess: boolean;
  errors: string[];
  message: string;
}

const DEFAULT_APPLIANCE_LAYOUT: HomeLayoutItem[] = [
  {
    targetType: 5,
    targetId: null,
    targetTitle: null,
    title: "پیشنهاد ویژه",
    subTitle: null,
    urlTitle: null,
    componentType: HOME_COMPONENT_TYPE.OFFER,
    componentTypeFa: "پیشنهاد ویژه",
    id: 1,
  },
  {
    targetType: 3,
    targetId: null,
    targetTitle: null,
    title: "پرفروش ترین ها",
    subTitle: null,
    urlTitle: null,
    componentType: HOME_COMPONENT_TYPE.SINGLE_ROW_SLIDER,
    componentTypeFa: "اسلایدر یک سطری",
    id: 4,
  },
  {
    targetType: 4,
    targetId: null,
    targetTitle: null,
    title: "پر بازدیدترین ها",
    subTitle: null,
    urlTitle: null,
    componentType: HOME_COMPONENT_TYPE.GRID_2X2,
    componentTypeFa: "گرید مربعی 2 در 2",
    id: 2,
  },
  {
    targetType: 3,
    targetId: null,
    targetTitle: null,
    title: "پرفروش ترین ها",
    subTitle: null,
    urlTitle: null,
    componentType: HOME_COMPONENT_TYPE.TWO_ROW_GRID,
    componentTypeFa: "گرید دو سطری",
    id: 3,
  },
];

export async function getHomeLayout(
  layoutType: HomeLayoutType,
  platformType: HomePlatformType,
): Promise<HomeLayoutItem[]> {
  const url = new URL("/api/Home/GetLayout", getServerApiBaseUrl());
  url.searchParams.set("LayoutType", String(layoutType));
  url.searchParams.set("PlatformType", String(platformType));

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json", ...SITE_TYPE_HEADERS },
      next: { revalidate: 300, tags: [`home-layout-${layoutType}-${platformType}`] },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      throw new Error(`Home layout request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as HomeLayoutResponse;
    if (!payload.isSuccess || !Array.isArray(payload.value)) {
      throw new Error(payload.message || payload.errors?.[0] || "Invalid home layout response");
    }

    return payload.value;
  } catch {
    return layoutType === 2 ? DEFAULT_APPLIANCE_LAYOUT : [];
  }
}
