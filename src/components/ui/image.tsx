"use client";

import { useState } from "react";
import NextImage, { type ImageProps } from "next/image";

const LOCAL_IMAGE_PATH_PREFIXES = ["/_next/", "/api/", "/favicon", "/images/"];
const FALLBACK_IMAGE_SRC = "/images/image-placeholder.svg";

function isAbsoluteUrl(value: string) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value);
}

function isEtkalaImageUrl(url: URL) {
  return url.hostname === "etkala.ir" || url.hostname.endsWith(".etkala.ir");
}

export function resolveImageSrc(src: ImageProps["src"]): ImageProps["src"] {
  if (typeof src !== "string" || !src) {
    return src;
  }

  if (LOCAL_IMAGE_PATH_PREFIXES.some((prefix) => src.startsWith(prefix))) {
    return src;
  }

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  if (!imageBaseUrl) {
    return src;
  }

  const sourceUrl = new URL(src, imageBaseUrl);
  if (isAbsoluteUrl(src) && !isEtkalaImageUrl(sourceUrl)) {
    return src;
  }

  return isEtkalaImageUrl(sourceUrl)
    ? new URL(`${sourceUrl.pathname}${sourceUrl.search}`, imageBaseUrl).toString()
    : sourceUrl.toString();
}

export function AppImage({ src, onError, unoptimized, ...props }: ImageProps) {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);
  const hasError = failedSrc === src;

  return (
    <NextImage
      {...props}
      src={hasError ? FALLBACK_IMAGE_SRC : resolveImageSrc(src)}
      unoptimized={hasError || unoptimized}
      onError={(event) => {
        onError?.(event);
        setFailedSrc(src);
      }}
    />
  );
}
