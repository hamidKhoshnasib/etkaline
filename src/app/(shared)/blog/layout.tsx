import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <StorefrontLayout siteType={await getCurrentStorefrontSiteType()}>{children}</StorefrontLayout>
  );
}
