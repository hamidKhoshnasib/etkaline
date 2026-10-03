"use client";

import { useSession } from "next-auth/react";

import { useApiQuery } from "@/hooks/use-api-query";

interface NearStore {
  id: string;
  title: string;
}

interface NearStoresResponse {
  value?: unknown;
  isSuccess?: unknown;
}

function parseNearStores(response: NearStoresResponse): NearStore[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    return [];
  }

  return response.value.flatMap((value) => {
    if (!value || typeof value !== "object") {
      return [];
    }

    const store = value as Record<string, unknown>;
    if (
      typeof store.id !== "number" ||
      !Number.isSafeInteger(store.id) ||
      typeof store.title !== "string" ||
      !store.title.trim()
    ) {
      return [];
    }

    return [{ id: String(store.id), title: store.title.trim() }];
  });
}

export function useNearStores() {
  const { data: session, status } = useSession();

  return useApiQuery<NearStoresResponse, NearStore[]>({
    url: "/api/Stores/GetNearStores",
    queryKey: ["store", "near", session?.user.id],
    select: parseNearStores,
    enabled: status === "authenticated",
    staleTime: 0,
    retry: false,
  });
}
