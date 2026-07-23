import { NextResponse } from "next/server";

import { auth } from "@/features/auth/server";
import { getServerApiBaseUrl } from "@/lib/api-config";
import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

interface LastLoginValue {
  loginDate: string;
  loginDateFa: string;
}

function parseLastLogin(value: unknown): LastLoginValue | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  if (typeof record.loginDate !== "string" || typeof record.loginDateFa !== "string") {
    return null;
  }

  return { loginDate: record.loginDate, loginDateFa: record.loginDateFa };
}

export async function GET() {
  const session = await auth();
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Authentication is required." }, { status: 401 });
  }

  try {
    const response = await fetch(`${getServerApiBaseUrl()}/api/Profile/GetLastLogin`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`,
        ...SITE_TYPE_HEADERS,
      },
      signal: AbortSignal.timeout(15_000),
    });
    const payload = (await response.json()) as { isSuccess?: unknown; value?: unknown };
    const value = response.ok && payload.isSuccess === true ? parseLastLogin(payload.value) : null;

    if (!value) {
      return NextResponse.json({ message: "Could not load the last login." }, { status: 502 });
    }

    return NextResponse.json({ value }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ message: "Could not load the last login." }, { status: 502 });
  }
}
