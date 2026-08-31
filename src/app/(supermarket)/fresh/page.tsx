import type { Metadata } from "next";

import { getStorefront } from "@/config/storefront";
import { ApplianceHome } from "@/features/home/appliances";
import { getHomeMetaTags } from "@/features/home/appliances/api/get-home-meta-tags";
import { SITE_TYPES } from "@/lib/api-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const metaTags = await getHomeMetaTags(SITE_TYPES.supermarket);

  return createStorefrontMetadata({
    siteType: SITE_TYPES.supermarket,
    pathname: getStorefront(SITE_TYPES.supermarket).homeHref,
    title: metaTags?.homeMetaTitle,
    fallbackTitle: "فروشگاه اینترنتی اتکالاین",
    description: metaTags?.homeMetaDescription,
    fallbackDescription: "خرید آنلاین محصولات سوپرمارکتی از فروشگاه اینترنتی اتکالاین",
  });
}

export default function SupermarketHomePage() {
  return <ApplianceHome siteType={SITE_TYPES.supermarket} />;
}
