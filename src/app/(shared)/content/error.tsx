"use client";

import { ServerErrorPage } from "@/components/status/ServerErrorPage";

export default function ContentError({ unstable_retry }: { unstable_retry: () => void }) {
  return <ServerErrorPage unstable_retry={unstable_retry} />;
}
