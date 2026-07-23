"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Grid2X2, House, ShoppingCart, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

import { MobileCategoryMenu } from "./MobileCategoryMenu";
import type { MenuCategory } from "@/features/catalog/model/menu-category";

const navigationItems = [
  { href: "/", label: "خانه", Icon: House, exact: true, opensCategoryMenu: false },
  { href: "/products", label: "دسته‌بندی", Icon: Grid2X2, exact: false, opensCategoryMenu: true },
  { href: "/cart", label: "سبد خرید", Icon: ShoppingCart, exact: false, opensCategoryMenu: false },
  {
    href: "/account/profile",
    label: "پروفایل",
    Icon: UserRound,
    exact: false,
    opensCategoryMenu: false,
  },
] as const;

interface MobileBottomNavProps {
  categories: MenuCategory[];
}

export function MobileBottomNav({ categories }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { status } = useSession();
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = React.useState(false);

  if (pathname.startsWith("/products/")) {
    return null;
  }

  return (
    <>
      <MobileCategoryMenu
        categories={categories}
        isOpen={isCategoryMenuOpen}
        onClose={() => setIsCategoryMenuOpen(false)}
      />
      <nav
        aria-label="ناوبری اصلی موبایل"
        className="bg-background fixed inset-x-0 bottom-0 z-40 rounded-t-2xl border-t shadow-[0_-4px_18px_rgb(15_23_42/8%)] lg:hidden"
      >
        <ul className="flex h-18 items-stretch pb-[env(safe-area-inset-bottom)]">
          {navigationItems.map(({ href, label, Icon, exact, opensCategoryMenu }) => {
            const isActive = opensCategoryMenu
              ? isCategoryMenuOpen || pathname.startsWith(href)
              : exact
                ? pathname === href
                : pathname.startsWith(href);
            const itemClassName = cn(
              "relative flex flex-1 flex-col items-center justify-center gap-1 px-2 text-xs font-semibold transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
              isActive ? "text-auth-accent" : "text-muted-foreground",
            );

            return (
              <li key={href} className="flex flex-1">
                {opensCategoryMenu ? (
                  <button
                    type="button"
                    aria-expanded={isCategoryMenuOpen}
                    aria-controls="mobile-category-menu"
                    onClick={() => setIsCategoryMenuOpen((current) => !current)}
                    className={itemClassName}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    <span>{label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="bg-auth-accent absolute inset-x-5 bottom-0 h-1 rounded-t-full"
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(event) => {
                      setIsCategoryMenuOpen(false);
                      if (href.startsWith("/account/") && status === "unauthenticated") {
                        event.preventDefault();
                        window.dispatchEvent(new Event("etkala:open-auth"));
                      }
                    }}
                    className={itemClassName}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    <span>{label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="bg-auth-accent absolute inset-x-5 bottom-0 h-1 rounded-t-full"
                      />
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
