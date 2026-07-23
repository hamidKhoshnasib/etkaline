import NextImage, { type ImageProps } from "next/image";

const LOCAL_IMAGE_PATH_PREFIXES = ["/_next/", "/api/", "/favicon", "/images/"];

function isAbsoluteUrl(value: string) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value);
}

export function resolveImageSrc(src: ImageProps["src"]): ImageProps["src"] {
  if (typeof src !== "string" || !src || isAbsoluteUrl(src)) {
    return src;
  }

  if (LOCAL_IMAGE_PATH_PREFIXES.some((prefix) => src.startsWith(prefix))) {
    return src;
  }

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  if (!imageBaseUrl) {
    return src;
  }

  return new URL(src, imageBaseUrl).toString();
}

export function AppImage({ src, ...props }: ImageProps) {
  return <NextImage {...props} src={resolveImageSrc(src)} />;
}
