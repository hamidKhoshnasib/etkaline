import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";

export default async function ContactLayout({ children }: { children: React.ReactNode }) {
  return <StorefrontLayout siteType={await getCurrentStorefrontSiteType()}>{children}</StorefrontLayout>;
}
