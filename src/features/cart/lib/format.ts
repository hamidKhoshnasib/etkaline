import { formatToman } from "@/lib/currency";

export function formatPrice(value: number): string {
  return formatToman(value);
}
export function toPersianDigits(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}
