import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import EtkalineLogo from "@/assets/icons/logo.svg";
import IconStore from "@/assets/icons/icons8_online_store_2 1.svg";
import { NavBar } from "./NavBar";

export function Header() {
  return (
    <header>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="relative bg-primary pb-15 text-secondary">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 py-3">
            {/* Logo */}
            <Link href="/">
              <EtkalineLogo className="h-11.5 w-50" />
            </Link>

            {/* Search */}
            <div className="flex max-w-154.5 flex-1 items-center overflow-hidden rounded-full bg-white">
              {/* Store section */}
              <div className="flex shrink-0 items-center gap-2 px-4 py-2.5 text-primary">
                <IconStore size={18} strokeWidth={1.5} />
                <span className="whitespace-nowrap text-sm font-medium text-gray-400">
                  خرید از
                  <span className="font-bold text-secondary"> انبار مرکزی اتکالاین </span>
                </span>
              </div>

              {/* Divider */}
              <div className="h-6 w-px shrink-0 bg-secondary/20" />

              {/* Input */}
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-secondary/40"
                />
                <input
                  type="search"
                  placeholder=" "
                  className="peer w-full border-0 bg-transparent py-2.5 pe-8 ps-4 text-sm text-secondary placeholder:text-transparent focus:outline-none"
                />
                <span className="pointer-events-none invisible absolute inset-e-8 inset-s-4 top-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap text-sm peer-placeholder-shown:visible peer-focus:invisible!">
                  <span className="text-secondary/40">جستجو در فروشگاه </span>
                  <span className="text-primary">انبار مرکزی اتکالاین</span>
                </span>
              </div>
            </div>

            {/* Auth */}
            <div className="flex shrink-0 items-center gap-3">
              <button
                aria-label="اعلان‌ها"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary/20 bg-primary-foreground/5"
              >
                <Bell size={18} strokeWidth={1.5} />
              </button>

              <Link
                href="/auth"
                className="flex items-center gap-2 rounded-full border border-secondary/20 bg-primary-foreground/5 px-3 py-1.5 text-sm font-medium"
              >
                <User size={18} strokeWidth={1.5} />
                <span>ورود | ثبت نام</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Nav bar (client component — owns the mega menu) ────────────── */}
        <NavBar />
      </div>
    </header>
  );
}