"use client";

import { useState, type ReactNode } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface FilterSectionProps {
  label: string;
  children?: ReactNode;
}

export function FilterSection({ label, children }: FilterSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-1 rounded-xl border border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-3 py-3"
      >
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {open ? (
          <ChevronUpIcon className="text-primary size-4" />
        ) : (
          <ChevronDownIcon className="text-primary size-4" />
        )}
      </button>

      {open ? (
        <div className="border-t border-slate-100 px-3 pt-2 pb-3">
          {children ?? <p className="text-sm text-slate-400">محتوای فیلتر {label}</p>}
        </div>
      ) : null}
    </section>
  );
}
