import { notFound } from "next/navigation";

import { getMockOrder, MOCK_ORDERS, OrderDetailView } from "@/features/account";

export const metadata = { title: "جزئیات سفارش", robots: { index: false, follow: false } };

export function generateStaticParams() {
  return MOCK_ORDERS.map((order) => ({ id: order.id }));
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getMockOrder(id);

  if (!order) {
    notFound();
  }

  return <OrderDetailView order={order} />;
}
