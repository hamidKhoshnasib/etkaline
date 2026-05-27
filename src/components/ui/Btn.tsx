import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const btnVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-full",
    "whitespace-nowrap transition-all outline-none select-none",
    "focus-visible:ring-2 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // Filled – yellow default, orange on hover, gray-100 when disabled
        default:
          "bg-primary text-secondary hover:bg-primary-hover disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-100 disabled:cursor-not-allowed",

        // Outlined with primary ring always
        "outline-primary":
          "ring-1 ring-primary bg-transparent text-secondary hover:bg-primary/10 disabled:bg-gray-100 disabled:text-gray-400 disabled:ring-gray-200 disabled:opacity-100",

        // Ghost – no bg or border, only text/icon color changes
        ghost: "bg-transparent text-secondary hover:text-primary-hover",

        // Secondary gray – gray ring, gray-100 bg on hover, gray-400 ring when disabled
        "secondary-gray":
          "ring-1 ring-gray-200 bg-transparent hover:text-secondary disabled:bg-gray-100 hover:bg-gray-100 disabled:ring-gray-400 disabled:text-gray-400 disabled:opacity-100",
      },

      size: {
        // ── Text (pill) — 40 / 44 / 48 / 60 px ───────────────────────────
        sm: "label-medium-bold  gap-2   px-5 py-2.5 [&_svg:not([class*='size-'])]:size-5",
        md: "title-small-bold   gap-2   px-6 py-3   [&_svg:not([class*='size-'])]:size-5",
        lg: "title-medium-bold  gap-2   px-6 py-3   [&_svg:not([class*='size-'])]:size-6",
        xl: "title-large-bold   gap-2   px-8 py-4   [&_svg:not([class*='size-'])]:size-6",

        // ── Icon-only (circle) — 40 / 44 / 48 / 60 px ────────────────────
        "icon-sm": "size-10 [&_svg:not([class*='size-'])]:size-5",
        "icon-md": "size-11 [&_svg:not([class*='size-'])]:size-5",
        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-6",
        "icon-xl": "size-14 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  },
);

// ─── Component ────────────────────────────────────────────────────────────────

export type BtnProps = ButtonPrimitive.Props & VariantProps<typeof btnVariants>;

function Btn({ className, variant, size, ...props }: BtnProps) {
  return (
    <ButtonPrimitive
      data-slot="btn"
      className={cn(btnVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Btn, btnVariants };
