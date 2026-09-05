"use client";

import { useEffect, useState } from "react";

import type { TermsSection } from "@/features/terms/terms-content";
import { cn } from "@/lib/utils";

export function TermsTableOfContents({
  sections,
}: {
  sections: readonly Pick<TermsSection, "id" | "title">[];
}) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observedSections = sections
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-25% 0px -60%", threshold: 0 },
    );

    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="فهرست قوانین و مقررات" className="overflow-x-auto lg:overflow-visible">
      <p className="text-muted-foreground mb-3 hidden px-4 text-sm lg:block">فهرست مطالب</p>
      <ul className="flex min-w-max gap-1 p-2 lg:min-w-0 lg:flex-col">
        {sections.map((section) => {
          const isActive = section.id === activeSection;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "focus-visible:outline-primary hover:text-primary-hover relative flex min-h-10 items-center rounded-lg px-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                  isActive
                    ? "bg-muted text-primary-hover before:bg-primary-hover font-bold before:absolute before:inset-y-2 before:right-0 before:w-1 before:rounded-full"
                    : "text-foreground",
                )}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
