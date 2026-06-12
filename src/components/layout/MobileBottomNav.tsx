"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "پروفایل", href: "/profile", Icon: CircleUser },
  { label: "سبد خرید", href: "/cart", Icon: ShoppingCart },
  { label: "دسته‌بندی", href: "/categories", Icon: LayoutGrid },
  { label: "خانه", href: "/", Icon: Home },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-background fixed inset-x-0 bottom-0 z-50 border-t md:hidden">
      <div className="flex items-stretch">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              {isActive && (
                <span className="bg-primary absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full" />
              )}
              <item.Icon className="size-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
