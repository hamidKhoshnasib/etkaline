"use client";

import { StatusPage } from "@/components/status/StatusPage";
import { Button } from "@/components/ui/button";

export function OfflinePage({ onRetry }: { onRetry: () => void }) {
  return (
    <StatusPage className="min-h-[calc(100dvh-16rem)] flex-1" variant="offline">
      <Button type="button" size="md" onClick={onRetry}>
        تلاش مجدد
      </Button>
    </StatusPage>
  );
}
