import { Mailbox, MessageCircleMore } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function MessagesEmptyState() {
  return (
    <Empty className="min-h-[550px] rounded-none p-4">
      <EmptyHeader>
        <EmptyMedia className="relative mb-0 size-52">
          <span
            aria-hidden="true"
            className="bg-muted/70 absolute inset-5 -rotate-12 rounded-[42%_58%_52%_48%/55%_44%_56%_45%]"
          />
          <Mailbox
            className="text-secondary/25 fill-secondary/10 relative size-28"
            strokeWidth={1.2}
            aria-hidden="true"
          />
          <span className="absolute start-8 top-17 flex size-13 items-center justify-center">
            <MessageCircleMore
              className="size-13 fill-white text-white drop-shadow-sm"
              aria-hidden="true"
            />
            <span className="absolute flex gap-1" aria-hidden="true">
              <span className="bg-primary size-1.5 rounded-full" />
              <span className="bg-primary size-1.5 rounded-full" />
              <span className="bg-primary size-1.5 rounded-full" />
            </span>
          </span>
        </EmptyMedia>
        <EmptyTitle className="text-secondary/45 text-base font-bold">
          هنوز که خبری نیست...
        </EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}

export function MessagesView() {
  return (
    <section className="bg-muted/60 min-h-full px-4 py-6 lg:bg-transparent lg:px-0 lg:pt-2 lg:pb-0">
      <div className="mb-7 flex items-center justify-between gap-4">
        <h1 className="text-secondary text-lg font-bold">پیام‌ها</h1>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="text-muted-foreground bg-transparent"
        >
          خواندن همه
        </Button>
      </div>

      <Card className="min-h-[605px] gap-0 rounded-xl py-0 shadow-none">
        <CardContent className="px-0">
          <Tabs defaultValue="all" className="gap-0">
            <TabsList
              variant="line"
              aria-label="دسته‌بندی پیام‌ها"
              className="w-full justify-center gap-0 rounded-none border-b p-0 group-data-horizontal/tabs:h-13"
            >
              <TabsTrigger
                value="all"
                className="after:bg-primary data-active:text-secondary h-full max-w-24 rounded-none px-4 data-active:font-bold"
              >
                همه پیام‌ها
              </TabsTrigger>
              <TabsTrigger
                value="discounts"
                className="after:bg-primary data-active:text-secondary h-full max-w-24 rounded-none px-4 data-active:font-bold"
              >
                تخفیف‌ها
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <MessagesEmptyState />
            </TabsContent>
            <TabsContent value="discounts">
              <MessagesEmptyState />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
