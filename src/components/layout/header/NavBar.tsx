"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { categories, navLinks } from "./header.config";
import { MegaMenu } from "./MegaMenu";

const [categoriesLink, ...otherNavLinks] = navLinks;
const CategoryIcon = categoriesLink.icon;

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(categories[2].id);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); }
    setIsOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 80);
  }, []);

  return (
    <div className="absolute w-full rounded-t-[32px] bg-white">
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
              <span
                className={`label-large flex cursor-default items-center gap-3 transition-colors ${
                  isOpen ? "text-primary-hover" : "text-gray-600"
                }`}
              >
                <CategoryIcon size={15} className="hover:text-primary-hover" />
                <span>{categoriesLink.label}</span>
              </span>
              <span
                className={`absolute inset-x-0 bottom-3 h-0.5 rounded-full bg-primary-hover transition-opacity ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {otherNavLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="label-large flex items-center gap-3 text-gray-600 transition-colors hover:text-primary-hover"
              >
                <Icon size={15} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Address picker */}
          <button className="label-medium flex items-center gap-1.5 text-gray-700">
            <MapPin size={18} className="text-primary-hover" />
            <span>انتخاب آدرس...</span>
            <ChevronDown size={14} className="ms-2" />
          </button>
        </div>
      </div>

      {/* Mega menu */}
      {isOpen && (
        <MegaMenu
          activeCategoryId={activeCategoryId}
          onActiveCategoryChange={setActiveCategoryId}
          onMouseEnter={open}
          onMouseLeave={scheduleClose}
        />
      )}
    </div>
  );
}