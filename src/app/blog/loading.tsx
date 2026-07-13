import { Skeleton } from "@/components/ui/skeleton";

// اسکلتون فهرست وبلاگ برای حفظ چیدمان در زمان دریافت محتوای backend.
export default function BlogLoading() {
  return (
    <main className="container mx-auto flex-1 px-4 py-10">
      <Skeleton className="mb-6 h-10 w-48" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </main>
  );
}
