import { ProductDetailSkeleton } from "@/features/product";
import { Container } from "@/components/ui/Container";

export default function ProductDetailLoading() {
  return (
    <Container as="main" className="min-h-screen py-8">
      <ProductDetailSkeleton />
    </Container>
  );
}
