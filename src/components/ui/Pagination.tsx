"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

function toPersian(n: number): string {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

interface PaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
  className?: string;
}

type PaginationItem = number | "start-ellipsis" | "end-ellipsis";

const navBtn = [
  "flex size-8 items-center justify-center rounded-lg",
  "text-primary transition-colors hover:text-gray-600",
  "disabled:pointer-events-none disabled:opacity-30",
].join(" ");

function getPaginationItems(page: number, total: number): PaginationItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "end-ellipsis", total];
  }

  if (page >= total - 3) {
    return [1, "start-ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, "start-ellipsis", page - 1, page, page + 1, "end-ellipsis", total];
}

function Pagination({ page, total, onChange, className }: PaginationProps) {
  const items = getPaginationItems(page, total);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {/* First */}
      <button className={navBtn} onClick={() => onChange(1)} disabled={page === 1}>
        <ChevronsRightIcon className="size-4" />
      </button>

      {/* Prev */}
      <button className={navBtn} onClick={() => onChange(page - 1)} disabled={page === 1}>
        <ChevronRightIcon className="size-4" />
      </button>

      <span className="mx-1.5 h-8 w-px shrink-0 bg-gray-300" />

      {/* Pages */}
      {items.map((item) => {
        if (typeof item !== "number") {
          return (
            <span
              key={item}
              aria-hidden="true"
              className="flex size-8 items-center justify-center text-gray-500"
            >
              …
            </span>
          );
        }

        const p = item;
        const isActive = p === page;

        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={cn(
              "flex size-8 items-center justify-center rounded-[4px]",
              isActive
                ? "bg-primary body-medium-bold text-xl text-gray-700"
                : "body-medium text-gray-500",
            )}
          >
            {toPersian(p)}
          </button>
        );
      })}

      <span className="mx-1.5 h-8 w-px shrink-0 bg-gray-300" />

      {/* Next */}
      <button className={navBtn} onClick={() => onChange(page + 1)} disabled={page === total}>
        <ChevronLeftIcon className="size-4" />
      </button>

      {/* Last */}
      <button className={navBtn} onClick={() => onChange(total)} disabled={page === total}>
        <ChevronsLeftIcon className="size-4" />
      </button>
    </div>
  );
}

export { Pagination };
export type { PaginationProps };
