import { auth } from "@/features/auth/server";
import { NextResponse } from "next/server";
import { getStorefrontRequestHeaders } from "@/lib/storefront-routing";

const PROTECTED = ["/dashboard", "/profile", "/orders"];

export default auth((req) => {
  const isProtected = PROTECTED.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isProtected && !req.auth) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("login", "1");
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({ request: { headers: getStorefrontRequestHeaders(req) } });
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
