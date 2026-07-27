import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

export interface ExtraPageLink {
  id: number;
  title: string;
}

export interface ExtraPages {
  headerItems: ExtraPageLink[];
  footerItems: ExtraPageLink[];
}

function parseItems(value: unknown): ExtraPageLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const { id, title } = item as Record<string, unknown>;
    if (
      typeof id !== "number" ||
      !Number.isInteger(id) ||
      typeof title !== "string" ||
      !title.trim()
    ) {
      return [];
    }

    return [{ id, title: title.trim() }];
  });
}

export async function getExtraPages(): Promise<ExtraPages> {
  try {
    const response = await fetch(new URL("/api/ExtraPages", getServerApiBaseUrl()), {
      headers: { Accept: "application/json", ...SITE_TYPE_HEADERS },
      next: { revalidate: 300, tags: ["extra-pages"] },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return { headerItems: [], footerItems: [] };
    }

    const payload = (await response.json()) as { isSuccess?: unknown; value?: unknown };
    if (payload.isSuccess !== true || !payload.value || typeof payload.value !== "object") {
      return { headerItems: [], footerItems: [] };
    }

    const value = payload.value as Record<string, unknown>;
    return {
      headerItems: parseItems(value.headerItems),
      footerItems: parseItems(value.footerItems),
    };
  } catch {
    return { headerItems: [], footerItems: [] };
  }
}
