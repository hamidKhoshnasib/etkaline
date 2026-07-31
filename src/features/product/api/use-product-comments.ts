"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient, getErrorMessage } from "@/lib/axios-client";
import { useApiQuery } from "@/hooks/use-api-query";

export interface ProductComment {
  id: number;
  parentId: number | null;
  creatorName: string;
  text: string;
  score: number | null;
  likeCount: number;
  userIsLiked: boolean;
  createDateFa: string | null;
  recommend: boolean;
  isBought: boolean;
  replies: ProductComment[];
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

interface CreateCommentResponse {
  value?: number;
  isSuccess?: boolean;
  errors?: string[];
  message?: string;
}

interface CommentLikeResponse {
  isSuccess?: boolean;
  errors?: string[];
  message?: string;
}

export interface CreateProductCommentInput {
  productId: number;
  text: string;
  score: number;
  recommend: boolean;
  parentId?: number;
}

interface ToggleProductCommentLikeInput {
  productId: number;
  commentId: number;
  isLiked: boolean;
}

function getText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function parseComment(value: unknown, requireApproval: boolean): ProductComment | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const comment = value as Record<string, unknown>;
  const id = getNumber(comment.id);
  const parentId = getNumber(comment.parentId);
  const creatorName = getText(comment.creatorName);
  const text = getText(comment.text);
  if (
    typeof id !== "number" ||
    !Number.isInteger(id) ||
    !creatorName ||
    !text ||
    (requireApproval && comment.isApproved !== true)
  ) {
    return null;
  }

  const score = getNumber(comment.score);

  return {
    id,
    parentId: typeof parentId === "number" && Number.isInteger(parentId) ? parentId : null,
    creatorName,
    text,
    score: score === null ? null : Math.min(5, Math.max(0, score)),
    likeCount: Math.max(0, getNumber(comment.likeCount) ?? 0),
    userIsLiked: comment.userIsLiked === true,
    createDateFa: getText(comment.createDateFa),
    recommend: comment.recommend === true,
    isBought: comment.isBought === true,
    replies: Array.isArray(comment.replies)
      ? comment.replies.flatMap((reply) => {
          const parsedReply = parseComment(reply, false);
          return parsedReply ? [parsedReply] : [];
        })
      : [],
  };
}

function parseComments(response: CommentsResponse, page: number): ProductCommentsResult {
  if (response.isSuccess !== true || !response.value || typeof response.value !== "object") {
    return { page, pageCount: 0, totalCount: 0, comments: [] };
  }

  const value = response.value as Record<string, unknown>;
  const comments = Array.isArray(value.comments)
    ? value.comments.flatMap((item) => {
        const comment = parseComment(item, true);
        return comment ? [comment] : [];
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

export function useCreateProductComment() {
  const queryClient = useQueryClient();

  return useMutation<CreateCommentResponse, Error, CreateProductCommentInput>({
    mutationFn: async ({ productId, text, score, recommend, parentId }) => {
      let data: CreateCommentResponse;

      try {
        ({ data } = await axiosClient.post<CreateCommentResponse>("/api/Comments/Create", {
          productId,
          text,
          score,
          recommend,
          ...(parentId !== undefined ? { parentId } : {}),
        }));
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }

      if (!data.isSuccess) {
        throw new Error(data.message || data.errors?.[0] || "ثبت دیدگاه ناموفق بود.");
      }

      return data;
    },
    onSuccess: (_, { productId }) =>
      queryClient.invalidateQueries({ queryKey: ["product-comments", productId] }),
  });
}

export function useToggleProductCommentLike() {
  const queryClient = useQueryClient();

  return useMutation<CommentLikeResponse, Error, ToggleProductCommentLikeInput>({
    mutationFn: async ({ commentId, isLiked }) => {
      const action = isLiked ? "RemoveLike" : "AddLike";
      let data: CommentLikeResponse;

      try {
        ({ data } = await axiosClient.post<CommentLikeResponse>(
          `/api/Comments/${action}/${commentId}`,
        ));
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }

      if (!data.isSuccess) {
        throw new Error(data.message || data.errors?.[0] || "ثبت لایک دیدگاه ناموفق بود.");
      }

      return data;
    },
    onSuccess: (_, { productId }) =>
      queryClient.invalidateQueries({ queryKey: ["product-comments", productId] }),
  });
}
