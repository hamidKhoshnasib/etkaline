"use client";

import { useApiMutation } from "@/hooks/use-api-mutation";
import type { AuthToken, EtkalaUser } from "@/types/auth";

interface StoreSessionValue {
  user: EtkalaUser;
  accessToken: AuthToken;
}

export interface SetDefaultStoreResponse {
  value?: StoreSessionValue;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

export function useSetDefaultStore() {
  return useApiMutation<{ storeId: number }, SetDefaultStoreResponse>({
    url: ({ storeId }) => `/api/Stores/SetDefault/${storeId}`,
    method: "GET",
  });
}
