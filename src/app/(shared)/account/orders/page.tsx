import { OrdersDashboard } from "@/features/account";

export const metadata = { title: "سفارش‌ها", robots: { index: false, follow: false } };

export default function OrdersPage() {
  return <OrdersDashboard />;
}
