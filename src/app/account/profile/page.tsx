import { OrdersDashboard } from "@/features/account";

export const metadata = { title: "پروفایل", robots: { index: false, follow: false } };

export default function ProfilePage() {
  return (
    <div className="hidden lg:block">
      <OrdersDashboard />
    </div>
  );
}
