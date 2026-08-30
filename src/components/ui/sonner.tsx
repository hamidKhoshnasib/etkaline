"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  CircleXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      dir="rtl"
      position="bottom-right"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4.5" />,
        warning: <TriangleAlertIcon className="size-4.5" />,
        error: <CircleXIcon className="size-4.5" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--width": "min(26rem, calc(100vw - 2rem))",
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          fontFamily: "var(--font-iran-yekan)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "etkaline-toast font-sans!",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
