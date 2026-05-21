"use client";

import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { axiosClient, type ApiError } from "@/lib/axios-client";

type Method = "post" | "put" | "patch" | "delete";

interface UseMutateOptions<TData, TVariables> extends Omit<
  UseMutationOptions<TData, ApiError, TVariables>,
  "mutationFn"
> {
  invalidateKeys?: string[][];
  method?: Method;
}

export function useMutate<TData = unknown, TVariables = unknown>(
  url: string,
  options?: UseMutateOptions<TData, TVariables>,
) {
  const queryClient = useQueryClient();
  const { invalidateKeys, method = "post", ...mutationOptions } = options ?? {};

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables) => {
      const { data } =
        method === "delete"
          ? await axiosClient.delete<TData>(url)
          : await axiosClient[method]<TData>(url, variables);
      return data;
    },
    onSuccess: async (data, variables, context) => {
      if (invalidateKeys?.length) {
        await Promise.all(
          invalidateKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })),
        );
      }
      mutationOptions.onSuccess?.(data, variables, context, undefined as never);
    },
    ...mutationOptions,
  });
}
