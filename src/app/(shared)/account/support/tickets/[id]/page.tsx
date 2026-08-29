import { notFound } from "next/navigation";

import { TicketConversationView } from "@/features/account/components/TicketConversationView";

export const metadata = {
  title: "گفت‌وگوی تیکت",
  robots: { index: false, follow: false },
};

export default async function TicketConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const ticketId = Number(id);
  if (!Number.isSafeInteger(ticketId) || ticketId <= 0) {
    notFound();
  }

  return <TicketConversationView ticketId={ticketId} />;
}
