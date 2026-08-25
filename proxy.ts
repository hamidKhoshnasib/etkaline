import { NextResponse } from "next/server";

import { auth } from "@/features/auth/server";

const PROTECTED_PREFIXES = ["/account"] as const;

export default auth((request) => {
  const isProtected = PROTECTED_PREFIXES.some((path) => request.nextUrl.pathname.startsWith(path));
  if (!isProtected || request.auth?.user) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/", request.url);
  loginUrl.searchParams.set("login", "1");
  loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
