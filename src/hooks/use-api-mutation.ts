"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";

import { axiosClient, type ApiError } from "@/lib/axios-client";
import { getSiteTypeHeaders } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type UseApiMutationOptions<TBody, TData> = {
  url: string | ((body: TBody) => string);
  method?: HttpMethod;
  axiosConfig?: AxiosRequestConfig;
} & Omit<UseMutationOptions<TData, ApiError, TBody>, "mutationFn">;

export function useApiMutation<TBody = void, TData = void>({
  url,
  method = "POST",
  axiosConfig,
  ...mutationOptions
}: UseApiMutationOptions<TBody, TData>) {
  const { siteType } = useStorefront();

  return useMutation<TData, ApiError, TBody>({
    mutationFn: async (body) => {
      const { data } = await axiosClient.request<TData>({
        url: typeof url === "function" ? url(body) : url,
        method,
        data: body,
        ...axiosConfig,
        headers: {
          ...getSiteTypeHeaders(siteType),
          ...axiosConfig?.headers,
        },
      });
      return data;
    },
    ...mutationOptions,
  });
}
