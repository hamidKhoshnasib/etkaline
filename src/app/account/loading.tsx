import { AccountPanelSkeleton } from "@/features/account";

// اسکلتون عمومی حساب برای انتقال نرم بین صفحات خصوصی.
export default function AccountLoading() {
  return (
    <main className="container mx-auto flex-1 px-4 py-8">
      <AccountPanelSkeleton />
    </main>
  );
}
