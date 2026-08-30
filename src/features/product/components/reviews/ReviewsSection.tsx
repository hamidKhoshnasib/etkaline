"use client";

import { useState } from "react";
import { Heart, InfoIcon, SortDescIcon, StarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Pagination } from "@/components/ui/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthDialog } from "@/features/auth";
import {
  useProductComments,
  useToggleProductCommentLike,
  type ProductComment,
} from "@/features/product/api/use-product-comments";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ReviewCard } from "./ReviewCard";
import { ReviewComposerDialog } from "./ReviewComposerDialog";

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
  averageRating?: number;
  totalRatings?: number;
}

export function ReviewsSection({ productId, averageRating, totalRatings }: ReviewsSectionProps) {
  const [sort, setSort] = useState("priority");
  const [page, setPage] = useState(1);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const { status } = useSession();
  const { data, error, isLoading } = useProductComments(productId, page);
  const toggleCommentLike = useToggleProductCommentLike();
  const comments = data?.comments ?? [];
  const approvedCommentCount = data?.totalCount ?? totalRatings ?? 0;
  const ratedComments = comments.filter((comment) => comment.score !== null);
  const apiAverageRating =
    ratedComments.length > 0
      ? ratedComments.reduce((total, comment) => total + (comment.score ?? 0), 0) /
        ratedComments.length
      : null;
  const displayedAverageRating = apiAverageRating ?? averageRating ?? 0;

  function handleLike(comment: ProductComment) {
    if (status !== "authenticated") {
      window.dispatchEvent(new Event("etkala:open-auth"));
      return;
    }

    toggleCommentLike.mutate(
      { productId, commentId: comment.id, isLiked: comment.userIsLiked },
      {
        onSuccess: () => {
          toast.success(comment.userIsLiked ? "لایک دیدگاه حذف شد." : "دیدگاه لایک شد.");
        },
        onError: (mutationError) => {
          toast.error(mutationError.message || "ثبت لایک دیدگاه ناموفق بود.");
        },
      },
    );
  }

  function handleReply(comment: ProductComment) {
    if (status !== "authenticated") {
      window.dispatchEvent(new Event("etkala:open-auth"));
      return;
    }

    setReplyToCommentId(comment.id);
    setIsComposerOpen(true);
  }

  return (
    <section
      id="product-reviews"
      className="flex min-h-[calc(100dvh-10rem)] scroll-mt-40 flex-col gap-8 lg:flex-row lg:items-start lg:gap-8"
    >
      {/* Rating summary panel */}
      <aside className="w-full shrink-0 lg:w-[222px]">
        <h3 className="mb-5 text-right text-base font-bold text-gray-800">
          امتیاز و دیدگاه کاربران
        </h3>

        <div className="mb-3 flex items-center justify-between lg:block">
          <span className="text-sm text-slate-600">
            میانگین امتیاز: {toPersian(Number(displayedAverageRating.toFixed(1)))}
          </span>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-3",
                  i < Math.round(displayedAverageRating)
                    ? "fill-primary text-primary"
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

        {status === "authenticated" ? (
          <Button
            type="button"
            variant="outline"
            className="border-primary text-secondary hover:bg-primary/10 mb-4 h-10 w-full rounded-lg"
            onClick={() => {
              setReplyToCommentId(null);
              setIsComposerOpen(true);
            }}
          >
            ثبت دیدگاه
          </Button>
        ) : (
          <AuthDialog
            trigger={
              <Button
                type="button"
                variant="outline"
                className="border-primary text-secondary hover:bg-primary/10 mb-4 h-10 w-full rounded-lg"
                disabled={status === "loading"}
              >
                ثبت دیدگاه
              </Button>
            }
          />
        )}

        {status !== "authenticated" && (
          <p className="flex items-start gap-2 text-xs leading-6 text-gray-400">
            <InfoIcon className="mt-0.5 size-5 shrink-0 text-slate-800" aria-hidden="true" />
            <span>
              برای ثبت دیدگاه ابتدا باید <span className="text-primary">وارد شوید</span> /{" "}
              <span className="text-primary">ثبت نام شوید</span>
            </span>
          </p>
        )}
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
        <div className="flex flex-col gap-4">
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
            <Empty className="min-h-52 w-full">
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
              <div key={comment.id} className="flex flex-col gap-4">
                <ReviewCard
                  author={comment.creatorName}
                  date={comment.createDateFa ?? ""}
                  rating={comment.score}
                  body={comment.text}
                  likes={comment.likeCount}
                  isLiked={comment.userIsLiked}
                  onLike={() => handleLike(comment)}
                  onReply={() => handleReply(comment)}
                  isLikePending={
                    toggleCommentLike.isPending &&
                    toggleCommentLike.variables?.commentId === comment.id
                  }
                />
                {comment.replies.map((reply) => (
                  <ReviewCard
                    key={reply.id}
                    author={reply.creatorName}
                    date={reply.createDateFa ?? ""}
                    rating={reply.score}
                    body={reply.text}
                    likes={reply.likeCount}
                    isLiked={reply.userIsLiked}
                    onLike={() => handleLike(reply)}
                    onReply={() => handleReply(reply)}
                    isLikePending={
                      toggleCommentLike.isPending &&
                      toggleCommentLike.variables?.commentId === reply.id
                    }
                    isReply
                  />
                ))}
              </div>
            ))}
          {!isLoading && !error && data && data.pageCount > 1 && (
            <Pagination
              className="self-center"
              page={data.page}
              total={data.pageCount}
              onChange={setPage}
            />
          )}
        </div>
      </div>
      <ReviewComposerDialog
        productId={productId}
        parentId={replyToCommentId}
        open={isComposerOpen}
        onOpenChange={(nextOpen) => {
          setIsComposerOpen(nextOpen);
          if (!nextOpen) {
            setReplyToCommentId(null);
          }
        }}
      />
    </section>
  );
}
