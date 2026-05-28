import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// r=42 → circumference ≈ 264 → 25% arc ≈ 66
const TRACK_R = 42;
const ARC_DASH = "66 198";

const spinnerVariants = cva("shrink-0 animate-spin", {
  variants: {
    size: {
      sm: "size-[50px]",
      md: "size-[75px]",
      lg: "size-[100px]",
    },
  },
  defaultVariants: { size: "md" },
});

interface SpinnerProps extends React.ComponentProps<"svg">, VariantProps<typeof spinnerVariants> {}

function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 100 100"
      fill="none"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      {/* Track */}
      <circle
        cx="50"
        cy="50"
        r={TRACK_R}
        stroke="currentColor"
        strokeWidth="10"
        className="text-gray-200"
      />
      {/* Arc — rotated so it starts at 12 o'clock */}
      <circle
        cx="50"
        cy="50"
        r={TRACK_R}
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={ARC_DASH}
        transform="rotate(-90 50 50)"
        className="text-blue-700"
      />
    </svg>
  );
}

export { Spinner, spinnerVariants };
export type { SpinnerProps };
