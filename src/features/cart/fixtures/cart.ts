// ─── Types ──────────────────────────────────────────────────────────────────

export interface CartItem {
  id: number;
  title: string;
  image: string;
  color: string;
  warranty: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  returnable?: boolean;
  quantity: number;
}

export interface DeliveryDate {
  id: string;
  weekday: string;
  date: string;
  price: number;
}

export interface ParcelGroup {
  id: string;
  title: string;
  items: { id: number; image: string; index: string }[];
  dates: DeliveryDate[];
  times: string[];
}

export interface RecommendedProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
}

const PLACEHOLDER = "https://via.placeholder.com/180x190?text=Etkaline";

// ─── Mock data ──────────────────────────────────────────────────────────────

export const CART_ITEMS: CartItem[] = [
  {
    id: 1,
    title:
      "یخچال فریزر سامسونگ ۳۶ اینچ ۲۸ فوت مکعبی درب فرانسوی با یخساز (RF28RV20ISR/AA) - استیل ضد زنگ",
    image: PLACEHOLDER,
    color: "سفید",
    warranty: "گارانتی اتکلاین",
    price: 17500000,
    quantity: 1,
  },
  {
    id: 2,
    title:
      "یخچال فریزر سامسونگ ۳۶ اینچ ۲۸ فوت مکعبی درب فرانسوی با یخساز (RF28RV20ISR/AA) - استیل ضد زنگ",
    image: PLACEHOLDER,
    color: "سفید",
    warranty: "گارانتی اتکلاین",
    price: 580000000,
    originalPrice: 680000000,
    discount: 3,
    quantity: 5,
  },
  {
    id: 3,
    title:
      "یخچال فریزر سامسونگ ۳۶ اینچ ۲۸ فوت مکعبی درب فرانسوی با یخساز (RF28RV20ISR/AA) - استیل ضد زنگ",
    image: PLACEHOLDER,
    color: "سفید",
    warranty: "گارانتی اتکلاین",
    price: 17500000,
    returnable: true,
    quantity: 1,
  },
];

const DELIVERY_DATES: DeliveryDate[] = [
  { id: "d1", weekday: "دوشنبه", date: "۳۰ فروردین", price: 194500 },
  { id: "d2", weekday: "دوشنبه", date: "۳۰ فروردین", price: 194500 },
  { id: "d3", weekday: "دوشنبه", date: "۳۰ فروردین", price: 194500 },
  { id: "d4", weekday: "دوشنبه", date: "۳۰ فروردین", price: 194500 },
  { id: "d5", weekday: "دوشنبه", date: "۳۰ فروردین", price: 194500 },
];

const DELIVERY_TIMES = ["۱۷:۰۰", "۱۵:۰۰", "۱۴:۰۰", "۱۲:۰۰", "۱۰:۰۰", "۰۸:۰۰"];

export const PARCEL_GROUPS: ParcelGroup[] = [
  {
    id: "heavy",
    title: "کالاهای سنگین",
    items: [
      { id: 1, image: PLACEHOLDER, index: "۱" },
      { id: 2, image: PLACEHOLDER, index: "۲" },
      { id: 3, image: PLACEHOLDER, index: "۳" },
    ],
    dates: DELIVERY_DATES,
    times: DELIVERY_TIMES,
  },
  {
    id: "light",
    title: "کالاهای سبک",
    items: [
      { id: 4, image: PLACEHOLDER, index: "۱" },
      { id: 5, image: PLACEHOLDER, index: "۲" },
    ],
    dates: DELIVERY_DATES,
    times: DELIVERY_TIMES,
  },
];

export const RECOMMENDED_PRODUCTS: RecommendedProduct[] = Array.from({ length: 8 }, (_, i) => ({
  id: 100 + i,
  title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
  image: "https://via.placeholder.com/180x190?text=Product",
  price: 580000000,
  originalPrice: 828000000,
  discount: 30,
}));

export const SHIPPING_ADDRESS = {
  address: "بازار، خ. پانزده خرداد، خ. پامنار، بن. قائم مقام",
  postalCode: "۶۷۷۴۵۷۴۴۷۶",
  recipient: "محمدرضا چاهی",
  phone: "۰۹۳۶۰۲۴۱۵۷۰",
};

export const PAYMENT_GATEWAYS = ["پاسارگاد", "آینده", "ملی", "سامان"];

// ─── Helpers ────────────────────────────────────────────────────────────────

export function formatPrice(n: number): string {
  return n.toLocaleString("fa-IR");
}

export function toPersian(n: number | string): string {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}
