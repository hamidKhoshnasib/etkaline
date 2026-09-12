import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/Container";

function SidebarCardSkeleton({ rows }: { rows: number }) {
  return (
    <div className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-5">
      <Skeleton className="h-6 w-32" />
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}

export default function BlogLoading() {
  return (
    <Container as="main" className="py-6 sm:py-10">
      <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-start" aria-busy="true">
        <div className="border-border bg-card flex min-w-0 flex-1 flex-col gap-5 rounded-2xl border p-4 sm:p-6">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-9 w-4/5" />
          <Skeleton className="aspect-video w-full rounded-xl" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[308px]">
          <SidebarCardSkeleton rows={5} />
          <SidebarCardSkeleton rows={4} />
        </div>
      </div>
    </Container>
  );
}
