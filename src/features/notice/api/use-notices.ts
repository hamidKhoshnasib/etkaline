"use client";

import { useApiQuery } from "@/hooks/use-api-query";

export interface Notice {
  id: number;
  title: string;
  text: string;
  showStartDateFa: string;
}

interface NoticesResponse {
  value?: unknown;
  isSuccess?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

function isVisibleNow(notice: Record<string, unknown>, now: number) {
  if (notice.isEnabled !== true) {
    return false;
  }

  const showStartDate = Date.parse(getText(notice.showStartDate));
  const showEndDate = Date.parse(getText(notice.showEndDate));
  return (
    (Number.isNaN(showStartDate) || showStartDate <= now) &&
    (Number.isNaN(showEndDate) || showEndDate >= now)
  );
}

function parseNotices(response: NoticesResponse): Notice[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    return [];
  }

  const now = Date.now();
  return response.value.flatMap((value) => {
    if (!isRecord(value) || !isInteger(value.id) || !isVisibleNow(value, now)) {
      return [];
    }

    const title = getText(value.title);
    const text = getText(value.text);
    if (!title && !text) {
      return [];
    }

    return [
      {
        id: value.id,
        title: title || "اطلاعیه",
        text,
        showStartDateFa: getText(value.showStartDateFa),
      },
    ];
  });
}

export function useNotices(enabled: boolean) {
  return useApiQuery<NoticesResponse, Notice[]>({
    url: "/api/Notice",
    queryKey: ["notices"],
    select: parseNotices,
    enabled,
    staleTime: 60_000,
    retry: false,
  });
}
