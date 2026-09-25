import { StorefrontLoader } from "@/components/ui/storefront-loader";
import { SITE_TYPES } from "@/lib/api-site-type";

export default function SupermarketLoading() {
  return <StorefrontLoader siteType={SITE_TYPES.supermarket} />;
}
