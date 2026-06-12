"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Bell,
  Heart,
  Headphones,
  UserPlus,
  Clock,
  LogOut,
  ChevronLeft,
  ShoppingCart,
  Wallet,
} from "lucide-react";
// @ts-expect-error – SVGs via SVGR
import OrderHistoryIcon from "@/assets/icons/icons8_order_history 1.svg";
// @ts-expect-error – SVGs via SVGR
import InTransitIcon from "@/assets/icons/icons8_in_transit 1.svg";
// @ts-expect-error – SVGs via SVGR
import ReturnIcon from "@/assets/icons/icons8_return 1.svg";
// @ts-expect-error – SVGs via SVGR
import BasketIcon from "@/assets/icons/icons8_full_shopping_basket 1.svg";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarMenu, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { Order, UserProfile } from "./types";

const navItems = [
  { label: "سفارش‌های من", href: "/profile/orders", Icon: ShoppingCart },
  { label: "آدرس‌ها", href: "/profile/addresses", Icon: MapPin },
  { label: "پیام‌ها", href: "/profile/messages", Icon: Bell, badge: 2 },
  { label: "لیست‌های من", href: "/profile/wishlists", Icon: Heart },
  { label: "پشتیبانی", href: "/profile/support", Icon: Headphones, badge: 2 },
  { label: "دعوت از دوستان", href: "/profile/invite", Icon: UserPlus },
  { label: "آخرین ورود و خروج", href: "/profile/activity", Icon: Clock },
] as const;

interface ProfileMobileHomeProps {
  user: UserProfile;
  orders: Order[];
}

export function ProfileMobileHome({ user, orders }: ProfileMobileHomeProps) {
  const pathname = usePathname();

  const stats = [
    {
      label: "سفارشات",
      count: orders.length,
      Icon: OrderHistoryIcon,
      href: "/profile",
    },
    {
      label: "لغو شده",
      count: orders.filter((o) => o.status === "لغو شده").length,
      Icon: BasketIcon,
      href: "/profile",
    },
    {
      label: "مرجوع شده",
      count: orders.filter((o) => o.status === "مرجوع شده").length,
      Icon: ReturnIcon,
      href: "/profile",
    },
    {
      label: "تحویل شده",
      count: orders.filter((o) => o.status === "تحویل داده شده").length,
      Icon: InTransitIcon,
      href: "/profile",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ── User + wallet ── */}
      <Card>
        <CardContent className="px-4 pt-4 pb-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">به فروشگاه اتکالاین خوش آمدید</p>
            <p className="font-bold">سلام {user.name}!</p>
          </div>
          <div className="bg-muted/60 flex items-center justify-between rounded-xl px-4 py-3">
            <span className="text-sm font-bold tabular-nums">
              {user.walletBalance.toLocaleString("fa-IR")} تومان
            </span>
            <div className="text-muted-foreground flex items-center gap-1.5">
              <span className="text-sm">موجودی</span>
              <Wallet className="text-primary size-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Order stats grid ── */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-card flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-4 text-center shadow-sm"
          >
            <stat.Icon className="size-8 shrink-0" />
            <span className="text-sm font-bold tabular-nums">{stat.count}</span>
            <span className="text-muted-foreground text-[10px] leading-tight">{stat.label}</span>
          </Link>
        ))}
      </div>

      {/* ── Navigation ── */}
      <Card>
        <CardContent className="px-2 py-2">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted/60",
                    )}
                  >
                    <item.Icon
                      className={cn(
                        "size-5 shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <span className="flex-1">{item.label}</span>
                    {"badge" in item && item.badge !== undefined && (
                      <span className="bg-primary flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                    <ChevronLeft className="text-muted-foreground size-4 shrink-0" />
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>

          <SidebarSeparator className="bg-border my-1" />

          <SidebarMenu>
            <SidebarMenuItem>
              <button
                onClick={() => {}}
                className="text-destructive hover:bg-destructive/10 flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm transition-colors"
              >
                <LogOut className="size-5 shrink-0" />
                <span>خروج از حساب کاربری</span>
              </button>
            </SidebarMenuItem>
          </SidebarMenu>
        </CardContent>
      </Card>
    </div>
  );
}
