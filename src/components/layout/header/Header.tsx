import { NavBar } from "./NavBar";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderAuth } from "./HeaderAuth";
import { MobileHeader } from "./MobileHeader";
import { HomeAdvertisement } from "./HomeAdvertisement";
import { getHomeAdvertisement } from "@/services/home/get-home-advertisement";

export async function Header() {
  const advertisement = await getHomeAdvertisement();

  return (
    <>
      {advertisement && <HomeAdvertisement advertisement={advertisement} />}
      <header className="sticky top-0 z-50">
        <MobileHeader />

        <div className="bg-primary text-secondary relative hidden pb-15 lg:block">
          <div className="container mx-auto">
            <div className="flex items-center py-3">
              <HeaderLogo />
              <HeaderSearch />
              <HeaderAuth />
            </div>
          </div>
          <NavBar />
        </div>
      </header>
    </>
  );
}
