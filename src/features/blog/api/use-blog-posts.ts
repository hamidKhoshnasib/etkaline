"use client";

import { useApiQuery } from "@/hooks/use-api-query";
import { getClientApiBaseUrl } from "@/lib/api-config";

import { GET_BLOG_POSTS } from "./endpoints";
import { blogQueryKey } from "./query-keys";

export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
}

interface BlogPostsResponse {
  value?: unknown;
  isSuccess?: unknown;
}

export interface BlogPostsRequest {
  categoryId?: number;
  tagId?: number;
  text?: string;
  page?: number;
  pageLength?: number;
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
    const url = new URL(image, getClientApiBaseUrl());
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function parseBlogPosts(raw: unknown): BlogPost[] {
  const response = raw as BlogPostsResponse;
  if (response.isSuccess !== true || !Array.isArray(response.value)) {
    throw new Error("Blog posts response was unsuccessful");
  }

  return response.value.flatMap((value): BlogPost[] => {
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
        date: asText(post.createDateFa) ?? "",
      },
    ];
  });
}

export function useBlogPosts({
  categoryId,
  tagId,
  text,
  page = 1,
  pageLength = 9,
}: BlogPostsRequest = {}) {
  return useApiQuery<unknown, BlogPost[]>({
    url: GET_BLOG_POSTS,
    queryKey: blogQueryKey("posts", { categoryId, tagId, text, page, pageLength }),
    axiosConfig: {
      params: {
        CategoryId: categoryId,
        TagId: tagId,
        Text: text,
        Page: page,
        PageLength: pageLength,
      },
    },
    select: parseBlogPosts,
    staleTime: 60_000,
    retry: 1,
  });
}
