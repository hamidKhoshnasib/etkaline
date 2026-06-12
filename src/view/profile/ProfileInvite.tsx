"use client";

import { useState } from "react";
import { Copy, Check, Gift, Share2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const REFERRAL_CODE = "ETKA-MREZA";
const REFERRAL_LINK = "https://etkaline.com/ref/ETKA-MREZA";

const mockStats = [
  { label: "دوستان دعوت شده", value: "۵" },
  { label: "خرید موفق دوستان", value: "۳" },
  { label: "پاداش دریافتی (تومان)", value: "۱۵۰,۰۰۰" },
];

export function ProfileInvite() {
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  function copy(text: string, setter: (v: boolean) => void) {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile back header */}
      <div className="relative flex items-center justify-center py-1 md:hidden">
        <Link href="/profile" className="text-muted-foreground absolute inset-s-0 p-1">
          <ChevronRight className="size-5" />
        </Link>
        <h1 className="font-bold">دعوت از دوستان</h1>
      </div>

      <h2 className="hidden text-lg font-bold md:block">دعوت از دوستان</h2>

      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <div className="bg-primary/10 flex size-16 items-center justify-center rounded-full">
            <Gift className="text-primary size-8" />
          </div>
          <div>
            <p className="font-semibold">دوستانتان را دعوت کنید</p>
            <p className="text-muted-foreground mt-1 text-sm">
              به ازای هر دوستی که با لینک شما ثبت‌نام کند و خرید اول را انجام دهد،
              <span className="text-foreground font-medium"> ۵۰,۰۰۰ تومان </span>
              هدیه دریافت می‌کنید.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {mockStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex flex-col items-center gap-1 py-4 text-center">
              <span className="text-lg font-bold tabular-nums">{stat.value}</span>
              <span className="text-muted-foreground text-xs">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">کد دعوت شما</p>
            <div className="bg-muted/40 flex items-center justify-between gap-2 rounded-xl border px-4 py-3">
              <span className="font-mono text-sm font-bold tracking-widest">{REFERRAL_CODE}</span>
              <button
                onClick={() => copy(REFERRAL_CODE, setCodeCopied)}
                className="text-primary flex items-center gap-1.5 text-sm hover:underline"
              >
                {codeCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {codeCopied ? "کپی شد" : "کپی"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">لینک دعوت</p>
            <div className="bg-muted/40 flex items-center justify-between gap-2 rounded-xl border px-4 py-3">
              <span className="text-muted-foreground truncate text-sm">{REFERRAL_LINK}</span>
              <button
                onClick={() => copy(REFERRAL_LINK, setLinkCopied)}
                className="text-primary flex shrink-0 items-center gap-1.5 text-sm hover:underline"
              >
                {linkCopied ? <Check className="size-4" /> : <Share2 className="size-4" />}
                {linkCopied ? "کپی شد" : "اشتراک"}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
