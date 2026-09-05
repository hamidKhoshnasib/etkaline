"use client";

import { OfflinePage } from "@/components/status/OfflinePage";

function getSafeReturnTo() {
  const returnTo = new URLSearchParams(window.location.search).get("returnTo");
  return returnTo?.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";
}

export default function OfflineStatusRoute() {
  return <OfflinePage onRetry={() => window.location.assign(getSafeReturnTo())} />;
}
