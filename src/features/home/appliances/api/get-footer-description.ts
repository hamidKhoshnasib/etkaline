import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

interface FooterDescriptionResponse {
  value?: unknown;
  isSuccess?: boolean;
}

export async function getFooterDescription(): Promise<string | null> {
  const response = await fetch(new URL("/api/Home/GetFooterDescription", getServerApiBaseUrl()), {
    headers: { Accept: "application/json", ...SITE_TYPE_HEADERS },
    next: { revalidate: 300, tags: ["footer-description"] },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Footer description request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as FooterDescriptionResponse;
  if (!payload.isSuccess) {
    throw new Error("Footer description response was unsuccessful");
  }

  return typeof payload.value === "string" && payload.value.trim() ? payload.value : null;
}
