import { LoginLogsPanel } from "@/features/account/components/LoginLogsPanel";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";

export const metadata = { title: "آخرین ورود و خروج", robots: { index: false, follow: false } };

export default function LoginLogsPage() {
  return (
    <>
      <MobilePageHeader fallbackHref="/account/profile" title="آخرین ورود و خروج" />
      <div className="px-4 py-6 lg:px-0 lg:py-0">
        <LoginLogsPanel />
      </div>
    </>
  );
}
