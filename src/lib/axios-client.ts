"use client";

import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

import { API_DEFAULT_HEADERS, API_TIMEOUT_MS, getClientApiBaseUrl } from "@/lib/api-config";

const SESSION_CACHE_TTL_MS = 60_000;

export const CLIENT_SESSION_SYNC_EVENT = "etkala:session-synced";

interface ClientSessionSnapshot {
  accessToken?: string;
  error?: "RefreshTokenError";
}

let cachedSession: ClientSessionSnapshot | null = null;
let cachedAt = 0;
let sessionRequest: Promise<ClientSessionSnapshot | null> | null = null;

export function setClientSessionSnapshot(session: ClientSessionSnapshot | null) {
  cachedSession = session;
  cachedAt = Date.now();
}

async function getClientSessionSnapshot() {
  if (cachedAt && Date.now() - cachedAt < SESSION_CACHE_TTL_MS) {
    return cachedSession;
  }

  if (!sessionRequest) {
    sessionRequest = getSession()
      .then((session) => {
        const snapshot = session
          ? { accessToken: session.accessToken, error: session.error }
          : null;
        setClientSessionSnapshot(snapshot);
        return snapshot;
      })
      .finally(() => {
        sessionRequest = null;
      });
  }

  return sessionRequest;
}

export const axiosClient = axios.create({
  baseURL: getClientApiBaseUrl(),
  headers: API_DEFAULT_HEADERS,
  timeout: API_TIMEOUT_MS,
});

axiosClient.interceptors.request.use(async (config) => {
  const session = await getClientSessionSnapshot();
  if (session?.error === "RefreshTokenError") {
    setClientSessionSnapshot(null);
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
      setClientSessionSnapshot(null);
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
