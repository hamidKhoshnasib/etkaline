import Image from "next/image";
import { MessageSquareShareIcon, StarIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function toPersian(n: number): string {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

interface ReviewCardProps {
  author: string;
  avatar?: string;
  date: string;
  rating: number;
  body: string;
  likes: number;
  dislikes: number;
  truncate?: boolean;
}

export function ReviewCard({
  author,
  avatar,
  date,
  rating,
  body,
  likes,
  dislikes,
  truncate = false,
}: ReviewCardProps) {
  return (
    <article className="border-border bg-card rounded-xl border p-4 lg:rounded-2xl lg:px-5 lg:py-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-muted size-10 shrink-0 overflow-hidden rounded-full lg:size-11">
            {avatar ? (
              <Image
                src={avatar}
                alt={author}
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-400">
                {author.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold text-gray-800">{author}</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={cn(
                    "size-3",
                    i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <span className="text-xs text-gray-400">{date}</span>
      </div>

      {/* Body */}
      <p className={cn("mb-5 text-sm leading-7 text-gray-600", truncate && "line-clamp-3")}>
        {body}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700">
            <MessageSquareShareIcon className="size-4" />
            <span>پاسخ دادن</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-green-600">
            <ThumbsUpIcon className="size-4" />
            <span>{toPersian(likes)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-red-500">
            <ThumbsDownIcon className="size-4" />
            <span>{toPersian(dislikes)}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
