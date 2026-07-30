"use client";

import { useState } from "react";
import { ChevronDownIcon, ListIcon, NotebookIcon, MessageSquareIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDescriptionProps {
  productName: string;
  description: string;
}

const NAV_ITEMS = [
  { id: "specs", label: "مشخصات", icon: ListIcon },
  { id: "expert", label: "بررسی تخصصی", icon: NotebookIcon },
  { id: "reviews", label: "دیدگاه‌ها", icon: MessageSquareIcon },
];

export function ProductDescription({ productName, description }: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeNav, setActiveNav] = useState("expert");

  const handleNavItemClick = (id: string) => {
    setActiveNav(id);

    if (id === "reviews") {
      document.getElementById("product-reviews")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
      {/* Sidebar nav */}
      <nav
        className="flex w-full shrink-0 overflow-x-auto rounded-xl bg-slate-100 p-1 lg:w-[200px] lg:flex-col lg:overflow-hidden"
        aria-label="بخش‌های جزئیات محصول"
      >
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleNavItemClick(id)}
            className={cn(
              "flex h-11 flex-1 shrink-0 items-center justify-start gap-2 rounded-lg px-3 text-sm transition-colors lg:w-full lg:flex-none lg:px-4",
              activeNav === id
                ? "border-primary border-b-2 bg-[#F8FAFC] font-bold text-[#475569] lg:border-r-2 lg:border-b-0"
                : "text-slate-500 hover:bg-slate-200/70",
            )}
          >
            <Icon className="size-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Description text */}
      <div className="min-w-0 flex-1">
        <h2 className="text-secondary mb-4 text-base leading-7 font-bold">{productName}</h2>

        <div
          className={cn(
            "overflow-hidden transition-all",
            expanded ? "max-h-none" : "max-h-[144px]",
          )}
        >
          <p className="text-sm leading-6 text-slate-700">{description}</p>
        </div>

        <div className="mt-4 h-px bg-slate-300" />
        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-sm text-slate-600 transition-colors hover:text-slate-900"
          >
            <span>{expanded ? "کمتر" : "بیشتر"}</span>
            <ChevronDownIcon
              className={cn("size-4 transition-transform", expanded && "rotate-180")}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
