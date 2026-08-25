const DEFAULT_API_URL = "https://test12.etkala.ir";

export const API_TIMEOUT_MS = 15_000;

export const API_DEFAULT_HEADERS = {
  "Content-Type": "application/json",
} as const;

export function getClientApiBaseUrl() {
  return "/api/backend";
}

export function getServerApiBaseUrl() {
  return (
    process.env.ETKALA_API_URL ??
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    DEFAULT_API_URL
  );
}
