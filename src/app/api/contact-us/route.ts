import { NextResponse } from "next/server";

import { API_TIMEOUT_MS, getServerApiBaseUrl } from "@/lib/api-config";
import { getSiteTypeHeaders, parseSiteType } from "@/lib/api-site-type";

const fieldLimits = {
  fullName: 150,
  email: 254,
  tel: 32,
  subject: 200,
  text: 5_000,
  captcha: 8,
  cpCode: 4_096,
} as const;

type ContactPayload = Record<keyof typeof fieldLimits, string>;

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
function parsePayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const input = value as Record<string, unknown>;
  const payload = {} as ContactPayload;

  for (const [field, limit] of Object.entries(fieldLimits) as Array<
    [keyof typeof fieldLimits, number]
  >) {
    const fieldValue = input[field];

    if (typeof fieldValue !== "string") {
      return null;
    }

    const normalizedValue = fieldValue.trim();
    if (!normalizedValue || normalizedValue.length > limit) {
      return null;
    }

    payload[field] = normalizedValue;
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return null;
  }

  return payload;
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

  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "اطلاعات فرم معتبر نیست." }, { status: 400 });
  }

  const payload = parsePayload(input);
  if (!payload) {
    return NextResponse.json(
      { message: "لطفاً همه فیلدها را به‌درستی تکمیل کنید." },
      { status: 400 },
    );
  }

  try {
    const captchaCookieHeader = getCaptchaCookieHeader(request.headers.get("cookie"));
    const response = await fetch(`${getServerApiBaseUrl()}/api/ContactUs`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(captchaCookieHeader ? { Cookie: captchaCookieHeader } : {}),
        ...getSiteTypeHeaders(siteType),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    const upstreamPayload: unknown = await response.json().catch(() => null);
    const isSuccess =
      response.ok &&
      Boolean(
        upstreamPayload &&
        typeof upstreamPayload === "object" &&
        (upstreamPayload as Record<string, unknown>).isSuccess === true,
      );

    if (!isSuccess) {
      return NextResponse.json(
        { message: getUpstreamMessage(upstreamPayload) ?? "ارسال پیام با خطا مواجه شد." },
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

    return NextResponse.json({ isSuccess: true });
  } catch {
    return NextResponse.json({ message: "ارسال پیام با خطا مواجه شد." }, { status: 502 });
  }
}
