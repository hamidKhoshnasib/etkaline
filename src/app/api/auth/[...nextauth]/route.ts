import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { handlers } from "@/features/auth/server";

async function withoutAccessToken(response: Response) {
  const payload: unknown = await response
    .clone()
    .json()
    .catch(() => null);
  if (!payload || typeof payload !== "object") {
    return response;
  }

  const session = { ...(payload as Record<string, unknown>) };
  delete session.accessToken;

  const headers = new Headers(response.headers);
  headers.delete("content-length");

  return NextResponse.json(session, {
    status: response.status,
    headers,
  });
}

export async function GET(request: NextRequest) {
  const response = await handlers.GET(request);
  return new URL(request.url).pathname.endsWith("/session")
    ? withoutAccessToken(response)
    : response;
}

export const POST = handlers.POST;
