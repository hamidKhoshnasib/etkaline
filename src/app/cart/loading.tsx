import { CartSkeleton } from "@/features/cart";
import { Container } from "@/components/ui/Container";

export default function CartLoading() {
  return (
    <Container as="main" className="min-h-screen py-8">
      <CartSkeleton />
    </Container>
  );
}
