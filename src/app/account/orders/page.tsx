export const metadata = { title: "سفارش‌ها", robots: { index: false, follow: false } };

// لیست سفارش‌ها عمداً بدون داده‌ی جعلی است تا قرارداد backend مشخص شود.
export default function OrdersPage() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="text-lg font-semibold">سفارش‌های من</h2>
    </section>
  );
}
