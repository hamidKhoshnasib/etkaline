import { Package, Tag, Info, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockMessages = [
  {
    id: 1,
    type: "order" as const,
    title: "سفارش شما ارسال شد",
    body: "سفارش شماره ۴۸۳۸۳۰۹۴۵۵ از انبار خارج شده و در حال ارسال است.",
    date: "۱۴۰۵/۰۲/۰۶",
    read: false,
  },
  {
    id: 2,
    type: "promo" as const,
    title: "کد تخفیف ویژه برای شما",
    body: "با کد ETKA20 تا ۲۰٪ تخفیف روی تمام محصولات خانگی دریافت کنید.",
    date: "۱۴۰۵/۰۲/۰۴",
    read: false,
  },
  {
    id: 3,
    type: "info" as const,
    title: "به‌روزرسانی شرایط استفاده",
    body: "شرایط و قوانین استفاده از خدمات اتکالاین به‌روزرسانی شده است.",
    date: "۱۴۰۵/۰۱/۲۸",
    read: true,
  },
  {
    id: 4,
    type: "order" as const,
    title: "سفارش شما تحویل داده شد",
    body: "سفارش شماره ۴۸۳۸۳۰۹۴۴۱ با موفقیت به دست شما رسید.",
    date: "۱۴۰۵/۰۱/۲۰",
    read: true,
  },
];

const typeConfig = {
  order: { icon: <Package className="size-4" />, color: "text-amber-600 bg-amber-50" },
  promo: { icon: <Tag className="size-4" />, color: "text-primary bg-primary/10" },
  info: { icon: <Info className="size-4" />, color: "text-muted-foreground bg-muted" },
};

export function ProfileMessages() {
  const unreadCount = mockMessages.filter((m) => !m.read).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile back header */}
      <div className="relative flex items-center justify-center py-1 md:hidden">
        <Link href="/profile" className="text-muted-foreground absolute inset-s-0 p-1">
          <ChevronRight className="size-5" />
        </Link>
        <h1 className="font-bold">پیام‌ها</h1>
      </div>

      {/* Desktop header */}
      <div className="hidden items-center gap-2 md:flex">
        <h2 className="text-lg font-bold">پیام‌ها</h2>
        {unreadCount > 0 && (
          <span className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-xs">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {mockMessages.map((msg) => {
          const config = typeConfig[msg.type];
          return (
            <Card
              key={msg.id}
              className={cn(
                "overflow-hidden transition-colors",
                !msg.read && "border-primary/30 bg-primary/5",
              )}
            >
              <CardContent className="flex gap-3 p-4">
                <div
                  className={cn(
                    "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                    config.color,
                  )}
                >
                  {config.icon}
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm font-medium", !msg.read && "font-semibold")}>
                      {msg.title}
                    </p>
                    <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                      {msg.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{msg.body}</p>
                </div>
                {!msg.read && <div className="bg-primary mt-2 size-2 shrink-0 rounded-full" />}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
