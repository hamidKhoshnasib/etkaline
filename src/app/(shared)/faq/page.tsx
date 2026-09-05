import { Suspense } from "react";
import type { Metadata } from "next";

import { FaqPage } from "@/features/faq/components/FaqPage";
import { FaqPageSkeleton } from "@/features/faq/components/FaqPageSkeleton";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createStorefrontMetadata({
    siteType: await getCurrentStorefrontSiteType(),
    pathname: "/faq",
    fallbackTitle: "سوالات متداول اتکالاین",
    fallbackDescription: "پاسخ سوالات متداول درباره خرید، ارسال، تحویل و بازگشت کالا در اتکالاین",
  });
}

export default function FaqRoute() {
  return (
    <Suspense fallback={<FaqPageSkeleton />}>
      <FaqPage />
    </Suspense>
  );
}
