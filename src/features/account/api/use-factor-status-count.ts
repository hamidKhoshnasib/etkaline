import { useApiQuery } from "@/hooks/use-api-query";

interface FactorStatusCountResponse {
  value?: unknown;
  isSuccess?: unknown;
}

export type FactorStatusCounts = Record<number, number>;

function parseFactorStatusCounts(response: FactorStatusCountResponse): FactorStatusCounts {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    return {};
  }

  const counts: FactorStatusCounts = {};
  for (const item of response.value) {
    if (typeof item !== "object" || item === null) {
      continue;
    }
    const { status, statusCount } = item as Record<string, unknown>;
    if (
      typeof status === "number" &&
      Number.isInteger(status) &&
      typeof statusCount === "number" &&
      Number.isSafeInteger(statusCount) &&
      statusCount >= 0
    ) {
      counts[status] = statusCount;
    }
  }
  return counts;
}

export function useFactorStatusCount() {
  return useApiQuery<FactorStatusCountResponse, FactorStatusCounts>({
    url: "/api/Factors/GetStatusCount",
    queryKey: ["factor-status-count"],
    select: parseFactorStatusCounts,
    staleTime: 60_000,
    retry: false,
  });
}
