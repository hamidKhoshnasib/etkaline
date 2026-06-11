"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to API
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            placeholder="شماره تماس خود را وارد کنید"
            className="h-11"
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
          className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm transition-colors outline-none focus-visible:ring-3"
        />
      </div>

      <Button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary-hover h-11 w-full text-base font-bold"
      >
        ارسال
      </Button>
    </form>
  );
}
