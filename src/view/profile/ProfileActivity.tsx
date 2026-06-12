import { Clock, Smartphone, Monitor, LogIn, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockActivity = [
  {
    id: 1,
    type: "login" as const,
    device: "mobile" as const,
    deviceLabel: "iPhone 14",
    location: "تهران، ایران",
    date: "۱۴۰۵/۰۲/۰۶",
    time: "۱۸:۴۶",
    isCurrent: true,
  },
  {
    id: 2,
    type: "logout" as const,
    device: "desktop" as const,
    deviceLabel: "Chrome / Windows",
    location: "تهران، ایران",
    date: "۱۴۰۵/۰۲/۰۳",
    time: "۱۴:۲۲",
    isCurrent: false,
  },
  {
    id: 3,
    type: "login" as const,
    device: "desktop" as const,
    deviceLabel: "Chrome / Windows",
    location: "تهران، ایران",
    date: "۱۴۰۵/۰۲/۰۳",
    time: "۱۰:۰۵",
    isCurrent: false,
  },
  {
    id: 4,
    type: "login" as const,
    device: "mobile" as const,
    deviceLabel: "Samsung Galaxy S23",
    location: "اصفهان، ایران",
    date: "۱۴۰۵/۰۱/۲۸",
    time: "۰۹:۳۱",
    isCurrent: false,
  },
];

export function ProfileActivity() {
  return (
    <div className="flex flex-col gap-4">
      {/* Mobile back header */}
      <div className="relative flex items-center justify-center py-1 md:hidden">
        <Link href="/profile" className="text-muted-foreground absolute inset-s-0 p-1">
          <ChevronRight className="size-5" />
        </Link>
        <h1 className="font-bold">آخرین ورود و خروج</h1>
      </div>

      <h2 className="hidden text-lg font-bold md:block">آخرین ورود و خروج</h2>

      <div className="flex flex-col gap-2">
        {mockActivity.map((item) => (
          <Card
            key={item.id}
            className={cn("overflow-hidden", item.isCurrent && "border-primary/40 bg-primary/5")}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  item.type === "login"
                    ? "bg-green-50 text-green-600"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {item.type === "login" ? (
                  <LogIn className="size-4" />
                ) : (
                  <LogOut className="size-4" />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {item.type === "login" ? "ورود" : "خروج"}
                  </span>
                  {item.isCurrent && (
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                      جلسه فعلی
                    </span>
                  )}
                </div>
                <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  {item.device === "mobile" ? (
                    <Smartphone className="size-3.5" />
                  ) : (
                    <Monitor className="size-3.5" />
                  )}
                  <span>{item.deviceLabel}</span>
                  <span>·</span>
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
                <Clock className="size-3.5" />
                <span className="tabular-nums">
                  {item.date} {item.time}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
