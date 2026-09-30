import { NavBar } from "./NavBar";
import { Container } from "@/components/ui/Container";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderAuth } from "./HeaderAuth";
import { MobileHeader } from "./MobileHeader";
import { HomeAdvertisement } from "./HomeAdvertisement";
import { MobileBottomNav } from "./MobileBottomNav";
import { getMenuCategories } from "@/features/catalog/api/get-menu-categories";
import { getExtraPages } from "@/features/extra-pages/api/get-extra-pages";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { STOREFRONT_REQUEST_TIMEOUT_MS } from "@/lib/api-config";
import type { SiteType } from "@/lib/api-site-type";

async function HeaderNavigation({ siteType }: { siteType: SiteType }) {
  const [categories, extraPages] = await Promise.all([
    getMenuCategories(siteType, STOREFRONT_REQUEST_TIMEOUT_MS),
    getExtraPages(siteType, STOREFRONT_REQUEST_TIMEOUT_MS),
  ]);
  return <NavBar categories={categories} extraPages={extraPages.headerItems} />;
}

async function MobileNavigation({ siteType }: { siteType: SiteType }) {
  return (
    <MobileBottomNav
      categories={await getMenuCategories(siteType, STOREFRONT_REQUEST_TIMEOUT_MS)}
    />
  );
}

export function Header({ siteType }: { siteType: SiteType }) {
  return (
    <>
      <HomeAdvertisement />
      <header className="sticky top-0 z-50">
        <MobileHeader />

        <div className="etkaline-pattern storefront-brand-surface text-secondary relative isolate hidden pb-15 lg:block">
          <Container className="relative z-70">
            <div className="flex items-center py-3">
              <HeaderLogo />
              <HeaderSearch />
              <HeaderAuth />
            </div>
          </Container>
          <SectionErrorBoundary
            title="دریافت منوی سایت ممکن نشد."
            className="min-h-0 rounded-none border-x-0 py-2"
          >
            <HeaderNavigation siteType={siteType} />
          </SectionErrorBoundary>
        </div>
      </header>
      <SectionErrorBoundary
        title="دریافت دسته‌بندی‌ها ممکن نشد."
        className="min-h-0 rounded-none border-x-0 py-2"
      >
        <MobileNavigation siteType={siteType} />
      </SectionErrorBoundary>
    </>
  );
}
