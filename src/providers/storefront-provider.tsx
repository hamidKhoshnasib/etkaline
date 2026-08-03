"use client";

import * as React from "react";

import { getStorefront, type StorefrontConfig } from "@/config/storefront";
import { DEFAULT_SITE_TYPE, STOREFRONT_COOKIE_NAME, type SiteType } from "@/lib/api-site-type";

const StorefrontContext = React.createContext<StorefrontConfig>(getStorefront(DEFAULT_SITE_TYPE));

export function StorefrontProvider({
  children,
  siteType,
}: {
  children: React.ReactNode;
  siteType: SiteType;
}) {
  const storefront = React.useMemo(() => getStorefront(siteType), [siteType]);

  React.useEffect(() => {
    document.cookie = `${STOREFRONT_COOKIE_NAME}=${siteType}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [siteType]);

  return <StorefrontContext value={storefront}>{children}</StorefrontContext>;
}

export function useStorefront() {
  return React.use(StorefrontContext);
}
