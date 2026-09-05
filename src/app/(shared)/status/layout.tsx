import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";

export default async function StatusLayout({ children }: { children: React.ReactNode }) {
  const siteType = await getCurrentStorefrontSiteType();

  return <StorefrontLayout siteType={siteType}>{children}</StorefrontLayout>;
}
