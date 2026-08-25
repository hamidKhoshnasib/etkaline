import { NextResponse } from "next/server";

import { requestEtkalaAuthWithCookies } from "@/features/auth/api/etkala-auth-server";
import { parseSiteType } from "@/lib/api-site-type";
import { getRequestIdentity, takeRateLimit } from "@/lib/security/rate-limit";
import type { CaptchaValue } from "@/types/auth";

const CAPTCHA_COOKIE_PREFIX = "etkaline-captcha-";

const POST_ACTIONS = {
  login: "Login",
  resend: "ResendCode",
} as const;

function errorResponse(status = 502) {
  return NextResponse.json(
    {
      value: null,
      isSuccess: false,
      errors: ["ارتباط با سرویس ورود با خطا مواجه شد."],
      message: "ارتباط با سرویس ورود با خطا مواجه شد.",
    },
    { status },
  );
}

function rateLimitResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { message: "تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی بعد دوباره تلاش کنید." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    },
  );
}

function getCaptchaCookieHeader(request: Request) {
  const cookies = request.headers.get("cookie")?.split(";") ?? [];
  const captchaCookies = cookies.flatMap((cookie) => {
    const [name, ...valueParts] = cookie.trim().split("=");
    if (!name.startsWith(CAPTCHA_COOKIE_PREFIX) || valueParts.length === 0) {
      return [];
    }

    const upstreamName = name.slice(CAPTCHA_COOKIE_PREFIX.length);
    return /^[A-Za-z0-9_-]+$/.test(upstreamName) ? [`${upstreamName}=${valueParts.join("=")}`] : [];
  });

  return captchaCookies.join("; ");
}

function setCaptchaCookies(response: NextResponse, setCookies: string[]) {
  for (const cookie of setCookies.slice(0, 4)) {
    const [nameValue] = cookie.split(";", 1);
    const separatorIndex = nameValue.indexOf("=");
    if (separatorIndex < 1) {
      continue;
    }

    const name = nameValue.slice(0, separatorIndex).trim();
    const value = nameValue.slice(separatorIndex + 1);
    if (!/^[A-Za-z0-9_-]+$/.test(name)) {
      continue;
    }

    response.cookies.set(`${CAPTCHA_COOKIE_PREFIX}${name}`, value, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/api/etkala-auth",
    });
  }
}

function jsonWithCookies(payload: unknown, setCookies: string[], init?: ResponseInit) {
  const response = NextResponse.json(payload, init);
  setCaptchaCookies(response, setCookies);
  return response;
}

function parseMobile(value: unknown) {
  return typeof value === "string" && /^09\d{9}$/.test(value) ? value : null;
}

function parseRequestBody(action: keyof typeof POST_ACTIONS, value: unknown) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const input = value as Record<string, unknown>;
  const mobile = parseMobile(input.mobile);
  if (!mobile) {
    return null;
  }

  if (action === "resend") {
    return { mobile };
  }

  const captcha = input.captcha;
  const cpCode = input.cpCode;
  if (
    typeof captcha !== "string" ||
    captcha.length < 1 ||
    captcha.length > 8 ||
    typeof cpCode !== "string" ||
    cpCode.length < 1 ||
    cpCode.length > 200
  ) {
    return null;
  }

  return { mobile, captcha, cpCode };
}

function hasTrustedMutationOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export async function GET(request: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  if (action !== "captcha") {
    return NextResponse.json({ message: "مسیر نامعتبر است." }, { status: 404 });
  }

  const siteType = parseSiteType(request.headers.get("site-type"));
  if (!siteType) {
    return NextResponse.json({ message: "نوع فروشگاه نامعتبر است." }, { status: 400 });
  }

  const limit = takeRateLimit(`captcha:${getRequestIdentity(request)}`, 20, 60_000);
  if (!limit.allowed) {
    return rateLimitResponse(limit.retryAfterSeconds);
  }

  try {
    const result = await requestEtkalaAuthWithCookies<CaptchaValue>("GetCaptcha", siteType, {
      headers: { Cookie: getCaptchaCookieHeader(request) },
    });
    return jsonWithCookies(result.payload, result.setCookies, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return errorResponse();
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  const endpoint = POST_ACTIONS[action as keyof typeof POST_ACTIONS];
  if (!endpoint) {
    return NextResponse.json({ message: "مسیر نامعتبر است." }, { status: 404 });
  }

  if (!hasTrustedMutationOrigin(request)) {
    return NextResponse.json({ message: "درخواست نامعتبر است." }, { status: 403 });
  }

  const siteType = parseSiteType(request.headers.get("site-type"));
  if (!siteType) {
    return NextResponse.json({ message: "نوع فروشگاه نامعتبر است." }, { status: 400 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isFinite(contentLength) || contentLength > 4_096) {
    return NextResponse.json({ message: "درخواست نامعتبر است." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "اطلاعات فرم معتبر نیست." }, { status: 400 });
  }

  const payload = parseRequestBody(action as keyof typeof POST_ACTIONS, body);
  if (!payload) {
    return NextResponse.json({ message: "اطلاعات فرم معتبر نیست." }, { status: 400 });
  }

  const max = action === "login" ? 5 : 3;
  const limit = takeRateLimit(
    `${action}:${getRequestIdentity(request)}:${payload.mobile}`,
    max,
    10 * 60_000,
  );
  if (!limit.allowed) {
    return rateLimitResponse(limit.retryAfterSeconds);
  }

  try {
    const result = await requestEtkalaAuthWithCookies<unknown>(endpoint, siteType, {
      method: "POST",
      headers: { Cookie: getCaptchaCookieHeader(request) },
      body: JSON.stringify(payload),
    });
    return jsonWithCookies(result.payload, result.setCookies);
  } catch {
    return errorResponse();
  }
}
