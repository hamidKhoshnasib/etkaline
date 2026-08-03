import "server-only";

import { auth } from "@/features/auth/lib/auth";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";

export async function getServerApiHeaders(siteType: SiteType) {
  const session = await auth();

  return {
    Accept: "application/json",
    ...getSiteTypeHeaders(siteType),
    ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
  };
}
