export function formatProductPrice(value: number) {
  return value.toLocaleString("fa-IR");
}

export function formatDiscountPercent(value: number) {
  return Math.ceil(value).toLocaleString("fa-IR");
}
