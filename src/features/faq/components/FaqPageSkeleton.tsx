import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/Container";

export function FaqPageSkeleton() {
  return (
    <Container as="main" className="flex flex-col gap-8 py-6 lg:gap-10 lg:py-10" aria-busy="true">
      <Skeleton className="h-5 w-44" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-52" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>
      <Skeleton className="h-14 w-full rounded-xl" />
      <div className="flex justify-center gap-3">
        <Skeleton className="h-10 w-28 rounded-full" />
        <Skeleton className="h-10 w-28 rounded-full" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <div className="flex flex-col gap-8">
        {Array.from({ length: 3 }, (_, sectionIndex) => (
          <section key={sectionIndex} className="flex flex-col gap-3">
            <Skeleton className="h-8 w-40" />
            {Array.from({ length: 3 }, (_, itemIndex) => (
              <Skeleton key={itemIndex} className="h-16 w-full rounded-xl" />
            ))}
          </section>
        ))}
      </div>
    </Container>
  );
}
