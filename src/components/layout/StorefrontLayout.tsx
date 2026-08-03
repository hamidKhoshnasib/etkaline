import { Footer } from "@/components/layout/footer/Footer";
import { RouteAwareFooter } from "@/components/layout/footer/RouteAwareFooter";
import { Header } from "@/components/layout/header/Header";
import { QuickAddDialogProvider } from "@/features/product/components/QuickAddDialogProvider";
import type { SiteType } from "@/lib/api-site-type";
import { StorefrontProvider } from "@/providers/storefront-provider";

export function StorefrontLayout({
  children,
  siteType,
}: {
  children: React.ReactNode;
  siteType: SiteType;
}) {
  return (
    <StorefrontProvider siteType={siteType}>
      <QuickAddDialogProvider>
        <div data-site={siteType} className="flex min-h-full flex-1 flex-col">
          <Header siteType={siteType} />
          {children}
          <RouteAwareFooter>
            <Footer siteType={siteType} />
          </RouteAwareFooter>
        </div>
      </QuickAddDialogProvider>
    </StorefrontProvider>
  );
}
