import type { ApiResult } from "@/features/address/api/use-addresses";

export function getAddressResponseMessage(response: ApiResult<unknown>, fallback: string) {
  if (typeof response.message === "string" && response.message.trim()) {
    return response.message;
  }
  if (Array.isArray(response.errors) && typeof response.errors[0] === "string") {
    return response.errors[0];
  }

  return fallback;
}
