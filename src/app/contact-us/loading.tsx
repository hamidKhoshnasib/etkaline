import { Skeleton } from "@/components/ui/skeleton";

// اسکلتون صفحه تماس با ما؛ فرم واقعی در سمت کاربر بدون پرش نمایش داده می‌شود.
export default function ContactLoading() {
  return (
    <main className="container mx-auto flex-1 px-4 py-10">
      <Skeleton className="mb-6 h-10 w-56" />
      <Skeleton className="h-80 w-full rounded-xl" />
    </main>
  );
}
