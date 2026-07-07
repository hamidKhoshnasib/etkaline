"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Btn } from "@/components/ui/Btn";
import { Input } from "@/components/ui/input";
import Price from "@/view/cart/Price";
import { type CartItem } from "@/view/cart/cart.data";
import type { CheckoutStep } from "@/view/cart/Cart";

interface OrderSummaryProps {
  step: CheckoutStep;
  items: CartItem[];
  canProceed?: boolean;
  onPrimary: () => void;
}

const SHIPPING_COST = 183000000;
const SERVICE_COST = 183000000;
const DISCOUNT = 5000000;
const HEKMAT_DISCOUNT = 1000000;

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

  const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = itemsTotal + SHIPPING_COST + SERVICE_COST - DISCOUNT;

  const title = step === "cart" ? "مجموع فاکتور" : "جزئیات فاکتور";

  return (
    <aside className="sticky top-6 h-fit rounded-2xl border border-[#E2E8F0] bg-white p-5">
      <h2 className="title-medium-bold text-secondary mb-2 text-center">{title}</h2>

      <div className="divide-y divide-[#EEF1F4]">
        <Row label="قیمت کالاها:" value={itemsTotal} />
        <Row label="هزینه ارسال:" value={SHIPPING_COST} />
        <Row label="هزینه خدمات:" value={SERVICE_COST} />
        <div className="border-t border-[#EEF1F4]">
          <Row label="تخفیف:" value={DISCOUNT} />
          {step !== "cart" && <Row label="تخفیف حکمت:" value={HEKMAT_DISCOUNT} />}
        </div>
      </div>

      {/* Grand total */}
      <div className="bg-secondary/5 mt-2 flex items-center justify-between rounded-xl px-4 py-3">
        <span className="title-small-bold text-secondary">جمع سبد خرید:</span>
        <Price value={grandTotal} className="title-small-bold text-secondary" />
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
            <Btn variant="secondary-gray" size="md" className="rounded-full">
              ثبت
            </Btn>
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
        <Btn
          onClick={onPrimary}
          size="lg"
          className="mt-4 w-full bg-[#22C55E] text-white hover:bg-[#16A34A]"
        >
          پرداخت
        </Btn>
      ) : (
        <Btn onClick={onPrimary} size="lg" disabled={!canProceed} className="mt-4 w-full">
          {step === "cart"
            ? "تایید و تکمیل سفارش"
            : canProceed
              ? "تایید و ادامه"
              : "زمان انتخاب نشده !"}
        </Btn>
      )}
    </aside>
  );
}
