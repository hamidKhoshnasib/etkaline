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

async function HeaderNavigation() {
  const [categories, extraPages] = await Promise.all([getMenuCategories(), getExtraPages()]);
  return <NavBar categories={categories} extraPages={extraPages.headerItems} />;
}

async function MobileNavigation() {
  return <MobileBottomNav categories={await getMenuCategories()} />;
}

export function Header() {
  return (
    <>
      <HomeAdvertisement />
      <header className="sticky top-0 z-50">
        <MobileHeader />

        <div className="etkaline-pattern bg-primary! text-secondary relative isolate hidden pb-15 lg:block">
          <Container className="relative z-[70]">
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
            <HeaderNavigation />
          </SectionErrorBoundary>
        </div>
      </header>
      <SectionErrorBoundary
        title="دریافت دسته‌بندی‌ها ممکن نشد."
        className="min-h-0 rounded-none border-x-0 py-2"
      >
        <MobileNavigation />
      </SectionErrorBoundary>
    </>
  );
}
