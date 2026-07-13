export const metadata = { title: "آدرس‌ها", robots: { index: false, follow: false } };

// مرز آدرس‌ها برای اتصال امن به API مالکیت آدرس در فاز بعدی.
export default function AddressesPage() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="text-lg font-semibold">آدرس‌های من</h2>
    </section>
  );
}
