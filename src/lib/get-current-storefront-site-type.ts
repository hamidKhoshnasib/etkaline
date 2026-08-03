import { cookies } from "next/headers";

import {
  DEFAULT_SITE_TYPE,
  parseSiteType,
  STOREFRONT_COOKIE_NAME,
} from "@/lib/api-site-type";

export async function getCurrentStorefrontSiteType() {
  const cookieStore = await cookies();
  return parseSiteType(cookieStore.get(STOREFRONT_COOKIE_NAME)?.value) ?? DEFAULT_SITE_TYPE;
}
