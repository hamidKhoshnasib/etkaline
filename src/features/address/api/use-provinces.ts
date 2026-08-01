"use client";

import { useApiQuery } from "@/hooks/use-api-query";

export interface Province {
  id: number;
  latitude?: number;
  longitude?: number;
  title: string;
}

interface ProvincesResponse {
  value?: unknown;
  isSuccess?: unknown;
}

interface MapSearchResult {
  lat?: unknown;
  lon?: unknown;
}

interface ReverseGeocodeResponse {
  display_name?: unknown;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

const MAP_SEARCH_URL = "https://map.etkala.ir/search";
const MAP_REVERSE_URL = `${MAP_SEARCH_URL}/reverse`;

function parseProvinces(response: ProvincesResponse): Province[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    return [];
  }

  return response.value.flatMap((value) => {
    if (!value || typeof value !== "object") {
      return [];
    }

    const province = value as Record<string, unknown>;
    const title = typeof province.title === "string" ? province.title.trim() : "";
    const latitude = getCoordinate(province.latitude, -90, 90);
    const longitude = getCoordinate(province.longitude, -180, 180);

    if (typeof province.id !== "number" || !Number.isInteger(province.id) || !title) {
      return [];
    }

    return [{ id: province.id, latitude, longitude, title }];
  });
}

function getCoordinate(value: unknown, minimum: number, maximum: number) {
  const coordinate = typeof value === "string" ? Number(value) : value;
  return typeof coordinate === "number" &&
    Number.isFinite(coordinate) &&
    coordinate >= minimum &&
    coordinate <= maximum
    ? coordinate
    : undefined;
}

export function useProvinces() {
  return useApiQuery<ProvincesResponse, Province[]>({
    url: "/api/Provinces",
    queryKey: ["address", "provinces"],
    select: parseProvinces,
    staleTime: 300_000,
    retry: 1,
  });
}

export async function geocodeLocation(
  query: string,
  signal?: AbortSignal,
): Promise<LocationCoordinates | null> {
  const url = new URL(MAP_SEARCH_URL);
  url.searchParams.set("q", `${query}، ایران`);
  url.searchParams.set("format", "json");

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Map search failed");
  }

  const results: unknown = await response.json();
  if (!Array.isArray(results)) {
    return null;
  }

  for (const result of results) {
    if (!result || typeof result !== "object") {
      continue;
    }

    const { lat, lon } = result as MapSearchResult;
    const latitude = getCoordinate(lat, -90, 90);
    const longitude = getCoordinate(lon, -180, 180);
    if (latitude !== undefined && longitude !== undefined) {
      return { latitude, longitude };
    }
  }

  return null;
}

export async function reverseGeocodeLocation(
  coordinates: LocationCoordinates,
  signal?: AbortSignal,
): Promise<string | null> {
  const url = new URL(MAP_REVERSE_URL);
  url.searchParams.set("lat", String(coordinates.latitude));
  url.searchParams.set("lon", String(coordinates.longitude));
  url.searchParams.set("format", "json");
  url.searchParams.set("accept-language", "fa");

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Reverse map search failed");
  }

  const result: unknown = await response.json();
  if (!result || typeof result !== "object") {
    return null;
  }

  const { display_name: displayName } = result as ReverseGeocodeResponse;
  return typeof displayName === "string" && displayName.trim() ? displayName.trim() : null;
}
