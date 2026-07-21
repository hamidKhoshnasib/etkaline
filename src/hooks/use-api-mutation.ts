"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";

import { axiosClient, type ApiError } from "@/lib/axios-client";

type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE";

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
  return useMutation<TData, ApiError, TBody>({
    mutationFn: async (body) => {
      const { data } = await axiosClient.request<TData>({
        url: typeof url === "function" ? url(body) : url,
        method,
        data: body,
        ...axiosConfig,
      });
      return data;
    },
    ...mutationOptions,
  });
}
