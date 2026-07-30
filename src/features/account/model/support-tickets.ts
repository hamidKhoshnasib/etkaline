export type SupportTicketStatus = "answered" | "closed";

export interface SupportTicket {
  id: string;
  subject: string;
  createdAt: string;
  status: SupportTicketStatus;
}

export const MOCK_SUPPORT_TICKETS: ReadonlyArray<SupportTicket> = [
  {
    id: "ticket-1",
    subject: "خرید کردم به دستم نرسیده! لطفاً پیگیری کنید",
    createdAt: "۱۴۰۵/۰۲/۰۶ ۱۴:۴۵",
    status: "answered",
  },
  {
    id: "ticket-2",
    subject: "خرید کردم به دستم نرسیده!",
    createdAt: "۱۴۰۵/۰۲/۰۶ ۱۴:۴۵",
    status: "closed",
  },
  {
    id: "ticket-3",
    subject: "خرید کردم به دستم نرسیده!",
    createdAt: "۱۴۰۵/۰۲/۰۶ ۱۴:۴۵",
    status: "closed",
  },
  {
    id: "ticket-4",
    subject: "خرید کردم به دستم نرسیده!",
    createdAt: "۱۴۰۵/۰۲/۰۶ ۱۴:۴۵",
    status: "closed",
  },
  {
    id: "ticket-5",
    subject: "خرید کردم به دستم نرسیده!",
    createdAt: "۱۴۰۵/۰۲/۰۶ ۱۴:۴۵",
    status: "closed",
  },
  {
    id: "ticket-6",
    subject: "خرید کردم به دستم نرسیده!",
    createdAt: "۱۴۰۵/۰۲/۰۶ ۱۴:۴۵",
    status: "closed",
  },
];
