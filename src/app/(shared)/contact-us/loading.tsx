import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/Container";

// اسکلتون صفحه تماس با ما؛ فرم واقعی در سمت کاربر بدون پرش نمایش داده می‌شود.
export default function ContactLoading() {
  return (
    <Container as="main" className="flex-1 py-10">
      <Skeleton className="mb-6 h-10 w-56" />
      <Skeleton className="h-80 w-full rounded-xl" />
    </Container>
  );
}
