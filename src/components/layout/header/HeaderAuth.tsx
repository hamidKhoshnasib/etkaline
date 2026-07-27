"use client";

import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthDialog, WelcomeDialog } from "@/features/auth";
import { HeaderCartSummary } from "./HeaderCartSummary";

export function HeaderAuth() {
  const { data: session, status } = useSession();
  const displayName = session?.user.name?.trim() || session?.user.username;

  return (
    <div className="flex shrink-0 items-center gap-3">
      <WelcomeDialog />
      {status === "authenticated" ? (
        <div className="flex h-12.5 items-center overflow-hidden rounded-full bg-white">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  className="label-large text-secondary flex h-full items-center gap-2 px-4.5 py-2.25"
                />
              }
            >
              <User size={18} strokeWidth={1.5} aria-hidden="true" />
              <span className="max-w-32 truncate">{displayName}</span>
              <ChevronDown className="text-secondary/60 size-4" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36 rounded-xl p-1.5">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  render={<Link href="/account/orders" />}
                  className="cursor-pointer gap-2 px-3 py-2 text-sm"
                >
                  <User aria-hidden="true" />
                  پروفایل
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => void signOut({ callbackUrl: "/" })}
                  className="cursor-pointer gap-2 px-3 py-2 text-sm"
                >
                  <LogOut aria-hidden="true" />
                  خروج از حساب
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span aria-hidden="true" className="bg-secondary/15 h-11.5 w-px" />
          <HeaderCartSummary />
        </div>
      ) : (
        <AuthDialog
          trigger={
            <button
              type="button"
              className="label-large text-secondary flex h-12.5 items-center gap-2 rounded-full bg-white px-4.5 py-2.25"
            >
              <User size={18} strokeWidth={1.5} />
              <span>ورود</span>
              <span className="text-gray-300">|</span>
              <span>ثبت نام</span>
            </button>
          }
        />
      )}
      <button
        type="button"
        aria-label="اعلان‌ها"
        className="flex size-12.5 items-center justify-center rounded-full bg-white"
      >
        <Bell size={18} strokeWidth={2.5} className="text-gray-400" />
      </button>
    </div>
  );
}
