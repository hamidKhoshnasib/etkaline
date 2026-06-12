export type OrderStatus = "در حال ارسال" | "تحویل داده شده" | "لغو شده" | "مرجوع شده";

export type OrderTabFilter = "all" | "active" | "delivered" | "cancelled" | "returned";

export type ShipmentStep = "درحال آماده سازی" | "در حال ارسال" | "ارسال شد" | "تحویل داده شد";

export interface OrderProduct {
  id: number;
  image: string;
  title: string;
  price: number;
  discount?: number;
}

export interface OrderDetail {
  orderNumber: string;
  amount: number;
  discount: number;
  date: string;
  recipient: {
    name: string;
    phone: string;
    address: string;
    postalCode: string;
  };
  shipping: {
    type: string;
    cost: number;
  };
  payment: {
    total: number;
    afterDiscount: number;
    gateway: string;
    bank: string;
  };
  shipment: {
    itemCount: number;
    trackingCode: string;
    date: string;
    currentStep: ShipmentStep;
    products: OrderProduct[];
  };
}

export interface Order {
  id: number;
  orderNumber: string;
  amount: number;
  date: string;
  status: OrderStatus;
  products: OrderProduct[];
  detail?: OrderDetail;
}

export interface UserProfile {
  name: string;
  walletBalance: number;
}
