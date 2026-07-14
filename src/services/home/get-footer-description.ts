import "server-only";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

interface FooterDescriptionResponse {
  value?: unknown;
  isSuccess?: boolean;
}

export async function getFooterDescription(): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Home/GetFooterDescription`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300, tags: ["footer-description"] },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      throw new Error(`Footer description request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as FooterDescriptionResponse;
    return payload.isSuccess && typeof payload.value === "string" && payload.value.trim()
      ? payload.value
      : null;
  } catch {
    return null;
  }
}
