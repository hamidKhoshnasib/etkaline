"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { AddressPicker } from "./AddressPicker";
import type { MenuCategory } from "@/features/catalog/model/menu-category";
import { navLinks } from "./header.config";
import { MegaMenu } from "./MegaMenu";

const [categoriesLink, ...otherNavLinks] = navLinks;
const CategoryIcon = categoriesLink.icon;

interface NavBarProps {
  categories: MenuCategory[];
}

export function NavBar({ categories }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
    categories[0]?.id ?? null,
  );
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedCategoryId = categories.some((category) => category.id === activeCategoryId)
    ? activeCategoryId
    : (categories[0]?.id ?? null);

  const open = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setIsOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 80);
  }, []);

  return (
    <div className="absolute z-40 w-full rounded-t-[32px] bg-white">
      {/* Nav row */}
      <div className="container m-auto h-15">
        <div className="flex h-full items-center justify-between">
          <nav className="flex h-full items-center gap-6">
            {/* Categories trigger (no link — opens mega menu on hover) */}
            <div
              className="relative flex h-full items-center"
              onMouseEnter={open}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-controls="desktop-category-menu"
                aria-expanded={isOpen}
                disabled={categories.length === 0}
                onClick={() => setIsOpen((current) => !current)}
                className={`label-large flex h-full items-center gap-3 border-b-2 transition-colors ${
                  isOpen
                    ? "border-primary-hover text-primary-hover"
                    : "border-transparent text-gray-600"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <CategoryIcon className="size-[18px] shrink-0" aria-hidden="true" />
                <span>{categoriesLink.label}</span>
              </button>
            </div>

            {otherNavLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="label-large hover:text-primary-hover flex items-center gap-3 text-gray-600 transition-colors"
              >
                <Icon className="size-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Address picker */}
          <AddressPicker
            trigger={
              <button
                className="label-medium flex items-center gap-1.5 text-gray-700"
                type="button"
              >
                <MapPin size={18} className="text-primary-hover" />
                <span>انتخاب آدرس...</span>
                <ChevronDown size={14} className="ms-2" />
              </button>
            }
          />
        </div>
      </div>

      {/* Mega menu */}
      {isOpen && (
        <MegaMenu
          categories={categories}
          activeCategoryId={selectedCategoryId}
          onActiveCategoryChange={setActiveCategoryId}
          onMouseEnter={open}
          onMouseLeave={scheduleClose}
        />
      )}
    </div>
  );
}
