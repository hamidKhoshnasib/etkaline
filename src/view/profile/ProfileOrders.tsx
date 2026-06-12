"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProfileOrderCard } from "./ProfileOrderCard";
import type { Order, OrderStatus, OrderTabFilter } from "./types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderHistoryIcon from "@/assets/icons/icons8_order_history 1.svg";
import InTransitIcon from "@/assets/icons/icons8_in_transit 1.svg";
import ReturnIcon from "@/assets/icons/icons8_return 1.svg";
import BasketIcon from "@/assets/icons/icons8_full_shopping_basket 1.svg";

const statusFilterMap: Record<OrderTabFilter, OrderStatus[]> = {
  all: ["در حال ارسال", "تحویل داده شده", "لغو شده", "مرجوع شده"],
  active: ["در حال ارسال"],
  delivered: ["تحویل داده شده"],
  cancelled: ["لغو شده"],
  returned: ["مرجوع شده"],
};

interface StatusTab {
  key: OrderTabFilter;
  label: string;
  Icon: React.FC<React.SVGAttributes<SVGElement>>;
  count: (orders: Order[]) => number;
}

const STATUS_TABS: StatusTab[] = [
  {
    key: "active",
    label: "سفارش فعال",
    Icon: OrderHistoryIcon,
    count: (orders) => orders.filter((o) => o.status === "در حال ارسال").length,
  },
  {
    key: "delivered",
    label: "تحویل داده شده",
    Icon: InTransitIcon,
    count: (orders) => orders.filter((o) => o.status === "تحویل داده شده").length,
  },
  {
    key: "returned",
    label: "مرجوع شده",
    Icon: ReturnIcon,
    count: (orders) => orders.filter((o) => o.status === "مرجوع شده").length,
  },
  {
    key: "cancelled",
    label: "لغو شده",
    Icon: BasketIcon,
    count: (orders) => orders.filter((o) => o.status === "لغو شده").length,
  },
];

interface ProfileOrdersProps {
  orders: Order[];
}

export function ProfileOrders({ orders }: ProfileOrdersProps) {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState<OrderTabFilter>("active");
  const [activeSubTab, setActiveSubTab] = useState<"current" | "past">("current");

  const filteredOrders = useMemo(() => {
    if (isMobile) {
      return orders.filter((o) =>
        activeSubTab === "current" ? o.status === "در حال ارسال" : o.status !== "در حال ارسال",
      );
    }
    return orders.filter((o) => statusFilterMap[activeFilter].includes(o.status));
  }, [orders, isMobile, activeFilter, activeSubTab]);

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-14">
      {/* ── Mobile header ── */}
      <div className="relative flex items-center justify-center py-1 md:hidden">
        <Link href="/profile" className="text-muted-foreground absolute inset-s-0 p-1">
          <ChevronRight className="size-5" />
        </Link>
        <h1 className="font-bold">سفارش‌های من</h1>
      </div>

      {/* ── Status card tabs — desktop only ── */}
      <div className="hidden md:block">
        <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as OrderTabFilter)}>
          <TabsList className="grid h-auto w-full grid-cols-4 gap-3 rounded-none bg-transparent p-0">
            {STATUS_TABS.map((tab) => {
              const count = tab.count(orders);
              return (
                <TabsTrigger
                  key={tab.key}
                  value={tab.key}
                  className={cn(
                    "h-auto justify-between rounded-xl border p-4 text-right",
                    "border-border bg-card text-foreground hover:bg-muted/60",
                    "data-active:border-violet-400 data-active:bg-violet-50 data-active:text-violet-700",
                    "data-active:shadow-none",
                  )}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm leading-tight font-bold">{tab.label}</span>
                    <span className="text-xs font-normal opacity-70">{count} سفارش</span>
                  </div>
                  <tab.Icon className="size-10 shrink-0" />
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* ── Current / Past sub-tabs ── */}
      <Tabs value={activeSubTab} onValueChange={(v) => setActiveSubTab(v as "current" | "past")}>
        <div className="bg-card rounded-xl border">
          <TabsList
            variant="line"
            className="m-2 h-auto justify-start gap-0 rounded-none bg-transparent p-0"
          >
            {/* DOM: current first → rightmost in RTL (matches screenshot) */}
            {(["current", "past"] as const).map((tab) => {
              const isActive = activeSubTab === tab;
              return (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={cn(
                    "relative h-auto flex-none rounded-none px-5 py-3 text-sm transition-all",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground",
                    // Desktop only: hide built-in underline, use custom amber span
                    "md:gap-1.5 md:after:hidden",
                  )}
                >
                  {tab === "current" ? "سفارشات جاری" : "سفارشات گذشته"}

                  {/* Desktop: green dot */}
                  {isActive && (
                    <span className="hidden size-2 shrink-0 rounded-full bg-green-500 md:inline-block" />
                  )}
                  {/* Desktop: amber underline */}
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 hidden h-0.5 rounded-full bg-amber-400 md:block" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </Tabs>

      {/* ── Order list ── */}
      <div className="flex flex-col gap-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-card text-muted-foreground flex flex-col items-center justify-center rounded-xl border py-16">
            <ShoppingCart className="mb-3 size-10 opacity-30" />
            <p className="text-sm">سفارشی در این بخش وجود ندارد</p>
          </div>
        ) : (
          filteredOrders.map((order) => <ProfileOrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}
