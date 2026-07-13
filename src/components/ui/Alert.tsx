"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { XIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva("w-full rounded-xl  p-4", {
  variants: {
    variant: {
      success: "bg-green-100",
      info: "bg-blue-100",
      warning: "bg-yellow-100 ",
      error: "bg-red-100",
    },
  },
  defaultVariants: { variant: "info" },
});

const colorClass: Record<Variant, string> = {
  success: "text-green-700",
  info: "text-blue-700",
  warning: "text-yellow-700",
  error: "text-red-700",
};

const statusIcons = {
  success: CircleCheckIcon,
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: OctagonXIcon,
} as const;

type Variant = "success" | "info" | "warning" | "error";

interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

function Alert({ variant = "info", title, description, onClose, className }: AlertProps) {
  const v = (variant ?? "info") as Variant;
  const Icon = statusIcons[v];

  return (
    <div className={cn(alertVariants({ variant }), className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className={cn("size-4.5 shrink-0", colorClass[v])} />
          <span className={cn("title-medium-bold", colorClass[v])}>{title}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className={cn(
            "shrink-0 rounded p-0.5 transition-opacity hover:opacity-70",
            colorClass[v],
          )}
        >
          <XIcon className="size-4" />
        </button>
      </div>

      {description && <p className={cn("body-medium mt-1.5", colorClass[v])}>{description}</p>}
    </div>
  );
}

// ─── Toast helper ─────────────────────────────────────────────────────────────

export { Alert, alertVariants };
export type { AlertProps };
