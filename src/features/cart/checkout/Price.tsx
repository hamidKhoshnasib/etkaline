import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/features/cart/fixtures/cart";

interface PriceProps {
  value: number;
  className?: string;
  iconClassName?: string;
}

/** Number followed by the Toman symbol (icon sits to the left of the digits in RTL). */
export default function Price({ value, className, iconClassName }: PriceProps) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={className}>{formatPrice(value)}</span>
      <TomanIcon className={cn("size-4 shrink-0", iconClassName)} />
    </span>
  );
}
