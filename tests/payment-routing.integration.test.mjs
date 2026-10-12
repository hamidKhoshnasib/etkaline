import assert from "node:assert/strict";
import { test } from "node:test";

// Opt in against a running app to exercise Next.js route discovery and request-header forwarding.
const baseUrl = process.env.PAYMENT_ROUTING_TEST_BASE_URL;

for (const [purchaseSite, otherTabSite] of [
  ["supermarket", "appliance"],
  ["appliance", "supermarket"],
]) {
  test(
    `the running app returns ${purchaseSite} orders despite the ${otherTabSite} cookie`,
    { skip: !baseUrl },
    async () => {
      const response = await fetch(new URL(`/account/orders?siteType=${purchaseSite}`, baseUrl), {
        headers: { cookie: `etkaline-storefront=${otherTabSite}` },
      });
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.equal(html.match(/data-site="(appliance|supermarket)"/)?.[1], purchaseSite);
      assert.match(html, /dir="rtl"/);
    },
  );

  test(
    `the running app uses ${purchaseSite} for callback verification despite the other cookie`,
    { skip: !baseUrl },
    async () => {
      const response = await fetch(new URL(`/payment/callback?siteType=${purchaseSite}`, baseUrl), {
        headers: { cookie: `etkaline-storefront=${otherTabSite}` },
      });
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.equal(html.match(/data-site="(appliance|supermarket)"/)?.[1], purchaseSite);
    },
  );
}

test(
  "the running app executes the existing protected-route check",
  { skip: !baseUrl },
  async () => {
    const response = await fetch(new URL("/orders", baseUrl), { redirect: "manual" });
    assert.equal(response.status, 307);
    const destination = new URL(response.headers.get("location"), baseUrl);
    assert.equal(destination.pathname, "/");
    assert.equal(destination.searchParams.get("login"), "1");
    assert.equal(destination.searchParams.get("callbackUrl"), "/orders");
  },
);
