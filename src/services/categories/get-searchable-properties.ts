import { axiosClient } from "@/lib/axios-client";

export interface SearchablePropertyValue {
  id: number;
  title: string;
  description: string | null;
}

export interface SearchableProperty {
  propertyId: number;
  propertyTitle: string;
  propertyType: number;
  isColor: boolean;
  values: SearchablePropertyValue[];
  order: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function numberValue(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) ? value : null;
}

function stringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function parseValue(value: unknown): SearchablePropertyValue | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = numberValue(value.id);
  const title = stringValue(value.title);
  if (id === null || !title) {
    return null;
  }

  return {
    id,
    title,
    description: stringValue(value.description),
  };
}

function parseProperty(value: unknown): SearchableProperty | null {
  if (!isRecord(value)) {
    return null;
  }

  const propertyId = numberValue(value.propertyId);
  const propertyTitle = stringValue(value.propertyTitle);
  if (propertyId === null || !propertyTitle || !Array.isArray(value.values)) {
    return null;
  }

  return {
    propertyId,
    propertyTitle,
    propertyType: numberValue(value.propertyType) ?? 0,
    isColor: value.isColor === true,
    values: value.values.flatMap((item) => {
      const parsed = parseValue(item);
      return parsed ? [parsed] : [];
    }),
    order: numberValue(value.order) ?? 0,
  };
}

export async function getSearchableCategoryProperties(
  categoryId: number,
  signal?: AbortSignal,
): Promise<SearchableProperty[]> {
  const { data } = await axiosClient.get<unknown>(
    `/api/Categories/SearchableProperties/${categoryId}`,
    { signal },
  );

  if (!isRecord(data) || data.isSuccess !== true || !Array.isArray(data.value)) {
    throw new Error("Invalid category filter response");
  }

  return data.value
    .flatMap((item) => {
      const property = parseProperty(item);
      return property ? [property] : [];
    })
    .sort((first, second) => first.order - second.order);
}

export function getSearchableCategoryPropertiesQueryKey(categoryId: number) {
  return ["categories", categoryId, "searchable-properties"] as const;
}
