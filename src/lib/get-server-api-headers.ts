import "server-only";

import { getServerSession } from "@/features/auth/lib/get-server-session";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";

export async function getServerApiHeaders(siteType: SiteType) {
  const session = await getServerSession();

  return {
    Accept: "application/json",
    ...getSiteTypeHeaders(siteType),
    ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
  };
}
