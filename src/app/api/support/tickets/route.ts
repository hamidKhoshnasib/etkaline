import { NextResponse } from "next/server";

import { auth } from "@/features/auth/server";
import { API_TIMEOUT_MS, getServerApiBaseUrl } from "@/lib/api-config";
import { getSiteTypeHeaders, parseSiteType } from "@/lib/api-site-type";

const fieldLimits = {
  Title: 200,
  Text: 5_000,
  Captcha: 8,
  CpCode: 4_096,
} as const;

const captchaCookieNames = new Set(["_s.co", "cookiesession1"]);

function getCaptchaCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) {
    return "";
  }

  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .filter((cookie) => captchaCookieNames.has(cookie.split("=", 1)[0]))
    .join("; ");
}

function getUpstreamMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const message = (payload as Record<string, unknown>).message;
  return typeof message === "string" && message.trim() ? message.trim() : null;
}

export async function POST(request: Request) {
  const siteType = parseSiteType(request.headers.get("site-type"));
  if (!siteType) {
    return NextResponse.json({ message: "site-type نامعتبر است." }, { status: 400 });
  }

  const session = await auth();
  if (session?.error === "RefreshTokenError" || !session?.accessToken) {
    return NextResponse.json({ message: "برای ثبت تیکت وارد حساب خود شوید." }, { status: 401 });
  }

  let input: FormData;
  try {
    input = await request.formData();
  } catch {
    return NextResponse.json({ message: "اطلاعات فرم معتبر نیست." }, { status: 400 });
  }

  const formData = new FormData();
  for (const [field, limit] of Object.entries(fieldLimits) as Array<
    [keyof typeof fieldLimits, number]
  >) {
    const value = input.get(field);
    if (typeof value !== "string" || !value.trim() || value.trim().length > limit) {
      return NextResponse.json(
        { message: "لطفاً موضوع، پیام و عبارت امنیتی را به‌درستی وارد کنید." },
        { status: 400 },
      );
    }
    formData.set(field, value.trim());
  }

  try {
    const captchaCookieHeader = getCaptchaCookieHeader(request.headers.get("cookie"));
    const response = await fetch(`${getServerApiBaseUrl()}/api/Tickets`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`,
        ...(captchaCookieHeader ? { Cookie: captchaCookieHeader } : {}),
        ...getSiteTypeHeaders(siteType),
      },
      body: formData,
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    const payload: unknown = await response.json().catch(() => null);
    const value =
      payload && typeof payload === "object" ? (payload as Record<string, unknown>).value : null;
    const isSuccess =
      response.ok &&
      payload &&
      typeof payload === "object" &&
      (payload as Record<string, unknown>).isSuccess === true &&
      typeof value === "number" &&
      Number.isSafeInteger(value) &&
      value > 0;

    if (!isSuccess) {
      return NextResponse.json(
        {
          message:
            response.status < 500
              ? (getUpstreamMessage(payload) ?? "ارسال تیکت ناموفق بود.")
              : "ارسال تیکت ناموفق بود.",
        },
        {
          status:
            response.status >= 400 && response.status < 500
              ? response.status
              : response.ok
                ? 400
                : 502,
        },
      );
    }

    return NextResponse.json(
      { isSuccess: true, value },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ message: "ارسال تیکت ناموفق بود." }, { status: 502 });
  }
}
