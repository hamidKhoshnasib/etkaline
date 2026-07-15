import { NavBar } from "./NavBar";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderAuth } from "./HeaderAuth";
import { MobileHeader } from "./MobileHeader";
import { HomeAdvertisement } from "./HomeAdvertisement";
import { MobileBottomNav } from "./MobileBottomNav";
import { getMenuCategories } from "@/services/categories/get-menu-categories";
import { getHomeAdvertisement } from "@/services/home/get-home-advertisement";

export async function Header() {
  const [advertisement, categories] = await Promise.all([
    getHomeAdvertisement(),
    getMenuCategories(),
  ]);

  return (
    <>
      {advertisement && <HomeAdvertisement advertisement={advertisement} />}
      <header className="sticky top-0 z-50">
        <MobileHeader />

        <div className="etkaline-pattern !bg-primary text-secondary relative isolate hidden pb-15 lg:block">
          <div className="container mx-auto">
            <div className="flex items-center py-3">
              <HeaderLogo />
              <HeaderSearch />
              <HeaderAuth />
            </div>
          </div>
          <NavBar categories={categories} />
        </div>
      </header>
      <MobileBottomNav categories={categories} />
    </>
  );
}
