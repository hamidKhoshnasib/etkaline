const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

function toEnglishDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

export function formatBlogDate(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const normalizedValue = toEnglishDigits(value.trim());
  const jalaliMatch = normalizedValue.match(/^(1[34]\d{2})[/-](\d{1,2})[/-](\d{1,2})/);

  if (jalaliMatch) {
    const [, year, month, day] = jalaliMatch;
    const monthIndex = Number(month) - 1;

    if (monthIndex >= 0 && monthIndex < JALALI_MONTHS.length) {
      return `${toPersianDigits(Number(day))} ${JALALI_MONTHS[monthIndex]} ${toPersianDigits(Number(year))}`;
    }
  }

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  return value;
}
