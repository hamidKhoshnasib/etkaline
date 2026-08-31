"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Grid2X2, House, ShoppingCart, UserRound, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { MobileCategoryMenu } from "./MobileCategoryMenu";
import type { MenuCategory } from "@/features/catalog/model/menu-category";
import { useStorefront } from "@/providers/storefront-provider";

interface MobileBottomNavProps {
  categories: MenuCategory[];
}

interface MobileNavigationItem {
  href: string;
  label: string;
  Icon: LucideIcon;
  iconSrc?: string;
  exact: boolean;
  opensCategoryMenu: boolean;
}

export function MobileBottomNav({ categories }: MobileBottomNavProps) {
  const storefront = useStorefront();
  const pathname = usePathname();
  const { status } = useSession();
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = React.useState(false);

  const navigationItems: MobileNavigationItem[] = [
    {
      href: storefront.homeHref,
      label: "خانه",
      Icon: House,
      iconSrc: undefined,
      exact: true,
      opensCategoryMenu: false,
    },
    {
      href: storefront.searchHref,
      label: "دسته‌بندی",
      Icon: Grid2X2,
      iconSrc: "/icons/category-2.svg",
      exact: false,
      opensCategoryMenu: true,
    },
    {
      href: storefront.cartHref,
      label: "سبد خرید",
      Icon: ShoppingCart,
      iconSrc: undefined,
      exact: false,
      opensCategoryMenu: false,
    },
    {
      href: "/account/profile",
      label: "پروفایل",
      Icon: UserRound,
      iconSrc: undefined,
      exact: false,
      opensCategoryMenu: false,
    },
  ];

  if (pathname.startsWith(storefront.productPathPrefix)) {
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
        className="bg-background/80 fixed inset-x-0 bottom-0 z-40 rounded-t-2xl border-t pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_18px_rgb(15_23_42/8%)] backdrop-blur-[20px] lg:hidden"
      >
        <ul className="flex h-18 items-stretch">
          {navigationItems.map(({ href, label, Icon, iconSrc, exact, opensCategoryMenu }) => {
            const isActive = isCategoryMenuOpen
              ? opensCategoryMenu
              : opensCategoryMenu
                ? pathname.startsWith(href)
                : href === "/account/profile"
                  ? pathname.startsWith("/account")
                  : exact
                    ? pathname === href
                    : pathname.startsWith(href);
            const itemClassName = cn(
              "relative flex flex-1 flex-col items-center justify-center gap-1 px-2 text-[10px] font-semibold transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
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
                    {iconSrc ? (
                      <Image src={iconSrc} alt="" width={24} height={24} aria-hidden="true" />
                    ) : (
                      <Icon className="size-5" aria-hidden="true" />
                    )}
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
