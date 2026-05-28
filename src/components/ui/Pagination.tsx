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

const navBtn = [
  "flex size-8 items-center justify-center rounded-lg",
  "text-primary transition-colors hover:text-gray-600",
  "disabled:pointer-events-none disabled:opacity-30",
].join(" ");

function Pagination({ page, total, onChange, className }: PaginationProps) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

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
      {pages.map((p) => {
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
