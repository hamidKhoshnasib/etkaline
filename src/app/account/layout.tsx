import type { Metadata } from "next";
import { AccountSidebar } from "@/features/account";

export const metadata: Metadata = {
  title: "حساب کاربری",
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-background lg:bg-muted/60 w-full flex-1">
      <div className="mx-auto grid w-full max-w-[1240px] items-start gap-0 px-0 py-0 lg:grid-cols-[306px_minmax(0,1fr)] lg:gap-4 lg:px-4 lg:py-8">
        <aside className="min-w-0 lg:col-start-1 lg:row-start-1">
          <AccountSidebar />
        </aside>
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">{children}</div>
      </div>
    </main>
  );
}
