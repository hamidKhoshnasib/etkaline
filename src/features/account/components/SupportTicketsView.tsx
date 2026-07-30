import { Headphones } from "lucide-react";

import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { BackButton } from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_SUPPORT_TICKETS, type SupportTicket } from "@/features/account/model/support-tickets";

const TICKET_STATUS_LABELS = {
  answered: "پاسخ داده شده",
  closed: "بسته شده",
} as const;

function TicketCard({ ticket }: { ticket: SupportTicket }) {
  const isAnswered = ticket.status === "answered";

  return (
    <li>
      <Card className="min-h-16 gap-0 rounded-xl py-0 shadow-none">
        <CardContent className="flex min-h-16 items-center gap-3 px-4 py-3">
          <Headphones
            className={isAnswered ? "text-[#4d83f7]" : "text-muted-foreground"}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1" style={{ textAlign: "right" }}>
            <p className={isAnswered ? "text-secondary font-bold" : "text-muted-foreground"}>
              {ticket.subject}
            </p>
            <time className="text-muted-foreground mt-1 block text-xs" dateTime={ticket.createdAt}>
              {ticket.createdAt}
            </time>
          </div>
          <Badge
            className={
              isAnswered
                ? "border-0 bg-emerald-50 text-emerald-600"
                : "bg-muted text-muted-foreground border-0"
            }
          >
            {TICKET_STATUS_LABELS[ticket.status]}
          </Badge>
        </CardContent>
      </Card>
    </li>
  );
}

export function SupportTicketsView({
  tickets = MOCK_SUPPORT_TICKETS,
}: {
  tickets?: ReadonlyArray<SupportTicket>;
}) {
  return (
    <section dir="rtl" className="bg-muted/60 min-h-full lg:bg-transparent lg:pt-2">
      <MobilePageHeader fallbackHref="/account/support" title="تیکت‌ها" />
      <div className="px-4 py-6 lg:px-0 lg:py-0">
        <div className="mb-5 hidden flex-row-reverse items-center justify-end gap-2 lg:flex">
          <h1 className="text-base font-bold text-[#0057a8]">تیکت‌ها</h1>
          <BackButton fallbackHref="/account/support" />
        </div>
        <ul className="flex flex-col gap-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </ul>
      </div>
    </section>
  );
}
