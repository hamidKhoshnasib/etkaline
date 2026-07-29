import "server-only";

import { getServerApiHeaders } from "@/lib/get-server-api-headers";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

export interface HomeBanner {
  id: number;
  title: string;
  image: string;
  href: string | null;
}

interface HomeBannersResponse {
  value?: unknown;
  isSuccess?: boolean;
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
    .flatMap((slide, index) => {
      if (!slide || typeof slide !== "object") {
        return [];
      }

      const record = slide as Record<string, unknown>;
      const image = toImageUrl(record.picUrl) ?? toImageUrl(record.pic);
      if (typeof record.id !== "number" || !Number.isInteger(record.id) || !image) {
        return [];
      }

      return [
        {
          id: record.id,
          title:
            typeof record.title === "string" && record.title.trim()
              ? record.title.trim()
              : "بنر اتکالاین",
          image,
          href: toBannerHref(record.link),
          order: typeof record.order === "number" ? record.order : index,
        },
      ];
    })
    .sort((first, second) => first.order - second.order)
    .map(({ order: _order, ...banner }) => banner);
}

export async function getHomeBanners(): Promise<HomeBanner[]> {
  const url = new URL("/api/Slides", API_BASE_URL);
  url.searchParams.set("PlatformType", "1");
  url.searchParams.set("Count", "5");

  const response = await fetch(url, {
    headers: await getServerApiHeaders(),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Home banners request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as HomeBannersResponse;
  if (!payload.isSuccess) {
    throw new Error("Home banners response was unsuccessful");
  }

  return parseHomeBanners(payload.value);
}
