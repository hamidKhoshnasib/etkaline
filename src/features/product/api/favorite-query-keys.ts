export const FAVORITES_QUERY_ROOT = ["favorites"] as const;
export const FAVORITE_PRODUCTS_QUERY_ROOT = [...FAVORITES_QUERY_ROOT, "products"] as const;
