"use client";

import Link from "next/link";
import EtkalineLogo from "@/assets/icons/logo.svg";
import SupermarketLogo from "@/assets/icons/logo-supermarket.svg";
import { SITE_TYPES } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

export function HeaderLogo() {
  const { homeHref, siteType } = useStorefront();
  return (
    <Link href={homeHref}>
      {siteType === SITE_TYPES.supermarket ? (
        <SupermarketLogo className="h-11.5 w-50" />
      ) : (
        <EtkalineLogo className="h-11.5 w-50" />
      )}
    </Link>
  );
}
