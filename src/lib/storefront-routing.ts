import type { NextRequest } from "next/server";

import {
  DEFAULT_SITE_TYPE,
  parseSiteType,
  STOREFRONT_COOKIE_NAME,
  STOREFRONT_QUERY_PARAM,
  STOREFRONT_REQUEST_HEADER,
} from "@/lib/api-site-type";

export function getStorefrontRequestHeaders(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete(STOREFRONT_REQUEST_HEADER);

  const { pathname } = request.nextUrl;
  if (
    pathname !== "/account/orders" &&
    !pathname.startsWith("/account/orders/") &&
    pathname !== "/payment/callback"
  ) {
    return requestHeaders;
  }

  const siteTypes = request.nextUrl.searchParams.getAll(STOREFRONT_QUERY_PARAM);
  const siteType =
    (siteTypes.length === 1 ? parseSiteType(siteTypes[0]) : null) ??
    parseSiteType(request.cookies.get(STOREFRONT_COOKIE_NAME)?.value) ??
    DEFAULT_SITE_TYPE;

  // The payment destination must select its storefront before the server layout renders.
  requestHeaders.set(STOREFRONT_REQUEST_HEADER, siteType);

  return requestHeaders;
}
