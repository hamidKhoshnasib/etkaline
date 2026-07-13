import { NextResponse } from "next/server";

import { requestEtkalaAuthWithCookies } from "@/features/auth/api/etkala-auth-server";
import type { CaptchaValue } from "@/types/auth";

const POST_ACTIONS = {
  login: "Login",
  resend: "ResendCode",
} as const;

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "خطا در ارتباط با سرویس ورود.";
  return NextResponse.json(
    { value: null, isSuccess: false, errors: [message], message },
    { status: 502 },
  );
}

// کوکی کپچا از backend به مرورگر و در درخواست بعدی دوباره به backend عبور می‌کند.
function jsonWithCookies(payload: unknown, setCookies: string[], init?: ResponseInit) {
  const response = NextResponse.json(payload, init);
  for (const cookie of setCookies) {
    response.headers.append("Set-Cookie", cookie);
  }
  return response;
}

export async function GET(_request: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;

  if (action !== "captcha") {
    return NextResponse.json({ message: "مسیر نامعتبر است." }, { status: 404 });
  }

  try {
    const result = await requestEtkalaAuthWithCookies<CaptchaValue>("GetCaptcha", {
      headers: { Cookie: _request.headers.get("cookie") ?? "" },
    });
    return jsonWithCookies(result.payload, result.setCookies, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  const endpoint = POST_ACTIONS[action as keyof typeof POST_ACTIONS];

  if (!endpoint) {
    return NextResponse.json({ message: "مسیر نامعتبر است." }, { status: 404 });
  }

  try {
    const body = await request.json();
    const result = await requestEtkalaAuthWithCookies<unknown>(endpoint, {
      method: "POST",
      headers: { Cookie: request.headers.get("cookie") ?? "" },
      body: JSON.stringify(body),
    });
    return jsonWithCookies(result.payload, result.setCookies);
  } catch (error) {
    return errorResponse(error);
  }
}
