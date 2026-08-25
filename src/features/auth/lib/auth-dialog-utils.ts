import type { ApiResponse } from "@/types/auth";

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toEnglishDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)));
}

export function toPersianDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

export function normalizeCaptchaImage(image: string) {
  if (/^(data:|https?:|\/)/i.test(image)) {
    return image;
  }

  return `data:image/png;base64,${image}`;
}

export function getResponseMessage(response: ApiResponse<unknown>, fallback: string) {
  return response.message || response.errors?.[0] || fallback;
}

export function getSafeCallbackUrl(value: string | null, origin: string) {
  if (!value) {
    return null;
  }

  try {
    const callbackUrl = new URL(value, origin);
    if (callbackUrl.origin !== origin) {
      return null;
    }

    return `${callbackUrl.pathname}${callbackUrl.search}${callbackUrl.hash}`;
  } catch {
    return null;
  }
}
