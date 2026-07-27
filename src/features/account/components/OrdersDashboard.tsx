"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { OrderCard } from "@/features/account/components/OrderCard";
import { OrderStats } from "@/features/account/components/OrderStats";
import { MOCK_ORDERS } from "@/features/account/model/mock-orders";

function OrdersList({ previous = false }: { previous?: boolean }) {
  const orders = previous
    ? MOCK_ORDERS.slice(0, 5).map((order) => ({ ...order, status: "delivered" as const }))
    : MOCK_ORDERS;

  return (
    <div className="flex flex-col gap-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} history={previous} />
      ))}
    </div>
  );
}

export function OrdersDashboard() {
  return (
    <div className="bg-muted/60 flex min-w-0 flex-col gap-0 lg:gap-4 lg:bg-transparent">
      <div className="relative flex h-18 items-center justify-center bg-white lg:hidden">
        <Link
          href="/account/profile"
          aria-label="بازگشت به پروفایل"
          className="text-secondary absolute start-4 rounded-lg p-2"
        >
          <ChevronRight aria-hidden="true" />
        </Link>
        <h1 className="text-secondary text-lg font-bold">سفارش‌های من</h1>
      </div>

      <OrderStats />

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
          <OrdersList />
        </TabsContent>
        <TabsContent value="previous" className="p-4 lg:p-3">
          <OrdersList previous />
        </TabsContent>
      </Tabs>
    </div>
  );
}
