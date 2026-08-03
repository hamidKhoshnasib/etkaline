import { ProfileOverview } from "@/features/account";

export const metadata = { title: "ویرایش پروفایل", robots: { index: false, follow: false } };

export default function EditProfilePage() {
  return <ProfileOverview editPage />;
}
