import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-6 lg:space-y-10" aria-busy="true" aria-label="در حال بارگذاری محصول">
      <div className="flex h-12 items-center lg:hidden">
        <Skeleton className="h-5 w-2/3" />
      </div>

      <Skeleton className="h-5 w-1/3 lg:w-1/5" />

      <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="w-full min-w-0 space-y-8 lg:w-auto lg:flex-1 lg:space-y-12">
          <section className="flex flex-col gap-6 lg:gap-10 xl:flex-row">
            <div className="flex w-full shrink-0 flex-col gap-3 xl:max-w-[440px]">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="flex justify-center gap-3">
                <Skeleton className="size-16 rounded-lg" />
                <Skeleton className="size-16 rounded-lg" />
                <Skeleton className="size-16 rounded-lg" />
                <Skeleton className="size-16 rounded-lg" />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-5">
              <Skeleton className="h-6 w-4/5 lg:h-7" />
              <Skeleton className="h-4 w-1/4" />
              <div className="flex gap-2">
                <Skeleton className="h-16 flex-1 rounded-lg" />
                <Skeleton className="h-16 flex-1 rounded-lg" />
                <Skeleton className="h-16 flex-1 rounded-lg" />
              </div>
              <Skeleton className="h-20 w-full rounded-xl" />
              <div className="flex gap-3 lg:hidden">
                <Skeleton className="size-10 rounded-full" />
                <Skeleton className="size-10 rounded-full" />
                <Skeleton className="size-10 rounded-full" />
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex gap-3">
              <Skeleton className="h-9 w-24 rounded-lg" />
              <Skeleton className="h-9 w-28 rounded-lg" />
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>
            <Skeleton className="h-28 w-full rounded-xl" />
          </section>
        </div>

        <div className="hidden w-[300px] shrink-0 lg:block">
          <div className="space-y-5 rounded-2xl border p-4">
            <Skeleton className="h-8 w-3/5" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-px w-full" />
            <div className="flex gap-3">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
            </div>
            <Skeleton className="h-11 w-full rounded-full" />
          </div>
        </div>
      </div>

      <div className="bg-background fixed inset-x-0 bottom-0 z-50 flex h-[82px] items-center justify-between gap-3 rounded-t-2xl border-t px-4 lg:hidden">
        <Skeleton className="h-11 w-36 rounded-full" />
        <div className="flex w-24 flex-col gap-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </div>
  );
}
