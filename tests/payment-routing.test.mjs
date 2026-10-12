import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const requireModule = createRequire(import.meta.url);
const { NextRequest } = requireModule("next/server");

// Use the installed compiler to exercise application TypeScript without adding a test dependency.
function loadSource(relativePath, overrides = {}) {
  const source = readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const sourceModule = { exports: {} };
  runInNewContext(outputText, {
    module: sourceModule,
    exports: sourceModule.exports,
    Headers,
    URL,
    URLSearchParams,
    require: (name) => {
      if (Object.hasOwn(overrides, name)) {
        return overrides[name];
      }
      if (name.startsWith("@/")) {
        return loadSource(`src/${name.slice(2)}.ts`, overrides);
      }
      return requireModule(name);
    },
  });
  return sourceModule.exports;
}

const { getStorefrontOrdersHref } = loadSource("src/lib/storefront-orders.ts");
const { proxy } = loadSource("src/proxy.ts", {
  "@/features/auth/server": { auth: (handler) => handler },
});
const { STOREFRONT_COOKIE_NAME, STOREFRONT_REQUEST_HEADER } = loadSource(
  "src/lib/api-site-type.ts",
);

function routeRequest(href, cookieSiteType, suppliedSiteType) {
  const headers = new Headers();
  if (cookieSiteType) {
    headers.set("cookie", `${STOREFRONT_COOKIE_NAME}=${cookieSiteType}`);
  }
  if (suppliedSiteType) {
    headers.set(STOREFRONT_REQUEST_HEADER, suppliedSiteType);
  }
  const request = new NextRequest(new URL(href, "https://shop.example"), { headers });
  const response = proxy(request);
  return { request, response };
}

async function resolveStorefront({ request, response }) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    STOREFRONT_REQUEST_HEADER,
    response.headers.get(`x-middleware-request-${STOREFRONT_REQUEST_HEADER}`),
  );
  const { getCurrentStorefrontSiteType } = loadSource(
    "src/lib/get-current-storefront-site-type.ts",
    {
      "next/headers": {
        headers: async () => requestHeaders,
        cookies: async () => request.cookies,
      },
    },
  );
  return getCurrentStorefrontSiteType();
}

for (const [purchaseSite, otherTabSite] of [
  ["supermarket", "appliance"],
  ["appliance", "supermarket"],
]) {
  test(`${purchaseSite} payment returns to its orders after another tab opens ${otherTabSite}`, async () => {
    const callbackHref = getStorefrontOrdersHref(purchaseSite);
    const url = new URL(callbackHref, "https://shop.example");
    assert.equal(url.pathname, "/account/orders");
    assert.equal(url.searchParams.get("siteType"), purchaseSite);
    assert.equal(await resolveStorefront(routeRequest(callbackHref, otherTabSite)), purchaseSite);
  });

  test(`${purchaseSite} callback verification uses the purchase storefront`, async () => {
    const callback = `/payment/callback?siteType=${purchaseSite}`;
    assert.equal(await resolveStorefront(routeRequest(callback, otherTabSite)), purchaseSite);
  });
}

test("simultaneous payments keep independent destinations despite a shared cookie", async () => {
  const supermarketHref = getStorefrontOrdersHref("supermarket");
  const applianceHref = getStorefrontOrdersHref("appliance");
  for (const cookieSite of ["appliance", "supermarket"]) {
    assert.equal(await resolveStorefront(routeRequest(supermarketHref, cookieSite)), "supermarket");
    assert.equal(await resolveStorefront(routeRequest(applianceHref, cookieSite)), "appliance");
  }
});

test("unscoped and invalid destinations preserve the cookie fallback", async () => {
  for (const href of [
    "/account/orders",
    "/account/orders?siteType=unknown",
    "/account/orders?siteType=",
    "/account/orders?siteType=supermarket&siteType=appliance",
    "/account/orders?siteType=https%3A%2F%2Fexternal.example",
  ]) {
    assert.equal(await resolveStorefront(routeRequest(href, "appliance")), "appliance");
  }
  assert.equal(await resolveStorefront(routeRequest("/account/orders", "invalid")), "supermarket");
  assert.equal(await resolveStorefront(routeRequest("/account/orders")), "supermarket");
});

test("supplied storefront headers cannot override the validated destination", async () => {
  const routed = routeRequest(getStorefrontOrdersHref("supermarket"), "appliance", "appliance");
  assert.equal(await resolveStorefront(routed), "supermarket");
  assert.equal(routed.response.headers.has(STOREFRONT_REQUEST_HEADER), false);
  assert.equal(
    await resolveStorefront(routeRequest("/account/orders", "supermarket", "appliance")),
    "supermarket",
  );
});

test("storefront overrides are limited to orders and the payment callback", () => {
  for (const href of ["/account/orders", "/account/orders/123", "/payment/callback"]) {
    const { response } = routeRequest(`${href}?siteType=appliance`, "supermarket");
    assert.equal(
      response.headers.get(`x-middleware-request-${STOREFRONT_REQUEST_HEADER}`),
      "appliance",
    );
  }
  for (const href of ["/", "/appliance", "/cart", "/api/Payments", "/account/profile"]) {
    const { response } = routeRequest(`${href}?siteType=appliance`, "supermarket", "appliance");
    assert.equal(response.headers.has(`x-middleware-request-${STOREFRONT_REQUEST_HEADER}`), false);
  }
});

test("existing protected routes still redirect unauthenticated requests", () => {
  for (const href of ["/dashboard", "/profile", "/orders"]) {
    const { response } = routeRequest(href, "appliance");
    const redirect = new URL(response.headers.get("location"));
    assert.equal(redirect.pathname, "/");
    assert.equal(redirect.searchParams.get("login"), "1");
    assert.equal(redirect.searchParams.get("callbackUrl"), href);
  }
});
