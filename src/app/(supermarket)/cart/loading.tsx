import { CartSkeleton } from "@/features/cart";
import { Container } from "@/components/ui/Container";

export default function CartLoading() {
  return (
    <main className="bg-muted/60 min-h-screen py-8">
      <Container className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <CartSkeleton />
      </Container>
    </main>
  );
}
