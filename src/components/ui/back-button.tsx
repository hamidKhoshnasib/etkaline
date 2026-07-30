"use client";

import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  ariaLabel?: string;
  fallbackHref: string;
  className?: string;
}

export function BackButton({
  ariaLabel = "بازگشت به صفحه قبل",
  fallbackHref,
  className,
}: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.replace(fallbackHref);
  }

  return (
    <Button
      aria-label={ariaLabel}
      className={className}
      onClick={handleBack}
      size="icon-sm"
      type="button"
      variant="ghost"
    >
      <ChevronRightIcon data-icon="inline-start" aria-hidden="true" />
    </Button>
  );
}
