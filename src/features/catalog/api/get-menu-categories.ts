import "server-only";

import type { MenuCategory } from "@/features/catalog/model/menu-category";
import { getServerApiBaseUrl } from "@/lib/api-config";
import { getServerApiHeaders } from "@/lib/get-server-api-headers";

interface CategoriesResponse {
  value?: unknown;
  isSuccess?: boolean;
}

interface ApiCategory {
  id: number;
  title: string;
  parentId: number | null;
  order: number;
  iconName: string | null;
  subCategories: ApiCategory[];
}

function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

function parseCategory(value: unknown): ApiCategory | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const category = value as Record<string, unknown>;
  if (
    !isInteger(category.id) ||
    (category.parentId !== null && !isInteger(category.parentId)) ||
    !isInteger(category.order) ||
    typeof category.title !== "string" ||
    !category.title.trim() ||
    (category.iconName !== null && typeof category.iconName !== "string")
  ) {
    return null;
  }

  return {
    id: category.id,
    title: category.title.trim(),
    parentId: category.parentId,
    order: category.order,
    iconName: typeof category.iconName === "string" ? category.iconName : null,
    subCategories: Array.isArray(category.subCategories)
      ? category.subCategories
          .map(parseCategory)
          .filter((subCategory): subCategory is ApiCategory => subCategory !== null)
      : [],
  };
}

function buildMenuCategories(categories: ApiCategory[]): MenuCategory[] {
  const nodes = new Map<number, MenuCategory>();
  const parents = new Map<number, number | null>();
  const orders = new Map<number, number>();

  const addCategory = (category: ApiCategory) => {
    if (!nodes.has(category.id)) {
      nodes.set(category.id, {
        id: category.id,
        title: category.title,
        href: `/categories/${category.id}`,
        iconName: category.iconName ?? "",
        children: [],
      });
      parents.set(category.id, category.parentId);
      orders.set(category.id, category.order);
    }
    category.subCategories.forEach(addCategory);
  };

  categories.forEach(addCategory);

  const roots: MenuCategory[] = [];
  for (const [id, category] of nodes) {
    const parentId = parents.get(id);
    const parent = parentId === null || parentId === undefined ? undefined : nodes.get(parentId);
    if (parent && parent.id !== category.id) {
      parent.children.push(category);
    } else {
      roots.push(category);
    }
  }

  const sortTree = (items: MenuCategory[]) => {
    items.sort((first, second) => {
      const orderDifference = (orders.get(first.id) ?? 0) - (orders.get(second.id) ?? 0);
      return orderDifference || first.id - second.id;
    });
    items.forEach((item) => sortTree(item.children));
  };

  sortTree(roots);
  return roots;
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  const response = await fetch(new URL("/api/Categories", getServerApiBaseUrl()), {
    headers: await getServerApiHeaders(),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new Error(`Menu categories request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as CategoriesResponse;
  if (!payload.isSuccess || !Array.isArray(payload.value)) {
    throw new Error("Menu categories response was unsuccessful");
  }

  return buildMenuCategories(
    payload.value
      .map(parseCategory)
      .filter((category): category is ApiCategory => category !== null),
  );
}

function findCategoryPathById(
  categories: MenuCategory[],
  categoryId: number,
  parents: MenuCategory[] = [],
): MenuCategory[] | null {
  for (const category of categories) {
    if (category.id === categoryId) {
      return [...parents, category];
    }
    const childPath = findCategoryPathById(category.children, categoryId, [...parents, category]);
    if (childPath) {
      return childPath;
    }
  }
  return null;
}

export async function getMenuCategoryPathById(categoryId: number): Promise<MenuCategory[] | null> {
  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    return null;
  }

  return findCategoryPathById(await getMenuCategories(), categoryId);
}

export async function getMenuCategoryById(categoryId: number): Promise<MenuCategory | null> {
  const categoryPath = await getMenuCategoryPathById(categoryId);
  return categoryPath?.[categoryPath.length - 1] ?? null;
}
