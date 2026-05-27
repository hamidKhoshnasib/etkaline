import { NavBar } from "./NavBar";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderAuth } from "./HeaderAuth";

export function Header() {
  return (
    <header>
      <div className="bg-primary text-secondary relative pb-15">
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