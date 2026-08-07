"use client";

import { useSearchParams } from "next/navigation";
import { FileText, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/features/blog/api/use-blog-posts";

import BlogCard from "./BlogCard";

const POST_COUNT = 9;

function parseCategoryId(value: string | null): number | undefined {
  if (!value) {
    return undefined;
  }

  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : undefined;
}

function BlogPostGridSkeleton() {
  return (
    <div aria-busy="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: POST_COUNT }, (_, index) => (
        <div key={index} className="border-border overflow-hidden rounded-[16px] border">
          <Skeleton className="aspect-[1.15] w-full rounded-none lg:aspect-auto lg:h-[246px]" />
          <div className="flex flex-col gap-3 p-4">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogPostList() {
  const searchParams = useSearchParams();
  const categoryId = parseCategoryId(searchParams.get("category"));
  const { data, error, isLoading, isFetching, refetch } = useBlogPosts({ categoryId });

  if (isLoading) {
    return <BlogPostGridSkeleton />;
  }

  if (error && data === undefined) {
    return (
      <Empty className="border-destructive/40 bg-destructive/5 border">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-destructive/10 text-destructive">
            <FileText aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>دریافت مطالب مجله ممکن نشد</EmptyTitle>
          <EmptyDescription>لطفاً دوباره تلاش کنید.</EmptyDescription>
        </EmptyHeader>
        <Button type="button" variant="outline" onClick={() => refetch()}>
          <RefreshCw data-icon="inline-start" className={isFetching ? "animate-spin" : undefined} />
          تلاش دوباره
        </Button>
      </Empty>
    );
  }

  if (!data?.length) {
    return (
      <Empty className="border-border border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileText aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>مطلبی پیدا نشد</EmptyTitle>
          <EmptyDescription>برای این دسته‌بندی هنوز مطلبی منتشر نشده است.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((post) => (
        <BlogCard
          key={post.id}
          image={post.image}
          title={post.title}
          description={post.summary}
          date={post.date}
          href={`/blog/${encodeURIComponent(String(post.id))}`}
          showBottomBorder
        />
      ))}
    </div>
  );
}
