"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";

import { CategoryMenuIcon } from "./CategoryMenuIcon";
import type { MenuCategory } from "@/features/catalog/model/menu-category";

interface MobileCategoryMenuProps {
  categories: MenuCategory[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileCategoryMenu({ categories, isOpen, onClose }: MobileCategoryMenuProps) {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(
    categories[0]?.id ?? null,
  );
  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ?? categories[0];

  if (!isOpen) {
    return null;
  }

  if (!selectedCategory) {
    return (
      <section
        id="mobile-category-menu"
        aria-label="دسته‌بندی کالاها"
        className="bg-background fixed inset-x-0 top-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[60] flex items-center justify-center px-6 lg:hidden"
      >
        <p className="text-muted-foreground text-center">دسته‌بندی فعالی برای نمایش وجود ندارد.</p>
      </section>
    );
  }

  return (
    <section
      id="mobile-category-menu"
      aria-label="دسته‌بندی کالاها"
      dir="rtl"
      className="bg-background animate-in fade-in-0 slide-in-from-right-4 fixed inset-x-0 top-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[60] flex flex-row overflow-hidden duration-300 ease-out motion-reduce:animate-none lg:hidden"
    >
      <div className="bg-muted/60 shrink-0 basis-[47%] overflow-y-auto border-e px-3 py-8">
        <ul className="flex flex-col gap-2">
          {categories.map(({ id, title, iconName }) => {
            const isSelected = id === selectedCategory.id;

            return (
              <li key={id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategoryId(id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-2 py-3 text-right text-base font-medium transition-colors",
                    isSelected ? "text-auth-accent" : "text-secondary",
                  )}
                >
                  <CategoryMenuIcon
                    iconName={iconName}
                    className="size-7 shrink-0 object-contain"
                  />
                  <span className="min-w-0 flex-1 truncate">{title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="min-w-0 flex-1 overflow-y-auto px-5 py-12">
        <Link
          href={selectedCategory.href}
          onClick={onClose}
          className="text-auth-accent mb-12 flex items-center gap-2 text-xl font-bold"
        >
          همه {selectedCategory.title}
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Link>

        <div className="flex flex-col gap-10">
          {selectedCategory.children.map((subcategory) => (
            <section key={subcategory.id}>
              <Link
                href={subcategory.href}
                onClick={onClose}
                className="text-foreground mb-4 flex items-center justify-between gap-2 text-lg font-bold"
              >
                <span className="border-auth-accent border-s-4 ps-2">{subcategory.title}</span>
                <ChevronLeft className="size-6 shrink-0" aria-hidden="true" />
              </Link>
              <ul className="text-secondary flex flex-col gap-4 pe-4 text-base">
                {subcategory.children.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} onClick={onClose} className="block py-1">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
