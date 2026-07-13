// فرمت اعداد مالی و تعداد برای رابط کاربری RTL
export function formatPrice(value: number): string {
  return value.toLocaleString("fa-IR");
}
export function toPersianDigits(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}
