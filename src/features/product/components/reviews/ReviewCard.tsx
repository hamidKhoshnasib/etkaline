import { AppImage } from "@/components/ui/image";
import { MessageSquareShareIcon, StarIcon, ThumbsUpIcon, UserRoundIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function toPersian(n: number): string {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

interface ReviewCardProps {
  author: string;
  avatar?: string;
  date: string;
  rating: number | null;
  body: string;
  likes: number;
  isLiked: boolean;
  onLike: () => void;
  onReply: () => void;
  isLikePending?: boolean;
  truncate?: boolean;
  isReply?: boolean;
}

export function ReviewCard({
  author,
  avatar,
  date,
  rating,
  body,
  likes,
  isLiked,
  onLike,
  onReply,
  isLikePending = false,
  truncate = false,
  isReply = false,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border px-6 py-5 lg:rounded-2xl",
        isReply ? "border-s-primary border-s-4 bg-[#F8FAFC]" : "border-slate-200 bg-white",
      )}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-muted size-11 shrink-0 overflow-hidden rounded-full border border-slate-200">
            {avatar ? (
              <AppImage
                src={avatar}
                alt={author}
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                <UserRoundIcon className="size-5" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold text-gray-800">{author}</span>
            {rating !== null && (
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={cn(
                      "size-3",
                      i < rating ? "fill-primary text-primary" : "fill-gray-200 text-gray-200",
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <span className="text-xs text-gray-400">{date}</span>
      </div>

      {/* Body */}
      <p className={cn("mb-6 text-sm leading-7 text-slate-700", truncate && "line-clamp-3")}>
        {body}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
            onClick={onReply}
          >
            <MessageSquareShareIcon className="size-4" />
            <span>پاسخ دادن</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className={cn(
              "flex items-center gap-1.5 text-sm transition-colors",
              isLiked ? "text-primary" : "hover:text-primary text-gray-500",
            )}
            onClick={onLike}
            disabled={isLikePending}
            aria-pressed={isLiked}
            aria-label={isLiked ? "حذف لایک دیدگاه" : "لایک دیدگاه"}
          >
            <ThumbsUpIcon className={cn("size-4", isLiked && "fill-current")} />
            <span>{toPersian(likes)}</span>
          </button>
          {/* Dislike is intentionally hidden until its API is available. */}
        </div>
      </div>
    </article>
  );
}
