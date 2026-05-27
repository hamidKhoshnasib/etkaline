import Link from "next/link";
import EtkalineLogo from "@/assets/icons/logo.svg";

export function HeaderLogo() {
  return (
    <Link href="/">
      <EtkalineLogo className="h-11.5 w-50" />
    </Link>
  );
}
