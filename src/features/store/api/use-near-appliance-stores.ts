"use client";

import { useApiQuery } from "@/hooks/use-api-query";

export interface NearApplianceStore {
  id: string;
  title: string;
  address: string;
  tel: string | null;
  mobile: string | null;
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

function parseNearApplianceStores(response: NearApplianceStoresResponse): NearApplianceStore[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    return [];
  }

  return response.value.flatMap((value) => {
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

    return [{ id, title, address, tel: getText(store, "tel"), mobile: getText(store, "mobile") }];
  });
}

export function useNearApplianceStores() {
  return useApiQuery<NearApplianceStoresResponse, NearApplianceStore[]>({
    url: "/api/Stores/GetNearApplianceStores",
    queryKey: ["store", "near-appliance"],
    select: parseNearApplianceStores,
    staleTime: 60_000,
    retry: false,
  });
}
