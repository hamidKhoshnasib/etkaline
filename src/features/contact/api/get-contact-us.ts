import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

export interface ContactDetails {
  tel: string | null;
  email: string | null;
  address: string | null;
}

function getOptionalText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function parseContactDetails(value: unknown): ContactDetails | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const contactDetails = value as Record<string, unknown>;

  return {
    tel: getOptionalText(contactDetails.tel),
    email: getOptionalText(contactDetails.email),
    address: getOptionalText(contactDetails.address),
  };
}

export async function getContactDetails(): Promise<ContactDetails | null> {
  try {
    const response = await fetch(new URL("/api/ContactUs", getServerApiBaseUrl()), {
      headers: { Accept: "application/json", ...SITE_TYPE_HEADERS },
      next: { revalidate: 300, tags: ["contact-details"] },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { isSuccess?: unknown; value?: unknown };
    return payload.isSuccess === true ? parseContactDetails(payload.value) : null;
  } catch {
    return null;
  }
}
