import Link from "next/link";

import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { StatusPage } from "@/components/status/StatusPage";
import { Button } from "@/components/ui/button";
import { getStorefront } from "@/config/storefront";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";

export default async function NotFound() {
  const storefront = getStorefront(await getCurrentStorefrontSiteType());

  return (
    <StorefrontLayout siteType={storefront.siteType}>
      <StatusPage className="min-h-[calc(100dvh-16rem)] flex-1" variant="not-found">
        <Button
          className="font-bold"
          render={<Link href={storefront.homeHref} />}
          nativeButton={false}
          size="md"
        >
          بازگشت به صفحه اصلی
        </Button>
        <Button
          render={<Link href={`${storefront.homeHref}?focus=search`} />}
          nativeButton={false}
          size="md"
          variant="outline-primary"
          className="border-primary text-primary hover:text-primary"
        >
          جستجو در سایت
        </Button>
      </StatusPage>
    </StorefrontLayout>
  );
}
