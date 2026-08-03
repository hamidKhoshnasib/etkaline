import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/Container";

// اسکلتون فهرست وبلاگ برای حفظ چیدمان در زمان دریافت محتوای backend.
export default function BlogLoading() {
  return (
    <Container as="main" className="flex-1 py-10">
      <Skeleton className="mb-6 h-10 w-48" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </Container>
  );
}
