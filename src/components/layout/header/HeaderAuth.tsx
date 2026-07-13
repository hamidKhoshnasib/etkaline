"use client";

import { Bell, User } from "lucide-react";
import { useSession } from "next-auth/react";

import { AuthDialog } from "@/features/auth";

export function HeaderAuth() {
  const { data: session, status } = useSession();

  return (
    <div className="flex shrink-0 items-center gap-3">
      {status === "authenticated" ? (
        <div className="label-large text-secondary flex h-12.5 items-center gap-2 rounded-full bg-white px-4.5 py-2.25">
          <User size={18} strokeWidth={1.5} />
          <span>{session.user.name || session.user.username}</span>
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
