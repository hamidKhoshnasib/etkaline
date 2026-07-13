import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/features/auth/server";
import { AccountNav } from "@/features/account";

export const metadata: Metadata = {
  title: "حساب کاربری",
  robots: { index: false, follow: false },
};

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/?auth=required");
  }

  return (
    <main className="container mx-auto w-full flex-1 px-4 py-8">
      <div className="mb-6 space-y-4">
        <h1 className="text-2xl font-bold">حساب کاربری</h1>
        <AccountNav />
      </div>
      {children}
    </main>
  );
}
