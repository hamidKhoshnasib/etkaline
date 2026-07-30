import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
  className?: string;
  variant?: "default" | "catalog" | "wishlist";
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

function WishlistProductCardSkeleton({ className }: Pick<ProductCardSkeletonProps, "className">) {
  return (
    <div
      className={cn(
        "bg-card relative min-w-0 overflow-hidden rounded-xl border-0 shadow-none lg:rounded-2xl",
        className,
      )}
      aria-hidden="true"
    >
      <div className="bg-muted relative flex h-[119px] items-center justify-center overflow-hidden lg:h-[190px]">
        <Skeleton className="h-20 w-3/5 rounded-lg bg-slate-200 lg:h-36" />
      </div>
      <div className="mt-2 px-1.5 pb-2 lg:mt-3 lg:px-2">
        <div className="flex h-8 flex-col gap-1">
          <Skeleton className="h-4 w-full bg-slate-200" />
          <Skeleton className="h-4 w-3/4 bg-slate-200" />
        </div>
        <div className="mt-3 w-full">
          <div className="flex h-12.5 flex-col">
            <div className="flex items-center justify-between gap-1.5">
              <Skeleton className="h-5 w-8 rounded-lg bg-slate-200" />
              <Skeleton className="h-4 w-12 bg-slate-200" />
            </div>
            <div className="mt-auto flex items-center justify-between">
              <Skeleton className="h-4 w-16 bg-slate-200" />
              <Skeleton className="h-4 w-4 bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton({ className, variant = "default" }: ProductCardSkeletonProps) {
  if (variant === "catalog") {
    return <CatalogProductCardSkeleton className={className} />;
  }

  if (variant === "wishlist") {
    return <WishlistProductCardSkeleton className={className} />;
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
