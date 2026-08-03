import type { ReactNode } from "react";

import { AccountRouteGuard } from "@/features/account/components/AccountRouteGuard";

export default function WishlistLayout({ children }: { children: ReactNode }) {
  return <AccountRouteGuard>{children}</AccountRouteGuard>;
}
