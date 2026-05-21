"use client";

import { useQuery, type UseQueryOptions, type QueryKey } from "@tanstack/react-query";
import { axiosClient, type ApiError } from "@/lib/axios-client";

interface UseFetchOptions<TData> extends Omit<
  UseQueryOptions<TData, ApiError>,
  "queryKey" | "queryFn"
> {
  params?: Record<string, unknown>;
}

export function useFetch<TData = unknown>(
  queryKey: QueryKey,
  url: string,
  options?: UseFetchOptions<TData>,
) {
  const { params, ...queryOptions } = options ?? {};

  return useQuery<TData, ApiError>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosClient.get<TData>(url, { params });
      return data;
    },
    ...queryOptions,
  });
}
