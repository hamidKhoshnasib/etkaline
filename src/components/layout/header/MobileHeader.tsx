"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, ChevronDown } from "lucide-react";
import EtkalineMobileLogo from "@/assets/icons/logo-mobile.svg";
import SupermarketMobileLogo from "@/assets/icons/logo-supermarket-mobile.svg";
import { useAddresses } from "@/features/address/api/use-addresses";
import { SITE_TYPES } from "@/lib/api-site-type";
import { AddressPicker } from "./AddressPicker";
import { HeaderSearch } from "./HeaderSearch";
import { NotificationsMenu } from "./NotificationsMenu";
import { useStorefront } from "@/providers/storefront-provider";

export function MobileHeader() {
  const storefront = useStorefront();
  const pathname = usePathname();
  const { data: addresses = [] } = useAddresses();
  const selectedAddressTitle =
    addresses.find((address) => address.isDefault)?.title ?? "انتخاب آدرس";
  if (
    pathname.startsWith("/products/") ||
    pathname.startsWith("/search/category/") ||
    pathname.startsWith(`${storefront.basePath}/product/`) ||
    pathname.startsWith(`${storefront.basePath}/categories/`) ||
    pathname.startsWith("/account")
  ) {
    return null;
  }

  return (
    <div className="etkaline-pattern storefront-brand-surface relative isolate lg:hidden">
      {/* ── Top row: logo + address/notification ─────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href={storefront.homeHref} aria-label="اتکالاین" className="text-secondary shrink-0">
          {storefront.siteType === SITE_TYPES.supermarket ? (
            <SupermarketMobileLogo className="block h-8 w-[135px]" />
          ) : (
            <EtkalineMobileLogo className="block h-8 w-[135px]" />
          )}
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <AddressPicker
            showMissingAddressPrompt
            trigger={
              <button
                className="border-primary flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full border bg-white px-2.5 sm:flex-none sm:px-4"
                type="button"
              >
                <MapPin size={18} className="text-primary-hover shrink-0" />
                <span className="body-small min-w-0 truncate text-black min-[390px]:block">
                  {selectedAddressTitle}
                </span>
                <ChevronDown size={16} className="shrink-0 text-black" />
              </button>
            }
          />

          <NotificationsMenu
            className="border-primary size-10 shrink-0 border"
            iconClassName="text-[#94A3B8] stroke-2"
          />
        </div>
      </div>

      {/* ── Bottom row: search box ───────────────────────────────────── */}
      <div className="rounded-t-[32px] bg-white px-4 py-2.5">
        <HeaderSearch variant="mobile" />
      </div>
    </div>
  );
}
