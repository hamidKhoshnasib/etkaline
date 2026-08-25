"use client";

import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { signOut } from "next-auth/react";

import { API_DEFAULT_HEADERS, API_TIMEOUT_MS, getClientApiBaseUrl } from "@/lib/api-config";

export const axiosClient = axios.create({
  baseURL: getClientApiBaseUrl(),
  headers: API_DEFAULT_HEADERS,
  timeout: API_TIMEOUT_MS,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      void signOut({ redirect: false });
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
