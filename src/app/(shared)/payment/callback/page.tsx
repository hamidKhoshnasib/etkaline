import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { PaymentCallbackPage } from "@/components/status/PaymentCallbackPage";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";

export default async function PaymentCallbackRoute() {
  const siteType = await getCurrentStorefrontSiteType();

  return (
    <StorefrontLayout siteType={siteType}>
      <PaymentCallbackPage />
    </StorefrontLayout>
  );
}
