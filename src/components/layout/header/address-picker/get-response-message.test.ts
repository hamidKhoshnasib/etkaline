import { describe, expect, it } from "vitest";

import { getAddressResponseMessage } from "./get-response-message";

describe("getAddressResponseMessage", () => {
  it("prioritizes a non-empty API message", () => {
    expect(
      getAddressResponseMessage({ message: "Request failed", errors: ["Fallback"] }, "Default"),
    ).toBe("Request failed");
  });

  it("uses the first API error or supplied fallback", () => {
    expect(getAddressResponseMessage({ errors: ["Invalid address"] }, "Default")).toBe(
      "Invalid address",
    );
    expect(getAddressResponseMessage({}, "Default")).toBe("Default");
  });
});
