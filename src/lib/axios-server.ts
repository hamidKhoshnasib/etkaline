import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { cookies, headers } from "next/headers";

export const axiosServer = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

axiosServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    const headerStore = await headers();
    const auth = headerStore.get("authorization");
    if (auth) {
      config.headers.Authorization = auth;
    }
  }

  return config;
});

axiosServer.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error),
);

export type ApiError = AxiosError<{ message: string }>;

export type RequestConfig = AxiosRequestConfig;
