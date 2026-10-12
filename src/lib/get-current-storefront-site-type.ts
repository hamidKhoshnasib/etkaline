import { cookies, headers } from "next/headers";

import {
  DEFAULT_SITE_TYPE,
  parseSiteType,
  STOREFRONT_COOKIE_NAME,
  STOREFRONT_REQUEST_HEADER,
} from "@/lib/api-site-type";

export async function getCurrentStorefrontSiteType() {
  const requestHeaders = await headers();
  const requestSiteType = parseSiteType(requestHeaders.get(STOREFRONT_REQUEST_HEADER));
  if (requestSiteType) {
    return requestSiteType;
  }

  const cookieStore = await cookies();
  return parseSiteType(cookieStore.get(STOREFRONT_COOKIE_NAME)?.value) ?? DEFAULT_SITE_TYPE;
}
