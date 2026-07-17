export const SITE_TYPES = {
  appliance: "appliance",
  supermarket: "supermarket",
} as const;

export type SiteType = (typeof SITE_TYPES)[keyof typeof SITE_TYPES];

// The application currently serves appliance pages only. Keep this centralized so routing can
// select the site type when supermarket pages are introduced.
export const CURRENT_SITE_TYPE: SiteType = SITE_TYPES.appliance;

export const SITE_TYPE_HEADERS = {
  "site-type": CURRENT_SITE_TYPE,
} as const;
