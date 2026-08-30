"use client";

import { Fragment, useState } from "react";
import { ChevronDownIcon, ListIcon, NotebookIcon, MessageSquareIcon } from "lucide-react";
import { sanitizeCmsHtml } from "@/features/cms-page/lib/sanitize-cms-html";
import { cn } from "@/lib/utils";

interface ProductDescriptionProps {
  productName: string;
  description: string;
  specifications: Array<{ label: string; value: string }>;
}

const NAV_ITEMS = [
  { id: "specs", label: "مشخصات", icon: ListIcon },
  { id: "expert", label: "بررسی تخصصی", icon: NotebookIcon },
  { id: "reviews", label: "دیدگاه‌ها", icon: MessageSquareIcon },
];

function ProductSpecifications({
  specifications,
}: Pick<ProductDescriptionProps, "specifications">) {
  if (specifications.length === 0) {
    return (
      <p className="text-muted-foreground text-sm leading-6">
        مشخصاتی برای این محصول ثبت نشده است.
      </p>
    );
  }

  return (
    <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-y-1.5">
      {specifications.map((specification, index) => (
        <Fragment key={`${specification.label}-${index}`}>
          <dt
            className={cn(
              "text-foreground flex h-[42px] items-center rounded-s-lg px-4 text-sm font-bold",
              index % 2 === 0 ? "bg-[#F8FAFC]" : "bg-white",
            )}
          >
            {specification.label}
          </dt>
          <dd
            className={cn(
              "text-foreground/80 flex h-[42px] min-w-0 items-center truncate rounded-e-lg ps-10 pe-4 text-start text-sm whitespace-nowrap",
              index % 2 === 0 ? "bg-[#F8FAFC]" : "bg-white",
            )}
            title={specification.value}
          >
            {specification.value}
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}

export function ProductDescription({
  productName,
  description,
  specifications,
}: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeNav, setActiveNav] = useState("specs");
  const sanitizedDescription = sanitizeCmsHtml(description);
  const hasDescription =
    sanitizedDescription
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;|&#160;/gi, " ")
      .trim().length > 0;

  const handleNavItemClick = (id: string) => {
    if (id === "reviews") {
      document.getElementById("product-reviews")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    setActiveNav(id);
  };

  return (
    <section className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
      {/* Sidebar nav */}
      <nav
        className="flex w-full shrink-0 overflow-x-auto rounded-xl p-1 lg:w-[200px] lg:flex-col lg:overflow-hidden"
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

      <div className="min-w-0 flex-1">
        {activeNav === "specs" ? <ProductSpecifications specifications={specifications} /> : null}

        {activeNav === "expert" ? (
          <>
            <h2 className="text-secondary mb-4 text-base leading-7 font-bold">{productName}</h2>

            {hasDescription ? (
              <>
                <div
                  className={cn(
                    "[&_a]:text-primary overflow-hidden transition-all [&_a]:underline [&_ol]:list-decimal [&_ol]:pr-6 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pr-6",
                    expanded ? "max-h-none" : "max-h-[144px]",
                  )}
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />

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
              </>
            ) : (
              <p className="text-muted-foreground text-sm leading-6">
                محتوایی برای بررسی تخصصی این محصول ثبت نشده است.
              </p>
            )}
          </>
        ) : null}
      </div>
    </section>
  );
}
