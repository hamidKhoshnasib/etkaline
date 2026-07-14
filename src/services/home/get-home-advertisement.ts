import "server-only";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

export interface HomeAdvertisement {
  text: string;
  link: string;
  targetType: number;
  targetTypeFa: string;
  targetId: number;
  buttonText: string;
  backgroundColor: string;
  textColor: string;
  id: number;
}

interface HomeAdvertisementResponse {
  value?: unknown;
  isSuccess?: boolean;
}

function isHomeAdvertisement(value: unknown): value is HomeAdvertisement {
  if (!value || typeof value !== "object") {
    return false;
  }

  const advertisement = value as Record<string, unknown>;
  return (
    typeof advertisement.text === "string" &&
    advertisement.text.trim().length > 0 &&
    typeof advertisement.link === "string" &&
    typeof advertisement.targetType === "number" &&
    typeof advertisement.targetTypeFa === "string" &&
    typeof advertisement.targetId === "number" &&
    typeof advertisement.buttonText === "string" &&
    typeof advertisement.backgroundColor === "string" &&
    typeof advertisement.textColor === "string" &&
    typeof advertisement.id === "number"
  );
}

export async function getHomeAdvertisement(): Promise<HomeAdvertisement | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Advertisements`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300, tags: ["home-advertisement"] },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      throw new Error(`Home advertisement request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as HomeAdvertisementResponse;
    return payload.isSuccess && isHomeAdvertisement(payload.value) ? payload.value : null;
  } catch {
    return null;
  }
}
