"use client";

import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = "/auth/login";
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
