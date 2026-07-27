import "server-only";

import { getServerApiHeaders } from "@/lib/get-server-api-headers";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

export interface LayoutBanner {
  id: number;
  title: string;
  image: string;
  width: number;
  height: number;
  href?: string;
  order: number;
}

interface BackendLayoutBanner {
  title: string;
  width: number;
  height: number;
  order: number;
  link: string | null;
  pic: string | null;
  picUrl: string | null;
  id: number;
}

interface LayoutBannersResponse {
  value: BackendLayoutBanner[];
  isSuccess: boolean;
  errors?: string[];
  message?: string;
}

function getInternalHref(value: string | null): string | undefined {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : undefined;
}

export async function getBannersByLayoutId(layoutId: number): Promise<LayoutBanner[]> {
  if (!Number.isSafeInteger(layoutId) || layoutId <= 0) {
    return [];
  }

  const url = new URL(`/api/Banners/GetBannersByLayoutId/${layoutId}`, API_BASE_URL);

  try {
    const response = await fetch(url, {
      headers: await getServerApiHeaders(),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      throw new Error(`Layout banners request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as LayoutBannersResponse;
    if (!payload.isSuccess || !Array.isArray(payload.value)) {
      throw new Error(payload.message || payload.errors?.[0] || "Invalid layout banners response");
    }

    return payload.value
      .flatMap((banner) => {
        const image = banner.picUrl || banner.pic;
        if (!image || !Number.isSafeInteger(banner.id)) {
          return [];
        }

        return [
          {
            id: banner.id,
            title: banner.title,
            image,
            width: banner.width > 0 ? banner.width : 600,
            height: banner.height > 0 ? banner.height : 300,
            href: getInternalHref(banner.link),
            order: banner.order,
          },
        ];
      })
      .sort((first, second) => first.order - second.order);
  } catch {
    return [];
  }
}
