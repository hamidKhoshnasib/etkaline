import { describe, expect, it } from "vitest";

import { getSiteTypeHeaders, SITE_TYPES } from "./api-site-type";

describe("getSiteTypeHeaders", () => {
  it("uses the backend's site-type header for the supermarket storefront", () => {
    expect(getSiteTypeHeaders(SITE_TYPES.supermarket)).toEqual({
      "site-type": "supermarket",
    });
  });

  it("uses the backend's site-type header for the appliance storefront", () => {
    expect(getSiteTypeHeaders(SITE_TYPES.appliance)).toEqual({
      "site-type": "appliance",
    });
  });
});
