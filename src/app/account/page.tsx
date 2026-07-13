import { AccountPanelSkeleton } from "@/features/account";

// صفحه‌ی خلاصه‌ی حساب؛ داده‌های سفارش و اعتبار در فاز اتصال API جایگزین می‌شوند.
export default function AccountPage() {
  return (
    <section className="space-y-4" aria-labelledby="account-summary">
      <h2 id="account-summary" className="text-lg font-semibold">
        خلاصه حساب
      </h2>
      <AccountPanelSkeleton />
    </section>
  );
}
