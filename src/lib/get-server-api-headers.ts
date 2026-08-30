import "server-only";

import { getServerSession } from "@/features/auth/lib/get-server-session";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";

export async function getServerApiHeaders(siteType: SiteType) {
  const session = await getServerSession();
  const accessToken = session?.error === "RefreshTokenError" ? undefined : session?.accessToken;

  return {
    Accept: "application/json",
    ...getSiteTypeHeaders(siteType),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
}
