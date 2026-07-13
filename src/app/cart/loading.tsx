import { CartSkeleton } from "@/features/cart";

export default function CartLoading() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <CartSkeleton />
    </main>
  );
}
