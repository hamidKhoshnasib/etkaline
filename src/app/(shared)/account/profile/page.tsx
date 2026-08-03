import { ProfileOverview } from "@/features/account";

export const metadata = { title: "پروفایل", robots: { index: false, follow: false } };

export default function ProfilePage() {
  return <ProfileOverview />;
}
