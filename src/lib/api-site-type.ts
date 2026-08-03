export const SITE_TYPES = {
  appliance: "appliance",
  supermarket: "supermarket",
} as const;

export type SiteType = (typeof SITE_TYPES)[keyof typeof SITE_TYPES];

export const DEFAULT_SITE_TYPE: SiteType = SITE_TYPES.supermarket;
export const STOREFRONT_COOKIE_NAME = "etkaline-storefront";

export function isSiteType(value: unknown): value is SiteType {
  return value === SITE_TYPES.appliance || value === SITE_TYPES.supermarket;
}

export function parseSiteType(value: unknown): SiteType | null {
  return isSiteType(value) ? value : null;
}

export function getSiteTypeHeaders(siteType: SiteType) {
  return { SiteType: siteType } as const;
}
