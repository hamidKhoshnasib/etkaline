"use client";

import { useQuery } from "@tanstack/react-query";

import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

export interface Faq {
  id: number;
  question: string;
  answer: string;
  order: number;
}

interface FaqResponse {
  value?: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

export const faqQueryKeys = {
  list: (siteType: SiteType) => [siteType, "faq", "list"] as const,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function plainTextValue(value: unknown) {
  const html = stringValue(value);
  if (!html) {
    return "";
  }

  const document = new DOMParser().parseFromString(html, "text/html");
  document.body.querySelectorAll("br").forEach((element) => element.replaceWith("\n"));
  document.body
    .querySelectorAll("p, li, div, h1, h2, h3, h4, h5, h6")
    .forEach((element) => element.append("\n"));

  return (document.body.textContent ?? "").replace(/\n\s*\n/g, "\n").trim();
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isSafeInteger(value) ? value : 0;
}

function responseMessage(response: FaqResponse) {
  const errors = Array.isArray(response.errors)
    ? response.errors.filter(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : [];

  return stringValue(response.message) || errors[0] || "دریافت سوالات متداول ناموفق بود.";
}

function parseFaqResponse(response: FaqResponse): Faq[] {
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    throw new Error(responseMessage(response));
  }

  return response.value
    .filter(isRecord)
    .filter((faq) => faq.isEnabled === true)
    .map((faq) => ({
      id: numberValue(faq.id),
      question: stringValue(faq.question),
      answer: plainTextValue(faq.answer),
      order: numberValue(faq.order),
    }))
    .filter((faq) => faq.id > 0 && faq.question)
    .sort((first, second) => first.order - second.order || first.id - second.id);
}

async function getFaqs(siteType: SiteType): Promise<Faq[]> {
  let response: FaqResponse;

  try {
    ({ data: response } = await axiosClient.get<FaqResponse>("/api/Faq", {
      headers: getSiteTypeHeaders(siteType),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return parseFaqResponse(response);
}

export function useFaqs() {
  const { siteType } = useStorefront();

  return useQuery<Faq[], Error>({
    queryKey: faqQueryKeys.list(siteType),
    queryFn: () => getFaqs(siteType),
    staleTime: 5 * 60_000,
  });
}
