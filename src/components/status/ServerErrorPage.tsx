"use client";

import Link from "next/link";

import { StatusPage } from "@/components/status/StatusPage";
import { Button } from "@/components/ui/button";

export function ServerErrorPage({
  unstable_retry,
  supportHref = "/contact-us",
}: {
  unstable_retry: () => void;
  supportHref?: string;
}) {
  return (
    <StatusPage className="min-h-[calc(100dvh-16rem)] flex-1" variant="server-error">
      <Button className="font-bold" type="button" size="md" onClick={unstable_retry}>
        تلاش دوباره
      </Button>
      <Button
        className="border-primary text-primary hover:text-primary"
        render={<Link href={supportHref} />}
        nativeButton={false}
        size="md"
        variant="outline-primary"
      >
        تماس با پشتیبانی
      </Button>
    </StatusPage>
  );
}
