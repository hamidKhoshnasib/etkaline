"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingBag } from "lucide-react";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { useFactors } from "@/features/account/api/use-factors";
import { OrderCard } from "@/features/account/components/OrderCard";
import { OrderStats } from "@/features/account/components/OrderStats";
import { OrdersSkeleton } from "@/features/account/components/OrdersSkeleton";
import type { MockOrder } from "@/features/account/model/mock-orders";

function OrdersList({ orders, previous = false }: { orders: MockOrder[]; previous?: boolean }) {
  if (orders.length === 0) {
    return (
      <Empty className="min-h-64 border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingBag aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>سفارشی برای نمایش وجود ندارد</EmptyTitle>
          <EmptyDescription>
            پس از ثبت سفارش، جزئیات آن در این بخش نمایش داده می‌شود.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} history={previous} />
      ))}
    </div>
  );
}

export function OrdersDashboard() {
  const { data, error, isLoading } = useFactors();
  const orders = data?.orders ?? [];
  const currentOrders = orders.filter(
    (order) => order.status === "open" || order.status === "paid",
  );
  const previousOrders = orders.filter(
    (order) => order.status === "delivered" || order.status === "canceled",
  );

  return (
    <div className="bg-muted/60 flex min-w-0 flex-col gap-0 lg:gap-4 lg:bg-transparent">
      <MobilePageHeader fallbackHref="/account/profile" title="سفارش‌های من" />

      {isLoading ? (
        <OrdersSkeleton />
      ) : error ? (
        <Empty className="bg-background m-4 min-h-64 border lg:m-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingBag aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>دریافت سفارش‌ها ناموفق بود</EmptyTitle>
            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <OrderStats orders={orders} />

          <Tabs
            defaultValue="current"
            className="gap-0 overflow-hidden bg-transparent p-0 lg:rounded-2xl lg:border lg:bg-white"
          >
            <TabsList
              variant="line"
              aria-label="وضعیت سفارش‌ها"
              className="bg-muted mx-4 mt-2 w-[calc(100%-2rem)] justify-start gap-0 rounded-full border-0 p-0 group-data-horizontal/tabs:h-12 lg:mx-0 lg:mt-0 lg:w-full lg:rounded-none lg:border-b lg:bg-transparent lg:px-4 lg:group-data-horizontal/tabs:h-14"
            >
              <TabsTrigger
                value="current"
                className="data-active:bg-primary! data-active:text-secondary h-full max-w-none rounded-full px-5 after:hidden data-active:font-bold lg:max-w-40 lg:rounded-none lg:after:bottom-[-1px] lg:after:block lg:after:bg-[#FFCD49] lg:data-active:bg-transparent!"
              >
                سفارشات جاری
              </TabsTrigger>
              <TabsTrigger
                value="previous"
                className="data-active:bg-primary! data-active:text-secondary h-full max-w-none rounded-full px-5 after:hidden data-active:font-bold lg:max-w-40 lg:rounded-none lg:after:bottom-[-1px] lg:after:block lg:after:bg-[#FFCD49] lg:data-active:bg-transparent!"
              >
                سفارشات گذشته
              </TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="p-4 lg:p-3">
              <OrdersList orders={currentOrders} />
            </TabsContent>
            <TabsContent value="previous" className="p-4 lg:p-3">
              <OrdersList orders={previousOrders} previous />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
