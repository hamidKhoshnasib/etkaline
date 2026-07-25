"use client";

import { useApiQuery } from "@/hooks/use-api-query";

export interface Province {
  id: number;
  title: string;
}

interface ProvincesResponse {
  value?: unknown;
  isSuccess?: unknown;
}

function parseProvinces(response: ProvincesResponse): Province[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    return [];
  }

  return response.value.flatMap((value) => {
    if (!value || typeof value !== "object") {
      return [];
    }

    const province = value as Record<string, unknown>;
    const title = typeof province.title === "string" ? province.title.trim() : "";

    if (typeof province.id !== "number" || !Number.isInteger(province.id) || !title) {
      return [];
    }

    return [{ id: province.id, title }];
  });
}

export function useProvinces() {
  return useApiQuery<ProvincesResponse, Province[]>({
    url: "/api/Provinces",
    queryKey: ["address", "provinces"],
    select: parseProvinces,
    staleTime: 300_000,
    retry: 1,
  });
}
