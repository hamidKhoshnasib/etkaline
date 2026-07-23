"use client";

import { useState } from "react";
import { AppImage } from "@/components/ui/image";
import { Package } from "lucide-react";

interface CategoryMenuIconProps {
  iconName: string;
  className?: string;
}

export function CategoryMenuIcon({ iconName, className }: CategoryMenuIconProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const normalizedIconName = iconName.trim();

  if (!normalizedIconName || hasFailed) {
    return <Package className={className} aria-hidden="true" />;
  }

  return (
    <AppImage
      src={`/api/category-icons/${encodeURIComponent(normalizedIconName)}`}
      alt=""
      aria-hidden="true"
      width={28}
      height={28}
      unoptimized
      className={className}
      onError={() => setHasFailed(true)}
    />
  );
}
