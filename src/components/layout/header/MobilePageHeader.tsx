"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/ui/back-button";

interface MobilePageHeaderProps {
  title: string;
  fallbackHref: string;
  endContent?: ReactNode;
  fixed?: boolean;
}

export function MobilePageHeader({
  title,
  fallbackHref,
  endContent,
  fixed = false,
}: MobilePageHeaderProps) {
  return (
    <header
      className={cn(
        "bg-background text-secondary relative flex h-18 items-center justify-center border-b text-sm font-bold lg:hidden",
        fixed && "fixed inset-x-0 top-0 z-40 h-16",
      )}
    >
      <BackButton className="absolute start-4" fallbackHref={fallbackHref} />
      <h1 className="text-base font-bold">{title}</h1>
      <div className="absolute end-4 flex min-w-8 justify-end">
        {endContent ?? <span className="size-5" />}
      </div>
    </header>
  );
}
