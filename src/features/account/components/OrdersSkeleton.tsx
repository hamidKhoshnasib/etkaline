import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-label="در حال بارگذاری سفارش‌ها" aria-busy="true">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-22 rounded-2xl" />
        ))}
      </div>
      <Card className="rounded-2xl py-0 shadow-none">
        <CardContent className="flex flex-col gap-3 px-3 py-4">
          <Skeleton className="h-12 w-full rounded-lg" />
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-36 w-full rounded-xl" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
