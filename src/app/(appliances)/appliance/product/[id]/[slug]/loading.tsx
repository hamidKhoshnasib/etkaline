import { Container } from "@/components/ui/Container";
import { ProductDetailSkeleton } from "@/features/product";

export default function ApplianceProductLoading() {
  return (
    <Container as="main" className="min-h-screen pt-20 pb-28 lg:px-6 lg:py-6">
      <ProductDetailSkeleton />
    </Container>
  );
}
