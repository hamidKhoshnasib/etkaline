import type { Metadata } from "next";

import { CategoryCatalog } from "@/features/catalog";

export const metadata: Metadata = {
  title: "جستجوی محصولات",
  description: "جستجو و مشاهده محصولات فروشگاه لوازم خانگی اتکالاین",
  robots: { index: false, follow: true },
};

export default function ApplianceSearchPage() {
  return <CategoryCatalog title="نتایج جستجو" />;
}
