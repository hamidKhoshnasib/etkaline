"use client";

import { Headphones } from "lucide-react";
import Link from "next/link";

import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { BackButton } from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { type SupportTicket, useTickets } from "@/features/account/api/use-tickets";
import { cn } from "@/lib/utils";

const TICKET_STATUS_LABELS = {
  0: "در انتظار پاسخ",
  1: "پاسخ داده شده",
  2: "بسته شده",
} as const;

export function SupportTicketListItem({
  ticket,
  selected = false,
  compact = false,
}: {
  ticket: SupportTicket;
  selected?: boolean;
  compact?: boolean;
}) {
  const isAnswered = ticket.status === 1;
  const isOpen = ticket.status === 0;
  const statusLabel = ticket.statusFa || TICKET_STATUS_LABELS[ticket.status];
  const createdAt = ticket.createDateFa || ticket.createDate || "—";

  return (
    <li>
      <Link
        href={`/account/support/tickets/${ticket.id}`}
        aria-current={selected ? "page" : undefined}
        className="focus-visible:ring-ring block rounded-xl outline-none focus-visible:ring-3"
      >
        <Card
          className={cn(
            "min-h-16 gap-0 rounded-xl py-0 shadow-none transition-colors",
            compact && "border-transparent bg-transparent ring-0",
            selected && "bg-slate-50 ring-1 ring-[#2962FF]",
          )}
        >
          <CardContent className="flex min-h-16 items-center gap-3 px-4 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white">
              <Headphones
                className={isAnswered ? "text-[#2962FF]" : "text-muted-foreground"}
                aria-hidden="true"
              />
            </span>
            <div className="min-w-0 flex-1 text-right">
              <p
                className={cn(
                  "truncate text-sm",
                  isAnswered ? "text-secondary font-bold" : "text-muted-foreground",
                )}
              >
                {ticket.title}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge
                  className={
                    isAnswered
                      ? "border-0 bg-emerald-50 text-emerald-600"
                      : isOpen
                        ? "border-0 bg-amber-50 text-amber-700"
                        : "bg-muted text-muted-foreground border-0"
                  }
                >
                  {statusLabel}
                </Badge>
                <time className="text-muted-foreground text-xs" dateTime={ticket.createDate}>
                  {createdAt}
                </time>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}

function TicketSkeleton() {
  return (
    <li>
      <Card className="min-h-16 gap-0 rounded-xl py-0 shadow-none">
        <CardContent className="flex min-h-16 items-center gap-3 px-4 py-3">
          <Skeleton className="size-6 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </CardContent>
      </Card>
    </li>
  );
}

export function SupportTicketsView() {
  const { data: tickets, error, isLoading } = useTickets();

  return (
    <section dir="rtl" className="bg-muted/60 min-h-full lg:bg-transparent lg:pt-2">
      <MobilePageHeader fallbackHref="/account/support" title="تیکت‌ها" />
      <div className="px-4 py-6 lg:px-0 lg:py-0">
        <div className="mb-5 hidden flex-row-reverse items-center justify-end gap-2 lg:flex">
          <h1 className="text-base font-bold text-[#0057a8]">تیکت‌ها</h1>
          <BackButton fallbackHref="/account/support" />
        </div>
        {isLoading ? (
          <ul className="flex flex-col gap-4" aria-busy="true" aria-label="در حال دریافت تیکت‌ها">
            {Array.from({ length: 4 }, (_, index) => (
              <TicketSkeleton key={index} />
            ))}
          </ul>
        ) : error ? (
          <p className="text-destructive rounded-xl border px-4 py-3 text-sm" role="alert">
            {error.message}
          </p>
        ) : tickets?.length ? (
          <ul className="flex flex-col gap-4">
            {tickets.map((ticket) => (
              <SupportTicketListItem key={ticket.id} ticket={ticket} />
            ))}
          </ul>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Headphones />
              </EmptyMedia>
              <EmptyTitle>تیکتی ندارید</EmptyTitle>
              <EmptyDescription>
                تیکت‌های ارسال‌شدهٔ شما در این بخش نمایش داده می‌شوند.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </section>
  );
}
