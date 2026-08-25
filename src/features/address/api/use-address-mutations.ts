"use client";

import { useApiMutation } from "@/hooks/use-api-mutation";

import type { AddressPayload, ApiResult } from "./use-addresses";

export type CreateAddressResponse = ApiResult<unknown>;
export type UpdateAddressResponse = ApiResult<never>;
export type SetDefaultAddressResponse = ApiResult<unknown>;
export type DeleteAddressResponse = ApiResult<never>;

export interface UpdateAddressPayload extends AddressPayload {
  id: number;
}

export function useCreateAddress() {
  return useApiMutation<AddressPayload, CreateAddressResponse>({
    url: "/api/Addresses",
    method: "POST",
  });
}

export function useUpdateAddress() {
  return useApiMutation<UpdateAddressPayload, UpdateAddressResponse>({
    url: "/api/Addresses",
    method: "PUT",
  });
}

export function useSetDefaultAddress() {
  return useApiMutation<{ addressId: number }, SetDefaultAddressResponse>({
    url: "/api/Addresses/SetAsDefault",
    method: "POST",
  });
}

export function useDeleteAddress() {
  return useApiMutation<{ id: number }, DeleteAddressResponse>({
    url: ({ id }) => `/api/Addresses/${id}`,
    method: "DELETE",
  });
}
