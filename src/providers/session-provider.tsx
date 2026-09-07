"use client";

import { SessionProvider, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { useEffect } from "react";

import { CLIENT_SESSION_SYNC_EVENT, setClientSessionSnapshot } from "@/lib/axios-client";

function SessionTokenSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    setClientSessionSnapshot(
      session ? { accessToken: session.accessToken, error: session.error } : null,
    );

    if (session?.accessToken) {
      window.dispatchEvent(
        new CustomEvent<boolean>(CLIENT_SESSION_SYNC_EVENT, {
          detail: session.user.needCompleteProfile === true,
        }),
      );
    }
  }, [session, status]);

  return null;
}

export function AuthSessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <SessionTokenSync />
      {children}
    </SessionProvider>
  );
}
