"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode: string;
  email: string;
  superMarketStoreId: number;
  superMarketStoreTitle: string;
  applianceStoreId: number;
  applianceStoreTitle: string;
  isEnabled: boolean;
}

export interface UpdateProfileInput {
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  email: string;
}

interface ProfileResponse {
  value?: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

export const profileQueryKeys = {
  detail: (siteType: SiteType) => [siteType, "profile", "detail"] as const,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : 0;
}

function responseMessage(response: ProfileResponse): string {
  const errors = Array.isArray(response.errors)
    ? response.errors.filter(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : [];

  return stringValue(response.message) || errors[0] || "دریافت اطلاعات پروفایل ناموفق بود.";
}

export function parseProfileResponse(response: ProfileResponse): Profile {
  if (response.isSuccess !== true || !isRecord(response.value)) {
    throw new Error(responseMessage(response));
  }

  const value = response.value;

  return {
    id: numberValue(value.id),
    firstName: stringValue(value.firstName),
    lastName: stringValue(value.lastName),
    mobile: stringValue(value.mobile),
    nationalCode: stringValue(value.nationalCode),
    email: stringValue(value.email),
    superMarketStoreId: numberValue(value.superMarketStoreId),
    superMarketStoreTitle: stringValue(value.superMarketStoreTitle),
    applianceStoreId: numberValue(value.applianceStoreId),
    applianceStoreTitle: stringValue(value.applianceStoreTitle),
    isEnabled: value.isEnabled === true,
  };
}

async function getProfile(siteType: SiteType): Promise<Profile> {
  let data: ProfileResponse;

  try {
    ({ data } = await axiosClient.get<ProfileResponse>("/api/Profile", {
      headers: getSiteTypeHeaders(siteType),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parseProfileResponse(data);
}

async function updateProfile(input: UpdateProfileInput, siteType: SiteType): Promise<void> {
  let data: ProfileResponse;

  try {
    ({ data } = await axiosClient.put<ProfileResponse>("/api/Profile", input, {
      headers: getSiteTypeHeaders(siteType),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (data.isSuccess !== true) {
    throw new Error(responseMessage(data));
  }
}

export function useProfile() {
  const { siteType } = useStorefront();
  const { status } = useSession();

  const query = useQuery<Profile, Error>({
    queryKey: profileQueryKeys.detail(siteType),
    queryFn: () => getProfile(siteType),
    enabled: status === "authenticated",
    staleTime: 60_000,
  });

  return { ...query, sessionStatus: status };
}

export function useUpdateProfile() {
  const { siteType } = useStorefront();
  return useMutation<void, Error, UpdateProfileInput>({
    mutationFn: (input) => updateProfile(input, siteType),
    retry: false,
  });
}
