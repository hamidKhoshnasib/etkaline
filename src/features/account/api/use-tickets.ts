"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { responseMessage } from "@/features/auth/model/auth";
import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";
import type { ApiResponse, CaptchaValue } from "@/types/auth";

export interface CreateTicketInput {
  title: string;
  text: string;
  captcha: string;
  cpCode: string;
}

export type TicketStatus = 0 | 1 | 2;

export interface SupportTicket {
  id: number;
  title: string;
  status: TicketStatus;
  statusFa: string;
  createDate: string;
  createDateFa: string;
}

export interface TicketAttachment {
  id: number;
  fileName: string;
  downloadUrl: string;
}

export interface TicketMessage {
  id: number;
  text: string;
  fromAdmin: boolean;
  createDate: string;
  createDateFa: string;
  files: TicketAttachment[];
}

export interface TicketDetails extends SupportTicket {
  messages: TicketMessage[];
}

export interface SendTicketMessageInput {
  ticketId: number;
  text: string;
  files: File[];
}

interface TicketsResponse {
  value?: unknown;
  isSuccess?: unknown;
  errors?: unknown;
  message?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function nonNegativeInteger(value: unknown) {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function getTicketStatus(value: unknown): TicketStatus | null {
  return value === 0 || value === 1 || value === 2 ? value : null;
}

function safeDownloadUrl(value: unknown) {
  const url = text(value);
  if (!url || (!url.startsWith("/") && !/^https?:\/\//i.test(url))) {
    return "";
  }
  return url;
}

function responseErrorMessage(response: TicketsResponse, fallback: string) {
  const firstError = Array.isArray(response.errors)
    ? response.errors.find(
        (error): error is string => typeof error === "string" && error.trim().length > 0,
      )
    : undefined;

  return text(response.message) || firstError || fallback;
}

function parseTickets(response: TicketsResponse): SupportTicket[] {
  if (response.isSuccess !== true || !isRecord(response.value)) {
    throw new Error(responseErrorMessage(response, "دریافت تیکت‌ها ممکن نشد."));
  }

  return Array.isArray(response.value.tickets)
    ? response.value.tickets.flatMap((raw): SupportTicket[] => {
        if (!isRecord(raw)) {
          return [];
        }

        const id = nonNegativeInteger(raw.id);
        const status = getTicketStatus(raw.status);
        const title = text(raw.title);
        if (id === null || status === null || !title) {
          return [];
        }

        return [
          {
            id,
            title,
            status,
            statusFa: text(raw.statusFa),
            createDate: text(raw.createDate),
            createDateFa: text(raw.createDateFa),
          },
        ];
      })
    : [];
}

function parseAttachments(value: unknown): TicketAttachment[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((raw): TicketAttachment[] => {
    if (!isRecord(raw)) {
      return [];
    }

    const id = nonNegativeInteger(raw.id) ?? nonNegativeInteger(raw.fileId);
    const downloadUrl = safeDownloadUrl(raw.downloadUrl) || safeDownloadUrl(raw.streamUrl);
    if (id === null || !downloadUrl) {
      return [];
    }

    return [
      {
        id,
        fileName: text(raw.fileName) || "دانلود فایل پیوست",
        downloadUrl,
      },
    ];
  });
}

function parseTicketDetails(response: TicketsResponse): TicketDetails {
  if (response.isSuccess !== true || !isRecord(response.value)) {
    throw new Error(responseErrorMessage(response, "دریافت جزئیات تیکت ممکن نشد."));
  }

  const value = response.value;
  const id = nonNegativeInteger(value.id);
  const status = getTicketStatus(value.status);
  const title = text(value.title);
  if (id === null || status === null || !title) {
    throw new Error("اطلاعات تیکت ناقص است.");
  }

  const messages = Array.isArray(value.messages)
    ? value.messages.flatMap((raw): TicketMessage[] => {
        if (!isRecord(raw)) {
          return [];
        }

        const messageId = nonNegativeInteger(raw.id);
        const messageText = text(raw.text);
        if (messageId === null || (!messageText && !Array.isArray(raw.files))) {
          return [];
        }

        return [
          {
            id: messageId,
            text: messageText,
            fromAdmin: raw.fromAdmin === true,
            createDate: text(raw.createDate),
            createDateFa: text(raw.createDateFa),
            files: parseAttachments(raw.files),
          },
        ];
      })
    : [];

  return {
    id,
    title,
    status,
    statusFa: text(value.statusFa),
    createDate: text(value.createDate),
    createDateFa: text(value.createDateFa),
    messages,
  };
}

export const ticketQueryKeys = {
  all: (siteType: SiteType) => [siteType, "support", "tickets"] as const,
  list: (siteType: SiteType) => [...ticketQueryKeys.all(siteType), "list"] as const,
  details: (siteType: SiteType, ticketId: number) =>
    [...ticketQueryKeys.all(siteType), "details", ticketId] as const,
};

async function getTicketCaptcha(siteType: SiteType): Promise<CaptchaValue> {
  const response = await fetch("/api/etkala-auth/captcha", {
    cache: "no-store",
    credentials: "include",
    headers: getSiteTypeHeaders(siteType),
  });
  const payload = (await response.json()) as ApiResponse<CaptchaValue>;

  if (!response.ok || payload.isSuccess !== true || !payload.value?.img || !payload.value.cpCode) {
    throw new Error(responseMessage(payload, "دریافت تصویر امنیتی ناموفق بود."));
  }

  return payload.value;
}

async function createTicket(input: CreateTicketInput, siteType: SiteType): Promise<number> {
  const formData = new FormData();
  formData.set("Title", input.title.trim());
  formData.set("Text", input.text.trim());
  formData.set("Captcha", input.captcha.trim());
  formData.set("CpCode", input.cpCode);

  let payload: ApiResponse<number>;
  try {
    ({ data: payload } = await axiosClient.post<ApiResponse<number>>("/api/Tickets", formData, {
      headers: {
        ...getSiteTypeHeaders(siteType),
        "Content-Type": "multipart/form-data",
      },
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (payload.isSuccess !== true || typeof payload.value !== "number") {
    throw new Error(responseMessage(payload, "ارسال تیکت ناموفق بود."));
  }

  return payload.value;
}

export function useTicketCaptcha(enabled: boolean) {
  const { siteType } = useStorefront();

  return useQuery<CaptchaValue, Error>({
    queryKey: [siteType, "support", "ticket-captcha"],
    queryFn: () => getTicketCaptcha(siteType),
    enabled,
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useTickets() {
  const { siteType } = useStorefront();

  return useQuery<SupportTicket[], Error>({
    queryKey: ticketQueryKeys.list(siteType),
    queryFn: async ({ signal }) => {
      try {
        const { data } = await axiosClient.get<TicketsResponse>("/api/Tickets", {
          params: { Page: 1, PageLength: 100 },
          headers: getSiteTypeHeaders(siteType),
          signal,
        });
        return parseTickets(data);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    staleTime: 60_000,
    retry: false,
  });
}

export function useTicketDetails(ticketId: number) {
  const { siteType } = useStorefront();

  return useQuery<TicketDetails, Error>({
    queryKey: ticketQueryKeys.details(siteType, ticketId),
    queryFn: async ({ signal }) => {
      try {
        const { data } = await axiosClient.get<TicketsResponse>(`/api/Tickets/${ticketId}`, {
          headers: getSiteTypeHeaders(siteType),
          signal,
        });
        return parseTicketDetails(data);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    enabled: Number.isSafeInteger(ticketId) && ticketId > 0,
    staleTime: 30_000,
    retry: false,
  });
}

export function useCreateTicket() {
  const { siteType } = useStorefront();
  const queryClient = useQueryClient();

  return useMutation<number, Error, CreateTicketInput>({
    mutationFn: (input) => createTicket(input, siteType),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ticketQueryKeys.all(siteType) });
    },
    retry: false,
  });
}

export function useSendTicketMessage() {
  const { siteType } = useStorefront();
  const queryClient = useQueryClient();

  return useMutation<number, Error, SendTicketMessageInput>({
    mutationFn: async ({ ticketId, text: messageText, files }) => {
      const formData = new FormData();
      formData.set("TicketId", String(ticketId));
      formData.set("Text", messageText.trim());
      files.forEach((file, index) => {
        formData.append(`Files[${index}].File`, file);
      });

      try {
        const { data } = await axiosClient.post<ApiResponse<number>>(
          "/api/Tickets/SendMessage",
          formData,
          {
            headers: {
              ...getSiteTypeHeaders(siteType),
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (data.isSuccess !== true || typeof data.value !== "number") {
          throw new Error(responseMessage(data, "ارسال پیام ناموفق بود."));
        }
        return data.value;
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: async (_messageId, input) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ticketQueryKeys.details(siteType, input.ticketId),
        }),
        queryClient.invalidateQueries({ queryKey: ticketQueryKeys.list(siteType) }),
      ]);
    },
    retry: false,
  });
}
