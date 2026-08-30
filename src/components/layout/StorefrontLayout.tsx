import { Footer } from "@/components/layout/footer/Footer";
import { RouteAwareFooter } from "@/components/layout/footer/RouteAwareFooter";
import { Header } from "@/components/layout/header/Header";
import { StorefrontSwitchTab } from "@/components/layout/StorefrontSwitchTab";
import { QuickAddDialogProvider } from "@/features/product/components/QuickAddDialogProvider";
import type { SiteType } from "@/lib/api-site-type";
import { StorefrontProvider } from "@/providers/storefront-provider";

export function StorefrontLayout({
  children,
  siteType,
  showStorefrontSwitch = true,
}: {
  children: React.ReactNode;
  siteType: SiteType;
  showStorefrontSwitch?: boolean;
}) {
  return (
    <StorefrontProvider siteType={siteType}>
      <QuickAddDialogProvider>
        <div data-site={siteType} className="flex min-h-full flex-1 flex-col">
          <Header siteType={siteType} />
          {showStorefrontSwitch ? (
            <div className="sticky top-[calc(50vh-82px)] z-40 h-0">
              <StorefrontSwitchTab siteType={siteType} />
            </div>
          ) : null}
          {children}
          <RouteAwareFooter>
            <Footer siteType={siteType} />
          </RouteAwareFooter>
        </div>
      </QuickAddDialogProvider>
    </StorefrontProvider>
  );
}
