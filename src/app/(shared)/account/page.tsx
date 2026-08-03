import { AccountPanelSkeleton } from "@/features/account";
import { AccountRouteGuard } from "@/features/account/components/AccountRouteGuard";

// صفحه‌ی خلاصه‌ی حساب؛ داده‌های سفارش و اعتبار در فاز اتصال API جایگزین می‌شوند.
export default function AccountPage() {
  return (
    <AccountRouteGuard>
      <section className="space-y-4" aria-labelledby="account-summary">
        <h2 id="account-summary" className="text-lg font-semibold">
          خلاصه حساب
        </h2>
        <AccountPanelSkeleton />
      </section>
    </AccountRouteGuard>
  );
}
