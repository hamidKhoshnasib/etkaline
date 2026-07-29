"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader } from "@/components/ui/empty";

export default function ErrorPage({ unstable_retry }: { unstable_retry: () => void }) {
  return (
    <main className="container flex min-h-[50vh] items-center py-10">
      <Empty className="border-border bg-muted/30 border border-dashed">
        <EmptyHeader>
          <EmptyDescription>دریافت این صفحه ممکن نشد.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button type="button" variant="outline" onClick={unstable_retry}>
            <RefreshCw data-icon="inline-start" />
            تلاش دوباره
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
