import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
  className?: string;
  variant?: "default" | "catalog";
}

function CatalogProductCardSkeleton({ className }: Pick<ProductCardSkeletonProps, "className">) {
  return (
    <div
      className={cn(
        "flex h-[130px] gap-2 overflow-hidden rounded-[8px] border border-slate-200 bg-white p-2 lg:h-[310px] lg:flex-col lg:gap-0 lg:rounded-xl lg:border-0 lg:bg-[#F1F5F9] lg:p-0",
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton className="h-full w-[113px] shrink-0 rounded-[4px] bg-slate-200 lg:h-[190px] lg:w-full lg:rounded-none" />
      <div className="flex min-w-0 flex-1 flex-col py-1 lg:w-full lg:flex-none lg:px-2 lg:py-2">
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-full bg-slate-200" />
          <Skeleton className="h-4 w-3/5 bg-slate-200" />
        </div>
        <div className="mt-auto flex flex-col items-end gap-2">
          <Skeleton className="h-3 w-2/5 bg-slate-200" />
          <Skeleton className="h-5 w-3/5 bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton({ className, variant = "default" }: ProductCardSkeletonProps) {
  if (variant === "catalog") {
    return <CatalogProductCardSkeleton className={className} />;
  }

  return (
    <div
      className={cn("border-border bg-card flex flex-col gap-3 rounded-2xl border p-3", className)}
      aria-hidden="true"
    >
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-2/5" />
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}
