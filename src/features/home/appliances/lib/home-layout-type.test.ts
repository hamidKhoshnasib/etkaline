import { describe, expect, it } from "vitest";

import { SITE_TYPES } from "@/lib/api-site-type";
import { getHomeLayoutType } from "./home-layout-type";

describe("getHomeLayoutType", () => {
  it("uses the supermarket home layout for the supermarket storefront", () => {
    expect(getHomeLayoutType(SITE_TYPES.supermarket)).toBe(1);
  });

  it("uses the appliance home layout for the appliance storefront", () => {
    expect(getHomeLayoutType(SITE_TYPES.appliance)).toBe(2);
  });
});
