import { NextResponse } from "next/server";

import { auth } from "@/features/auth/server";
import { getServerApiBaseUrl } from "@/lib/api-config";
import { getSiteTypeHeaders, parseSiteType } from "@/lib/api-site-type";

const MAX_BODY_SIZE_BYTES = 64 * 1024;

const ALLOWED_PATHS = [
  /^\/api\/Addresses(?:\/SetAsDefault|\/\d+)?$/,
  /^\/api\/Advertisements$/,
  /^\/api\/Banners\/GetByType$/,
  /^\/api\/Baskets\/(?:AddToBasket|DeleteItem|GetCheckoutDetails|GetOpenBasket|UpdateQuantity)$/,
  /^\/api\/Categories(?:\/SearchableProperties)?$/,
  /^\/api\/Comments(?:\/Create|\/(?:AddLike|RemoveLike)\/\d+)?$/,
  /^\/api\/Factors(?:\/\d+)?$/,
  /^\/api\/Favorites$/,
  /^\/api\/Notice$/,
  /^\/api\/Products(?:\/(?:Search|Searchbar|\d+))?$/,
  /^\/api\/Profile(?:\/GetLoginLogs)?$/,
  /^\/api\/Provinces$/,
  /^\/api\/Stores\/GetAll$/,
] as const;

const PUBLIC_PATHS = [
  /^\/api\/Advertisements$/,
  /^\/api\/Banners\/GetByType$/,
  /^\/api\/Categories(?:\/SearchableProperties)?$/,
  /^\/api\/Comments$/,
  /^\/api\/Products(?:\/(?:Search|Searchbar|\d+))?$/,
  /^\/api\/Provinces$/,
  /^\/api\/Stores\/GetAll$/,
] as const;

function isAllowedPath(path: string) {
  return ALLOWED_PATHS.some((pattern) => pattern.test(path));
}

function isPublicPath(path: string) {
  return PUBLIC_PATHS.some((pattern) => pattern.test(path));
}

function hasTrustedMutationOrigin(request: Request) {
  if (request.method === "GET" || request.method === "HEAD") {
    return true;
  }

  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

function redactTokens(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(redactTokens);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => key !== "accessToken" && key !== "refreshToken")
      .map(([key, item]) => [key, redactTokens(item)]),
  );
}

async function proxyRequest(request: Request, path: string) {
  if (!isAllowedPath(path)) {
    return NextResponse.json({ message: "مسیر در دسترس نیست." }, { status: 404 });
  }

  if (!hasTrustedMutationOrigin(request)) {
    return NextResponse.json({ message: "درخواست نامعتبر است." }, { status: 403 });
  }

  const siteType = parseSiteType(request.headers.get("site-type"));
  if (!siteType) {
    return NextResponse.json({ message: "نوع فروشگاه نامعتبر است." }, { status: 400 });
  }

  const session = await auth();
  if (!isPublicPath(path) && !session?.accessToken) {
    return NextResponse.json({ message: "ورود به حساب کاربری لازم است." }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isFinite(contentLength) || contentLength > MAX_BODY_SIZE_BYTES) {
    return NextResponse.json({ message: "حجم درخواست بیش از حد مجاز است." }, { status: 413 });
  }

  const body =
    request.method === "GET" || request.method === "HEAD" ? undefined : await request.text();
  if (body && new TextEncoder().encode(body).byteLength > MAX_BODY_SIZE_BYTES) {
    return NextResponse.json({ message: "حجم درخواست بیش از حد مجاز است." }, { status: 413 });
  }

  const requestUrl = new URL(request.url);
  const upstreamUrl = new URL(`${path}${requestUrl.search}`, getServerApiBaseUrl());
  const response = await fetch(upstreamUrl, {
    method: request.method,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(request.method === "GET" || request.method === "HEAD"
        ? {}
        : { "Content-Type": "application/json" }),
      ...getSiteTypeHeaders(siteType),
      ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
    },
    body,
    signal: AbortSignal.timeout(15_000),
  });

  const responseBody = await response.text();
  const contentType = response.headers.get("content-type") ?? "application/json";
  if (!contentType.includes("application/json")) {
    return new NextResponse(responseBody, {
      status: response.status,
      headers: { "Cache-Control": "no-store", "Content-Type": contentType },
    });
  }

  try {
    const payload: unknown = JSON.parse(responseBody);
    return NextResponse.json(redactTokens(payload), {
      status: response.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { message: "پاسخ سرویس معتبر نیست." },
      { status: response.ok ? 502 : response.status, headers: { "Cache-Control": "no-store" } },
    );
  }
}

async function handle(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await context.params;
  const path = `/${segments.map(encodeURIComponent).join("/")}`;

  try {
    return await proxyRequest(request, path);
  } catch {
    return NextResponse.json({ message: "ارتباط با سرویس با خطا مواجه شد." }, { status: 502 });
  }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
