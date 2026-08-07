"use client";

import { useSearchParams } from "next/navigation";
import { RefreshCw, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogCategories } from "@/features/blog/api/use-blog-categories";

import CategoryCard, { type Category } from "./CategoryCard";

function BlogCategorySkeleton() {
  return (
    <div
      aria-busy="true"
      className="border-border bg-background rounded-[16px] border px-6 pt-4 pb-6"
    >
      <div className="border-border flex items-center gap-2 border-b p-4">
        <Skeleton className="size-6" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function BlogCategoryList() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const { data, error, isLoading, isFetching, refetch } = useBlogCategories();

  if (isLoading) {
    return <BlogCategorySkeleton />;
  }

  if (error && data === undefined) {
    return (
      <section
        className="border-destructive/40 bg-destructive/5 rounded-[16px] border p-4"
        aria-live="polite"
      >
        <p className="body-medium text-destructive">دریافت دسته‌بندی‌های مجله ممکن نشد.</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => refetch()}
        >
          <RefreshCw data-icon="inline-start" className={isFetching ? "animate-spin" : undefined} />
          تلاش دوباره
        </Button>
      </section>
    );
  }

  const categories: Category[] = (data ?? []).map((category) => {
    const categoryValue = String(category.id);

    return {
      id: category.id,
      label: category.title,
      iconName: category.iconName,
      href: `/blog?category=${encodeURIComponent(categoryValue)}`,
      active: categoryValue === activeCategory,
    };
  });

  if (!categories.length) {
    return (
      <section className="border-border bg-background rounded-[16px] border p-6 text-center">
        <Tag className="text-muted-foreground mx-auto size-6" aria-hidden="true" />
        <p className="body-medium text-muted-foreground mt-3">دسته‌بندی‌ای برای مجله وجود ندارد.</p>
      </section>
    );
  }

  return <CategoryCard categories={categories} />;
}
