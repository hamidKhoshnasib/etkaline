// قرارداد سبد لوازم خانگی مطابق Swagger ماژول Ordering
export interface AddToBasketRequest {
  storeProductId: number;
  count: number;
  basketId: number;
  type: 1 | 2;
}

// قرارداد حذف آیتم سبد؛ نوع ۱ برای لوازم خانگی است.
export interface DeleteFromBasketRequest {
  storeProductId: number;
  basketId: number;
  type: 1 | 2;
}

export interface BasketProduct {
  storeProductId: number;
  productId: number;
  productTitle: string;
  barcode: string;
  inventory: number;
  productType: number;
  productTypeFa: string;
  isHeavyWeight: boolean;
  propertyId: number;
  propertyTitle: string;
  valueId: number;
  valueTitle: string;
  mainPrice: number;
  offPrice: number;
  currentPrice: number;
  productCount: number;
  hekmatDiscountAmount: number;
  hekmatDiscountPercent: number;
  taxPercent: number;
  taxAmount: number;
  tollPercent: number;
  tollAmount: number;
  eifaDiscountId: string;
  status: number;
  statusFa: string;
  existCount: number;
  oldCount: number;
  pic: string;
  picUrl: string;
  id: number;
}

export interface ApplianceBasket {
  customerId: number;
  customerName: string;
  customerMobile: string;
  storeTitle: string;
  productCount: number;
  itemCount: number;
  totalMainPrice: number;
  totalOffPrice: number;
  type: number;
  status: number;
  discountId: number;
  discountCode: string;
  discountAmount: number;
  customerDescription: string;
  createDate: string;
  createDateFa: string;
  products: BasketProduct[];
  id: number;
}
