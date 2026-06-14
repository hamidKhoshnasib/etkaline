"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors duration-200",
        checked ? "bg-primary" : "bg-gray-200",
      )}
    >
      <span
        className={cn(
          "absolute top-1 size-4 rounded-full bg-white shadow transition-all duration-200",
          checked ? "right-1" : "left-1",
        )}
      />
    </button>
  );
}
