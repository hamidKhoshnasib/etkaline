"use client";

import dynamic from "next/dynamic";

import type { ProductSectionProps } from "./ProductSection";

const ProductSection = dynamic(() => import("./ProductSection"));

export function LazyProductSection(props: ProductSectionProps) {
  return <ProductSection {...props} />;
}
