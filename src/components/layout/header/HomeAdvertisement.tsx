"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { HomeAdvertisement as HomeAdvertisementData } from "@/services/home/get-home-advertisement";

interface HomeAdvertisementProps {
  advertisement: HomeAdvertisementData;
}

function getSafeHref(link: string): string | null {
  const trimmedLink = link.trim();

  if (trimmedLink.startsWith("/") && !trimmedLink.startsWith("//")) {
    return trimmedLink;
  }

  try {
    const url = new URL(trimmedLink);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function getSafeColor(color: string): string | undefined {
  return /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(color.trim()) ? color.trim() : undefined;
}

export function HomeAdvertisement({ advertisement }: HomeAdvertisementProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const pathname = usePathname();
  const href = getSafeHref(advertisement.link);
  const backgroundColor = getSafeColor(advertisement.backgroundColor);
  const textColor = getSafeColor(advertisement.textColor);

  if (!isVisible || pathname !== "/") {
    return null;
  }

  return (
    <aside
      aria-label="تبلیغات"
      className="bg-primary text-primary-foreground"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="container mx-auto flex min-h-12 items-center gap-3 px-4 py-2 sm:px-6">
        <p className="min-w-0 flex-1 text-center text-sm font-medium sm:text-base">
          {advertisement.text}
        </p>
        {href && advertisement.buttonText.trim() ? (
          <Link
            href={href}
            className="shrink-0 rounded-md border border-current px-3 py-1.5 text-xs font-bold transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current sm:text-sm"
          >
            {advertisement.buttonText}
          </Link>
        ) : null}
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
      </div>
    </aside>
  );
}
