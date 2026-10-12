"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useHomeAdvertisement } from "@/features/home/appliances/api/use-home-advertisement";
import { Container } from "@/components/ui/Container";
import { getBackendHref } from "@/lib/get-backend-href";
import { useStorefront } from "@/providers/storefront-provider";

const TARGET_QUERY_KEYS: Partial<Record<number, string>> = {
  1: "category",
  2: "tag",
  3: "product",
  4: "brand",
};

function getSafeColor(color: string): string | undefined {
  return /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(color.trim()) ? color.trim() : undefined;
}

function getTargetHref(targetType: number, targetId: number | null, searchHref: string) {
  if (targetId === null) {
    return null;
  }

  const queryKey = TARGET_QUERY_KEYS[targetType];
  if (!queryKey) {
    return null;
  }

  return `${searchHref}?${new URLSearchParams({ [queryKey]: String(targetId) }).toString()}`;
}

export function HomeAdvertisement() {
  const [isVisible, setIsVisible] = React.useState(true);
  const pathname = usePathname();
  const storefront = useStorefront();
  const isStorefrontHome = pathname === storefront.homeHref;
  const { data: advertisement } = useHomeAdvertisement(isStorefrontHome);

  if (!isVisible || !isStorefrontHome || !advertisement) {
    return null;
  }

  const href =
    getBackendHref(advertisement.link) ??
    getTargetHref(advertisement.targetType, advertisement.targetId, storefront.searchHref);
  const backgroundColor = getSafeColor(advertisement.backgroundColor);
  const textColor = getSafeColor(advertisement.textColor);

  return (
    <aside
      aria-label="تبلیغات"
      className="bg-primary text-primary-foreground hidden lg:block"
      style={{ backgroundColor, color: textColor }}
    >
      <Container className="flex min-h-12 items-center gap-3 py-2 sm:px-6">
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-3">
          <p className="text-center text-sm font-medium sm:text-base">{advertisement.text}</p>
          {href && advertisement.buttonText.trim() ? (
            <Link
              href={href}
              className="shrink-0 rounded-md border border-current px-3 py-1.5 text-xs font-bold transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current sm:text-sm"
            >
              {advertisement.buttonText}
            </Link>
          ) : null}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="بستن تبلیغ"
          onClick={() => setIsVisible(false)}
          className="shrink-0 hover:bg-black/10 hover:text-current"
        >
          <X />
        </Button>
      </Container>
    </aside>
  );
}
