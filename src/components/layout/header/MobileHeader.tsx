import Link from "next/link";
import { Bell, MapPin, ChevronDown, Search } from "lucide-react";
import EtkalineLogo from "@/assets/icons/logo.svg";
import IconStore from "@/assets/icons/icons8_online_store_2 1.svg";

export function MobileHeader() {
  return (
    <div className="bg-gradient-to-t from-[#FFB347] to-[#FFCC33] lg:hidden">
      {/* ── Top row: logo + address/notification ─────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" aria-label="اتکالاین" className="text-secondary">
          <EtkalineLogo className="h-[31px] w-[135px]" />
        </Link>

        <div className="flex items-center gap-2">
          <button className="flex h-10 items-center gap-2 rounded-full border border-[#FFD600] bg-white px-4">
            <MapPin size={18} className="text-primary-hover" />
            <span className="body-small whitespace-nowrap text-black">انتخاب آدرس...</span>
            <ChevronDown size={16} className="text-black" />
          </button>

          <button
            aria-label="اعلان‌ها"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#FFD600] bg-white"
          >
            <Bell size={18} strokeWidth={2} className="text-secondary" />
          </button>
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
