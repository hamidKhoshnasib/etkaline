import Link from "next/link";
import { Bell, User } from "lucide-react";

export function HeaderAuth() {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <Link
        href="/auth"
        className="bg-white flex items-center gap-2 rounded-full px-4.5 py-2.25 label-large h-12.5 text-secondary"
      >
        <User size={18} strokeWidth={1.5} />
        <span>ورود</span>
        <span className="text-gray-300">|</span>
        <span>ثبت نام</span>
      </Link>
      <button
        aria-label="اعلان‌ها"
        className="bg-white flex h-12.5 w-12.5 items-center justify-center rounded-full "
      >
        <Bell size={18} strokeWidth={2.5} className="text-gray-400" />
      </button>
    </div>
  );
}