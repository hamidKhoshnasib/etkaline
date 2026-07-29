import { LoginLogsPanel } from "@/features/account/components/LoginLogsPanel";

export const metadata = { title: "آخرین ورود و خروج", robots: { index: false, follow: false } };

export default function LoginLogsPage() {
  return <LoginLogsPanel />;
}
