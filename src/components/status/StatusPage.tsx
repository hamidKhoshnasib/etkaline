import Image from "next/image";
import { cn } from "@/lib/utils";

const statusPageContent = {
  "not-found": {
    title: "صفحه‌ای که دنبالش بودید پیدا نشد!",
    description: "ممکنه آدرس اشتباه وارد شده باشه یا این صفحه حذف شده باشه.",
  },
  offline: {
    title: "اتصال اینترنت برقرار نیست!",
    description: "لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.",
  },
  "payment-success": {
    title: "پرداخت شما با موفقیت انجام شد!",
    description: "سفارش شما ثبت شد و به زودی ارسال خواهد شد.",
    titleClassName: "text-[#22c55b]",
  },
  "payment-failed": {
    title: "پرداخت ناموفق بود!",
    description: "متأسفانه پرداخت شما با مشکل مواجه شد. لطفاً دوباره تلاش کنید.",
    titleClassName: "text-[#dc2655]",
  },
  "server-error": {
    title: "مشکلی در سرور پیش آمده!",
    description: "تیم فنی ما در حال رفع مشکل است. لطفاً دقایقی دیگر دوباره تلاش کنید.",
  },
  "vpn-error": {
    title: "اتصال با ایپی خارج از ایران مقدور نیست!",
    description: "لطفاً با آی پی ایران به اینترنت متصل و دوباره تلاش کنید.",
  },
} as const;

export type StatusPageVariant = keyof typeof statusPageContent;

export function StatusPage({
  variant,
  children,
  className,
}: {
  variant: StatusPageVariant;
  children?: React.ReactNode;
  className?: string;
}) {
  const content = statusPageContent[variant];
  const titleClassName = "titleClassName" in content ? content.titleClassName : undefined;

  return (
    <main
      className={cn(
        "bg-muted/60 flex min-h-dvh items-center justify-center px-4 py-12 sm:px-6",
        className,
      )}
    >
      <section className="flex w-full max-w-md flex-col items-center text-center">
        <div className="flex h-56 items-center justify-center sm:h-64">
          {variant === "not-found" ||
          variant === "offline" ||
          variant === "payment-success" ||
          variant === "payment-failed" ||
          variant === "server-error" ||
          variant === "vpn-error" ? (
            <Image
              alt=""
              aria-hidden="true"
              className="h-auto w-56 sm:w-70"
              height={variant === "offline" ? 272 : variant === "not-found" ? 249 : 240}
              priority
              src={
                variant === "offline"
                  ? "/images/status/no-internet-illustration.svg"
                  : variant === "payment-success"
                    ? "/images/status/success-illustration.svg"
                    : variant === "payment-failed"
                      ? "/images/status/failed-illustration.svg"
                      : variant === "server-error"
                        ? "/images/status/server-error-illustration.svg"
                        : variant === "vpn-error"
                          ? "/images/status/vpn-restricted-illustration.svg"
                          : "/images/status/404-illustration.svg"
              }
              width={280}
            />
          ) : null}
        </div>

        <h1 className={cn("mt-8 text-[12px] font-bold sm:mt-10", titleClassName)}>
          {content.title}
        </h1>
        <p className="mt-8 max-w-sm text-[12px]">{content.description}</p>

        {children ? (
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row">
            {children}
          </div>
        ) : null}
      </section>
    </main>
  );
}
