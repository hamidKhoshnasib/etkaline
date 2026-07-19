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
  const [activeNav, setActiveNav] = useState("specs");

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
      {/* Sidebar nav */}
      <div className="flex w-full shrink-0 overflow-x-auto border-b lg:w-52 lg:flex-col lg:space-y-1 lg:border-b-0">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveNav(id)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-t-lg px-3 py-2.5 text-sm transition-colors lg:w-full lg:gap-2.5 lg:rounded-xl lg:px-4",
              activeNav === id
                ? "border-primary bg-primary/10 text-primary border-b-2 font-medium lg:border-b-0"
                : "text-gray-600 hover:bg-gray-50",
            )}
          >
            <Icon className="size-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Description text */}
      <div className="min-w-0 flex-1">
        <h2 className="mb-4 text-lg font-bold text-gray-800 lg:text-xl">{productName}</h2>

        <div className={cn("overflow-hidden transition-all", expanded ? "max-h-none" : "max-h-36")}>
          <p className="text-sm leading-8 text-gray-600">{description}</p>
        </div>

        <div className="mt-4 h-px bg-gray-100" />
        <div className="flex w-full justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700"
          >
            <span>{expanded ? "کمتر" : "بیشتر"}</span>
            <ChevronDownIcon
              className={cn("size-4 transition-transform", expanded && "rotate-180")}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
