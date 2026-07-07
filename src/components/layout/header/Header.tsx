import { NavBar } from "./NavBar";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderAuth } from "./HeaderAuth";
import { MobileHeader } from "./MobileHeader";

export function Header() {
  return (
    <header>
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
  );
}
