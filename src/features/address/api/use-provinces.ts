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
  address?: unknown;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

type ReverseGeocodeAddress = Record<string, unknown>;

const MAP_SEARCH_URL = "https://map.etkala.ir/search";
const MAP_REVERSE_URL = `${MAP_SEARCH_URL}/reverse`;

function getAddressPart(address: ReverseGeocodeAddress, ...keys: string[]) {
  for (const key of keys) {
    const value = address[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

function addAddressPrefix(value: string | undefined, prefix: string, pattern: RegExp) {
  if (!value) {
    return undefined;
  }

  return pattern.test(value) ? value : `${prefix} ${value}`;
}

function formatReverseGeocodeAddress(address: ReverseGeocodeAddress) {
  const administrativeArea = getAddressPart(address, "suburb", "city_district");
  const locality = administrativeArea ?? getAddressPart(address, "city", "town", "village");
  const neighbourhood = addAddressPrefix(
    getAddressPart(address, "neighbourhood", "quarter"),
    "محله",
    /^(?:محله|کوی)\s/,
  );
  const road = addAddressPrefix(
    getAddressPart(address, "road", "pedestrian"),
    "خ",
    /^(?:خ|خیابان)\s/,
  );
  const building = getAddressPart(
    address,
    "building",
    "tourism",
    "amenity",
    "shop",
    "office",
    "historic",
    "leisure",
    "man_made",
  );
  const parts = [
    getAddressPart(address, "province", "state"),
    getAddressPart(address, "county"),
    getAddressPart(address, "district"),
    locality,
    neighbourhood,
    road,
    building,
  ].filter((part): part is string => Boolean(part));

  return [...new Set(parts)].join("، ");
}

function formatDisplayName(displayName: string) {
  return displayName
    .split(",")
    .map((part) => part.replace(/^[\s،,؛;:\-–—]+|[\s،,؛;:\-–—]+$/g, "").trim())
    .filter((part) => part && part !== "ایران" && !/^[\d۰-۹٠-٩\s-]+$/.test(part))
    .reverse()
    .join("، ");
}

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
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Reverse map search failed");
  }

  const result: unknown = await response.json();
  if (!result || typeof result !== "object") {
    return null;
  }

  const { display_name: displayName, address } = result as ReverseGeocodeResponse;
  if (typeof displayName !== "string" || !displayName.trim()) {
    return null;
  }

  if (address && typeof address === "object" && !Array.isArray(address)) {
    const formattedAddress = formatReverseGeocodeAddress(address as ReverseGeocodeAddress);
    if (formattedAddress) {
      return formattedAddress;
    }
  }

  return formatDisplayName(displayName);
}
