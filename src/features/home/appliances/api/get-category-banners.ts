import "server-only";

import { getServerApiHeaders } from "@/lib/get-server-api-headers";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

export interface CategoryBanner {
  id: number;
  title: string;
  image: string;
  href: string | null;
}

interface CategoryBannersResponse {
  value?: unknown;
  isSuccess?: boolean;
}

function readText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toImageUrl(value: unknown): string | null {
  const image = readText(value);
  if (!image) {
    return null;
  }

  try {
    const url = new URL(image, API_BASE_URL);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function toBannerHref(value: unknown): string | null {
  const href = readText(value);
  if (!href) {
    return null;
  }

  if (href.startsWith("/") && !href.startsWith("//")) {
    return href;
  }

  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function parseCategoryBanners(value: unknown): CategoryBanner[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .flatMap((item, index) => {
      if (!item || typeof item !== "object") {
        return [];
      }

      const banner = item as Record<string, unknown>;
      const image = toImageUrl(banner.picUrl) ?? toImageUrl(banner.pic);
      if (typeof banner.id !== "number" || !Number.isSafeInteger(banner.id) || !image) {
        return [];
      }

      return [
        {
          id: banner.id,
          title: readText(banner.title) ?? "دسته‌بندی",
          image,
          href: toBannerHref(banner.link),
          order: typeof banner.order === "number" ? banner.order : index,
        },
      ];
    })
    .sort((first, second) => first.order - second.order)
    .map(({ order: _order, ...banner }) => banner);
}

export async function getCategoryBanners(): Promise<CategoryBanner[]> {
  try {
    const response = await fetch(new URL("/api/Banners/GetCategoryBanners", API_BASE_URL), {
      headers: await getServerApiHeaders(),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as CategoryBannersResponse;
    return payload.isSuccess ? parseCategoryBanners(payload.value) : [];
  } catch {
    return [];
  }
}
