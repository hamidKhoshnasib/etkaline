"use client";

import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir",
  headers: { "Content-Type": "application/json", ...SITE_TYPE_HEADERS },
  timeout: 15_000,
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
  if (error instanceof AxiosError) {
    return (error.response?.data as { message?: string })?.message ?? error.message;
  }
  return "خطای ناشناخته‌ای رخ داد";
}

export type RequestConfig = AxiosRequestConfig;
