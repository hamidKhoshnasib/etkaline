import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      <div
        className="flex min-w-0 flex-col gap-7"
        aria-busy="true"
        aria-label="در حال بارگذاری سبد خرید"
      >
        <section className="flex flex-col gap-3">
          <div className="mb-2 flex items-center justify-between px-1">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-6 w-14" />
          </div>
          {Array.from({ length: count }, (_, index) => (
            <div
              key={index}
              className="bg-card border-border grid min-h-32 grid-cols-[5.5rem_minmax(0,1fr)] gap-3 rounded-xl border p-3 sm:grid-cols-[6.5rem_minmax(0,1fr)_7rem] sm:p-4"
            >
              <Skeleton className="size-22 sm:size-26" />
              <div className="flex min-w-0 flex-col gap-3">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="mt-auto h-5 w-28" />
              </div>
              <Skeleton className="col-start-2 h-8 w-24 justify-self-end rounded-full sm:col-start-3 sm:self-end" />
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-5">
          <Skeleton className="h-7 w-40" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-64 rounded-xl" />
            ))}
          </div>
        </section>
      </div>

      <div className="bg-card border-border h-fit rounded-2xl border p-5 lg:sticky lg:top-36">
        <Skeleton className="mx-auto mb-6 h-7 w-32" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-11 w-full rounded-full" />
        </div>
      </div>
    </>
  );
}
