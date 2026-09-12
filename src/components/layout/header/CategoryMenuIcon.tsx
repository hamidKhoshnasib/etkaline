"use client";

import { Package } from "lucide-react";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";

interface CategoryMenuIconProps {
  iconName: string;
  className?: string;
}

const availableIconNames = new Set<string>(iconNames);

function normalizeLucideIconName(value: string) {
  return value
    .trim()
    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function LoadingCategoryIcon() {
  return <Package aria-hidden="true" />;
}

export function CategoryMenuIcon({ iconName, className }: CategoryMenuIconProps) {
  const normalizedIconName = normalizeLucideIconName(iconName);

  if (!normalizedIconName || !availableIconNames.has(normalizedIconName)) {
    return <Package className={className} aria-hidden="true" />;
  }

  return (
    <DynamicIcon
      name={normalizedIconName as IconName}
      className={className}
      fallback={LoadingCategoryIcon}
      aria-hidden="true"
    />
  );
}
