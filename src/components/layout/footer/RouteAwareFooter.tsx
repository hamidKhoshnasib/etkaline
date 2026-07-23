"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function RouteAwareFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAccountPage = pathname.startsWith("/account");

  return <div className={cn("contents", isAccountPage && "max-lg:hidden")}>{children}</div>;
}
