import "server-only";

import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

export interface HomeBanner {
  id: number;
  title: string;
  image: string;
  href: string | null;
  width: number;
  height: number;
}

interface HomeBannersResponse {
  value?: unknown;
  isSuccess?: boolean;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function toImageUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const url = new URL(value.trim(), API_BASE_URL);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function toBannerHref(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const href = value.trim();
  if (href.startsWith("/")) {
    return href;
  }

  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function parseHomeBanners(value: unknown): HomeBanner[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .flatMap((group, groupIndex) => {
      if (!group || typeof group !== "object") {
        return [];
      }

      const record = group as Record<string, unknown>;
      const layoutInfo = record.layoutInfo as Record<string, unknown> | null;
      if (!layoutInfo || layoutInfo.isEnabled !== true || !Array.isArray(record.banners)) {
        return [];
      }

      const layoutOrder = typeof layoutInfo.order === "number" ? layoutInfo.order : groupIndex;
      return record.banners.flatMap((banner, bannerIndex) => {
        if (!banner || typeof banner !== "object") {
          return [];
        }

        const item = banner as Record<string, unknown>;
        const image = toImageUrl(item.picUrl) ?? toImageUrl(item.pic);
        if (
          !isPositiveInteger(item.id) ||
          !isPositiveInteger(item.width) ||
          !isPositiveInteger(item.height) ||
          !image
        ) {
          return [];
        }

        return [
          {
            id: item.id,
            title:
              typeof item.title === "string" && item.title.trim()
                ? item.title.trim()
                : "بنر اتکالاین",
            image,
            href: toBannerHref(item.link),
            width: item.width,
            height: item.height,
            order: typeof item.order === "number" ? item.order : bannerIndex,
            layoutOrder,
          },
        ];
      });
    })
    .sort((first, second) => first.layoutOrder - second.layoutOrder || first.order - second.order)
    .map(({ order: _order, layoutOrder: _layoutOrder, ...banner }) => banner);
}

export async function getHomeBanners(): Promise<HomeBanner[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Banners/GetHomeBanners`, {
      headers: { Accept: "application/json", ...SITE_TYPE_HEADERS },
      next: { revalidate: 300, tags: ["home-banners"] },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as HomeBannersResponse;
    return payload.isSuccess ? parseHomeBanners(payload.value) : [];
  } catch {
    return [];
  }
}
