import { formatToman } from "@/lib/currency";

export function formatProductPrice(value: number) {
  return formatToman(value);
}

export function formatDiscountPercent(value: number) {
  return Math.ceil(value).toLocaleString("fa-IR");
}
