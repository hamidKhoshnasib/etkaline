"use client";

import * as React from "react";
import { SmileIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export const WELCOME_DIALOG_EVENT = "etkaline:show-welcome";

export interface LastLoginInfo {
  loginDate: string;
  loginDateFa: string;
}

export function WelcomeDialog() {
  const [lastLogin, setLastLogin] = React.useState<LastLoginInfo | null>(null);

  React.useEffect(() => {
    const showWelcomeDialog = (event: Event) => {
      const detail = (event as CustomEvent<LastLoginInfo>).detail;
      if (!detail?.loginDateFa) {
        return;
      }

      setLastLogin(detail);
    };

    window.addEventListener(WELCOME_DIALOG_EVENT, showWelcomeDialog);
    return () => window.removeEventListener(WELCOME_DIALOG_EVENT, showWelcomeDialog);
  }, []);

  return (
    <Dialog open={Boolean(lastLogin)} onOpenChange={(open) => !open && setLastLogin(null)}>
      <DialogContent
        showCloseButton={false}
        className="h-[124px] w-[calc(100%-2rem)] max-w-[568px] gap-0 overflow-hidden rounded-[20px] p-0 sm:max-w-[568px]"
      >
        <div className="from-secondary relative flex h-20 items-center gap-4 rounded-b-2xl bg-gradient-to-l to-[#07539b] px-6 text-white shadow-2xl">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute end-4 top-4 text-white hover:bg-white/10 hover:text-white"
            aria-label="بستن پیام خوش‌آمدگویی"
            onClick={() => setLastLogin(null)}
          >
            <XIcon />
          </Button>
          <SmileIcon
            className="size-11 shrink-0 text-yellow-300"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <div className="min-w-0 text-right">
            <DialogTitle className="text-lg font-bold">به فروشگاه اتکالاین خوش آمدید</DialogTitle>
            <DialogDescription className="mt-1 text-sm text-white/90">
              از حضور شما سپاسگزاریم و امیدواریم خرید لذت‌بخشی داشته باشید.
            </DialogDescription>
          </div>
        </div>
        <p className="bg-background flex h-11 items-center justify-center px-6 text-center text-sm text-slate-600">
          آخرین ورود شما به اتکالاین در تاریخ {lastLogin?.loginDateFa} به ثبت رسیده است.
        </p>
      </DialogContent>
    </Dialog>
  );
}
