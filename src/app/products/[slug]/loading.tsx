import { ProductDetailSkeleton } from "@/features/product";

export default function ProductDetailLoading() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <ProductDetailSkeleton />
    </main>
  );
}
