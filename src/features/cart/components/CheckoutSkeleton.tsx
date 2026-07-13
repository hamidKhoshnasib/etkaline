import { Skeleton } from "@/shared/ui/atoms";

// skeleton مشترک مراحل آدرس و مرور سفارش با جهت RTL
export function CheckoutSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="در حال بارگذاری مراحل سفارش">
      <Skeleton className="h-16 w-full rounded-2xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
      <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-4/5" />
      </div>
      <Skeleton className="h-28 w-full rounded-2xl" />
    </div>
  );
}

export function OrderSummarySkeleton() {
  return (
    <aside className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-white p-5" aria-busy="true">
      <Skeleton className="mx-auto h-6 w-2/5" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-14 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-full" />
    </aside>
  );
}
