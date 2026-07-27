"use client";

import { useState } from "react";
import { Heart, SortDescIcon, StarIcon } from "lucide-react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Pagination } from "@/components/ui/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductComments } from "@/features/product/api/use-product-comments";
import { cn } from "@/lib/utils";
import { ReviewCard } from "./ReviewCard";

function toPersian(n: number): string {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

const SORT_OPTIONS = [
  { id: "priority", label: "اولویت نمایش" },
  { id: "newest", label: "جدیدترین" },
  { id: "oldest", label: "قدیمی‌ترین" },
  { id: "highest", label: "بیشترین امتیاز" },
  { id: "lowest", label: "کمترین امتیاز" },
];

interface ReviewsSectionProps {
  productId: number;
  averageRating: number;
  totalRatings: number;
}

export function ReviewsSection({ productId, averageRating, totalRatings }: ReviewsSectionProps) {
  const [sort, setSort] = useState("priority");
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useProductComments(productId, page);
  const comments = data?.comments ?? [];
  const approvedCommentCount = data?.totalCount ?? totalRatings;
  const apiAverageRating =
    comments.length > 0
      ? comments.reduce((total, comment) => total + comment.score, 0) / comments.length
      : null;
  const displayedAverageRating = apiAverageRating ?? averageRating;

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
      {/* Rating summary panel */}
      <aside className="w-full shrink-0 lg:w-52">
        <h3 className="mb-4 text-right text-base font-bold text-gray-800">
          امتیاز و دیدگاه کاربران
        </h3>

        <div className="mb-3 flex items-center justify-between lg:block">
          <span className="text-sm text-gray-500">
            میانگین امتیاز: {toPersian(Number(displayedAverageRating.toFixed(1)))}
          </span>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-3.5",
                  i < Math.round(displayedAverageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200",
                )}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            از مجموع {toPersian(approvedCommentCount)} امتیاز
          </span>
        </div>

        <p className="mb-3 text-sm">شما هم درباره این کالا دیدگاه ثبت کنید</p>

        <button className="border-primary text-secondary hover:bg-primary/10 mb-4 w-full rounded-lg border py-2.5 text-sm font-medium transition-colors">
          ثبت دیدگاه
        </button>

        <p className="text-xs leading-6 text-gray-400">
          برای ثبت دیدگاه ابتدا باید{" "}
          <span className="text-primary cursor-pointer hover:underline">وارد شوید</span>
          {" / "}
          <span className="text-primary cursor-pointer hover:underline">ثبت نام شوید</span>
        </p>
      </aside>

      {/* Reviews list */}
      <div className="min-w-0 flex-1">
        {/* Sort bar */}
        <div className="mb-4 flex items-center gap-3 overflow-x-auto text-nowrap lg:gap-3.5">
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <SortDescIcon className="size-4" />
            <span>اولویت نمایش</span>
          </div>
          <span className="h-4 w-px bg-gray-300" />
          <div className="flex items-center gap-4">
            {SORT_OPTIONS.slice(1).map((o) => (
              <button
                key={o.id}
                onClick={() => setSort(o.id)}
                className={cn(
                  "text-sm transition-colors",
                  sort === o.id
                    ? "text-primary font-semibold"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-border mb-5 h-px" />

        {/* Review cards */}
        <div className="flex flex-col gap-4 lg:max-w-[620px]">
          {isLoading &&
            Array.from({ length: 2 }, (_, index) => (
              <Skeleton key={index} className="h-52 rounded-2xl" />
            ))}
          {!isLoading && error && (
            <p className="text-destructive text-sm" role="alert">
              دریافت دیدگاه‌ها ناموفق بود. دوباره تلاش کنید.
            </p>
          )}
          {!isLoading && !error && comments.length === 0 && (
            <Empty className="min-h-52 border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Heart aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>هنوز دیدگاهی ثبت نشده است</EmptyTitle>
              </EmptyHeader>
            </Empty>
          )}
          {!isLoading &&
            !error &&
            comments.map((comment) => (
              <ReviewCard
                key={comment.id}
                author={comment.creatorName}
                date={comment.createDateFa ?? ""}
                rating={comment.score}
                body={comment.text}
                likes={comment.likeCount}
                dislikes={0}
              />
            ))}
          {!isLoading && !error && data && data.pageCount > 1 && (
            <Pagination
              className="self-center"
              page={data.page + 1}
              total={data.pageCount}
              onChange={(nextPage) => setPage(nextPage - 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
