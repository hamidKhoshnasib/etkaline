"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { CheckoutDetails } from "@/features/cart/api/get-checkout-details";
import type { CartItem } from "@/features/cart/fixtures/cart";
import { calculateCartTotals, type CheckoutStep } from "@/features/cart/model/checkout";
import { cn } from "@/lib/utils";
import Price from "./Price";

interface OrderSummaryProps {
  step: CheckoutStep;
  items: CartItem[];
  checkoutDetails?: CheckoutDetails;
  canProceed?: boolean;
  onPrimary: () => void;
}

function Row({ label, value, muted = false }: { label: string; value: number; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className={cn("text-sm", muted ? "text-muted-foreground" : "text-foreground")}>
        {label}
      </span>
      <Price value={value} className="text-secondary text-sm font-bold" />
    </div>
  );
}

export default function OrderSummary({
  step,
  items,
  checkoutDetails,
  canProceed = true,
  onPrimary,
}: OrderSummaryProps) {
  const [discountCode, setDiscountCode] = useState("");
  const fallbackTotals = calculateCartTotals(items, step);
  const isCartStep = step === "cart" && checkoutDetails !== undefined;
  const discount = checkoutDetails
    ? checkoutDetails.offDiscountAmount + checkoutDetails.discountAmount
    : fallbackTotals.discount;
  const hekmatDiscount = checkoutDetails?.hekmatDiscountAmount ?? fallbackTotals.hekmatDiscount;
  const total = checkoutDetails?.payableAmount ?? fallbackTotals.grandTotal;
  const title = step === "cart" ? "مجموع فاکتور" : "جزئیات فاکتور";

  return (
    <aside className="h-fit lg:sticky lg:top-36">
      <Card className="rounded-2xl py-0 shadow-none">
        <CardHeader className="px-5 pt-7 pb-3 text-center">
          <CardTitle className="text-secondary text-xl font-bold">{title}</CardTitle>
        </CardHeader>

        <CardContent className="px-5 pb-0">
          <div>
            <Row
              label="قیمت کالاها:"
              value={checkoutDetails?.totalMainPrice ?? fallbackTotals.itemsTotal}
            />
            <Separator />
            <Row
              label="هزینه ارسال:"
              value={checkoutDetails?.deliveryAmount ?? fallbackTotals.shipping}
            />
            <Separator />
            {step !== "cart" ? (
              <>
                <Row label="هزینه خدمات:" value={0} muted />
                <Separator />
              </>
            ) : null}
            <Row label="تخفیف:" value={discount} muted={discount === 0} />
            {step !== "cart" ? (
              <>
                <Separator />
                <Row label="تخفیف حکمت:" value={hekmatDiscount} muted={hekmatDiscount === 0} />
              </>
            ) : null}
          </div>

          <div className="bg-muted mt-2 flex items-center justify-between gap-3 rounded-xl px-4 py-4">
            <span className="text-secondary text-sm font-bold">جمع سبد خرید:</span>
            <Price value={total} className="text-secondary text-base font-bold" />
          </div>

          {step === "review" ? (
            <FieldGroup className="mt-5 gap-3">
              <Field>
                <FieldLabel htmlFor="discount-code">کد تخفیف</FieldLabel>
                <div className="flex flex-col gap-2">
                  <Input
                    id="discount-code"
                    value={discountCode}
                    onChange={(event) => setDiscountCode(event.target.value)}
                    placeholder="کد را وارد کنید"
                    className="h-11 flex-1 rounded-full"
                  />
                  <Button type="button" variant="outline" size="md" className="rounded-full">
                    ثبت
                  </Button>
                </div>
              </Field>
            </FieldGroup>
          ) : null}

          <div className="text-muted-foreground mt-5 flex items-start gap-2 text-xs leading-5">
            <TriangleAlert className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p>
              هزینه این سفارش هنوز پرداخت نشده و در صورت اتمام موجودی، کالاها از سبد حذف می‌شوند.
            </p>
          </div>
        </CardContent>

        <CardFooter className="border-0 bg-transparent p-5 pt-4">
          <Button
            type="button"
            onClick={onPrimary}
            size="md"
            disabled={!canProceed || (isCartStep && checkoutDetails.basketItems.length === 0)}
            className="w-full rounded-full font-bold"
          >
            {step === "cart"
              ? "تایید و تکمیل سفارش"
              : step === "address"
                ? canProceed
                  ? "تایید و ادامه"
                  : "زمان انتخاب نشده!"
                : "پرداخت"}
          </Button>
        </CardFooter>
      </Card>
    </aside>
  );
}
