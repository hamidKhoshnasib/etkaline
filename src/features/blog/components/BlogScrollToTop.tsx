"use client";

import { useLayoutEffect } from "react";

export function BlogScrollToTop() {
  useLayoutEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  return null;
}
