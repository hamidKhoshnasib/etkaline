"use client";

import dynamic from "next/dynamic";

import type { FlashDealsProps } from "./FlashDeals";

const FlashDeals = dynamic(() => import("./FlashDeals"));

export function LazyFlashDeals(props: FlashDealsProps) {
  return <FlashDeals {...props} />;
}
