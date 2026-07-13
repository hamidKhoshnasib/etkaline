export const metadata = { title: "پروفایل", robots: { index: false, follow: false } };

// مرز صفحه پروفایل؛ فرم واقعی پس از تأیید قرارداد API حساب اضافه می‌شود.
export default function ProfilePage() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="text-lg font-semibold">پروفایل من</h2>
    </section>
  );
}
