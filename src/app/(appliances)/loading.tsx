import { StorefrontLoader } from "@/components/ui/storefront-loader";
import { SITE_TYPES } from "@/lib/api-site-type";

export default function AppliancesLoading() {
  return <StorefrontLoader siteType={SITE_TYPES.appliance} />;
}
