"use client";

import { useState } from "react";
import { SortDescIcon, StarIcon } from "lucide-react";
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

const SAMPLE_REVIEWS = [
  {
    id: 1,
    author: "مجید تهرانی",
    date: "۱۲ فرودین ۱۴۰۵",
    rating: 5,
    body: "سلام خدمت کسایی که نظر بنده رو میخونن ، ما این یخچال رو از سرای ایرانی خریدم ، جدی یخچال خوبیه ، موتورش صدای خیلی کمی داره و اصلا به چشم نمیاد و تقریباً میشه گفت بی صداست ، جا داره ، کاملا لمسیه و دیجیتال ، فشار آبش خوبه ، یخ سازش اوکیه و انتظار اینکه مثل یخچال های ساید ال جی یخ سازی کنه رو نداشته باشید یکم یخ سازش دیر کاره اما خدایی خوبه ولی یه ایراد ریز داره که یکم اولای خریدن دستگاه زیر یخ ساز یه حالت خیلی ریز یخ میزنه و حالت دونه های برف میگیره که به مرور درست میشه ... ...",
    likes: 283,
    dislikes: 12,
    truncate: false,
  },
  {
    id: 2,
    author: "مجید تهرانی",
    date: "۱۲ فرودین ۱۴۰۵",
    rating: 5,
    body: "سلام خدمت کسایی که نظر بنده رو میخونن ، ما این یخچال رو از سرای ایرانی خریدم ، جدی یخچال خوبیه ، موتورش صدای خیلی کمی داره و اصلا به چشم نمیاد و تقریباً میشه گفت بی صداست ،",
    likes: 283,
    dislikes: 12,
    truncate: true,
  },
];

interface ReviewsSectionProps {
  averageRating: number;
  totalRatings: number;
}

export function ReviewsSection({ averageRating, totalRatings }: ReviewsSectionProps) {
  const [sort, setSort] = useState("priority");

  return (
    <div className="flex gap-6">
      {/* Rating summary panel */}
      <div className="w-55.5 shrink-0">
        <h3 className="mb-2 text-right text-base font-bold text-gray-800">
          امتیاز و دیدگاه کاربران
        </h3>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">میانگین امتیاز: {toPersian(averageRating)}</span>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">از مجموع {toPersian(totalRatings)} امتیاز</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-3.5",
                  i < Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200",
                )}
              />
            ))}
          </div>
        </div>

        <p className="mb-3 text-sm text-gray-600">شما هم درباره این کالا دیدگاه ثبت کنید</p>

        <button className="bg-primary mb-4 w-full rounded-xl py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
          ثبت دیدگاه
        </button>

        <p className="text-xs leading-6 text-gray-400">
          برای ثبت دیدگاه ابتدا باید{" "}
          <span className="text-primary cursor-pointer hover:underline">وارد شوید</span>
          {" / "}
          <span className="text-primary cursor-pointer hover:underline">ثبت نام شوید</span>
        </p>
      </div>

      {/* Reviews list */}
      <div className="min-w-0 flex-1">
        {/* Sort bar */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
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

        <div className="mb-6 h-px bg-gray-100" />

        {/* Review cards */}
        <div className="space-y-4">
          {SAMPLE_REVIEWS.map((r) => (
            <ReviewCard
              key={r.id}
              author={r.author}
              date={r.date}
              rating={r.rating}
              body={r.body}
              likes={r.likes}
              dislikes={r.dislikes}
              truncate={r.truncate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
