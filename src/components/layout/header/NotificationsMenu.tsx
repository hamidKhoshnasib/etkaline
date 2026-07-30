"use client";

import { useState } from "react";
import { BellIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotices } from "@/features/notice/api/use-notices";
import { cn } from "@/lib/utils";

interface NotificationsMenuProps {
  className?: string;
  iconClassName?: string;
}

function NotificationsTrigger({
  className,
  iconClassName,
  disabled = false,
  onClick,
}: NotificationsMenuProps & {
  disabled?: boolean;
  onClick?: React.ComponentProps<"button">["onClick"];
}) {
  return (
    <button
      type="button"
      aria-label="اعلان‌ها"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "focus-visible:outline-primary flex items-center justify-center rounded-full bg-white focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      <BellIcon className={cn("size-[18px]", iconClassName)} aria-hidden="true" />
    </button>
  );
}

export function NotificationsMenu({ className, iconClassName }: NotificationsMenuProps) {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const { data: notices = [], error, isLoading } = useNotices(open);

  if (status !== "authenticated") {
    return (
      <NotificationsTrigger
        className={className}
        iconClassName={iconClassName}
        onClick={() => window.dispatchEvent(new Event("etkala:open-auth"))}
      />
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={<NotificationsTrigger className={className} iconClassName={iconClassName} />}
      />

      <DropdownMenuContent align="end" className="w-[min(360px,calc(100vw-2rem))] rounded-xl p-0">
        <div className="border-b px-4 py-3">
          <h2 className="text-secondary text-sm font-bold">اعلان‌ها</h2>
        </div>

        <div className="max-h-90 overflow-y-auto p-2">
          {isLoading && (
            <div className="space-y-3 p-2" aria-busy="true">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          )}

          {!isLoading && error && (
            <p className="text-destructive p-3 text-sm" role="alert">
              دریافت اعلان‌ها ناموفق بود.
            </p>
          )}

          {!isLoading && !error && notices.length === 0 && (
            <p className="text-muted-foreground p-4 text-center text-sm">اعلان جدیدی ندارید.</p>
          )}

          {!isLoading &&
            !error &&
            notices.map((notice) => (
              <article key={notice.id} className="rounded-lg px-3 py-3 hover:bg-slate-50">
                <h3 className="text-secondary text-sm font-semibold">{notice.title}</h3>
                {notice.text && (
                  <p className="mt-1 line-clamp-3 text-xs leading-5 text-slate-600">
                    {notice.text}
                  </p>
                )}
                {notice.showStartDateFa && (
                  <time className="mt-2 block text-xs text-slate-400">
                    {notice.showStartDateFa}
                  </time>
                )}
              </article>
            ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
