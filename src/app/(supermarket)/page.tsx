import type { Metadata } from "next";

import { ApplianceHome } from "@/features/home/appliances";
import { getHomeMetaTags } from "@/features/home/appliances/api/get-home-meta-tags";
import { SITE_TYPES } from "@/lib/api-site-type";

export async function generateMetadata(): Promise<Metadata> {
  const metaTags = await getHomeMetaTags(SITE_TYPES.supermarket);

  return {
    title: metaTags?.homeMetaTitle || "فروشگاه اینترنتی اتکالاین",
    description:
      metaTags?.homeMetaDescription ||
      "خرید آنلاین محصولات سوپرمارکتی از فروشگاه اینترنتی اتکالاین",
    alternates: { canonical: "/" },
  };
}

export default function SupermarketHomePage() {
  return <ApplianceHome siteType={SITE_TYPES.supermarket} />;
}
