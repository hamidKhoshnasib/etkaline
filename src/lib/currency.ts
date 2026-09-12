const RIALS_PER_TOMAN = 10;

export function rialToToman(value: number): number {
  return Math.trunc(value / RIALS_PER_TOMAN);
}

export function tomanToRial(value: number): number {
  return Math.trunc(value) * RIALS_PER_TOMAN;
}

export function formatToman(value: number): string {
  return rialToToman(value).toLocaleString("fa-IR");
}
