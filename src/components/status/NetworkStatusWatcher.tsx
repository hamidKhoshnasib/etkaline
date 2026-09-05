"use client";

import { useEffect } from "react";

const OFFLINE_PATH = "/status/offline";

function redirectToOfflinePage() {
  if (window.location.pathname === OFFLINE_PATH) {
    return;
  }

  const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.location.replace(`${OFFLINE_PATH}?returnTo=${encodeURIComponent(returnTo)}`);
}

export function NetworkStatusWatcher() {
  useEffect(() => {
    if (!navigator.onLine) {
      redirectToOfflinePage();
    }

    window.addEventListener("offline", redirectToOfflinePage);
    return () => window.removeEventListener("offline", redirectToOfflinePage);
  }, []);

  return null;
}
