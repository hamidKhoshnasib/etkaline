const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (() => {
  if (configuredSiteUrl) {
    try {
      return new URL(configuredSiteUrl);
    } catch {
      // Fall back to the production host instead of emitting an invalid canonical URL.
    }
  }

  return new URL("https://etkaline.ir");
})();

export const SITE_NAME = "اتکالاین";
