import { Skeleton } from "@/components/ui/skeleton";

const CATEGORY_PLACEHOLDERS = [
  "category-1",
  "category-2",
  "category-3",
  "category-4",
  "category-5",
];
const CARD_PLACEHOLDERS = ["card-1", "card-2", "card-3", "card-4"];

export function HomeHeroSkeleton() {
  return (
    <section
      className="mt-[7px] h-40 w-full px-2 sm:h-48 lg:mt-6 lg:h-[460px] lg:px-0"
      aria-busy="true"
    >
      <Skeleton className="size-full rounded-lg" />
    </section>
  );
}

export function HomeCategoriesSkeleton() {
  return (
    <div
      className="-mx-4 flex w-[calc(100%+2rem)] gap-3 overflow-hidden px-4 lg:mx-0 lg:w-full lg:justify-between lg:gap-2 lg:px-0"
      aria-busy="true"
    >
      {CATEGORY_PLACEHOLDERS.map((placeholder) => (
        <div
          key={placeholder}
          className="flex w-16 shrink-0 flex-col items-center gap-1.5 lg:gap-2"
        >
          <Skeleton className="size-14 rounded-full lg:size-20" />
          <Skeleton className="h-4 w-14" />
        </div>
      ))}
    </div>
  );
}

export function HomeLayoutSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-9" aria-busy="true">
      <Skeleton className="h-72 w-full rounded-2xl sm:h-96 sm:rounded-[28px]" />
      <Skeleton className="h-72 w-full rounded-2xl sm:h-96 sm:rounded-[28px]" />
    </div>
  );
}

export function HomeLayoutItemSkeleton() {
  return <Skeleton className="h-72 w-full rounded-2xl sm:h-96 sm:rounded-[28px]" />;
}

export function HomeBrandsSkeleton() {
  return (
    <section
      className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-3 sm:rounded-[28px] sm:p-4"
      aria-busy="true"
    >
      <Skeleton className="mx-auto mb-3 h-6 w-32 sm:mb-4" />
      <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-4">
        {CATEGORY_PLACEHOLDERS.map((placeholder) => (
          <Skeleton
            key={placeholder}
            className="h-12 w-full rounded-xl sm:h-26.25 sm:w-[102.5px]"
          />
        ))}
      </div>
    </section>
  );
}

export function HomeBlogSkeleton() {
  return (
    <section
      className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-3 lg:rounded-[28px] lg:p-5"
      aria-busy="true"
    >
      <div className="mb-3 flex items-center justify-between lg:mb-5">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
        {CARD_PLACEHOLDERS.map((placeholder) => (
          <div key={placeholder} className="overflow-hidden rounded-2xl border">
            <Skeleton className="aspect-[1.15] w-full rounded-none lg:aspect-auto lg:h-[246px]" />
            <div className="space-y-2 p-2.5 lg:p-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
