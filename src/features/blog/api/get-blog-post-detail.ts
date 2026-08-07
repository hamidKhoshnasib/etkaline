import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import type { SiteType } from "@/lib/api-site-type";
import { getServerApiHeaders } from "@/lib/get-server-api-headers";

export interface BlogPostDetail {
  id: number;
  title: string;
  summary: string;
  description: string;
  metaTitle: string | null;
  seoDescription: string | null;
  studyTime: string | null;
  creatorName: string | null;
  createDate: string | null;
  categories: Array<{ id: number; title: string }>;
  image: string | null;
}

interface BlogPostDetailResponse {
  value?: unknown;
  isSuccess?: unknown;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function asInteger(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) ? value : null;
}

function asText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toImageUrl(value: unknown): string | null {
  const image = asText(value);
  if (!image) {
    return null;
  }

  try {
    const url = new URL(image, getServerApiBaseUrl());
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function toPlainText(value: unknown): string {
  const text = asText(value);
  return text
    ? text
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

function parseCategories(value: unknown): Array<{ id: number; title: string }> {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((value) => {
    const category = asRecord(value);
    const id = category && asInteger(category.id);
    const title = category && asText(category.title);
    return id === null || !title ? [] : [{ id, title }];
  });
}

function parseBlogPostDetail(raw: unknown): BlogPostDetail | null {
  const response = raw as BlogPostDetailResponse;
  if (response.isSuccess !== true) {
    return null;
  }

  const post = asRecord(response.value);
  const id = post && asInteger(post.id);
  const title = post && asText(post.title);
  if (!post || id === null || !title) {
    return null;
  }

  const pictures = Array.isArray(post.pictures) ? post.pictures : [];
  const mainPicture = pictures.find((picture) => asRecord(picture)?.isMain === true) ?? pictures[0];
  const picture = asRecord(mainPicture);

  return {
    id,
    title,
    summary: toPlainText(post.summary),
    description: toPlainText(post.description),
    metaTitle: asText(post.metaTitle),
    seoDescription: toPlainText(post.seoDesc),
    studyTime: asText(post.studyTime),
    creatorName: asText(post.creatorName),
    createDate: asText(post.createDateFa),
    categories: parseCategories(post.catList),
    image: toImageUrl(picture?.streamUrl) ?? toImageUrl(picture?.downloadUrl),
  };
}

export async function getBlogPostDetail(
  id: number,
  siteType: SiteType,
): Promise<BlogPostDetail | null> {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return null;
  }

  const url = new URL("/api/Posts/GetDetails", getServerApiBaseUrl());
  url.searchParams.set("Id", String(id));

  const response = await fetch(url, {
    headers: await getServerApiHeaders(siteType),
    next: { revalidate: 300, tags: [`blog-post-${siteType}-${id}`] },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new Error(`Blog post detail request failed with status ${response.status}`);
  }

  return parseBlogPostDetail(await response.json());
}
