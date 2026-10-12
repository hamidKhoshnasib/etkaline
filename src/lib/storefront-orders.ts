import { STOREFRONT_QUERY_PARAM, type SiteType } from "@/lib/api-site-type";

export function getStorefrontOrdersHref(siteType: SiteType) {
  const searchParams = new URLSearchParams({ [STOREFRONT_QUERY_PARAM]: siteType });
  return `/account/orders?${searchParams}`;
}
