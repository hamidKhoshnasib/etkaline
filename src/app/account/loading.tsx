import { AccountPanelSkeleton } from "@/features/account";
import { Container } from "@/components/ui/Container";

// اسکلتون عمومی حساب برای انتقال نرم بین صفحات خصوصی.
export default function AccountLoading() {
  return (
    <Container as="main" className="flex-1 py-8">
      <AccountPanelSkeleton />
    </Container>
  );
}
