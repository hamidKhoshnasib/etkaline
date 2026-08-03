"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { getSiteTypeHeaders } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const { siteType } = useStorefront();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
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
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "ارسال پیام با خطا مواجه شد.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-busy={isSubmitting}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="label-large-bold text-foreground">
            نام و نام خانوادگی
          </label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            className="h-11"
            required
            maxLength={150}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="label-large-bold text-foreground">
            ایمیل
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ایمیل خود را وارد کنید"
            className="h-11"
            required
            maxLength={254}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="label-large-bold text-foreground">
            شماره تماس
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="09121234567"
            className="h-11"
            required
            maxLength={32}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="label-large-bold text-foreground">
            موضوع
          </label>
          <Input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="موضوع پیام خود را وارد کنید"
            className="h-11"
            required
            maxLength={200}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="label-large-bold text-foreground">
          پیام
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="متن پیام خود را بنویسید..."
          rows={6}
          className="border-input placeholder:text-muted-foreground focus-visible:border-auth-accent w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm transition-colors outline-none"
          required
          maxLength={5000}
        />
      </div>

      <FieldError>{submitError}</FieldError>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="title-small-bold bg-primary text-primary-foreground hover:bg-primary-hover h-11 w-[118px] self-end rounded-[39px]"
      >
        {isSubmitting && <Spinner data-icon="inline-start" className="size-4" />}
        {isSubmitting ? "در حال ارسال" : "ثبت و ارسال"}
      </Button>
    </form>
  );
}
