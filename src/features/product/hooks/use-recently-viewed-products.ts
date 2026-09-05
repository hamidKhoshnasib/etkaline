"use client";

import { useSyncExternalStore } from "react";

import { getRecentlyViewedProducts } from "@/features/product/lib/recently-viewed-products";
import type { Product } from "@/features/product/model/product";
import type { SiteType } from "@/lib/api-site-type";

const EMPTY_RECENT_PRODUCTS: Product[] = [];

function subscribeToStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

export function useRecentlyViewedProducts(siteType: SiteType) {
  return useSyncExternalStore(
    subscribeToStorage,
    () => getRecentlyViewedProducts(siteType),
    () => EMPTY_RECENT_PRODUCTS,
  );
}
