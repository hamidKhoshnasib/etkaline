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

function readOptionalText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function parseAdvertisementValue(value: unknown): HomeAdvertisement | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const advertisement = value as Record<string, unknown>;
  const text = readOptionalText(advertisement.text);

  if (!text || typeof advertisement.id !== "number" || !Number.isSafeInteger(advertisement.id)) {
    return null;
  }

  return {
    text,
    link: readOptionalText(advertisement.link),
    targetType:
      typeof advertisement.targetType === "number" && Number.isSafeInteger(advertisement.targetType)
        ? advertisement.targetType
        : 0,
    targetTypeFa: readOptionalText(advertisement.targetTypeFa) ?? "",
    targetId:
      typeof advertisement.targetId === "number" &&
      Number.isSafeInteger(advertisement.targetId) &&
      advertisement.targetId > 0
        ? advertisement.targetId
        : null,
    buttonText: readOptionalText(advertisement.buttonText) ?? "",
    backgroundColor: typeof advertisement.backgroundColor === "string" ? advertisement.backgroundColor : "",
    textColor: typeof advertisement.textColor === "string" ? advertisement.textColor : "",
    id: advertisement.id,
  };
}

function parseAdvertisement(raw: unknown): HomeAdvertisement | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const response = raw as Record<string, unknown>;
  return response.isSuccess === true ? parseAdvertisementValue(response.value) : null;
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
