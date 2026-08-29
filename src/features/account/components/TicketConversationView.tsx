"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { Download, Headphones, Paperclip, Plus, Send, X } from "lucide-react";
import { toast } from "sonner";

import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  type TicketMessage,
  useSendTicketMessage,
  useTicketDetails,
  useTickets,
} from "@/features/account/api/use-tickets";
import { getClientApiBaseUrl } from "@/lib/api-config";
import { cn } from "@/lib/utils";

import { ACCOUNT_OUTLINE_ACTION_CLASS } from "./account-action-styles";
import { NewTicketDialog } from "./SupportView";
import { SupportTicketListItem } from "./SupportTicketsView";

function parseDateParts(message: TicketMessage) {
  const parsedDate = message.createDate ? new Date(message.createDate) : null;
  const hasValidDate = parsedDate && !Number.isNaN(parsedDate.getTime());
  const localizedParts = message.createDateFa.split(/[،\s]+/).filter(Boolean);
  const localizedDate = localizedParts.find((part) => part.includes("/"));
  const localizedTime = localizedParts.find((part) => /^\d{1,2}:\d{2}$/.test(part));

  if (!hasValidDate) {
    return {
      date: localizedDate || "پیام‌ها",
      time: localizedTime || "",
    };
  }

  const today = new Date();
  const isToday =
    parsedDate.getFullYear() === today.getFullYear() &&
    parsedDate.getMonth() === today.getMonth() &&
    parsedDate.getDate() === today.getDate();

  return {
    date:
      (isToday && "امروز") ||
      localizedDate ||
      new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(parsedDate),
    time:
      localizedTime ||
      new Intl.DateTimeFormat("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(parsedDate),
  };
}

function getAttachmentHref(url: string) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return new URL(url, getClientApiBaseUrl()).toString();
}

