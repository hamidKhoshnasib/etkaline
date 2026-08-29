import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";

export interface SocialNetwork {
  id: number;
  title: string;
  link: string;
  picUrl: string;
  order: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

function getText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getSafeUrl(value: unknown, baseUrl?: string): string | null {
  const url = getText(value);

  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url, baseUrl);
    return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:"
      ? parsedUrl.toString()
      : null;
  } catch {
    return null;
  }
}

function getSocialLink(value: unknown): string | null {
  const link = getText(value);

  if (!link) {
    return null;
  }

  const normalizedLink = link.replace(/[\u0000-\u001F\u007F\s]/g, "").toLowerCase();

  return /^(?:javascript|vbscript|data):/.test(normalizedLink) ? null : link;
}

function parseSocialNetwork(value: unknown): SocialNetwork | null {
  if (!isRecord(value) || value.isEnabled === false || !isInteger(value.id)) {
    return null;
  }

  const title = getText(value.title);
  const link = getSocialLink(value.link);
  const picUrl = getSafeUrl(value.picUrl, getServerApiBaseUrl());

  if (!title || !link || !picUrl) {
    return null;
  }

  return {
    id: value.id,
    title,
    link,
    picUrl,
    order: typeof value.order === "number" && Number.isFinite(value.order) ? value.order : 0,
  };
}

export async function getSocialNetworks(siteType: SiteType): Promise<SocialNetwork[]> {
  const response = await fetchWithTimeout(new URL("/api/SocialNetworks", getServerApiBaseUrl()), {
    headers: { Accept: "application/json", ...getSiteTypeHeaders(siteType) },
    next: { revalidate: 300, tags: [`social-networks-${siteType}`] },
  });

  if (!response.ok) {
    throw new Error(`Social networks request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { isSuccess?: unknown; value?: unknown };

  if (payload.isSuccess !== true || !Array.isArray(payload.value)) {
    throw new Error("Social networks response was unsuccessful");
  }

  return payload.value
    .map(parseSocialNetwork)
    .filter((socialNetwork): socialNetwork is SocialNetwork => socialNetwork !== null)
    .sort((first, second) => first.order - second.order || first.id - second.id);
}
