// مدل‌های دامنه سبد خرید؛ داده‌های نمونه در پوشه fixtures نگهداری می‌شوند
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
