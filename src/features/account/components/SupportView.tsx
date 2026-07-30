"use client";

import { useState } from "react";
import { ChevronLeft, Plus, RefreshCw, Upload } from "lucide-react";
import Link from "next/link";

import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FINANCIAL_ISSUES = [
  "کسر از حساب و عدم ثبت سفارش",
  "عدم بازگشت وجه به کیف پول",
  "کسر از حساب و عدم ثبت سفارش",
  "کسر از حساب و عدم ثبت سفارش",
] as const;

function NewTicketDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-2rem)] max-w-[480px] gap-0 overflow-hidden rounded-[26px] p-0 sm:max-w-[480px]"
        overlayClassName="bg-black/45"
      >
        <DialogHeader className="border-b px-6 py-5 text-end">
          <DialogTitle className="text-secondary text-lg font-bold">تیکت جدید</DialogTitle>
        </DialogHeader>

        <form
          className="flex flex-col gap-5 px-6 py-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <FieldGroup className="gap-4">
            <Field className="gap-1.5">
              <FieldLabel
                htmlFor="ticket-subject"
                className="text-primary-hover text-sm font-medium"
              >
                موضوع
              </FieldLabel>
              <Input
                id="ticket-subject"
                placeholder="مثلاً بازگشت وجه"
                className="h-12 rounded-lg px-4 text-end"
                style={{ direction: "rtl", textAlign: "right" }}
              />
            </Field>
            <Field className="gap-1.5">
              <FieldLabel
                htmlFor="ticket-message"
                className="text-primary-hover text-sm font-medium"
              >
                پیام شما
              </FieldLabel>
              <Textarea
                id="ticket-message"
                placeholder="متن را اینجا بنویسید..."
                className="min-h-39 resize-none rounded-lg px-4 py-3 text-end"
                style={{ direction: "rtl", textAlign: "right" }}
              />
            </Field>
          </FieldGroup>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm">یادداشت برای اطلاعات بیشتر</span>
            <div className="border-border relative flex min-h-19 items-center gap-3 rounded-lg border border-dashed px-4">
              <Upload className="text-muted-foreground size-8 shrink-0" aria-hidden="true" />
              <span className="text-muted-foreground me-16 flex min-w-0 flex-1 flex-col gap-1 text-end text-sm">
                <span>برای آپلود یا کشیدن و رها کردن</span>
                <span className="text-xs">حداکثر حجم فایل: ۳۰ مگابایت</span>
              </span>
              <span className="absolute end-4 flex h-10 items-center rounded-lg bg-[#4d83f7] px-3 text-sm font-medium text-white">
                کلیک کنید
              </span>
            </div>
          </div>

          <div className="flex gap-3" aria-label="کد امنیتی">
            <output className="border-destructive/30 text-destructive order-2 flex h-13 w-38 items-center justify-center rounded-lg border text-2xl font-bold tracking-[0.3em]">
              ۴۵۸۱۳۲
            </output>
            <div className="border-input text-muted-foreground order-1 flex h-13 min-w-0 flex-1 items-center gap-3 rounded-lg border px-4">
              <RefreshCw className="text-[#4d83f7]" aria-hidden="true" />
              <span className="flex-1 text-end">کد را وارد نمایید</span>
            </div>
          </div>

          <Button type="submit" className="h-12 w-full rounded-full text-base font-bold">
            ارسال
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function IssueRow({ children, description }: { children: string; description?: string }) {
  return (
    <div className="bg-muted/60 flex min-h-13 flex-row-reverse items-center justify-between gap-4 px-5">
      <ChevronLeft className="text-muted-foreground size-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 text-start">
        <p className="text-secondary text-sm">{children}</p>
        {description && <p className="text-muted-foreground mt-1 text-xs">{description}</p>}
      </div>
    </div>
  );
}

export function SupportView() {
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);

  return (
    <section dir="rtl" className="bg-muted/60 min-h-full lg:bg-transparent lg:pt-2">
      <MobilePageHeader fallbackHref="/account/profile" title="پشتیبانی" />
      <div className="px-4 py-6 lg:px-0 lg:py-0">
        <header className="mb-3 lg:mb-4" style={{ textAlign: "right" }}>
          <h1 className="text-base font-bold text-[#0057a8]">سوالات متداول</h1>
          <p className="text-muted-foreground mt-2 text-xs leading-6">
            اکثر کاربران از طریق سوالات متداول به پاسخ خود می‌رسند و در غیر این صورت پرسش و پاسخ از
            طریق تیکت انجام می‌شود.
          </p>
        </header>

        <div className="bg-card ring-foreground/10 overflow-hidden rounded-2xl p-3 shadow-none ring-1">
          <section>
            <h2 className="text-secondary mb-3 text-sm" style={{ textAlign: "right" }}>
              مشکل در سفارش
            </h2>
            <div className="overflow-hidden rounded-xl">
              <IssueRow description="تا ۲۴ ساعت بعد از دریافت سفارش">مشکل در سفارش</IssueRow>
            </div>
          </section>

          <section className="mt-3">
            <h2 className="text-secondary mb-3 text-sm" style={{ textAlign: "right" }}>
              مشکل‌های مالی
            </h2>
            <div className="overflow-hidden rounded-xl">
              {FINANCIAL_ISSUES.map((issue, index) => (
                <div key={`${issue}-${index}`} className="border-border border-b last:border-b-0">
                  <IssueRow>{issue}</IssueRow>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 lg:flex-row-reverse">
          <Button
            type="button"
            variant="outline"
            className="border-[#0057a8] bg-transparent text-[#0057a8]"
            onClick={() => setIsTicketDialogOpen(true)}
          >
            <Plus data-icon="inline-start" />
            تیکت جدید
          </Button>
          <div style={{ textAlign: "right" }}>
            <h2 className="font-bold text-[#0057a8]">ارسال تیکت</h2>
            <p className="text-muted-foreground mt-2 text-xs">
              برای ارسال تیکت، گزینهٔ پشتیبانی را انتخاب کنید.
            </p>
          </div>
        </div>

        <Link
          href="/account/support/tickets"
          className="bg-card text-secondary ring-foreground/10 mt-7 flex min-h-13 flex-row-reverse items-center justify-between rounded-lg px-5 shadow-none ring-1"
        >
          <ChevronLeft className="text-muted-foreground size-5" aria-hidden="true" />
          <span className="font-medium">تیکت‌های قبلی</span>
        </Link>
      </div>

      <NewTicketDialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen} />
    </section>
  );
}
