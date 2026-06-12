import { ProfileOrders } from "@/view/profile/ProfileOrders";
import { mockOrders } from "@/view/profile/Profile";

export default function ProfileOrdersPage() {
  return <ProfileOrders orders={mockOrders} />;
}
