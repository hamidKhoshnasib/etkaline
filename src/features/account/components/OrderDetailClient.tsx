"use client";

import { ShoppingBag } from "lucide-react";

import { useFactorDetails } from "@/features/account/api/use-factor-details";
import { OrderDetailView } from "@/features/account/components/OrderDetailView";
import { OrdersSkeleton } from "@/features/account/components/OrdersSkeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function OrderDetailClient({ factorId }: { factorId: string }) {
  const { data: order, error, isLoading } = useFactorDetails(factorId);

  if (isLoading) {
    return <OrdersSkeleton />;
  }

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
