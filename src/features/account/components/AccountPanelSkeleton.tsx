import { Skeleton } from "@/components/ui/skeleton";

// اسکلتون پنل حساب برای جلوگیری از پرش چیدمان در صفحات خصوصی.
export function AccountPanelSkeleton() {
  return <Skeleton className="h-40 w-full rounded-xl" aria-label="در حال بارگذاری حساب کاربری" />;
}
