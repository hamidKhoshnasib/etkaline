import { PackageCheck, ReceiptText, ShoppingBasket, Undo2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ORDER_STATS = [
  { label: "سفارش فعال", count: "۳ سفارش", icon: ReceiptText },
  { label: "تحویل داده شده", count: "۰ سفارش", icon: PackageCheck },
  { label: "مرجوع شده", count: "۰ سفارش", icon: Undo2 },
  { label: "لغو شده", count: "۰ سفارش", icon: ShoppingBasket },
] as const;

export function OrderStats({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <section
        aria-label="خلاصه سفارش‌ها"
        className="grid min-h-[119px] grid-cols-4 border-b bg-white lg:hidden"
      >
        {ORDER_STATS.map(({ label, count, icon: Icon }) => (
          <div key={label} className="flex min-w-0 flex-col items-center justify-center gap-1 px-1">
            <span className="bg-muted text-primary-hover flex size-10 items-center justify-center rounded-lg">
              <Icon aria-hidden="true" />
            </span>
            <span className="text-secondary truncate text-xs font-medium">{label}</span>
            <span className="text-secondary text-xs">{count.replace(" سفارش", "")}</span>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section aria-label="خلاصه سفارش‌ها" className="hidden grid-cols-4 gap-3 lg:grid">
      {ORDER_STATS.map(({ label, count, icon: Icon }) => (
        <Card key={label} className="min-h-22 rounded-2xl py-0 shadow-none">
          <CardHeader className="grid grid-cols-[auto_1fr] items-center gap-3 px-4 pt-5 pb-1">
            <span className="bg-muted text-primary-hover flex size-11 items-center justify-center rounded-xl">
              <Icon aria-hidden="true" />
            </span>
            <p className="text-secondary font-bold">{label}</p>
          </CardHeader>
          <CardContent className={cn("text-secondary px-4 pb-4 text-sm")}>{count}</CardContent>
        </Card>
      ))}
    </section>
  );
}
