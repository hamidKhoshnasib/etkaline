"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Pagination } from "@/components/ui/Pagination";
import { FilterSidebar } from "./FilterSidebar";
import { SortBar } from "./SortBar";

const sampleProducts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
  image: "https://via.placeholder.com/180x180?text=Product",
  price: 580000000,
  originalPrice: 828000000,
  discount: 30,
}));

const TOTAL_PRODUCTS = 114867340;
const TOTAL_PAGES = 9;

export default function ProductsPage() {
  const [sort, setSort] = useState("bestselling");
  const [page, setPage] = useState(5);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  return (
    <main className="container mx-auto py-6">
      <div className="flex gap-6">
        <FilterSidebar
          onlyAvailable={onlyAvailable}
          onToggleAvailable={setOnlyAvailable}
          onClearFilters={() => setOnlyAvailable(false)}
        />

        {/* Product area */}
        <div className="min-w-0 flex-1">
          <SortBar sort={sort} onSort={setSort} total={TOTAL_PRODUCTS} />

          <div className="my-4 h-px bg-gray-100" />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {sampleProducts.map((p) => (
              <ProductCard key={p.id} {...p} className="border-none!" />
            ))}
          </div>

          <div className="flex justify-center py-6.5">
            <Pagination page={page} total={TOTAL_PAGES} onChange={setPage} />
          </div>
        </div>
      </div>
    </main>
  );
}
