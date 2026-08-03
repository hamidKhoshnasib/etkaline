"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

export interface LoginLog {
  id: number;
  username: string;
  userFullName: string;
  userType: string;
  authLevel: string;
  ip: string;
  isSuccess: boolean;
  description: string;
  createDate: string;
  createDateFa: string;
}

export interface LoginLogsPage {
  page: number;
  pageLength: number;
  pageCount: number;
  totalCount: number;
  logs: LoginLog[];
}

interface LoginLogsResponse {
  value?: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function nonNegativeInteger(value: unknown) {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : 0;
}

function responseMessage(response: LoginLogsResponse) {
  const firstError = Array.isArray(response.errors)
    ? response.errors.find(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : undefined;
  return text(response.message) || firstError || "دریافت تاریخچه ورود و خروج ممکن نشد.";
}

function requestErrorMessage(error: unknown) {
  if (axios.isAxiosError<LoginLogsResponse>(error) && error.response?.data) {
    return responseMessage(error.response.data);
  }

  return getErrorMessage(error);
}

function parseLoginLogs(response: LoginLogsResponse): LoginLogsPage {
  if (response.isSuccess !== true || !isRecord(response.value)) {
    throw new Error(responseMessage(response));
  }

  const value = response.value;
  return {
    page: nonNegativeInteger(value.page),
    pageLength: nonNegativeInteger(value.pageLength),
    pageCount: nonNegativeInteger(value.pageCount),
    totalCount: nonNegativeInteger(value.totalCount),
    logs: Array.isArray(value.logs)
      ? value.logs.flatMap((raw): LoginLog[] => {
          if (!isRecord(raw)) {
            return [];
          }
          return [
            {
              id: nonNegativeInteger(raw.id),
              username: text(raw.username),
              userFullName: text(raw.userFullName),
              userType: text(raw.userType),
              authLevel: text(raw.authLevel),
              ip: text(raw.ip),
              isSuccess: raw.isSuccess === true,
              description: text(raw.description),
              createDate: text(raw.createDate),
              createDateFa: text(raw.createDateFa),
            },
          ];
        })
      : [],
  };
}

export function useLoginLogs(page: number, isSuccess: boolean, enabled: boolean) {
  const { siteType } = useStorefront();
  const { status } = useSession();

  return useQuery<LoginLogsPage, Error>({
    queryKey: [siteType, "profile", "login-logs", { isSuccess, page }],
    enabled: enabled && status === "authenticated",
    queryFn: async () => {
      try {
        const { data } = await axiosClient.get<LoginLogsResponse>("/api/Profile/GetLoginLogs", {
          params: { Page: page, PageLength: 5, IsSuccess: isSuccess },
          headers: getSiteTypeHeaders(siteType),
        });
        return parseLoginLogs(data);
      } catch (error) {
        throw new Error(requestErrorMessage(error));
      }
    },
    retry: false,
  });
}
