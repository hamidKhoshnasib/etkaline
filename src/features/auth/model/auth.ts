import type { ApiResponse } from "@/types/auth";

export const OTP_LENGTH = 6;
export const RESEND_SECONDS = 150;
export const OTP_DIGITS_PATTERN = "[0-9۰-۹٠-٩]*";

export type AuthStep = "login" | "verify";
export type AuthLoadingState = "captcha" | "login" | "verify" | "resend" | null;

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

export function toEnglishDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)));
}

export function toPersianDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

export function normalizeMobile(value: string) {
  return toEnglishDigits(value).replace(/\D/g, "").slice(0, 11);
}

export function isValidMobile(value: string) {
  return /^09\d{9}$/.test(normalizeMobile(value));
}

export function isValidOtp(value: string) {
  return toEnglishDigits(value).replace(/\D/g, "").length === OTP_LENGTH;
}

export function responseMessage(response: ApiResponse<unknown>, fallback: string) {
  return response.message || response.errors?.[0] || fallback;
}
