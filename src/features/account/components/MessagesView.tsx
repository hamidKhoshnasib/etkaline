"use client";

import { useState } from "react";
import { MessageCircleMore } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { ACCOUNT_OUTLINE_ACTION_CLASS } from "@/features/account/components/account-action-styles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MessageCategory = "information" | "discount";

type AccountMessage = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: MessageCategory;
  isRead: boolean;
};

const mockMessages: AccountMessage[] = [
  {
    id: "new-service-1",
    title: "اطلاع‌رسانی",
    description:
      "در روزهای اخیر، سرویس‌هایی در حوزه‌های بازی، برنامه‌نویسی، طراحی، علمی و پژوهشی و زیرساختی تحت پوشش شکن قرار گرفته‌اند.",
    timestamp: "۱۴۰۵/۰۲/۰۶ ۱۲:۲۴",
    category: "information",
    isRead: false,
  },
  {
    id: "new-service-2",
    title: "اطلاع‌رسانی",
    description:
      "در روزهای اخیر، سرویس‌هایی در حوزه‌های بازی، برنامه‌نویسی، طراحی، علمی و پژوهشی و زیرساختی تحت پوشش شکن قرار گرفته‌اند.",
    timestamp: "۱۴۰۵/۰۲/۰۶ ۱۲:۲۴",
    category: "information",
    isRead: false,
  },
  {
    id: "new-service-3",
    title: "اطلاع‌رسانی",
    description:
      "در روزهای اخیر، سرویس‌هایی در حوزه‌های بازی، برنامه‌نویسی، طراحی، علمی و پژوهشی و زیرساختی تحت پوشش شکن قرار گرفته‌اند.",
    timestamp: "۱۴۰۵/۰۲/۰۶ ۱۲:۲۴",
    category: "information",
    isRead: false,
  },
  {
    id: "new-service-4",
    title: "اطلاع‌رسانی",
    description:
      "در روزهای اخیر، سرویس‌هایی در حوزه‌های بازی، برنامه‌نویسی، طراحی، علمی و پژوهشی و زیرساختی تحت پوشش شکن قرار گرفته‌اند.",
    timestamp: "۱۴۰۵/۰۲/۰۶ ۱۲:۲۴",
    category: "information",
    isRead: true,
  },
  {
    id: "spring-discount",
    title: "تخفیف ویژه",
    description: "برای خریدهای منتخب، تخفیف ویژه‌ای تا پایان هفته در نظر گرفته شده است.",
    timestamp: "۱۴۰۵/۰۲/۰۵ ۰۹:۳۰",
    category: "discount",
    isRead: false,
  },
];

function MessagesEmptyState() {
  return (
    <Empty className="min-h-80 rounded-none p-4">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageCircleMore aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle className="text-secondary/45 text-base font-bold">
          پیامی برای نمایش وجود ندارد.
        </EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}

function MessagesList({ messages }: { messages: AccountMessage[] }) {
  if (messages.length === 0) {
    return <MessagesEmptyState />;
  }

  return (
    <ul className="flex flex-col gap-3 p-3 lg:p-4">
      {messages.map((message) => (
        <li key={message.id}>
          <Card
            size="sm"
            className="bg-muted/60 hover:bg-muted gap-0 border-0 py-0 shadow-none ring-0 transition-colors"
          >
            <CardContent className="flex items-center gap-3 px-4 py-4 sm:px-5">
              <span
                aria-hidden="true"
                className="bg-background flex size-10 shrink-0 items-center justify-center rounded-full text-[#5369ff]"
              >
                <MessageCircleMore />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-secondary truncate font-bold">{message.title}</h2>
                  {!message.isRead && (
                    <span className="size-2 shrink-0 rounded-full bg-emerald-400">
                      <span className="sr-only">خوانده نشده</span>
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mt-1 line-clamp-1 text-xs leading-6 sm:text-sm">
                  {message.description}
                </p>
              </div>
              <time
                className="text-muted-foreground shrink-0 text-xs whitespace-nowrap"
                dateTime="2026-04-26T12:24:00"
              >
                {message.timestamp}
              </time>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function MessagesView() {
  const [messages, setMessages] = useState(mockMessages);
  const allMessages = messages.filter((message) => message.category === "information");
  const discountMessages = messages.filter((message) => message.category === "discount");
  const hasUnreadMessages = messages.some((message) => !message.isRead);

  function markAllAsRead() {
    setMessages((currentMessages) =>
      currentMessages.map((message) => ({ ...message, isRead: true })),
    );
  }

  return (
    <section className="bg-muted/60 min-h-full lg:bg-transparent lg:px-0 lg:pt-2 lg:pb-0">
      <MobilePageHeader fallbackHref="/account/profile" title="پیام‌ها" />
      <div className="px-4 py-6 lg:px-0 lg:py-0">
        <div className="mb-7 flex items-center justify-end gap-4 lg:justify-between">
          <h1 className="text-secondary hidden text-lg font-bold lg:block">پیام‌ها</h1>
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={!hasUnreadMessages}
            className={ACCOUNT_OUTLINE_ACTION_CLASS}
            onClick={markAllAsRead}
          >
            خواندن همه
          </Button>
        </div>

        <Card className="gap-0 rounded-xl py-0 shadow-none">
          <CardContent className="px-0">
            <Tabs defaultValue="all" className="gap-0">
              <TabsList
                variant="line"
                aria-label="دسته‌بندی پیام‌ها"
                className="w-full justify-center gap-0 rounded-none border-b p-0 group-data-horizontal/tabs:h-13"
              >
                <TabsTrigger
                  value="all"
                  className="after:bg-primary data-active:text-secondary h-full max-w-24 rounded-none px-4 after:bottom-[-1px] data-active:font-bold"
                >
                  همه پیام‌ها
                </TabsTrigger>
                <TabsTrigger
                  value="discounts"
                  className="after:bg-primary data-active:text-secondary h-full max-w-24 rounded-none px-4 after:bottom-[-1px] data-active:font-bold"
                >
                  تخفیف‌ها
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <MessagesList messages={allMessages} />
              </TabsContent>
              <TabsContent value="discounts">
                <MessagesList messages={discountMessages} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
