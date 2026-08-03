import type { Metadata } from "next";

import { ContactUs } from "@/features/contact";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createStorefrontMetadata({
    siteType: await getCurrentStorefrontSiteType(),
    pathname: "/contact-us",
    fallbackTitle: "تماس با اتکالاین",
    fallbackDescription: "راه‌های ارتباط با پشتیبانی فروشگاه اینترنتی اتکالاین",
  });
}

export default async function ContactUsIndex() {
  return <ContactUs siteType={await getCurrentStorefrontSiteType()} />;
}
