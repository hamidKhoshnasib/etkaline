export const metadata = { title: "دیدگاه‌ها", robots: { index: false, follow: false } };

// مرز دیدگاه‌ها برای اتصال بعدی به API بررسی مالکیت و وضعیت انتشار.
export default function ReviewsPage() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="text-lg font-semibold">دیدگاه‌های من</h2>
    </section>
  );
}
