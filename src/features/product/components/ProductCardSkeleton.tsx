import { Skeleton } from "@/shared/ui/atoms";

export function ProductCardSkeleton() {
  return (
    <div
      className="border-border bg-card flex flex-col gap-3 rounded-2xl border p-3"
      aria-hidden="true"
    >
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-2/5" />
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}
