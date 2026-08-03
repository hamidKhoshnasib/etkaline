import type { Metadata } from "next";

import { SITE_NAME } from "@/config/site";
import { getStorefront } from "@/config/storefront";
import type { SiteType } from "@/lib/api-site-type";

interface StorefrontMetadataOptions {
  siteType: SiteType;
  pathname: string;
  title?: unknown;
  fallbackTitle: string;
  description?: unknown;
  fallbackDescription?: string;
  keywords?: unknown;
  image?: unknown;
  robots?: Metadata["robots"];
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() || undefined : undefined;
}

function cleanKeywords(value: StorefrontMetadataOptions["keywords"]) {
  const keywords =
    typeof value === "string"
      ? value.split(",")
      : Array.isArray(value)
        ? value.filter((keyword): keyword is string => typeof keyword === "string")
        : undefined;
  const cleaned = keywords?.map((keyword) => keyword.trim()).filter(Boolean);
  return cleaned?.length ? cleaned : undefined;
}

function getSafeImageUrl(value: unknown, absoluteUrl: (href: string) => string) {
  const image = cleanText(value);
  if (!image) {
    return undefined;
  }

  if (image.startsWith("/")) {
    return absoluteUrl(image);
  }

  try {
    const url = new URL(image);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function createStorefrontMetadata({
  siteType,
  pathname,
  title,
  fallbackTitle,
  description,
  fallbackDescription,
  keywords,
  image,
  robots,
}: StorefrontMetadataOptions): Metadata {
  const storefront = getStorefront(siteType);
  const resolvedTitle = cleanText(title) ?? fallbackTitle;
  const resolvedDescription = cleanText(description) ?? cleanText(fallbackDescription);
  const canonical = storefront.absoluteUrl(pathname);
  const imageUrl = getSafeImageUrl(image, storefront.absoluteUrl);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: cleanKeywords(keywords),
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      images: imageUrl ? [imageUrl] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description: resolvedDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots,
  };
}
