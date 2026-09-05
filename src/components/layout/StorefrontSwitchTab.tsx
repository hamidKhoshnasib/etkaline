import Image from "next/image";
import Link from "next/link";

import { SITE_TYPES, type SiteType } from "@/lib/api-site-type";

const switchConfig = {
  [SITE_TYPES.appliance]: {
    href: "/fresh",
    openInNewTab: true,
    label: "سوپر مارکت",
    className: "bg-linear-to-b from-[#42D778] to-[#34B171] text-white",
    icon: "/images/storefront-switch/basket.png",
    iconClassName: "brightness-0 invert",
  },
  [SITE_TYPES.supermarket]: {
    href: "/",
    label: "لوازم خانگی",
    className: "bg-[#FFC400] text-secondary",
    icon: "/images/storefront-switch/device-tv.png",
    iconClassName: "",
    openInNewTab: true,
  },
} satisfies Record<
  SiteType,
  {
    href: string;
    label: string;
    className: string;
    icon: string;
    iconClassName: string;
    openInNewTab: boolean;
  }
>;

export function StorefrontSwitchTab({ siteType }: { siteType: SiteType }) {
  const target = switchConfig[siteType];

  return (
    <Link
      dir="ltr"
      href={target.href}
      target={target.openInNewTab ? "_blank" : undefined}
      rel={target.openInNewTab ? "noopener noreferrer" : undefined}
      aria-label={`رفتن به فروشگاه ${target.label}`}
      className={`${target.className} group fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-4 z-40 flex h-12 w-12 items-center justify-center gap-0 overflow-hidden rounded-full text-sm font-bold whitespace-nowrap shadow-lg transition-[width,gap,filter,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:w-[132px] hover:gap-2 hover:brightness-95 focus-visible:w-[132px] focus-visible:gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current active:scale-[0.98] motion-reduce:transition-none lg:bottom-6`}
    >
      <span
        dir="rtl"
        className="max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-24 group-hover:opacity-100 group-focus-visible:max-w-24 group-focus-visible:opacity-100 motion-reduce:transition-none"
      >
        {target.label}
      </span>
      <Image
        alt=""
        aria-hidden="true"
        className={`size-6 shrink-0 object-contain ${target.iconClassName}`}
        height={24}
        src={target.icon}
        width={24}
      />
    </Link>
  );
}
