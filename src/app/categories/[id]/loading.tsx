import { ProductGridSkeleton } from "@/features/product";

export default function CategoryProductsLoading() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-6 px-4 py-8">
      <ProductGridSkeleton />
    </main>
  );
}
