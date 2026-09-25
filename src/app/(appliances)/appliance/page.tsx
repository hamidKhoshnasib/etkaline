import type { Metadata } from "next";

import { getStorefront } from "@/config/storefront";
import { ApplianceHome } from "@/features/home/appliances";
import { getHomeMetaTags } from "@/features/home/appliances/api/get-home-meta-tags";
import { SITE_TYPES } from "@/lib/api-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const metaTags = await getHomeMetaTags(SITE_TYPES.appliance);

  return createStorefrontMetadata({
    siteType: SITE_TYPES.appliance,
    pathname: getStorefront(SITE_TYPES.appliance).homeHref,
    title: metaTags?.homeMetaTitle,
    fallbackTitle: "لوازم خانگی اتکالاین",
    description: metaTags?.homeMetaDescription,
    fallbackDescription: "خرید آنلاین لوازم خانگی از اتکالاین",
  });
}

export default function AppliancesHomePage() {
  return <ApplianceHome siteType={SITE_TYPES.appliance} />;
}
