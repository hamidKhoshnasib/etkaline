import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import EtkalineLogo from "@/assets/icons/logo.svg";
import IconStore from "@/assets/icons/icons8_online_store_2 1.svg";
import { NavBar } from "./NavBar";

export function Header() {
  return (
    <header>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="bg-primary text-secondary relative pb-15">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 py-3">
            {/* Logo */}
            <Link href="/">
              <EtkalineLogo className="h-11.5 w-50" />
            </Link>

            {/* Search */}
            <div className="flex max-w-154.5 flex-1 items-center overflow-hidden rounded-full bg-white">
              {/* Store section */}
              <div className="text-primary flex shrink-0 items-center gap-2 px-4 py-2.5">
                <IconStore size={18} strokeWidth={1.5} />
                <span className="text-sm font-medium whitespace-nowrap text-gray-400">
                  خرید از
                  <span className="text-secondary font-bold"> انبار مرکزی اتکالاین </span>
                </span>
              </div>

              {/* Divider */}
              <div className="bg-secondary/20 h-6 w-px shrink-0" />

              {/* Input */}
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="text-secondary/40 absolute inset-e-3 top-1/2 -translate-y-1/2"
                />
                <input
                  type="search"
                  placeholder=" "
                  className="peer text-secondary w-full border-0 bg-transparent py-2.5 ps-4 pe-8 text-sm placeholder:text-transparent focus:outline-none"
                />
                <span className="pointer-events-none invisible absolute inset-s-4 inset-e-8 top-1/2 -translate-y-1/2 overflow-hidden text-sm whitespace-nowrap peer-placeholder-shown:visible peer-focus:invisible!">
                  <span className="text-secondary/40">جستجو در فروشگاه </span>
                  <span className="text-primary">انبار مرکزی اتکالاین</span>
                </span>
              </div>
            </div>

            {/* Auth */}
            <div className="flex shrink-0 items-center gap-3">
              <button
                aria-label="اعلان‌ها"
                className="border-secondary/20 bg-primary-foreground/5 flex h-9 w-9 items-center justify-center rounded-full border"
              >
                <Bell size={18} strokeWidth={1.5} />
              </button>

              <Link
                href="/auth"
                className="border-secondary/20 bg-primary-foreground/5 flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium"
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
