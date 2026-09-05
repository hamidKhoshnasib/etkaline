import type { Metadata } from "next";

import { TermsPage } from "@/features/terms/components/TermsPage";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createStorefrontMetadata({
    siteType: await getCurrentStorefrontSiteType(),
    pathname: "/terms-and-conditions",
    fallbackTitle: "قوانین و مقررات اتکالاین",
    fallbackDescription: "قوانین استفاده، خرید، ارسال، مرجوعی و حریم خصوصی اتکالاین",
  });
}

export default async function TermsRoute() {
  const siteType = await getCurrentStorefrontSiteType();
  return <TermsPage siteType={siteType} />;
}
