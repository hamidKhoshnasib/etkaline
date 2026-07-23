"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronLeft,
  Clock3,
  Headphones,
  Heart,
  LogOut,
  MapPin,
  Pencil,
  ShoppingCart,
  UserPlus,
  WalletCards,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderStats } from "@/features/account/components/OrderStats";
import { cn } from "@/lib/utils";

interface AccountLink {
  label: string;
  href: string;
  icon: typeof ShoppingCart;
  badge?: string;
}

const ACCOUNT_LINKS: ReadonlyArray<AccountLink> = [
  { label: "سفارش‌های من", href: "/account/orders", icon: ShoppingCart },
  { label: "آدرس‌ها", href: "/account/addresses", icon: MapPin },
  { label: "پیام‌ها", href: "/account/reviews", icon: Bell, badge: "۲" },
  { label: "لیست‌های من", href: "/account/wishlist", icon: Heart },
];

const SECONDARY_ITEMS = [
  { label: "پشتیبانی", icon: Headphones, badge: "۲" },
  { label: "دعوت از دوستان", icon: UserPlus },
  { label: "آخرین ورود و خروج", icon: Clock3 },
] as const;

function SidebarItem({
  label,
  icon: Icon,
  badge,
  mobileHidden = false,
}: {
  label: string;
  icon: typeof Headphones;
  badge?: string;
  mobileHidden?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "text-muted-foreground hover:bg-muted min-h-16 w-full items-center gap-3 px-5 text-start transition-colors lg:min-h-12 lg:rounded-xl lg:px-3",
        mobileHidden ? "hidden lg:flex" : "flex",
      )}
    >
      <Icon aria-hidden="true" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="bg-primary-hover flex size-5 items-center justify-center rounded-full text-xs text-white">
          {badge}
        </span>
      )}
      <ChevronLeft aria-hidden="true" />
    </button>
  );
}

export function AccountSidebar() {
  const pathname = usePathname();
  const isProfileHome = pathname === "/account/profile" || pathname === "/account";

  return (
    <div
      className={cn(
        "flex flex-col gap-0 lg:sticky lg:top-4 lg:gap-4",
        !isProfileHome && "hidden lg:flex",
      )}
    >
      <Card className="gap-0 rounded-none border-x-0 border-t-0 py-0 shadow-none lg:gap-4 lg:rounded-2xl lg:border">
        <CardHeader className="grid min-h-27 grid-cols-[1fr_auto] items-center gap-2 px-5 py-6 lg:min-h-0 lg:px-6 lg:pt-6 lg:pb-4">
          <div>
            <p className="text-secondary font-bold">سلام محمدرضا!</p>
            <p className="text-muted-foreground mt-2 text-sm">به فروشگاه اتکالاین خوش آمدید.</p>
          </div>
          <Link
            href="/account/profile"
            aria-label="ویرایش پروفایل"
            className="text-muted-foreground hover:text-primary-hover rounded-lg p-1 transition-colors"
          >
            <Pencil aria-hidden="true" />
          </Link>
        </CardHeader>
        <CardContent className="px-0 pb-0 lg:px-6 lg:pb-6">
          <Separator />
          <div className="text-secondary flex min-h-13 items-center justify-between gap-3 px-5 font-bold lg:min-h-0 lg:px-0 lg:pt-5">
            <div className="flex items-center gap-2">
              <WalletCards aria-hidden="true" />
              <span>کیف پول</span>
            </div>
            <span className="whitespace-nowrap">۳۰۴,۵۶۲,۵۰۰</span>
          </div>
        </CardContent>
      </Card>

      <OrderStats mobile />

      <Card className="rounded-none border-0 py-0 shadow-none lg:rounded-2xl lg:border lg:py-3">
        <CardContent className="px-0 lg:px-3">
          <nav aria-label="ناوبری حساب کاربری" className="flex flex-col lg:gap-1">
            {ACCOUNT_LINKS.map(({ label, href, icon: Icon, badge }) => {
              const isActive =
                pathname.startsWith(href) || (isProfileHome && href === "/account/orders");

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex min-h-16 items-center gap-3 px-5 text-sm transition-colors lg:min-h-12 lg:rounded-xl lg:px-3 lg:text-base",
                    isActive
                      ? "from-primary/15 text-primary-hover border-primary min-h-14 border-s-4 bg-linear-to-l to-transparent font-medium lg:min-h-12"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Icon aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{label}</span>
                  {badge && (
                    <span className="bg-primary-hover flex size-5 shrink-0 items-center justify-center rounded-full text-xs text-white">
                      {badge}
                    </span>
                  )}
                  <ChevronLeft aria-hidden="true" />
                </Link>
              );
            })}

            <div>
              {SECONDARY_ITEMS.map((item, index) => (
                <SidebarItem key={item.label} {...item} mobileHidden={index === 2} />
              ))}
            </div>

            <button
              type="button"
              className="text-destructive flex min-h-16 items-center gap-3 px-5 text-start lg:min-h-12 lg:rounded-xl lg:px-3"
            >
              <LogOut aria-hidden="true" />
              <span>خروج از حساب کاربری</span>
            </button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
