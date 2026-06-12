import { Headphones, Plus, MessageSquare, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockTickets = [
  {
    id: 1,
    subject: "مشکل در پرداخت سفارش",
    lastMessage: "پرداخت انجام شده اما سفارش ثبت نشده است.",
    date: "۱۴۰۵/۰۲/۰۶",
    status: "open" as const,
    unread: 1,
  },
  {
    id: 2,
    subject: "درخواست مرجوع کردن کالا",
    lastMessage: "کالا آسیب دیده تحویل گرفتم و درخواست مرجوعی دارم.",
    date: "۱۴۰۵/۰۱/۲۵",
    status: "pending" as const,
    unread: 0,
  },
  {
    id: 3,
    subject: "سوال درباره گارانتی محصول",
    lastMessage: "تیم پشتیبانی اطلاعات گارانتی را ارسال کرد.",
    date: "۱۴۰۵/۰۱/۱۰",
    status: "closed" as const,
    unread: 0,
  },
];

const statusConfig = {
  open: {
    label: "باز",
    icon: <MessageSquare className="size-3.5" />,
    className: "bg-primary/10 text-primary",
  },
  pending: {
    label: "در انتظار پاسخ",
    icon: <Clock className="size-3.5" />,
    className: "bg-amber-50 text-amber-600",
  },
  closed: {
    label: "بسته شده",
    icon: <CheckCircle2 className="size-3.5" />,
    className: "bg-green-50 text-green-600",
  },
};

export function ProfileSupport() {
  return (
    <div className="flex flex-col gap-4">
      {/* Mobile back header */}
      <div className="relative flex items-center justify-center py-1 md:hidden">
        <Link href="/profile" className="text-muted-foreground absolute inset-s-0 p-1">
          <ChevronRight className="size-5" />
        </Link>
        <h1 className="font-bold">پشتیبانی</h1>
      </div>

      {/* Desktop header */}
      <div className="hidden items-center justify-between md:flex">
        <h2 className="text-lg font-bold">پشتیبانی</h2>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
          <Plus className="size-4" />
          تیکت جدید
        </button>
      </div>

      {/* Mobile new ticket button */}
      <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors md:hidden">
        <Plus className="size-4" />
        تیکت جدید
      </button>

      <div className="flex flex-col gap-3">
        {mockTickets.map((ticket) => {
          const config = statusConfig[ticket.status];
          return (
            <Card
              key={ticket.id}
              className="hover:bg-muted/30 cursor-pointer overflow-hidden transition-colors"
            >
              <CardContent className="flex items-start gap-3 p-4">
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">{ticket.subject}</p>
                    <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                      {ticket.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground line-clamp-1 text-sm">{ticket.lastMessage}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                        config.className,
                      )}
                    >
                      {config.icon}
                      {config.label}
                    </span>
                    {ticket.unread > 0 && (
                      <span className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-xs">
                        {ticket.unread}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {mockTickets.length === 0 && (
        <div className="bg-card text-muted-foreground flex flex-col items-center justify-center rounded-xl border py-16">
          <Headphones className="mb-3 size-10 opacity-30" />
          <p className="text-sm">هیچ تیکتی وجود ندارد</p>
        </div>
      )}
    </div>
  );
}
