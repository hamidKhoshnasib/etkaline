"use client";

import * as React from "react";
import { SmileIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export const WELCOME_DIALOG_EVENT = "etkaline:show-welcome";

export interface LastLoginInfo {
  loginDate: string;
  loginDateFa: string;
}

export function WelcomeDialog() {
  React.useEffect(() => {
    const showWelcomeDialog = (event: Event) => {
      const detail = (event as CustomEvent<LastLoginInfo>).detail;
      if (!detail?.loginDateFa) {
        return;
      }

      toast.custom(
        (id) => (
          <div className="bg-background w-full overflow-hidden rounded-[20px] border shadow-lg">
            <div className="from-secondary relative flex h-20 items-center gap-4 rounded-b-2xl bg-gradient-to-l to-[#07539b] px-6 text-white">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute end-4 top-4 text-white hover:bg-white/10 hover:text-white"
                aria-label="بستن پیام خوش‌آمدگویی"
                onClick={() => toast.dismiss(id)}
              >
                <XIcon />
              </Button>
              <SmileIcon
                className="text-primary size-11 shrink-0"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              <div className="min-w-0 text-right">
                <p className="text-lg font-bold">به فروشگاه اتکالاین خوش آمدید</p>
                <p className="mt-1 text-sm text-white/90">
                  از حضور شما سپاسگزاریم و امیدواریم خرید لذت‌بخشی داشته باشید.
                </p>
              </div>
            </div>
            <p className="flex h-11 items-center justify-center px-6 text-center text-sm text-slate-600">
              آخرین ورود شما به اتکالاین در تاریخ {detail.loginDateFa} به ثبت رسیده است.
            </p>
          </div>
        ),
        {
          duration: 8_000,
          className: "w-[min(568px,calc(100vw-2rem))]",
        },
      );
    };

    window.addEventListener(WELCOME_DIALOG_EVENT, showWelcomeDialog);
    return () => window.removeEventListener(WELCOME_DIALOG_EVENT, showWelcomeDialog);
  }, []);

  return null;
}
