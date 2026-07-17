export interface Product {
  id: string | number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  isBookmarked?: boolean;
  outOfStock?: boolean;
}

export type ProductCardData = Omit<Product, "id">;

// قرارداد پاسخ محصولات صفحه اصلی از Swagger بک‌اند
export interface BackendStoreProductInfo {
  mainPrice: number;
  offPrice: number;
  offPrecent: number;
  storeTitle: string;
  isOffer: boolean;
  offerEndDate: string | null;
  offerEndDateFa: string | null;
  offerOrder: number;
  inventory: number;
  isExist: boolean;
}

export interface BackendHomeProduct {
  title: string;
  urlTitle: string | null;
  viewCount: number;
  pic: string | null;
  picUrl: string | null;
  storeProductInfo: BackendStoreProductInfo;
  effectiveItems: Array<{ title: string; type: number; description: string; id: number }>;
  id: number;
}

// آیتم‌های layout همراه محصولات در پاسخ GetHomeProducts
export interface BackendHomeProductGroup {
  layoutInfo: {
    targetType: number;
    targetId: number | null;
    targetTitle: string | null;
    title: string;
    subTitle: string | null;
    urlTitle: string | null;
    componentType: number;
    componentTypeFa: string;
    id: number;
  };
  products: BackendHomeProduct[];
}

export function mapBackendProduct(product: BackendHomeProduct): Product {
  const info = product.storeProductInfo;
  const price = info.offPrice > 0 ? info.offPrice : info.mainPrice;

  return {
    id: product.id,
    title: product.title,
    image: product.picUrl || product.pic || "/images/placeholder-product.png",
    price,
    originalPrice: info.mainPrice > price ? info.mainPrice : undefined,
    discount: info.offPrecent > 0 ? info.offPrecent : undefined,
    outOfStock: !info.isExist || info.inventory <= 0,
  };
}
