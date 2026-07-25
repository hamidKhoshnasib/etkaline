"use client";

import { useApiQuery } from "@/hooks/use-api-query";
import type { AuthToken, EtkalaUser } from "@/types/auth";

export interface Address {
  id: string;
  title: string;
  address: string;
  longitude: string;
  latitude: string;
  plaque: string;
  unit: string;
  postalCode: string | null;
  hasOtherReceiver: boolean;
  receiverFirstName: string;
  receiverLastName: string;
  recipient: string | null;
  phone: string | null;
  isDefault: boolean;
  cityId: number | null;
}

export interface AddressPayload {
  title: string;
  fullAddress: string;
  longitude: string;
  latitude: string;
  plaque: string;
  unit: string;
  postalCode: string;
  hasOtherReceiver: boolean;
  receiverFirstName: string;
  receiverLastName: string;
  receiverPhone: string;
  isDefault: boolean;
  cityId: number;
}

export interface AddressAuthValue {
  user: EtkalaUser;
  accessToken: AuthToken;
}

export interface ApiResult<T> {
  value?: T;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

interface AddressesResponse {
  value?: unknown;
  isSuccess?: unknown;
}

function getText(record: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function getId(record: Record<string, unknown>): string | null {
  for (const key of ["id", "addressId"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return null;
}

function getNumber(record: Record<string, unknown>, keys: string[]): number | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isInteger(value)) {
      return value;
    }
  }

  return null;
}

function parseAddresses(response: AddressesResponse): Address[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    return [];
  }

  return response.value.flatMap((value) => {
    if (!value || typeof value !== "object") {
      return [];
    }

    const address = value as Record<string, unknown>;
    const id = getId(address);
    const fullAddress = getText(address, ["address", "fullAddress", "description"]);
    const receiverName = [
      getText(address, ["receiverFirstName"]),
      getText(address, ["receiverLastName"]),
    ]
      .filter(Boolean)
      .join(" ");

    if (!id || !fullAddress) {
      return [];
    }

    return [
      {
        id,
        title: getText(address, ["title", "addressTitle"]) ?? "آدرس",
        address: fullAddress,
        longitude: getText(address, ["longitude"]) ?? "",
        latitude: getText(address, ["latitude"]) ?? "",
        plaque: getText(address, ["plaque"]) ?? "",
        unit: getText(address, ["unit"]) ?? "",
        postalCode: getText(address, ["postalCode", "postCode"]),
        hasOtherReceiver: address.hasOtherReceiver === true,
        receiverFirstName: getText(address, ["receiverFirstName"]) ?? "",
        receiverLastName: getText(address, ["receiverLastName"]) ?? "",
        recipient:
          getText(address, ["recipient", "recipientName", "fullName", "name"]) ??
          (receiverName || null),
        phone: getText(address, ["phone", "mobile", "mobileNumber", "receiverPhone"]),
        isDefault: address.isDefault === true,
        cityId: getNumber(address, ["cityId"]),
      },
    ];
  });
}

export function useAddresses() {
  return useApiQuery<AddressesResponse, Address[]>({
    url: "/api/Addresses",
    queryKey: ["address", "list"],
    select: parseAddresses,
    staleTime: 60_000,
    retry: false,
  });
}
