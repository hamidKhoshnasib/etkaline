"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  MapPin,
  Bell,
  Heart,
  Headphones,
  UserPlus,
  Clock,
  LogOut,
  ChevronLeft,
  Wallet,
  Store,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarMenu, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { UserProfile } from "./types";

interface NavItem {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "سفارش‌های من", href: "/profile", Icon: ShoppingCart },
  { label: "آدرس‌ها", href: "/profile/addresses", Icon: MapPin },
  { label: "پیام‌ها", href: "/profile/messages", Icon: Bell, badge: 2 },
  { label: "لیست‌های من", href: "/profile/wishlists", Icon: Heart },
  { label: "پشتیبانی", href: "/profile/support", Icon: Headphones, badge: 2 },
  { label: "دعوت از دوستان", href: "/profile/invite", Icon: UserPlus },
  { label: "آخرین ورود و خروج", href: "/profile/activity", Icon: Clock },
];

interface ProfileSidebarProps {
  user: UserProfile;
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-3 md:flex">
      {/* ── User info ── */}
      <Card>
        <CardContent className="px-4 pt-4 pb-3">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="text-base font-bold">سلام {user.name}!</p>
              <p className="text-muted-foreground mt-0.5 text-sm">به فروشگاه اتکالاین خوش آمدید</p>
            </div>
            <Store className="text-primary size-6" />
          </div>
          <div className="bg-muted/60 flex items-center gap-2 rounded-xl px-3 py-2.5">
            <Wallet className="text-primary size-5" />
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">موجودی کیف پول</span>
              <span className="text-sm font-bold tabular-nums">
                {user.walletBalance.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

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
                    {/* icon — first DOM = rightmost in RTL */}
                    <item.Icon
                      className={cn(
                        "size-5 shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    {/* label fills remaining width */}
                    <span className="flex-1">{item.label}</span>
                    {/* badge */}
                    {item.badge !== undefined && (
                      <span className="bg-primary flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                    {/* chevron — last DOM = leftmost in RTL */}
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
    </aside>
  );
}
