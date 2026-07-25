import "server-only";

import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

export interface BlogBanner {
  id: number;
  title: string;
  content: string | undefined;
  image: string;
  width: number;
  height: number;
  href: string | undefined;
  order: number;
}

interface BlogBannersResponse {
  value?: unknown;
  isSuccess?: boolean;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function readText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function toImageUrl(value: unknown): string | undefined {
  const image = readText(value);
  if (!image) {
    return undefined;
  }

  try {
    const url = new URL(image, API_BASE_URL);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function toBannerHref(value: unknown): string | undefined {
  const href = readText(value);
  if (!href) {
    return undefined;
  }

  if (href.startsWith("/") && !href.startsWith("//")) {
    return href;
  }

  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function parseBlogBanners(value: unknown): BlogBanner[] {
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
      if (!isPositiveInteger(banner.id) || !image) {
        return [];
      }

      return [
        {
          id: banner.id,
          title: readText(banner.title) ?? "اتکالاین",
          content: readText(banner.bannerContent),
          image,
          width: isPositiveInteger(banner.width) ? banner.width : 600,
          height: isPositiveInteger(banner.height) ? banner.height : 300,
          href: toBannerHref(banner.link),
          order: typeof banner.order === "number" ? banner.order : index,
        },
      ];
    })
    .sort((first, second) => first.order - second.order);
}

export async function getBlogBanners(): Promise<BlogBanner[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Banners/GetBlogBanners`, {
      headers: { Accept: "application/json", ...SITE_TYPE_HEADERS },
      next: { revalidate: 300, tags: ["blog-banners"] },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as BlogBannersResponse;
    return payload.isSuccess ? parseBlogBanners(payload.value) : [];
  } catch {
    return [];
  }
}
