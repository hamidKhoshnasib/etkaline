"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, ChevronDown, Search } from "lucide-react";
import EtkalineMobileLogo from "@/assets/icons/logo-mobile.svg";
import IconStore from "@/assets/icons/icons8_online_store_2 1.svg";
import { useAddresses } from "@/features/address/api/use-addresses";
import { AddressPicker } from "./AddressPicker";
import { NotificationsMenu } from "./NotificationsMenu";

export function MobileHeader() {
  const pathname = usePathname();
  const { data: addresses = [] } = useAddresses();
  const selectedAddressTitle =
    addresses.find((address) => address.isDefault)?.title ?? "انتخاب آدرس";
  if (
    pathname.startsWith("/products/") ||
    pathname.startsWith("/categories/") ||
    pathname.startsWith("/account")
  ) {
    return null;
  }

  return (
    <div className="etkaline-pattern relative isolate !bg-gradient-to-t !from-[#FFB347] !to-[#FFCC33] lg:hidden">
      {/* ── Top row: logo + address/notification ─────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href="/" aria-label="اتکالاین" className="text-secondary shrink-0">
          <EtkalineMobileLogo className="block h-8 w-[135px]" />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <AddressPicker
            showMissingAddressPrompt
            trigger={
              <button
                className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#FFD600] bg-white px-2.5 sm:flex-none sm:px-4"
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
            className="size-10 shrink-0 border border-[#FFD600]"
            iconClassName="text-[#94A3B8] stroke-2"
          />
        </div>
      </div>

      {/* ── Bottom row: search box ───────────────────────────────────── */}
      <div className="rounded-t-[32px] bg-white px-4 py-2.5">
        <Link
          href="/search"
          className="flex h-12 items-center justify-between rounded-[28px] border border-[#F1F5F9] px-5"
        >
          <span className="flex items-center gap-2">
            <IconStore size={20} className="shrink-0" />
            <span className="text-sm">
              <span className="text-[#94A3B8]">خرید از </span>
              <span className="text-secondary font-bold">انبار مرکزی اتکلاین</span>
            </span>
          </span>
          <Search size={18} className="text-secondary/50 shrink-0" />
        </Link>
      </div>
    </div>
  );
}
