import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { categories } from "./header.config";

interface Props {
  activeCategoryId: string;
  onActiveCategoryChange: (id: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({
  activeCategoryId,
  onActiveCategoryChange,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const activeCategory = categories.find((c) => c.id === activeCategoryId) ?? categories[0];

  return (
    <div
      className="absolute inset-x-0 top-full z-50 bg-white"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto flex py-6">
        {/* Main categories list */}
        <div className="w-47.5 shrink-0 border-e border-gray-100">
          {categories.map(({ id, label, icon: Icon }) => {
            const active = id === activeCategoryId;
            return (
              <button
                key={id}
                onMouseEnter={() => onActiveCategoryChange(id)}
                className={`label-large flex w-full items-center gap-2 pb-4 transition-colors ${
                  active ? "text-primary-hover" : "hover:text-primary-hover text-gray-700"
                }`}
              >
                <Icon size={24} className={active ? "text-primary-hover" : "text-gray-600"} />
                <span className="text-nowrap">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Subcategory grid */}
        <div className="flex-1 px-8">
          <Link
            href={activeCategory.href}
            className="title-medium-bold hover:text-primary-hover mb-6.5 flex w-42 items-center justify-between gap-1 font-bold"
          >
            <span className="line-clamp-1">همه {activeCategory.label}</span>
            <ChevronLeft size={16} className="shrink-0" />
          </Link>

          <div className="grid grid-cols-4 gap-x-6 gap-y-6 pb-5">
            {activeCategory.subcategories.map((sub) => (
              <div key={sub.id}>
                <Link
                  href={sub.href}
                  className="title-small-bold hover:text-primary-hover mb-6 flex w-42 items-center justify-between gap-1 transition-colors"
                >
                  <span className="border-primary-hover line-clamp-1 rounded-r-[4px] border-r-4 pr-2">
                    {sub.label}
                  </span>
                  <ChevronLeft size={16} className="shrink-0" />
                </Link>
                <ul className="space-y-2">
                  {sub.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className="title-small hover:text-primary-hover block text-right text-gray-900 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
