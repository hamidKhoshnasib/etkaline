"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";
import { unstable_catchError, type ErrorInfo } from "next/error";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

interface SectionErrorBoundaryProps {
  title?: string;
  className?: string;
}

function SectionErrorFallback(
  { title = "دریافت این بخش ممکن نشد.", className }: SectionErrorBoundaryProps,
  { unstable_retry }: ErrorInfo,
) {
  return (
    <Empty
      className={cn(
        "border-destructive/40 bg-destructive/5 flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-4 text-center",
        className,
      )}
      role="alert"
    >
      <EmptyMedia variant="icon" className="bg-destructive/10 text-destructive">
        <TriangleAlert aria-hidden="true" />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyDescription className="text-destructive">{title}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button type="button" variant="outline" size="sm" onClick={unstable_retry}>
          <RefreshCw data-icon="inline-start" />
          تلاش دوباره
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export const SectionErrorBoundary = unstable_catchError(SectionErrorFallback);
