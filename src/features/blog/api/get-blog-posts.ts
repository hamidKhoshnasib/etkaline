import "server-only";

import { getServerApiBaseUrl } from "@/lib/api-config";
import type { SiteType } from "@/lib/api-site-type";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";
import { getServerApiHeaders } from "@/lib/get-server-api-headers";
import { formatBlogDate } from "@/features/blog/model/format-blog-date";

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  studyTime: string;
}

interface BlogPostsResponse {
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

function parseBlogPosts(raw: unknown): BlogPost[] {
  const response = raw as BlogPostsResponse;
  const posts =
    (Array.isArray(response.value) ? response.value : asRecord(response.value)?.posts) ?? null;

  if (response.isSuccess !== true) {
    throw new Error("Blog posts response was unsuccessful");
  }

  if (posts === null) {
    return [];
  }

  if (!Array.isArray(posts)) {
    throw new Error("Blog posts response has an invalid value");
  }

  return posts.flatMap((value): BlogPost[] => {
    const post = asRecord(value);
    const id = post && asInteger(post.id);
    const title = post && asText(post.title);
    if (id === null || !title) {
      return [];
    }

    return [
      {
        id,
        title,
        summary: asText(post.summary) ?? "",
        image: toImageUrl(post.picUrl) ?? toImageUrl(post.pic) ?? "/images/image-placeholder.svg",
        date: formatBlogDate(asText(post.createDate) ?? asText(post.createDateFa)),
        studyTime: asText(post.studyTime) ?? "",
      },
    ];
  });
}

export async function getBlogPosts(siteType: SiteType, pageLength = 4): Promise<BlogPost[]> {
  const url = new URL("/api/Posts/Search", getServerApiBaseUrl());
  url.searchParams.set("Page", "1");
  url.searchParams.set("PageLength", String(pageLength));

  const response = await fetchWithTimeout(url, {
    headers: await getServerApiHeaders(siteType),
    next: { revalidate: 60, tags: [`blog-posts-${siteType}`] },
  });
  if (!response.ok) {
    throw new Error(`Blog posts request failed with status ${response.status}`);
  }

  return parseBlogPosts(await response.json());
}
