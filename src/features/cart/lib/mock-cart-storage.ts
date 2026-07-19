import { CART_ITEMS } from "@/features/cart/fixtures/cart";
import type { CartItem } from "@/features/cart/model/cart";

const MOCK_CART_STORAGE_KEY = "etkaline:mock-cart-items";
const listeners = new Set<() => void>();
let cachedItems: CartItem[] | null = null;

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    typeof item.title === "string" &&
    typeof item.image === "string" &&
    typeof item.color === "string" &&
    typeof item.warranty === "string" &&
    typeof item.price === "number" &&
    typeof item.quantity === "number"
  );
}

export function getMockCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return CART_ITEMS;
  }

  if (cachedItems) {
    return cachedItems;
  }

  try {
    const storedItems = JSON.parse(window.localStorage.getItem(MOCK_CART_STORAGE_KEY) ?? "null");
    cachedItems =
      Array.isArray(storedItems) && storedItems.every(isCartItem) ? storedItems : CART_ITEMS;
  } catch {
    cachedItems = CART_ITEMS;
  }

  return cachedItems;
}

export function getMockCartServerSnapshot(): CartItem[] {
  return CART_ITEMS;
}

export function subscribeToMockCart(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setMockCartItems(items: CartItem[]) {
  cachedItems = items;
  window.localStorage.setItem(MOCK_CART_STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((listener) => listener());
}

export function addMockCartItem(item: CartItem): CartItem[] {
  const currentItems = getMockCartItems();
  const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);
  const nextItems = existingItem
    ? currentItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      )
    : [...currentItems, item];

  setMockCartItems(nextItems);
  return nextItems;
}

export function updateMockCartItemQuantity(id: number, quantity: number): CartItem[] {
  const nextItems = getMockCartItems().map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
  );

  setMockCartItems(nextItems);
  return nextItems;
}

export function removeMockCartItem(id: number): CartItem[] {
  const nextItems = getMockCartItems().filter((item) => item.id !== id);
  setMockCartItems(nextItems);
  return nextItems;
}
