"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Price from "./Price";
import { type CartItem } from "@/features/cart/fixtures/cart";
import { calculateCartTotals, type CheckoutStep } from "@/features/cart/model/checkout";

interface OrderSummaryProps {
  step: CheckoutStep;
  items: CartItem[];
  canProceed?: boolean;
  onPrimary: () => void;
}

function Row({ label, value, muted }: { label: string; value: number; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className={muted ? "body-medium text-gray-400" : "body-medium text-[#475569]"}>
        {label}
      </span>
      <Price value={value} className="body-medium-bold text-secondary" />
    </div>
  );
}

export default function OrderSummary({
  step,
  items,
  canProceed = true,
  onPrimary,
}: OrderSummaryProps) {
  const [discountCode, setDiscountCode] = useState("");

  const totals = calculateCartTotals(items, step);

  const title = step === "cart" ? "مجموع فاکتور" : "جزئیات فاکتور";

  return (
    <aside className="sticky top-6 h-fit rounded-2xl border border-[#E2E8F0] bg-white p-5">
      <h2 className="title-medium-bold text-secondary mb-2 text-center">{title}</h2>

      <div className="divide-y divide-[#EEF1F4]">
        <Row label="قیمت کالاها:" value={totals.itemsTotal} />
        <Row label="هزینه ارسال:" value={totals.shipping} />
        <Row label="هزینه خدمات:" value={totals.service} />
        <div className="border-t border-[#EEF1F4]">
          <Row label="تخفیف:" value={totals.discount} />
          {step !== "cart" && <Row label="تخفیف حکمت:" value={totals.hekmatDiscount} />}
        </div>
      </div>

      {/* Grand total */}
      <div className="bg-secondary/5 mt-2 flex items-center justify-between rounded-xl px-4 py-3">
        <span className="title-small-bold text-secondary">جمع سبد خرید:</span>
        <Price value={totals.grandTotal} className="title-small-bold text-secondary" />
      </div>

      {/* Discount code (review step only) */}
      {step === "review" && (
        <div className="mt-5">
          <p className="title-small-bold text-secondary mb-2">کد تخفیف</p>
          <div className="flex items-center gap-2">
            <Input
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="کد را وارد کنید."
              className="h-11 flex-1 rounded-full bg-gray-50 px-4"
            />
            <Button variant="secondary-gray" size="md" className="rounded-full">
              ثبت
            </Button>
          </div>
        </div>
      )}

      {/* Warning note */}
      <div className="text-secondary mt-4 flex items-start gap-2">
        <TriangleAlert className="size-5 shrink-0 text-[#FFC300]" />
        <p className="body-small leading-5 text-[#475569]">
          هزینه این سفارش هنوز پرداخت نشده و در صورت اتمام موجودی، کالاها از سبد حذف می‌شوند.
        </p>
      </div>

      {/* Primary action */}
      {step === "review" ? (
        <Button
          onClick={onPrimary}
          size="lg"
          className="mt-4 w-full bg-[#22C55E] text-white hover:bg-[#16A34A]"
        >
          پرداخت
        </Button>
      ) : (
        <Button onClick={onPrimary} size="lg" disabled={!canProceed} className="mt-4 w-full">
          {step === "cart"
            ? "تایید و تکمیل سفارش"
            : canProceed
              ? "تایید و ادامه"
              : "زمان انتخاب نشده !"}
        </Button>
      )}
    </aside>
  );
}
