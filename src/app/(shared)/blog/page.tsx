import type { Metadata } from "next";

import { Blog } from "@/features/blog";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createStorefrontMetadata({
    siteType: await getCurrentStorefrontSiteType(),
    pathname: "/blog",
    fallbackTitle: "مجله اتکالاین",
    fallbackDescription: "مطالب، راهنماها و تازه‌های فروشگاه اینترنتی اتکالاین",
  });
}

export default async function BlogIndex() {
  return <Blog siteType={await getCurrentStorefrontSiteType()} />;
}
