import "server-only";

import type { MenuCategory } from "@/components/layout/header/header.config";
import { SITE_TYPE_HEADERS } from "@/lib/api-site-type";

const API_BASE_URL =
  process.env.ETKALA_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://test12.etkala.ir";

interface CategoriesResponse {
  value?: unknown;
  isSuccess?: boolean;
  errors?: string[];
  message?: string;
}

interface ApiCategory {
  id: number;
  title: string;
  parentId: number | null;
  urlTitle: string;
  order: number;
  iconName: string;
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
    typeof category.urlTitle !== "string" ||
    typeof category.iconName !== "string"
  ) {
    return null;
  }

  return {
    id: category.id,
    title: category.title.trim(),
    parentId: category.parentId,
    urlTitle: category.urlTitle.trim(),
    order: category.order,
    iconName: category.iconName,
    subCategories: Array.isArray(category.subCategories)
      ? category.subCategories
          .map(parseCategory)
          .filter((subCategory): subCategory is ApiCategory => subCategory !== null)
      : [],
  };
}

function categoryHref(category: ApiCategory): string {
  return category.urlTitle
    ? `/categories/${encodeURIComponent(category.urlTitle)}`
    : `/categories/${category.id}`;
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
        href: categoryHref(category),
        iconName: category.iconName,
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
  const url = new URL("/api/Categories", API_BASE_URL);

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json", ...SITE_TYPE_HEADERS },
      next: { revalidate: 300, tags: ["menu-categories"] },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as CategoriesResponse;
    if (!payload.isSuccess || !Array.isArray(payload.value)) {
      return [];
    }

    return buildMenuCategories(
      payload.value
        .map(parseCategory)
        .filter((category): category is ApiCategory => category !== null),
    );
  } catch {
    return [];
  }
}
