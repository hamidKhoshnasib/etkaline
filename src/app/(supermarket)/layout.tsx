import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { SITE_TYPES } from "@/lib/api-site-type";

export default function SupermarketLayout({ children }: { children: React.ReactNode }) {
  return <StorefrontLayout siteType={SITE_TYPES.supermarket}>{children}</StorefrontLayout>;
}
