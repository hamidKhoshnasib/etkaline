import { SITE_TYPES, type SiteType } from "@/lib/api-site-type";

export function getHomeLayoutType(siteType: SiteType): 1 | 2 {
  return siteType === SITE_TYPES.supermarket ? 1 : 2;
}
