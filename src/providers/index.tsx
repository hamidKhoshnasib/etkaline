"use client";

import type { Session } from "next-auth";

import { QueryProvider } from "./query-provider";
import { AuthSessionProvider } from "./session-provider";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <AuthSessionProvider session={session}>
      <QueryProvider>{children}</QueryProvider>
    </AuthSessionProvider>
  );
}
