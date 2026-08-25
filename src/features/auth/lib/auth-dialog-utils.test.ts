import { describe, expect, it } from "vitest";

import {
  getSafeCallbackUrl,
  normalizeCaptchaImage,
  toEnglishDigits,
  toPersianDigits,
} from "./auth-dialog-utils";

describe("auth dialog utilities", () => {
  it("normalizes Persian and Arabic digits for API requests", () => {
    expect(toEnglishDigits("۰۹۱۲٣٤٥٦٧٨٩")).toBe("09123456789");
    expect(toPersianDigits("150")).toBe("۱۵۰");
  });

  it("accepts only same-origin callback URLs", () => {
    const origin = "https://etkaline.example";

    expect(getSafeCallbackUrl("/account?tab=orders#recent", origin)).toBe(
      "/account?tab=orders#recent",
    );
    expect(getSafeCallbackUrl("https://attacker.example", origin)).toBeNull();
  });

  it("normalizes raw captcha content to a data URL", () => {
    expect(normalizeCaptchaImage("abc123")).toBe("data:image/png;base64,abc123");
    expect(normalizeCaptchaImage("/captcha.png")).toBe("/captcha.png");
  });
});
