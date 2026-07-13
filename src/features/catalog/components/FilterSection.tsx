"use client";

import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";

interface FilterSectionProps {
  label: string;
  children?: React.ReactNode;
}

export function FilterSection({ label, children }: FilterSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4"
      >
        <span className="text-sm text-gray-700">{label}</span>
        {open ? (
          <ChevronUpIcon className="size-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="size-5 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="pb-4">
          {children ?? <p className="text-sm text-gray-400">محتوای فیلتر {label}</p>}
        </div>
      )}
    </div>
  );
}
