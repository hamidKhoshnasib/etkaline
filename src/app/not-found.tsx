import Link from "next/link";
import { HomeIcon, SearchXIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100dvh-16rem)] items-center justify-center px-4 py-12 sm:px-6">
      <section className="w-full max-w-xl rounded-3xl  px-6 py-10 text-center sm:px-12 sm:py-14">
        <div className="bg-primary/15 text-primary relative mx-auto flex size-24 items-center justify-center rounded-3xl sm:size-28">
          <SearchXIcon className="size-12 sm:size-14" strokeWidth={1.7} aria-hidden="true" />
        </div>

        <p className="text-secondary mt-9 text-6xl leading-none font-bold tracking-tight sm:text-7xl">
          ۴۰۴
        </p>
        <h1 className="text-secondary mt-4 text-xl font-bold sm:text-2xl">این صفحه پیدا نشد</h1>
        <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
          احتمالاً آدرس صفحه تغییر کرده یا دیگر در دسترس نیست.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/" />} size="md" className="w-full sm:w-auto">
            <HomeIcon data-icon="inline-start" aria-hidden="true" />
            بازگشت به خانه
          </Button>
        </div>
      </section>
    </main>
  );
}
