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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginLogs } from "@/features/account/api/use-login-logs";

type LoginLogTab = "successful" | "failed";

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

function LoginLogsContent({
  data,
  error,
  isPending,
  page,
  onPageChange,
}: {
  data: ReturnType<typeof useLoginLogs>["data"];
  error: ReturnType<typeof useLoginLogs>["error"];
  isPending: boolean;
  page: number;
  onPageChange: (page: number) => void;
}) {
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
            onClick={() => onPageChange(page + 1)}
            disabled={page >= data.pageCount}
          >
            <ChevronLeft data-icon="inline-start" />
            بعدی
          </Button>
          <span className="text-muted-foreground text-sm">
            صفحه {page} از {data.pageCount}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            قبلی
            <ChevronRight data-icon="inline-end" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function LoginLogsPanel({ active = true }: { active?: boolean }) {
  const [tab, setTab] = useState<LoginLogTab>("successful");
  const [page, setPage] = useState(1);
  const isSuccess = tab === "successful";
  const query = useLoginLogs(page, isSuccess, active);

  function handleTabChange(value: string) {
    if (value !== "successful" && value !== "failed") {
      return;
    }

    setTab(value);
    setPage(1);
  }

  return (
    <Tabs
      value={tab}
      onValueChange={handleTabChange}
      className="-mx-4 gap-0 overflow-hidden bg-transparent p-0 lg:mx-0 lg:rounded-2xl lg:border lg:bg-white"
    >
      <TabsList
        variant="line"
        aria-label="وضعیت ورودها"
        className="bg-muted mx-4 mt-2 w-[calc(100%-2rem)] justify-start gap-0 rounded-full! border-0 p-0 group-data-horizontal/tabs:h-12 lg:mx-0 lg:mt-0 lg:w-full lg:rounded-none! lg:border-b lg:bg-transparent lg:px-4 lg:group-data-horizontal/tabs:h-14"
      >
        <TabsTrigger
          value="successful"
          className="data-active:bg-primary! data-active:text-secondary h-full max-w-none rounded-full px-5 after:hidden data-active:rounded-full! data-active:font-bold lg:max-w-40 lg:rounded-none lg:after:bottom-[-1px] lg:after:block lg:after:bg-[#FFCD49] lg:data-active:rounded-none! lg:data-active:bg-transparent!"
        >
          ورود موفق
        </TabsTrigger>
        <TabsTrigger
          value="failed"
          className="data-active:bg-primary! data-active:text-secondary h-full max-w-none rounded-full px-5 after:hidden data-active:rounded-full! data-active:font-bold lg:max-w-40 lg:rounded-none lg:after:bottom-[-1px] lg:after:block lg:after:bg-[#FFCD49] lg:data-active:rounded-none! lg:data-active:bg-transparent!"
        >
          ورود ناموفق
        </TabsTrigger>
      </TabsList>
      <TabsContent value="successful" className="p-4 lg:p-3">
        <LoginLogsContent {...query} page={page} onPageChange={setPage} />
      </TabsContent>
      <TabsContent value="failed" className="p-4 lg:p-3">
        <LoginLogsContent {...query} page={page} onPageChange={setPage} />
      </TabsContent>
    </Tabs>
  );
}
