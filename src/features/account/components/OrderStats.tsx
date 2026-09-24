"use client";

import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useFactorStatusCount,
  type FactorStatusCounts,
} from "@/features/account/api/use-factor-status-count";

const ORDER_STATS = [
  {
    label: "سفارش فعال",
    status: 1,
    iconSrc: "/icons/orders/in-transit.svg",
  },
  { label: "تحویل داده شده", status: 2, iconSrc: "/icons/orders/order-history.svg" },
  { label: "مرجوع شده", status: 3, iconSrc: "/icons/orders/return.svg" },
  { label: "لغو شده", status: 3, iconSrc: "/icons/orders/shopping-basket.svg" },
] as const;

function getOrderCount(counts: FactorStatusCounts | undefined, status: number | null) {
  if (status === null || !counts || counts[status] === undefined) {
    return "0";
  }
  return counts[status].toLocaleString("fa-IR");
}

export function OrderStats({ mobile = false }: { mobile?: boolean }) {
  const { data: statusCounts } = useFactorStatusCount();

  if (mobile) {
    return (
      <section
        aria-label="خلاصه سفارش‌ها"
        className="grid min-h-[119px] grid-cols-4 border-b bg-white lg:hidden"
      >
        {ORDER_STATS.map(({ label, status, iconSrc }) => (
          <div key={label} className="flex min-w-0 flex-col items-center justify-center gap-1 px-1">
            <Image src={iconSrc} width={48} height={48} alt="" className="size-10" />
            <span className="text-secondary truncate text-xs font-medium">{label}</span>
            <span className="text-secondary text-xs">{getOrderCount(statusCounts, status)}</span>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section aria-label="خلاصه سفارش‌ها" className="hidden grid-cols-4 gap-3 lg:grid">
      {ORDER_STATS.map(({ label, status, iconSrc }) => (
        <div key={label}>
          <Card className="h-[86px] gap-0 rounded-2xl py-0 shadow-none">
            <CardHeader className="grid h-full grid-cols-[auto_1fr] content-center items-center gap-3 px-4 py-3">
              <Image src={iconSrc} width={48} height={48} alt="" className="size-11" />
              <div className="flex flex-col gap-1">
                <p className="text-secondary font-bold">{label}</p>
                <CardContent className="text-secondary p-0 text-sm">
                  {getOrderCount(statusCounts, status)} سفارش
                </CardContent>
              </div>
            </CardHeader>
          </Card>
        </div>
      ))}
    </section>
  );
}
