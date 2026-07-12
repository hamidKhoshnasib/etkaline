import "server-only";

export type HomeLayoutType = 1 | 2;
export type HomePlatformType = 1 | 2;

export interface HomeLayoutItem {
  targetType: number;
  targetId: number | null;
  targetTitle: string | null;
  title: string;
  subTitle: string | null;
  urlTitle: string | null;
  componentType: number;
  componentTypeFa: string;
  id: number;
}

interface HomeLayoutResponse {
  value: HomeLayoutItem[];
  isSuccess: boolean;
  errors: string[];
  message: string;
}

const HOME_API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

const DEFAULT_APPLIANCE_LAYOUT: HomeLayoutItem[] = [
  {
    targetType: 5,
    targetId: null,
    targetTitle: null,
    title: "پیشنهاد ویژه",
    subTitle: null,
    urlTitle: null,
    componentType: 1,
    componentTypeFa: "اسلایدر یک سطری",
    id: 1,
  },
  {
    targetType: 3,
    targetId: null,
    targetTitle: null,
    title: "پرفروش ترین ها",
    subTitle: null,
    urlTitle: null,
    componentType: 1,
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
    componentType: 3,
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
    componentType: 2,
    componentTypeFa: "گرید دو سطری",
    id: 3,
  },
];

export async function getHomeLayout(
  layoutType: HomeLayoutType,
  platformType: HomePlatformType,
): Promise<HomeLayoutItem[]> {
  const url = new URL("/api/Home/GetLayout", HOME_API_BASE_URL);
  url.searchParams.set("LayoutType", String(layoutType));
  url.searchParams.set("PlatformType", String(platformType));

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: {
        revalidate: 300,
        tags: [`home-layout-${layoutType}-${platformType}`],
      },
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
