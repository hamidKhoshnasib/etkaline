"use client";

import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

import { API_DEFAULT_HEADERS, API_TIMEOUT_MS, getClientApiBaseUrl } from "@/lib/api-config";

export const axiosClient = axios.create({
  baseURL: getClientApiBaseUrl(),
  headers: API_DEFAULT_HEADERS,
  timeout: API_TIMEOUT_MS,
});

axiosClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.error === "RefreshTokenError") {
    await signOut({ redirect: false });
    window.dispatchEvent(new Event("etkala:open-auth"));
    return config;
  }

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      void signOut({ redirect: false });
      window.dispatchEvent(new Event("etkala:open-auth"));
    }
    return Promise.reject(error);
  },
);

export type ApiError = AxiosError<{ message: string }>;

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string })?.message ?? error.message;
  }
  return "خطای ناشناخته‌ای رخ داد";
}

export type RequestConfig = AxiosRequestConfig;