function MessageBubble({ message }: { message: TicketMessage }) {
  const { time } = parseDateParts(message);

  return (
    <article
      className={cn(
        "flex max-w-[85%] flex-col gap-1 rounded-xl px-3 py-2 text-sm leading-6",
        message.fromAdmin
          ? "ms-auto rounded-se-none bg-[#E3F2FD] text-slate-700"
          : "me-auto rounded-ss-none bg-[#448AFF] text-white",
      )}
    >
      {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
      {message.files.length > 0 && (
        <div className="flex flex-col gap-1">
          {message.files.map((file) => (
            <a
              key={file.id}
              href={getAttachmentHref(file.downloadUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 underline underline-offset-4"
            >
              <Download aria-hidden="true" />
              <span className="truncate">{file.fileName}</span>
            </a>
          ))}
        </div>
      )}
      {time && (
        <time dateTime={message.createDate} className="text-xs opacity-80" dir="ltr">
          {time}
        </time>
      )}
    </article>
  );
}

function ConversationSkeleton() {
  return (
    <div className="flex h-full flex-col justify-end gap-4 p-3" aria-busy="true">
      <Skeleton className="mx-auto h-7 w-16 rounded-full" />
      <Skeleton className="me-auto h-20 w-2/3 rounded-xl" />
      <Skeleton className="ms-auto h-14 w-1/2 rounded-xl" />
      <Skeleton className="h-15 w-full rounded-xl" />
    </div>
  );
}

function TicketReplyForm({ ticketId, disabled }: { ticketId: number; disabled: boolean }) {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sendMessage = useSendTicketMessage();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) {
      setError("متن پیام را وارد کنید.");
      return;
    }

    setError("");
    try {
      await sendMessage.mutateAsync({ ticketId, text: message, files });
      setMessage("");
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("پیام با موفقیت ارسال شد.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "ارسال پیام ناموفق بود.");
    }
  }

  if (disabled) {
    return (
      <p className="bg-muted text-muted-foreground rounded-xl border px-4 py-3 text-center text-sm">
        این تیکت بسته شده است و امکان ارسال پاسخ ندارد.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field data-invalid={Boolean(error)} className="gap-1.5">
        <FieldLabel htmlFor="ticket-reply" className="sr-only">
          متن پیام
        </FieldLabel>
        <InputGroup className="min-h-15 rounded-xl bg-white px-2">
          <InputGroupInput
            id="ticket-reply"
            name="text"
            value={message}
            maxLength={5000}
            disabled={sendMessage.isPending}
            aria-invalid={Boolean(error)}
            placeholder="متن پیام"
            className="h-11 py-3 text-right"
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
          />
          <InputGroupAddon align="inline-end" className="gap-1">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="sr-only"
              tabIndex={-1}
              onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
            />
            <InputGroupButton
              type="button"
              size="icon-sm"
              aria-label="افزودن فایل پیوست"
              disabled={sendMessage.isPending}
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip />
            </InputGroupButton>
            <InputGroupButton
              type="submit"
              size="icon-sm"
              aria-label="ارسال پیام"
              disabled={sendMessage.isPending || !message.trim()}
              className="text-[#2962FF] hover:text-[#2962FF]"
            >
              {sendMessage.isPending ? <Spinner /> : <Send />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file) => (
              <Badge
                key={`${file.name}-${file.lastModified}`}
                variant="secondary"
                className="gap-1"
              >
                <span className="max-w-48 truncate">{file.name}</span>
                <button
                  type="button"
                  aria-label={`حذف فایل ${file.name}`}
                  onClick={() => setFiles((current) => current.filter((item) => item !== file))}
                >
                  <X aria-hidden="true" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        {error && <FieldError>{error}</FieldError>}
      </Field>
    </form>
  );
}

export function TicketConversationView({ ticketId }: { ticketId: number }) {
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ticketsQuery = useTickets();
  const detailsQuery = useTicketDetails(ticketId);
  const details = detailsQuery.data;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [details?.messages.length]);

  return (
    <section dir="rtl" className="bg-muted/60 min-h-full lg:bg-transparent lg:pt-2">
      <MobilePageHeader fallbackHref="/account/support/tickets" title="گفت‌وگوی تیکت" />
      <Card className="gap-4 rounded-none border-x-0 py-4 shadow-none lg:min-h-[717px] lg:rounded-2xl lg:border">
        <CardHeader className="flex-row items-center justify-between gap-4 px-4 py-0 lg:px-8 lg:py-2">
          <div className="min-w-0 text-right">
            <h1 className="text-secondary text-sm font-bold">ارسال تیکت</h1>
            <p className="text-muted-foreground mt-1 text-xs">
              برای ارسال تیکت، سرویسی که نیاز به پشتیبانی دارد را انتخاب کنید.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className={cn("shrink-0", ACCOUNT_OUTLINE_ACTION_CLASS)}
            onClick={() => setIsTicketDialogOpen(true)}
          >
            <Plus data-icon="inline-start" />
            تیکت جدید
          </Button>
        </CardHeader>

        <CardContent className="flex min-h-0 flex-1 gap-2 px-4 lg:px-6">
          <aside
            className="hidden w-[285px] shrink-0 overflow-y-auto lg:block"
            aria-label="فهرست تیکت‌ها"
          >
            {ticketsQuery.isLoading ? (
              <div className="flex flex-col gap-2" aria-busy="true">
                {Array.from({ length: 7 }, (_, index) => (
                  <Skeleton key={index} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : ticketsQuery.error ? (
              <p className="text-destructive px-3 py-4 text-sm" role="alert">
                {ticketsQuery.error.message}
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {ticketsQuery.data?.map((ticket) => (
                  <SupportTicketListItem
                    key={ticket.id}
                    ticket={ticket}
                    selected={ticket.id === ticketId}
                    compact
                  />
                ))}
              </ul>
            )}
          </aside>

          <div className="border-border flex min-h-[560px] min-w-0 flex-1 flex-col rounded-xl border bg-slate-50 p-3 lg:h-[585px]">
            {detailsQuery.isLoading ? (
              <ConversationSkeleton />
            ) : detailsQuery.error ? (
              <div className="flex h-full items-center justify-center p-4">
                <p className="text-destructive text-center text-sm" role="alert">
                  {detailsQuery.error.message}
                </p>
              </div>
            ) : details ? (
              <>
                <div className="mb-3 flex items-center justify-between gap-3 border-b pb-3 lg:hidden">
                  <div className="min-w-0">
                    <p className="text-secondary truncate text-sm font-bold">{details.title}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {details.createDateFa || details.createDate}
                    </p>
                  </div>
                  <Badge variant="secondary">{details.statusFa}</Badge>
                </div>
                <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-4">
                  {details.messages.length ? (
                    details.messages.map((message, index) => {
                      const currentDate = parseDateParts(message).date;
                      const previousDate =
                        index > 0 ? parseDateParts(details.messages[index - 1]).date : null;

                      return (
                        <div key={message.id} className="flex flex-col gap-4">
                          {currentDate !== previousDate && (
                            <div className="flex justify-center">
                              <span className="text-muted-foreground rounded-xl bg-slate-300 px-3 py-1 text-xs">
                                {currentDate}
                              </span>
                            </div>
                          )}
                          <MessageBubble message={message} />
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                      <Headphones className="text-muted-foreground size-8" aria-hidden="true" />
                      <p className="text-muted-foreground text-sm">هنوز پیامی در این تیکت نیست.</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} aria-hidden="true" />
                </div>
                <TicketReplyForm ticketId={ticketId} disabled={details.status === 2} />
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <NewTicketDialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen} />
    </section>
  );
}
