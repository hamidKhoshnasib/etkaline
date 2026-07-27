"use client";

import { useApiQuery } from "@/hooks/use-api-query";

export interface ProductComment {
  id: number;
  creatorName: string;
  text: string;
  score: number;
  likeCount: number;
  createDateFa: string | null;
  recommend: boolean;
  isBought: boolean;
}

export interface ProductCommentsResult {
  page: number;
  pageCount: number;
  totalCount: number;
  comments: ProductComment[];
}

interface CommentsResponse {
  value?: unknown;
  isSuccess?: unknown;
}

function getText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function parseComments(response: CommentsResponse, page: number): ProductCommentsResult {
  if (response.isSuccess !== true || !response.value || typeof response.value !== "object") {
    return { page, pageCount: 0, totalCount: 0, comments: [] };
  }

  const value = response.value as Record<string, unknown>;
  const comments = Array.isArray(value.comments)
    ? value.comments.flatMap((item) => {
        if (!item || typeof item !== "object") {
          return [];
        }

        const comment = item as Record<string, unknown>;
        const id = getNumber(comment.id);
        const creatorName = getText(comment.creatorName);
        const text = getText(comment.text);
        if (
          typeof id !== "number" ||
          !Number.isInteger(id) ||
          !creatorName ||
          !text ||
          comment.isApproved !== true
        ) {
          return [];
        }

        return [
          {
            id,
            creatorName,
            text,
            score: Math.min(5, Math.max(0, getNumber(comment.score) ?? 0)),
            likeCount: Math.max(0, getNumber(comment.likeCount) ?? 0),
            createDateFa: getText(comment.createDateFa),
            recommend: comment.recommend === true,
            isBought: comment.isBought === true,
          },
        ];
      })
    : [];

  return {
    page: getNumber(value.page) ?? page,
    pageCount: Math.max(0, getNumber(value.pageCount) ?? 0),
    totalCount: Math.max(0, getNumber(value.totalCount) ?? comments.length),
    comments,
  };
}

export function useProductComments(productId: number, page: number, pageLength = 10) {
  const searchParams = new URLSearchParams({
    ProductId: String(productId),
    Page: String(page),
    PageLength: String(pageLength),
  });

  return useApiQuery<CommentsResponse, ProductCommentsResult>({
    url: `/api/Comments?${searchParams.toString()}`,
    queryKey: ["product-comments", productId, page, pageLength],
    select: (response) => parseComments(response, page),
    enabled: Number.isSafeInteger(productId) && productId > 0,
    staleTime: 60_000,
    retry: false,
  });
}
