"use client";

import { useApiQuery } from "@/hooks/use-api-query";
import { createFeatureQueryKey } from "@/lib/query-cache/create-feature-query-key";

const GET_ADVERTISEMENT = "/api/Advertisements";
const homeQueryKey = createFeatureQueryKey("home", "appliance");

export interface HomeAdvertisement {
  text: string;
  link: string | null;
  targetType: number;
  targetTypeFa: string;
  targetId: number | null;
  buttonText: string;
  backgroundColor: string;
  textColor: string;
  id: number;
}

function isAdvertisement(value: unknown): value is HomeAdvertisement {
  if (!value || typeof value !== "object") {
    return false;
  }
  const advertisement = value as Record<string, unknown>;
  return (
    typeof advertisement.text === "string" &&
    advertisement.text.trim().length > 0 &&
    (advertisement.link === null || typeof advertisement.link === "string") &&
    typeof advertisement.targetType === "number" &&
    typeof advertisement.targetTypeFa === "string" &&
    (advertisement.targetId === null || typeof advertisement.targetId === "number") &&
    typeof advertisement.buttonText === "string" &&
    typeof advertisement.backgroundColor === "string" &&
    typeof advertisement.textColor === "string" &&
    typeof advertisement.id === "number"
  );
}

function parseAdvertisement(raw: unknown): HomeAdvertisement | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const response = raw as Record<string, unknown>;
  return response.isSuccess === true && isAdvertisement(response.value) ? response.value : null;
}

export function useHomeAdvertisement(enabled: boolean) {
  return useApiQuery<unknown, HomeAdvertisement | null>({
    url: GET_ADVERTISEMENT,
    queryKey: homeQueryKey("advertisement"),
    select: parseAdvertisement,
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
