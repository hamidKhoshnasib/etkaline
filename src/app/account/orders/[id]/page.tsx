import { OrderDetailClient } from "@/features/account/components/OrderDetailClient";

export const metadata = { title: "جزئیات سفارش", robots: { index: false, follow: false } };

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderDetailClient factorNumber={id} />;
}
