"use client";

import { type QueryKey, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";

import { axiosClient, type ApiError } from "@/lib/axios-client";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH";

export type UseApiQueryOptions<TRaw, TData = TRaw> = {
  url: string;
  queryKey: QueryKey;
  method?: HttpMethod;
  body?: unknown;
  select?: (raw: TRaw) => TData;
  axiosConfig?: AxiosRequestConfig;
} & Omit<UseQueryOptions<TRaw, ApiError, TData>, "queryKey" | "queryFn" | "select">;

export function useApiQuery<TRaw, TData = TRaw>({
  url,
  queryKey,
  method = "GET",
  body,
  select,
  axiosConfig,
  ...queryOptions
}: UseApiQueryOptions<TRaw, TData>) {
  return useQuery<TRaw, ApiError, TData>({
    queryKey,
    queryFn: async ({ signal }) => {
      const { data } = await axiosClient.request<TRaw>({
        url,
        method,
        data: body,
        signal,
        ...axiosConfig,
      });
      return data;
    },
    select,
    ...queryOptions,
  });
}
