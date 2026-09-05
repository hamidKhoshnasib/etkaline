"use client";

import { type FormEvent, useState } from "react";
import { ChevronLeft, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { AppImage } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useFaqs } from "@/features/faq/api/use-faqs";
import { useCreateTicket, useTicketCaptcha } from "@/features/account/api/use-tickets";
import { toEnglishDigits, toPersianDigits } from "@/features/auth/model/auth";

import { ACCOUNT_OUTLINE_ACTION_CLASS } from "./account-action-styles";

function normalizeCaptchaImage(image: string) {
  return /^(data:|https?:|\/)/i.test(image) ? image : `data:image/png;base64,${image}`;
}

export function NewTicketDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [formError, setFormError] = useState("");
  const captchaQuery = useTicketCaptcha(open);
  const createTicket = useCreateTicket();

  function resetForm() {
    setTitle("");
    setMessage("");
    setCaptcha("");
    setFormError("");
    createTicket.reset();
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  }

  async function refreshCaptcha() {
    setCaptcha("");
    setFormError("");
    await captchaQuery.refetch();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const captchaValue = captchaQuery.data;
    if (!title.trim() || !message.trim() || !captcha.trim() || !captchaValue) {
      setFormError("لطفاً موضوع، پیام و عبارت امنیتی را کامل وارد کنید.");
      return;
    }

    setFormError("");
    try {
      await createTicket.mutateAsync({
        title,
        text: message,
        captcha: toEnglishDigits(captcha),
        cpCode: captchaValue.cpCode,
      });
      toast.success("تیکت با موفقیت ارسال شد.");
      handleOpenChange(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "ارسال تیکت ناموفق بود.");
      setCaptcha("");
      await captchaQuery.refetch();
    }
  }

  const captchaError = formError || captchaQuery.error?.message || "";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-2rem)] max-w-[480px] gap-0 overflow-hidden rounded-[26px] p-0 sm:max-w-[480px]"
        overlayClassName="bg-black/45"
      >
        <DialogHeader className="border-b px-6 py-6">
          <DialogTitle className="text-secondary text-lg font-bold">تیکت جدید</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-5 px-6 py-4" onSubmit={handleSubmit} noValidate>
          <FieldGroup className="gap-4">
            <Field className="gap-1.5" data-invalid={Boolean(formError) && !title.trim()}>
              <FieldLabel htmlFor="ticket-subject" className="text-secondary text-xs font-medium">
                موضوع
              </FieldLabel>
              <Input
                id="ticket-subject"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="مثلاً بازگشت وجه"
                required
                maxLength={200}
                aria-invalid={Boolean(formError) && !title.trim()}
                className="focus-visible:border-auth-accent h-12 rounded-lg px-4 text-end"
                style={{ direction: "rtl", textAlign: "right" }}
              />
            </Field>
            <Field className="gap-1.5" data-invalid={Boolean(formError) && !message.trim()}>
              <FieldLabel htmlFor="ticket-message" className="text-secondary text-xs font-medium">
                پیام شما
              </FieldLabel>
              <Textarea
                id="ticket-message"
                name="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="متن را اینجا بنویسید..."
                required
                maxLength={5000}
                aria-invalid={Boolean(formError) && !message.trim()}
                className="focus-visible:border-auth-accent min-h-39 resize-none rounded-lg px-4 py-3 text-end focus-visible:ring-0"
                style={{ direction: "rtl", textAlign: "right" }}
              />
            </Field>
          </FieldGroup>

          <Field data-invalid={Boolean(captchaError)}>
            <FieldLabel htmlFor="ticket-captcha" className="sr-only">
              عبارت امنیتی
            </FieldLabel>
            <div className="grid grid-cols-2 gap-2" dir="rtl">
              <Input
                id="ticket-captcha"
                name="captcha"
                dir="rtl"
                inputMode="numeric"
                autoComplete="off"
                placeholder="کد را وارد نمایید"
                value={toPersianDigits(captcha)}
                onChange={(event) =>
                  setCaptcha(toEnglishDigits(event.target.value).replace(/\s/g, "").slice(0, 8))
                }
                required
                aria-invalid={Boolean(captchaError)}
                className="h-12 rounded-xl text-right text-base"
              />
              <div className="flex h-12 overflow-hidden rounded-xl border bg-white">
                <div className="flex min-w-0 flex-1 items-center justify-center">
                  {captchaQuery.data ? (
                    <AppImage
                      src={normalizeCaptchaImage(captchaQuery.data.img)}
                      alt="تصویر عبارت امنیتی"
                      width={180}
                      height={44}
                      unoptimized
                      className="max-h-11 max-w-full object-contain"
                    />
                  ) : (
                    <Spinner className="text-muted-foreground size-5" />
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-lg"
                  aria-label="دریافت عبارت امنیتی جدید"
                  disabled={captchaQuery.isFetching}
                  onClick={() => void refreshCaptcha()}
                  className="h-full rounded-none border-s"
                  aria-busy={captchaQuery.isFetching}
                >
                  <RefreshCw />
                </Button>
              </div>
            </div>
          </Field>

          {captchaError && <FieldError>{captchaError}</FieldError>}

          <Button
            type="submit"
            className="h-12 w-full rounded-full text-base font-bold"
            disabled={createTicket.isPending || captchaQuery.isFetching || !captchaQuery.data}
            aria-busy={createTicket.isPending}
          >
            {createTicket.isPending && <Spinner data-icon="inline-start" className="size-4" />}
            {createTicket.isPending ? "در حال ارسال" : "ارسال"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SupportView() {
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const { data: faqs, error: faqError, isLoading: isFaqLoading } = useFaqs();

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
          {isFaqLoading ? (
            <div
              className="flex flex-col gap-2"
              aria-busy="true"
              aria-label="در حال دریافت سوالات متداول"
            >
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-13 w-full rounded-xl" />
              ))}
            </div>
          ) : faqError ? (
            <p className="text-destructive px-5 py-4 text-sm" role="alert">
              {faqError.message}
            </p>
          ) : faqs?.length ? (
            <div className="overflow-hidden rounded-xl">
              <Accordion>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border-border">
                    <AccordionTrigger className="bg-muted/60 text-secondary min-h-13 items-center px-5 py-3 text-right hover:no-underline aria-expanded:rounded-b-none">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/60 text-muted-foreground rounded-t-none px-5 text-right">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <p className="text-muted-foreground px-5 py-4 text-sm">
              سوال متداولی برای نمایش وجود ندارد.
            </p>
          )}
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 lg:flex-row-reverse">
          <Button
            type="button"
            variant="outline"
            className={ACCOUNT_OUTLINE_ACTION_CLASS}
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
