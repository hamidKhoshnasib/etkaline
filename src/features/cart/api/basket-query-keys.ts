import type { SiteType } from "@/lib/api-site-type";

export const basketQueryKeys = {
  all: (siteType: SiteType) => [siteType, "basket"] as const,
  open: (siteType: SiteType, customerId?: number) =>
    [...basketQueryKeys.all(siteType), "open", customerId ?? "anonymous"] as const,
  checkoutDetailsRoot: (siteType: SiteType, customerId?: number) =>
    [...basketQueryKeys.all(siteType), "checkout-details", customerId ?? "anonymous"] as const,
  checkoutDetails: (
    siteType: SiteType,
    customerId: number | undefined,
    basketId: number,
    removeDiscount: boolean,
  ) =>
    [
      ...basketQueryKeys.checkoutDetailsRoot(siteType, customerId),
      basketId,
      { removeDiscount },
    ] as const,
};
