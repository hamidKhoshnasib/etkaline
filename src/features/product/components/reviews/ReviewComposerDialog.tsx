"use client";

import { useState } from "react";
import { StarIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useCreateProductComment } from "@/features/product/api/use-product-comments";
import { cn } from "@/lib/utils";

interface ReviewComposerDialogProps {
  productId: number;
  parentId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewComposerDialog({
  productId,
  parentId,
  open,
  onOpenChange,
}: ReviewComposerDialogProps) {
  const [text, setText] = useState("");
  const [score, setScore] = useState(5);
  const [recommend, setRecommend] = useState(true);
  const [error, setError] = useState("");
  const createComment = useCreateProductComment();
  const isReply = parentId !== null;

  const closeDialog = () => {
    onOpenChange(false);
    setText("");
    setScore(5);
    setRecommend(true);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedText = text.trim();

    if (!normalizedText) {
      setError("متن دیدگاه را وارد کنید.");
      return;
    }

    try {
      setError("");
      await createComment.mutateAsync({
        productId,
        text: normalizedText,
        score,
        recommend,
        parentId: parentId ?? undefined,
      });
      toast.success(isReply ? "پاسخ شما برای بررسی ثبت شد." : "دیدگاه شما برای بررسی ثبت شد.");
      closeDialog();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "ثبت دیدگاه ناموفق بود.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => (nextOpen ? onOpenChange(true) : closeDialog())}
    >
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isReply ? "ثبت پاسخ" : "ثبت دیدگاه"}</DialogTitle>
          <DialogDescription>
            {isReply
              ? "پاسخ خود را برای این دیدگاه ثبت کنید."
              : "نظر خود را درباره این محصول ثبت کنید."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <Field>
            <FieldLabel>امتیاز شما</FieldLabel>
            <div className="flex items-center gap-1" role="group" aria-label="امتیاز محصول">
              {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                return (
                  <Button
                    key={starValue}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-transparent"
                    onClick={() => setScore(starValue)}
                    aria-label={`امتیاز ${starValue} از ۵`}
                    aria-pressed={score === starValue}
                  >
                    <StarIcon
                      className={cn(
                        "size-6",
                        starValue <= score ? "fill-yellow-400 text-yellow-400" : "text-slate-300",
                      )}
                    />
                  </Button>
                );
              })}
            </div>
          </Field>

          <Field data-invalid={Boolean(error)}>
            <FieldLabel htmlFor="product-review-text">
              {isReply ? "متن پاسخ" : "متن دیدگاه"}
            </FieldLabel>
            <textarea
              id="product-review-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={isReply ? "پاسخ خود را بنویسید" : "دیدگاه خود را بنویسید"}
              className="border-input focus-visible:border-ring focus-visible:ring-ring/50 min-h-32 w-full resize-y rounded-xl border bg-transparent px-3 py-2 text-sm text-black outline-none focus-visible:ring-3"
              aria-invalid={Boolean(error)}
              disabled={createComment.isPending}
            />
            {error && <FieldError>{error}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>پیشنهاد خرید</FieldLabel>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={recommend ? "default" : "outline"}
                size="sm"
                onClick={() => setRecommend(true)}
                aria-pressed={recommend}
              >
                پیشنهاد می‌کنم
              </Button>
              <Button
                type="button"
                variant={!recommend ? "default" : "outline"}
                size="sm"
                onClick={() => setRecommend(false)}
                aria-pressed={!recommend}
              >
                پیشنهاد نمی‌کنم
              </Button>
            </div>
          </Field>

          <Button type="submit" className="h-10 w-full" disabled={createComment.isPending}>
            {createComment.isPending && <Spinner data-icon="inline-start" className="size-4" />}
            {isReply ? "ثبت پاسخ" : "ثبت دیدگاه"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
