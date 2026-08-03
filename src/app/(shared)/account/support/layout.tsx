import type { ReactNode } from "react";

import { AccountRouteGuard } from "@/features/account/components/AccountRouteGuard";

export default function SupportLayout({ children }: { children: ReactNode }) {
  return <AccountRouteGuard>{children}</AccountRouteGuard>;
}
