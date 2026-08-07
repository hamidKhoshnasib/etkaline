import type { SiteType } from "@/lib/api-site-type";
import type { Product } from "../model/product";

const RECENTLY_VIEWED_PRODUCTS_LIMIT = 10;
const RECENTLY_VIEWED_PRODUCTS_KEY_PREFIX = "etkaline:recently-viewed-products";
const EMPTY_RECENT_PRODUCTS: Product[] = [];
const recentProductsCache = new Map<SiteType, { raw: string | null; products: Product[] }>();

function storageKey(siteType: SiteType) {
  return `${RECENTLY_VIEWED_PRODUCTS_KEY_PREFIX}:${siteType}`;
}

function isProductId(value: unknown): value is Product["id"] {
  return (
    (typeof value === "number" && Number.isSafeInteger(value) && value > 0) ||
    (typeof value === "string" && value.trim().length > 0)
  );
}

function numberValue(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;
}

function parseRecentProduct(value: unknown): Product | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const product = value as Record<string, unknown>;
  if (
    !isProductId(product.id) ||
    typeof product.title !== "string" ||
    !product.title.trim() ||
    typeof product.image !== "string" ||
    !product.image.trim()
  ) {
    return null;
  }

  const price = numberValue(product.price);
  if (price === undefined) {
    return null;
  }

  const originalPrice = numberValue(product.originalPrice);
  const discount = numberValue(product.discount);
  const storeProductId = numberValue(product.storeProductId);
  const urlTitle =
    typeof product.urlTitle === "string" ? product.urlTitle.trim() || null : undefined;

  return {
    id: product.id,
    title: product.title.trim(),
    image: product.image.trim(),
    price,
    ...(originalPrice && originalPrice > price ? { originalPrice } : {}),
    ...(discount && discount > 0 ? { discount } : {}),
    ...(typeof product.outOfStock === "boolean" ? { outOfStock: product.outOfStock } : {}),
    ...(storeProductId && Number.isSafeInteger(storeProductId) && storeProductId > 0
      ? { storeProductId }
      : {}),
    ...(urlTitle !== undefined ? { urlTitle } : {}),
  };
}

export function getRecentlyViewedProducts(siteType: SiteType): Product[] {
  try {
    const stored = window.localStorage.getItem(storageKey(siteType));
    const cached = recentProductsCache.get(siteType);
    if (cached?.raw === stored) {
      return cached.products;
    }

    if (!stored) {
      recentProductsCache.set(siteType, { raw: null, products: [] });
      return EMPTY_RECENT_PRODUCTS;
    }

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      recentProductsCache.set(siteType, { raw: stored, products: [] });
      return EMPTY_RECENT_PRODUCTS;
    }

    const products = parsed
      .flatMap((item) => {
        const product = parseRecentProduct(item);
        return product ? [product] : [];
      })
      .slice(0, RECENTLY_VIEWED_PRODUCTS_LIMIT);
    recentProductsCache.set(siteType, { raw: stored, products });
    return products;
  } catch {
    return EMPTY_RECENT_PRODUCTS;
  }
}

export function saveRecentlyViewedProduct(siteType: SiteType, product: Product) {
  const normalizedProduct = parseRecentProduct(product);
  if (!normalizedProduct) {
    return;
  }

  try {
    const products = getRecentlyViewedProducts(siteType);
    const nextProducts = [
      normalizedProduct,
      ...products.filter((item) => String(item.id) !== String(normalizedProduct.id)),
    ].slice(0, RECENTLY_VIEWED_PRODUCTS_LIMIT);

    const serializedProducts = JSON.stringify(nextProducts);
    window.localStorage.setItem(storageKey(siteType), serializedProducts);
    recentProductsCache.set(siteType, { raw: serializedProducts, products: nextProducts });
  } catch {
    // Product viewing remains available when browser storage is unavailable.
  }
}
