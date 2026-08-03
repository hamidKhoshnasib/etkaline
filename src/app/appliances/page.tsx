import type { Metadata } from "next";

import { ApplianceHome } from "@/features/home/appliances";
import { SITE_TYPES } from "@/lib/api-site-type";

export const metadata: Metadata = {
  title: "لوازم خانگی اتکالاین",
  description: "خرید آنلاین لوازم خانگی از اتکالاین",
  alternates: { canonical: "/appliances" },
};

export default function AppliancesHomePage() {
  return <ApplianceHome siteType={SITE_TYPES.appliance} />;
}
