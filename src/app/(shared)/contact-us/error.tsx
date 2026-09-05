"use client";

import { ServerErrorPage } from "@/components/status/ServerErrorPage";

export default function ContactUsError({ unstable_retry }: { unstable_retry: () => void }) {
  return <ServerErrorPage unstable_retry={unstable_retry} />;
}
