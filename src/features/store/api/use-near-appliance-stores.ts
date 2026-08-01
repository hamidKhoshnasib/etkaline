"use client";

import { useApiQuery } from "@/hooks/use-api-query";

export interface NearApplianceStore {
  id: string;
  title: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  supportDistance: number | null;
  tel: string | null;
  mobile: string | null;
  city: string | null;
  typeFa: string | null;
}

interface NearApplianceStoresResponse {
  value?: unknown;
  isSuccess?: unknown;
}

function getText(record: Record<string, unknown>, key: string): string | null {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getId(record: Record<string, unknown>): string | null {
  const value = record.id;
  if (typeof value === "number" && Number.isInteger(value)) {
    return String(value);
  }
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getNumber(record: Record<string, unknown>, key: string): number | null {
  const value = record[key];
  const number = typeof value === "string" ? Number(value) : value;
  return typeof number === "number" && Number.isFinite(number) ? number : null;
}

function parseNearApplianceStores(response: NearApplianceStoresResponse): NearApplianceStore[] {
  if (response.isSuccess !== true || !response.value || typeof response.value !== "object") {
    return [];
  }

  const page = response.value as Record<string, unknown>;
  if (!Array.isArray(page.items)) {
    return [];
  }

  return page.items.flatMap((value) => {
    if (!value || typeof value !== "object") {
      return [];
    }

    const store = value as Record<string, unknown>;
    const id = getId(store);
    const title = getText(store, "title");
    const address = getText(store, "address");

    if (!id || !title || !address) {
      return [];
    }

    return [
      {
        id,
        title,
        address,
        latitude: getNumber(store, "latitude"),
        longitude: getNumber(store, "longitude"),
        supportDistance: getNumber(store, "supportDistance"),
        tel: getText(store, "tel"),
        mobile: getText(store, "mobile"),
        city: getText(store, "city"),
        typeFa: getText(store, "typeFa"),
      },
    ];
  });
}

export function useNearApplianceStores() {
  return useApiQuery<NearApplianceStoresResponse, NearApplianceStore[]>({
    url: "/api/Stores/GetAll",
    method: "POST",
    body: null,
    queryKey: ["store", "all"],
    select: parseNearApplianceStores,
    staleTime: 60_000,
    retry: false,
  });
}
