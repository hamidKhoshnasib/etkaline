"use client";

import Link from "next/link";

import { StatusPage } from "@/components/status/StatusPage";
import { Button } from "@/components/ui/button";

export function PaymentFailedPage({
  cartHref,
  onRetryPayment,
}: {
  cartHref: string;
  onRetryPayment: () => void;
}) {
  return (
    <StatusPage className="min-h-[calc(100dvh-16rem)] flex-1" variant="payment-failed">
      <Button className="font-bold" type="button" size="md" onClick={onRetryPayment}>
        تلاش مجدد پرداخت
      </Button>
      <Button
        className="border-primary text-primary hover:text-primary"
        render={<Link href={cartHref} />}
        nativeButton={false}
        size="md"
        variant="outline-primary"
      >
        بازگشت به سبد خرید
      </Button>
    </StatusPage>
  );
}
