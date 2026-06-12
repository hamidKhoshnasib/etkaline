import { ProfileSidebar } from "@/view/profile/ProfileSidebar";
import type { UserProfile } from "@/view/profile/types";

const mockUser: UserProfile = {
  name: "محمدرضا",
  walletBalance: 304_562_500,
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto py-4 md:py-8">
      <div className="flex items-start gap-0 md:gap-6">
        <div className="w-full md:min-w-0 md:flex-1">{children}</div>
        <ProfileSidebar user={mockUser} />
      </div>
    </main>
  );
}
