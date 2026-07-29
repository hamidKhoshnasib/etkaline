"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStats } from "@/features/account/components/OrderStats";
import { useProfile } from "@/features/account/api/use-profile";
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
  { label: "آخرین ورود و خروج", href: "/account/login-logs", icon: Clock3 },
] as const;

function SidebarItem({
  label,
  icon: Icon,
  badge,
  mobileHidden = false,
  href,
  active = false,
  onSelect,
}: {
  label: string;
  icon: typeof Headphones;
  badge?: string;
  mobileHidden?: boolean;
  href?: string;
  active?: boolean;
  onSelect?: () => void;
}) {
  const className = cn(
    "min-h-16 w-full items-center gap-3 px-5 text-start transition-colors lg:min-h-12 lg:rounded-xl lg:px-3",
    active
      ? "from-primary/15 text-primary-hover border-primary min-h-14 border-s-4 bg-linear-to-l to-transparent font-medium lg:min-h-12"
      : "text-muted-foreground hover:bg-muted",
    mobileHidden ? "hidden lg:flex" : "flex",
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        <Icon aria-hidden="true" />
        <span className="flex-1">{label}</span>
        {badge && (
          <span className="bg-primary-hover flex size-5 items-center justify-center rounded-full text-xs text-white">
            {badge}
          </span>
        )}
        <ChevronLeft aria-hidden="true" />
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onSelect}>
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
  const [selectedSecondaryItem, setSelectedSecondaryItem] = useState<string | null>(null);
  const { data: profile, isLoading, sessionStatus } = useProfile();
  const isProfileHome = pathname === "/account/profile" || pathname === "/account";
  const isProfileLoading = sessionStatus === "loading" || isLoading;
  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");

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
            {isProfileLoading ? (
              <div className="space-y-2" aria-label="در حال دریافت اطلاعات پروفایل">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            ) : (
              <>
                <p className="text-secondary font-bold">
                  {fullName ? `سلام ${fullName}!` : "حساب کاربری"}
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  {profile?.mobile || "به فروشگاه اتکالاین خوش آمدید."}
                </p>
              </>
            )}
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
          {isProfileLoading ? (
            <div
              className="flex min-h-13 items-center justify-between gap-3 px-5 lg:min-h-0 lg:px-0 lg:pt-5"
              aria-busy="true"
              aria-label="در حال دریافت اطلاعات حساب کاربری"
            >
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-28" />
            </div>
          ) : (
            <div className="text-secondary flex min-h-13 items-center justify-between gap-3 px-5 font-bold lg:min-h-0 lg:px-0 lg:pt-5">
              <div className="flex items-center gap-2">
                <WalletCards aria-hidden="true" />
                <span>کیف پول</span>
              </div>
              <span className="whitespace-nowrap">۳۰۴,۵۶۲,۵۰۰</span>
            </div>
          )}
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
              {SECONDARY_ITEMS.map((item, index) => {
                const itemHref = "href" in item ? item.href : undefined;

                return (
                  <SidebarItem
                    key={item.label}
                    {...item}
                    mobileHidden={index === 2}
                    active={
                      selectedSecondaryItem === item.label ||
                      (itemHref !== undefined && pathname.startsWith(itemHref))
                    }
                    onSelect={() => setSelectedSecondaryItem(item.label)}
                  />
                );
              })}
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
