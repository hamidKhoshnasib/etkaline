export const API_TIMEOUT_MS = 15_000;

export const API_DEFAULT_HEADERS = {
  "Content-Type": "application/json",
} as const;

function getHttpBaseUrl(value: string | undefined, variableName: string) {
  const normalizedValue = value?.trim();
  if (!normalizedValue) {
    throw new Error(`${variableName} must be defined.`);
  }

  let url: URL;
  try {
    url = new URL(normalizedValue);
  } catch {
    throw new Error(`${variableName} must be a valid URL.`);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`${variableName} must use HTTP or HTTPS.`);
  }

  url.hash = "";
  url.search = "";
  return url.toString().replace(/\/$/, "");
}

export function getClientApiBaseUrl() {
  return getHttpBaseUrl(process.env.NEXT_PUBLIC_API_URL, "NEXT_PUBLIC_API_URL");
}

export function getServerApiBaseUrl() {
  return getHttpBaseUrl(
    process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL,
    "ETKALA_API_URL or NEXT_PUBLIC_API_URL",
  );
}

export function getClientMapBaseUrl() {
  return getHttpBaseUrl(process.env.NEXT_PUBLIC_MAP_BASE_URL, "NEXT_PUBLIC_MAP_BASE_URL");
}
