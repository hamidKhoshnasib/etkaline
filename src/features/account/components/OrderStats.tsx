import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ORDER_STATS = [
  { label: "سفارش فعال", count: "۳ سفارش", iconSrc: "/icons/orders/in-transit.svg" },
  { label: "تحویل داده شده", count: "۰ سفارش", iconSrc: "/icons/orders/order-history.svg" },
  { label: "مرجوع شده", count: "۰ سفارش", iconSrc: "/icons/orders/return.svg" },
  { label: "لغو شده", count: "۰ سفارش", iconSrc: "/icons/orders/shopping-basket.svg" },
] as const;

export function OrderStats({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <section
        aria-label="خلاصه سفارش‌ها"
        className="grid min-h-[119px] grid-cols-4 border-b bg-white lg:hidden"
      >
        {ORDER_STATS.map(({ label, count, iconSrc }) => (
          <Link
            key={label}
            href="/account/orders"
            className="hover:bg-muted flex min-w-0 flex-col items-center justify-center gap-1 px-1 transition-colors"
          >
            <Image src={iconSrc} width={48} height={48} alt="" className="size-10" />
            <span className="text-secondary truncate text-xs font-medium">{label}</span>
            <span className="text-secondary text-xs">{count.replace(" سفارش", "")}</span>
          </Link>
        ))}
      </section>
    );
  }

  return (
    <section aria-label="خلاصه سفارش‌ها" className="hidden grid-cols-4 gap-3 lg:grid">
      {ORDER_STATS.map(({ label, count, iconSrc }) => (
        <Link key={label} href="/account/orders" className="block">
          <Card className="hover:bg-muted h-[86px] gap-0 rounded-2xl py-0 shadow-none transition-colors">
            <CardHeader className="grid h-full grid-cols-[auto_1fr] content-center items-center gap-3 px-4 py-3">
              <Image src={iconSrc} width={48} height={48} alt="" className="size-11" />
              <div className="flex flex-col gap-1">
                <p className="text-secondary font-bold">{label}</p>
                <CardContent className="text-secondary p-0 text-sm">{count}</CardContent>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </section>
  );
}
