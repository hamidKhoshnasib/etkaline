"use client";

import { toast } from "sonner";

import { Alert } from "@/components/ui/Alert";

interface AlertToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

function createAlertToast(variant: "success" | "info" | "warning" | "error") {
  return (options: AlertToastOptions) =>
    toast.custom(
      (id) => <Alert {...options} variant={variant} onClose={() => toast.dismiss(id)} />,
      { duration: options.duration ?? 5000 },
    );
}

export const alert = {
  success: createAlertToast("success"),
  info: createAlertToast("info"),
  warning: createAlertToast("warning"),
  error: createAlertToast("error"),
};

export type { AlertToastOptions };
