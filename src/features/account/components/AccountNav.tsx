import Link from "next/link";

// ناوبری مشترک پنل مشتری؛ این بخش فقط مدیریت حساب کاربر است، نه پنل ادمین.
const links = [
  ["حساب کاربری", "/account"],
  ["پروفایل", "/account/profile"],
  ["آدرس‌ها", "/account/addresses"],
  ["سفارش‌ها", "/account/orders"],
  ["علاقه‌مندی‌ها", "/account/wishlist"],
] as const;

export function AccountNav() {
  return (
    <nav aria-label="ناوبری حساب کاربری" className="flex flex-wrap gap-2">
      {links.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
