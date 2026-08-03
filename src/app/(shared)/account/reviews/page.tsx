import { MessagesView } from "@/features/account/components/MessagesView";

export const metadata = { title: "پیام‌ها", robots: { index: false, follow: false } };

export default function ReviewsPage() {
  return <MessagesView />;
}
