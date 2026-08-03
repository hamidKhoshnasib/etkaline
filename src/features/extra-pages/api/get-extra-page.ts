import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";

export interface ExtraPageFile {
  id: number;
  fileName: string;
  fileDescription: string | null;
  downloadUrl: string | null;
}

export interface ExtraPage {
  id: number;
  title: string;
  text: string;
  metaTitle: string | null;
  seoDescription: string | null;
  files: ExtraPageFile[];
}

function getText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getSafeUrl(value: unknown): string | null {
  const url = getText(value);
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url, getServerApiBaseUrl());
    return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:"
      ? parsedUrl.toString()
      : null;
  } catch {
    return null;
  }
}

function parseFiles(value: unknown): ExtraPageFile[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const { id, fileId, fileName, fileDescription, downloadUrl } = item as Record<string, unknown>;
    const resolvedId = typeof id === "number" && Number.isInteger(id) ? id : fileId;
    const title = getText(fileName);
    if (typeof resolvedId !== "number" || !Number.isInteger(resolvedId) || !title) {
      return [];
    }

    return [
      {
        id: resolvedId,
        fileName: title,
        fileDescription: getText(fileDescription),
        downloadUrl: getSafeUrl(downloadUrl),
      },
    ];
  });
}

export async function getExtraPage(id: number, siteType: SiteType): Promise<ExtraPage | null> {
  const response = await fetch(new URL(`/api/ExtraPages/${id}`, getServerApiBaseUrl()), {
    headers: { Accept: "application/json", ...getSiteTypeHeaders(siteType) },
    next: { revalidate: 300, tags: [`extra-page:${siteType}:${id}`] },
    signal: AbortSignal.timeout(15_000),
  });

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Extra page request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { isSuccess?: unknown; value?: unknown };
  if (payload.isSuccess !== true || !payload.value || typeof payload.value !== "object") {
    return null;
  }

  const value = payload.value as Record<string, unknown>;
  const pageId = value.id;
  const title = getText(value.title);
  if (pageId !== id || !title || value.isEnabled !== true) {
    return null;
  }

  return {
    id,
    title,
    text: typeof value.text === "string" ? value.text : "",
    metaTitle: getText(value.metaTitle),
    seoDescription: getText(value.seoDesc),
    files: parseFiles(value.files),
  };
}
