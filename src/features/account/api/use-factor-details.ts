import { useApiQuery } from "@/hooks/use-api-query";
import { type MockOrder } from "@/features/account/model/mock-orders";

import { parseFactor } from "./use-factors";

interface FactorDetailsResponse {
  value?: unknown;
  isSuccess?: unknown;
}

function parseFactorDetails(response: FactorDetailsResponse): MockOrder | null {
  if (response.isSuccess !== true) {
    return null;
  }

  return parseFactor(response.value);
}

export function useFactorDetails(factorId: string) {
  const id = Number(factorId);
  const isValidId = Number.isSafeInteger(id) && id > 0;

  return useApiQuery<FactorDetailsResponse, MockOrder | null>({
    url: `/api/Factors/${id}`,
    queryKey: ["factor-details", id],
    select: parseFactorDetails,
    enabled: isValidId,
    staleTime: 60_000,
    retry: false,
  });
}
