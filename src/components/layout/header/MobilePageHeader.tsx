"use client";

import type { ReactNode } from "react";
import { ChevronRightIcon } from "lucide-react";

interface MobilePageHeaderProps {
  title: string;
  leftContent?: ReactNode;
}

export function MobilePageHeader({ title, leftContent }: MobilePageHeaderProps) {
  return (
    <header className="bg-background text-secondary fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b px-4 text-sm font-bold lg:hidden">
      <ChevronRightIcon className="size-5" />
      <h1 className="text-base font-bold">{title}</h1>
      <div className="flex min-w-5 justify-end">{leftContent ?? <span className="size-5" />}</div>
    </header>
  );
}
