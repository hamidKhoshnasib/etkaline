import "server-only";

import { auth } from "@/features/auth/lib/auth";
import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

export async function getServerApiHeaders() {
  const session = await auth();

  return {
    Accept: "application/json",
    ...SITE_TYPE_HEADERS,
    ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
  };
}
