import { NextResponse } from "next/server";

import { API_TIMEOUT_MS, getServerApiBaseUrl } from "@/lib/api-config";
import { getSiteTypeHeaders, parseSiteType } from "@/lib/api-site-type";
import { getRequestIdentity, takeRateLimit } from "@/lib/security/rate-limit";

const fieldLimits = {
  fullName: 150,
  email: 254,
  tel: 32,
  subject: 200,
  text: 5_000,
} as const;

type ContactPayload = Record<keyof typeof fieldLimits, string>;

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
  void payload;
  return null;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ message: "درخواست نامعتبر است." }, { status: 403 });
  }

  const siteType = parseSiteType(request.headers.get("site-type"));
  if (!siteType) {
    return NextResponse.json({ message: "SiteType نامعتبر است." }, { status: 400 });
  }

  const limit = takeRateLimit(`contact:${getRequestIdentity(request)}`, 5, 10 * 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { message: "تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی بعد دوباره تلاش کنید." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
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
    const response = await fetch(`${getServerApiBaseUrl()}/api/ContactUs`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
        { status: response.status >= 400 && response.status < 500 ? response.status : 502 },
      );
    }

    return NextResponse.json({ isSuccess: true });
  } catch {
    return NextResponse.json({ message: "ارسال پیام با خطا مواجه شد." }, { status: 502 });
  }
}
