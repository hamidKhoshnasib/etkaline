"use client";

import { useState, type ReactNode } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
  label: string;
  children?: ReactNode;
  variant?: "sidebar" | "sheet";
}

export function FilterSection({ label, children, variant = "sidebar" }: FilterSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <section
      className={cn(
        "mt-1",
        variant === "sheet" ? "rounded-2xl bg-slate-50" : "rounded-xl border border-slate-200",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex w-full items-center justify-between px-3",
          variant === "sheet" ? "py-3.5" : "py-3",
        )}
      >
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <ChevronDownIcon
          className={cn(
            "size-4 transition-transform duration-200 ease-out",
            open ? "text-primary rotate-180" : "text-secondary",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className={cn("min-h-0 overflow-hidden", !open && "invisible")}>
          <div className="border-t border-slate-100 px-3 pt-2 pb-3">
            {children ?? <p className="text-sm text-slate-400">محتوای فیلتر {label}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
