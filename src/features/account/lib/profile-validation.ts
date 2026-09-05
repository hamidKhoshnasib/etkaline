const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function normalizeNationalCode(value: string) {
  return value
    .replace(/[۰-۹٠-٩]/g, (digit) => {
      const digitIndex = PERSIAN_DIGITS.indexOf(digit);
      return String(digitIndex >= 0 ? digitIndex : ARABIC_DIGITS.indexOf(digit));
    })
    .replace(/\D/g, "")
    .slice(0, 10);
}

export function isValidNationalCode(value: string) {
  return normalizeNationalCode(value).length === 10;
}
