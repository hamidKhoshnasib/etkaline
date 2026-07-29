"use client";

import { AlertCircle, ChevronLeft, ChevronRight, History } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoginLogs } from "@/features/account/api/use-login-logs";

function LoginLogsSkeleton() {
  return (
    <div
      className="flex flex-col gap-2"
      aria-busy="true"
      aria-label="در حال دریافت تاریخچه ورود و خروج"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <Skeleton key={index} className="h-28 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function LoginLogsPanel({ active = true }: { active?: boolean }) {
  const [page, setPage] = useState(0);
  const { data, error, isPending } = useLoginLogs(page, active);

  if (isPending) {
    return <LoginLogsSkeleton />;
  }

  if (error) {
    return (
      <Empty className="bg-card min-h-64 border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>دریافت تاریخچه ورود و خروج ممکن نشد</EmptyTitle>
          <EmptyDescription>{error.message}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (!data?.logs.length) {
    return (
      <Empty className="bg-card min-h-64 border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <History aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>تاریخچه‌ای برای نمایش وجود ندارد</EmptyTitle>
          <EmptyDescription>
            ورودها و خروج‌های بعدی حساب شما در این بخش نمایش داده می‌شوند.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {data.logs.map((log) => (
        <article key={log.id} className="bg-card rounded-xl border p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-foreground truncate font-semibold">
                {log.userFullName || log.username || "ورود به حساب"}
              </span>
              <Badge variant={log.isSuccess ? "secondary" : "destructive"}>
                {log.isSuccess ? "موفق" : "ناموفق"}
              </Badge>
            </div>
            <time className="text-muted-foreground text-sm" dateTime={log.createDate}>
              {log.createDateFa || log.createDate}
            </time>
          </div>
          <div className="text-muted-foreground mt-3 grid gap-2 text-sm sm:grid-cols-3">
            <p>
              آی‌پی: <bdi dir="ltr">{log.ip || "ثبت نشده"}</bdi>
            </p>
            <p>نوع کاربر: {log.userType || "ثبت نشده"}</p>
            <p>سطح دسترسی: {log.authLevel || "ثبت نشده"}</p>
          </div>
          {log.description ? (
            <p className="text-foreground mt-3 text-sm">{log.description}</p>
          ) : null}
        </article>
      ))}

      {data.pageCount > 1 ? (
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((currentPage) => currentPage + 1)}
            disabled={page + 1 >= data.pageCount}
          >
            <ChevronLeft data-icon="inline-start" />
            بعدی
          </Button>
          <span className="text-muted-foreground text-sm">
            صفحه {page + 1} از {data.pageCount}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
            disabled={page === 0}
          >
            قبلی
            <ChevronRight data-icon="inline-end" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
