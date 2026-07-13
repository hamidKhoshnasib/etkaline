import { NextResponse } from "next/server";

import { requestEtkalaAuth } from "@/features/auth/api/etkala-auth-server";
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

export async function GET(_request: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;

  if (action !== "captcha") {
    return NextResponse.json({ message: "مسیر نامعتبر است." }, { status: 404 });
  }

  try {
    const payload = await requestEtkalaAuth<CaptchaValue>("GetCaptcha");
    return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
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
    const payload = await requestEtkalaAuth<unknown>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(payload);
  } catch (error) {
    return errorResponse(error);
  }
}
