import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { CategoryMenuIcon } from "./CategoryMenuIcon";
import { Container } from "@/components/ui/Container";
import type { MenuCategory } from "@/features/catalog/model/menu-category";

interface MegaMenuProps {
  categories: MenuCategory[];
  activeCategoryId: number | null;
  onActiveCategoryChange: (id: number) => void;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({
  categories,
  activeCategoryId,
  onActiveCategoryChange,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ?? categories[0];

  if (!activeCategory) {
    return null;
  }

  return (
    <div
      id="desktop-category-menu"
      className="absolute inset-x-0 top-full z-50 bg-white"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Container className="flex py-6">
        <div className="w-47.5 shrink-0 border-e border-gray-100">
          {categories.map(({ id, title, iconName }) => {
            const active = id === activeCategory.id;

            return (
              <button
                key={id}
                type="button"
                onMouseEnter={() => onActiveCategoryChange(id)}
                onFocus={() => onActiveCategoryChange(id)}
                className={`label-large flex w-full items-center gap-2 pb-4 transition-colors ${
                  active ? "text-primary-hover" : "hover:text-primary-hover text-gray-700"
                }`}
              >
                <CategoryMenuIcon
                  iconName={iconName}
                  className={`size-6 object-contain ${
                    active ? "text-primary-hover" : "text-gray-600"
                  }`}
                />
                <span className="text-nowrap">{title}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 px-8">
          <Link
            href={activeCategory.href}
            onClick={onClose}
            className="title-medium-bold hover:text-primary-hover mb-6.5 flex w-42 items-center justify-between gap-1 font-bold"
          >
            <span className="line-clamp-1">همه {activeCategory.title}</span>
            <ChevronLeft size={16} className="shrink-0" />
          </Link>

          <div className="grid grid-cols-4 gap-x-6 gap-y-6 pb-5">
            {activeCategory.children.map((subcategory) => (
              <div key={subcategory.id}>
                <Link
                  href={subcategory.href}
                  onClick={onClose}
                  className="title-small-bold hover:text-primary-hover mb-6 flex w-42 items-center justify-between gap-1 transition-colors"
                >
                  <span className="border-primary-hover line-clamp-1 rounded-r-[4px] border-r-4 pr-2">
                    {subcategory.title}
                  </span>
                  <ChevronLeft size={16} className="shrink-0" />
                </Link>
                <ul className="flex flex-col gap-2">
                  {subcategory.children.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="title-small hover:text-primary-hover block text-right text-gray-900 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
