import { getStorefront } from "@/config/storefront";
import type { HomeLayoutItem } from "@/features/home/appliances/api/get-home-layout";
import type { SiteType } from "@/lib/api-site-type";

export function getHomeLayoutLink(
  item: Pick<HomeLayoutItem, "targetType" | "targetId">,
  siteType: SiteType,
) {
  const params = new URLSearchParams();

  switch (item.targetType) {
    case 0:
    case 1:
      if (item.targetId === null || !Number.isSafeInteger(item.targetId) || item.targetId <= 0) {
        return undefined;
      }
      params.set(item.targetType === 0 ? "category" : "layoutTag", String(item.targetId));
      break;
    case 2:
      params.set("sort", "mostdiscount");
      params.set("discounted", "1");
      break;
    case 3:
      params.set("sort", "bestselling");
      break;
    case 4:
      params.set("sort", "popular");
      break;
    case 5:
      params.set("sort", "specialoffer");
      params.set("offer", "1");
      break;
    case 6:
      // Banner layouts use each banner's backend link rather than a product search destination.
      return undefined;
    default:
      return undefined;
  }

  return `${getStorefront(siteType).searchHref}?${params.toString()}`;
}
