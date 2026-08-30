"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { AppImage } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useCaptcha } from "@/features/auth/api/use-captcha";
import { toEnglishDigits, toPersianDigits } from "@/features/auth/model/auth";
import { getSiteTypeHeaders } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function normalizeCaptchaImage(image: string) {
  return /^(data:|https?:|\/)/i.test(image) ? image : `data:image/png;base64,${image}`;
}

export default function ContactForm() {
  const { siteType } = useStorefront();
  const [form, setForm] = useState(initialForm);
  const [captcha, setCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const captchaQuery = useCaptcha();

  async function refreshCaptcha() {
    setCaptcha("");
    setCaptchaError(null);
    await captchaQuery.refetch();
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const captchaValue = captchaQuery.data;
    if (!captcha.trim() || !captchaValue || captchaQuery.isFetching) {
      setCaptchaError("لطفاً عبارت امنیتی را وارد کنید.");
      return;
    }

    setCaptchaError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getSiteTypeHeaders(siteType) },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          tel: form.phone,
          subject: form.subject,
          text: form.message,
          captcha: toEnglishDigits(captcha.trim()),
          cpCode: captchaValue.cpCode,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { message?: unknown } | null;

      if (!response.ok) {
        throw new Error(
          typeof payload?.message === "string" ? payload.message : "ارسال پیام با خطا مواجه شد.",
        );
      }

      setForm(initialForm);
      toast.success("پیام شما با موفقیت ارسال شد.");
      setCaptcha("");
      void captchaQuery.refetch();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "ارسال پیام با خطا مواجه شد.");
      setCaptcha("");
      await captchaQuery.refetch();
    } finally {
      setIsSubmitting(false);
    }
  }

  const captchaMessage = captchaError ?? captchaQuery.error?.message ?? null;
  const captchaIsInvalid = Boolean(captchaMessage);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-busy={isSubmitting}>
      <FieldGroup className="gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="contact-name" className="label-large-bold text-foreground">
              نام و نام خانوادگی
            </FieldLabel>
            <Input
              id="contact-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              className="focus-visible:border-auth-accent h-11 focus-visible:ring-0"
              required
              maxLength={150}
            />
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="contact-email" className="label-large-bold text-foreground">
              ایمیل
            </FieldLabel>
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ایمیل خود را وارد کنید"
              className="focus-visible:border-auth-accent h-11 focus-visible:ring-0"
              required
              maxLength={254}
            />
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="contact-phone" className="label-large-bold text-foreground">
              شماره تماس
            </FieldLabel>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="09121234567"
              className="focus-visible:border-auth-accent h-11 focus-visible:ring-0"
              required
              maxLength={32}
            />
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="contact-subject" className="label-large-bold text-foreground">
              موضوع
            </FieldLabel>
            <Input
              id="contact-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="موضوع پیام خود را وارد کنید"
              className="focus-visible:border-auth-accent h-11 focus-visible:ring-0"
              required
              maxLength={200}
            />
          </Field>
        </div>

        <Field className="gap-1.5">
          <FieldLabel htmlFor="contact-message" className="label-large-bold text-foreground">
            پیام
          </FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="متن پیام خود را بنویسید..."
            rows={6}
            className="focus-visible:border-auth-accent resize-none focus-visible:ring-0"
            required
            maxLength={5000}
          />
        </Field>

        <Field data-invalid={captchaIsInvalid} className="gap-1.5">
          <FieldLabel htmlFor="contact-captcha" className="sr-only">
            عبارت امنیتی
          </FieldLabel>
          <div className="grid grid-cols-2 gap-2" dir="rtl">
            <Input
              id="contact-captcha"
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
              aria-invalid={captchaIsInvalid}
              className="focus-visible:border-auth-accent h-12 rounded-xl text-right text-base focus-visible:ring-0"
            />
            <div className="bg-background flex h-12 overflow-hidden rounded-xl border">
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
                disabled={captchaQuery.isFetching || isSubmitting}
                onClick={() => void refreshCaptcha()}
                className="h-full rounded-none border-s"
                aria-busy={captchaQuery.isFetching}
              >
                <RefreshCw />
              </Button>
            </div>
          </div>
          <FieldError>{captchaMessage}</FieldError>
        </Field>
      </FieldGroup>

      <FieldError>{submitError}</FieldError>

      <Button
        type="submit"
        disabled={isSubmitting || captchaQuery.isFetching}
        className="title-small-bold bg-primary text-primary-foreground hover:bg-primary-hover h-11 w-[118px] self-end rounded-[39px]"
        aria-busy={isSubmitting}
      >
        {isSubmitting && <Spinner data-icon="inline-start" className="size-4" />}
        {isSubmitting ? "در حال ارسال" : "ثبت و ارسال"}
      </Button>
    </form>
  );
}
