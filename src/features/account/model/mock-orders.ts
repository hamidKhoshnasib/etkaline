import type { StaticImageData } from "next/image";

import mixerImage from "@/assets/images/Group 16.png";
import airFryerImage from "@/assets/images/image 41.png";
import ovenImage from "@/assets/images/gaz.png";

export type MockOrderStatus =
  | "open"
  | "paid"
  | "processing"
  | "delivered"
  | "returned"
  | "canceled";

export interface MockOrderProduct {
  id: string;
  title: string;
  image: StaticImageData | string;
  price: number;
  originalPrice?: number;
}

export interface MockOrder {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  status: MockOrderStatus;
  total: number;
  discount: number;
  shippingCost: number;
  trackingCode: string;
  recipient: {
    name: string;
    phone: string;
    address: string;
    postalCode: string;
  };
  products: MockOrderProduct[];
}

export const ORDER_STATUS_LABELS: Record<MockOrderStatus, string> = {
  open: "سبد باز",
  paid: "ثبت سفارش",
  processing: "در حال ارسال",
  delivered: "تحویل داده شده",
  returned: "مرجوع شده",
  canceled: "لغو شده",
};

const PRODUCTS: MockOrderProduct[] = [
  {
    id: "product-oven",
    title: "اجاق گاز مبله اتکالاین مدل ETK-9060",
    image: ovenImage,
    price: 186_500_000,
  },
  {
    id: "product-air-fryer",
    title: "سرخ‌کن بدون روغن اتکالاین مدل AF-850",
    image: airFryerImage,
    price: 186_500_000,
    originalPrice: 196_500_000,
  },
  {
    id: "product-mixer",
    title: "همزن کاسه‌دار اتکالاین مدل MX-1400",
    image: mixerImage,
    price: 186_500_000,
  },
];

const ORDER_STATUSES: MockOrderStatus[] = [
  "processing",
  "delivered",
  "processing",
  "delivered",
  "processing",
  "delivered",
];

export const MOCK_ORDERS: MockOrder[] = ORDER_STATUSES.map((status, index) => ({
  id: String(383094558 + index),
  orderNumber: `#${383094558 + index}`,
  date: "۱۴۰۵/۰۲/۰۶",
  time: "۱۸:۴۶",
  status,
  total: 186_500_000,
  discount: 10_000_000,
  shippingCost: 186_500_000,
  trackingCode: "۳۴۱۶۸۴۶۸۵۱۶۵۴۸۵",
  recipient: {
    name: "محمدرضا چاهی",
    phone: "۰۹۳۶۰۲۴۱۵۷۰",
    address: "بازار، خ پانزده خرداد، خ پامنار، بن‌بست قائم مقام",
    postalCode: "۶۷۷۴۵۷۴۴۷۶",
  },
  products: PRODUCTS,
}));

export function getMockOrder(orderId: string) {
  return MOCK_ORDERS.find((order) => order.id === orderId) ?? null;
}

export function formatMockPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
