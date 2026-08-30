import Link from "next/link";
import { HousePlug, ShoppingBasket } from "lucide-react";

import { SITE_TYPES, type SiteType } from "@/lib/api-site-type";

const switchConfig = {
  [SITE_TYPES.appliance]: {
    href: "/",
    openInNewTab: true,
    label: "سوپر مارکت",
    className: "bg-linear-to-b from-[#42D778] via-[#34B171] via-[98.58%] to-[#34B171] text-white",
  },
  [SITE_TYPES.supermarket]: {
    href: "/appliances",
    label: "لوازم خانگی",
    className: "bg-linear-to-b from-[#FFD54F] via-[#F57F17] to-[#E65100] text-white",
    openInNewTab: true,
  },
} satisfies Record<
  SiteType,
  { href: string; label: string; className: string; openInNewTab: boolean }
>;

export function StorefrontSwitchTab({ siteType }: { siteType: SiteType }) {
  const target = switchConfig[siteType];
  const TargetIcon = siteType === SITE_TYPES.supermarket ? HousePlug : ShoppingBasket;

  return (
    <div className="pointer-events-none absolute top-0 right-0">
      <Link
        href={target.href}
        target={target.openInNewTab ? "_blank" : undefined}
        rel={target.openInNewTab ? "noopener noreferrer" : undefined}
        aria-label={`رفتن به فروشگاه ${target.label}`}
        className={`${target.className} pointer-events-auto flex h-[164px] w-[45px] flex-col items-center justify-center gap-2 rounded-l-2xl shadow-sm transition-[filter,transform] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current active:scale-[0.98]`}
      >
        <span className="flex h-[79px] w-6 items-center justify-center" aria-hidden="true">
          <span className="title-medium-bold -rotate-90 whitespace-nowrap">{target.label}</span>
        </span>
        <span className="flex size-9 -rotate-90 items-center justify-center" aria-hidden="true">
          <TargetIcon className="size-9" strokeWidth={1.8} />
        </span>
      </Link>
    </div>
  );
}
