"use client";

import { ShoppingBag } from "lucide-react";

import { useFactors } from "@/features/account/api/use-factors";
import { OrderDetailView } from "@/features/account/components/OrderDetailView";
import { OrdersSkeleton } from "@/features/account/components/OrdersSkeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function OrderDetailClient({ factorNumber }: { factorNumber: string }) {
  const { data, error, isLoading } = useFactors({ factorNumber });

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  const order = data?.orders[0];
  if (error || !order) {
    return (
      <Empty className="bg-background min-h-80 border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingBag aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>{error ? "دریافت سفارش ناموفق بود" : "سفارش پیدا نشد"}</EmptyTitle>
          <EmptyDescription>
            {error?.message ?? "ممکن است سفارش موردنظر در دسترس شما نباشد."}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return <OrderDetailView order={order} />;
}
