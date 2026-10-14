import { getStorefront } from "@/config/storefront";
import type { SiteType } from "@/lib/api-site-type";
import { getBackendHref } from "@/lib/get-backend-href";

interface BannerTarget {
  link?: unknown;
  targetType?: unknown;
  targetId?: unknown;
  targetUrlTitle?: unknown;
}

export function getBannerHref(banner: BannerTarget, siteType: SiteType): string | null {
  const directHref = getBackendHref(banner.link);
  if (directHref) {
    return directHref;
  }

  const { targetType, targetId } = banner;
  if (typeof targetId !== "number" || !Number.isSafeInteger(targetId) || targetId <= 0) {
    return null;
  }

  const storefront = getStorefront(siteType);

  // CMS LinkTargetType differs from the home section LayoutContentType enum.
  switch (targetType) {
    case 1:
      return `${storefront.searchHref}?${new URLSearchParams({ category: String(targetId) })}`;
    case 2:
      return `${storefront.searchHref}?${new URLSearchParams({ tag: String(targetId) })}`;
    case 3: {
      const slug = typeof banner.targetUrlTitle === "string" ? banner.targetUrlTitle.trim() : "";
      return slug
        ? storefront.productHref(targetId, slug)
        : `${storefront.productPathPrefix}${targetId}`;
    }
    case 4:
      return `${storefront.searchHref}?${new URLSearchParams({ brand: String(targetId) })}`;
    default:
      return null;
  }
}
