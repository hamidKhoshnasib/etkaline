"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useHomeAdvertisement } from "@/features/home/appliances/api/use-home-advertisement";
import { Container } from "@/components/ui/Container";

function getSafeHref(link: string | null): string | null {
  if (!link) {
    return null;
  }

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

export function HomeAdvertisement() {
  const [isVisible, setIsVisible] = React.useState(true);
  const pathname = usePathname();
  const { data: advertisement } = useHomeAdvertisement(pathname === "/");

  if (!isVisible || pathname !== "/" || !advertisement) {
    return null;
  }

  const href = getSafeHref(advertisement.link);
  const backgroundColor = getSafeColor(advertisement.backgroundColor);
  const textColor = getSafeColor(advertisement.textColor);

  return (
    <aside
      aria-label="تبلیغات"
      className="bg-primary text-primary-foreground"
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
