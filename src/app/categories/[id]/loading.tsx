import { ProductGridSkeleton } from "@/features/product";
import { Container } from "@/components/ui/Container";

export default function CategoryProductsLoading() {
  return (
    <Container as="main" className="flex min-h-screen flex-col gap-6 py-8">
      <ProductGridSkeleton />
    </Container>
  );
}
