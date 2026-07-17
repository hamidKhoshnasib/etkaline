import { axiosClient } from "@/lib/axios-client";

export const HOME_ADVERTISEMENT_QUERY_KEY = ["home-advertisement"] as const;

export interface HomeAdvertisement {
  text: string;
  link: string;
  targetType: number;
  targetTypeFa: string;
  targetId: number | null;
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
    (advertisement.targetId === null || typeof advertisement.targetId === "number") &&
    typeof advertisement.buttonText === "string" &&
    typeof advertisement.backgroundColor === "string" &&
    typeof advertisement.textColor === "string" &&
    typeof advertisement.id === "number"
  );
}

export async function getHomeAdvertisement(): Promise<HomeAdvertisement | null> {
  const { data: payload } = await axiosClient.get<HomeAdvertisementResponse>("/api/Advertisements");
  return payload.isSuccess && isHomeAdvertisement(payload.value) ? payload.value : null;
}
