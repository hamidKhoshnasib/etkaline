import "server-only";

import { API_TIMEOUT_MS } from "@/lib/api-config";

const RETRYABLE_STATUS_CODES = new Set([408, 429, 502, 503, 504]);

function canRetry(method: string | undefined) {
  return !method || method.toUpperCase() === "GET" || method.toUpperCase() === "HEAD";
}

async function fetchOnce(
  input: RequestInfo | URL,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort(new Error(`API request timed out after ${timeoutMs}ms`));
  }, timeoutMs);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = API_TIMEOUT_MS,
): Promise<Response> {
  const attempts = canRetry(init.method) ? 2 : 1;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetchOnce(input, init, timeoutMs);
      if (attempt === attempts || !RETRYABLE_STATUS_CODES.has(response.status)) {
        return response;
      }

      await response.body?.cancel();
    } catch (error) {
      if (attempt === attempts) {
        throw error;
      }
    }
  }

  throw new Error("API request failed without a response");
}
