"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { CheckoutDetails } from "@/features/cart/api/get-checkout-details";
import type { SavedBasket } from "@/features/cart/api/save-basket";
import type { CartItem } from "@/features/cart/fixtures/cart";
import { calculateCartTotals, type CheckoutStep } from "@/features/cart/model/checkout";
import { cn } from "@/lib/utils";
import Price from "./Price";

interface OrderSummaryProps {
  step: CheckoutStep;
  items: CartItem[];
  checkoutDetails?: CheckoutDetails;
  savedBasket?: SavedBasket | null;
  canProceed?: boolean;
  isSubmitting?: boolean;
  onPrimary: () => void | Promise<void>;
}

function Row({ label, value, muted = false }: { label: string; value: number; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className={cn("text-sm text-[#64748B]", muted && "opacity-70")}>{label}</span>
      <Price value={value} className="text-secondary text-sm font-bold" />
    </div>
  );
}

export default function OrderSummary({
  step,
  items,
  checkoutDetails,
  savedBasket = null,
  canProceed = true,
  isSubmitting = false,
  onPrimary,
}: OrderSummaryProps) {
  const [discountCode, setDiscountCode] = useState("");
  const fallbackTotals = calculateCartTotals(items, step);
  const savedInvoice = step === "cart" ? null : savedBasket;
  const isCartStep = step === "cart" && checkoutDetails !== undefined;
  const discount = savedInvoice
    ? savedInvoice.offDiscountAmount + savedInvoice.discountAmount
    : checkoutDetails
      ? checkoutDetails.offDiscountAmount + checkoutDetails.discountAmount
      : fallbackTotals.discount;
  const hekmatDiscount = checkoutDetails?.hekmatDiscountAmount ?? fallbackTotals.hekmatDiscount;
  const total = savedInvoice
    ? Math.max(
        0,
        savedInvoice.totalOffPrice +
          savedInvoice.deliveryAmount +
          savedInvoice.serviceAmount -
          savedInvoice.discountAmount -
          (checkoutDetails?.hekmatDiscountAmount ?? 0) -
          (checkoutDetails?.hekmatBonAmount ?? 0) -
          (checkoutDetails?.hekmatSubsidAmount ?? 0) -
          (checkoutDetails?.hekmatBuyCreditAmount ?? 0),
      )
    : (checkoutDetails?.payableAmount ?? fallbackTotals.grandTotal);
  const title = "جزئیات فاکتور";

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
              value={
                savedInvoice?.totalMainPrice ??
                checkoutDetails?.totalMainPrice ??
                fallbackTotals.itemsTotal
              }
            />
            <Separator />
            {step !== "cart" ? (
              <>
                <Row
                  label="هزینه ارسال:"
                  value={
                    savedInvoice?.deliveryAmount ??
                    checkoutDetails?.deliveryAmount ??
                    fallbackTotals.shipping
                  }
                />
                <Row
                  label="هزینه خدمات:"
                  value={
                    savedInvoice?.serviceAmount ??
                    checkoutDetails?.serviceAmount ??
                    fallbackTotals.service
                  }
                  muted={
                    (savedInvoice?.serviceAmount ??
                      checkoutDetails?.serviceAmount ??
                      fallbackTotals.service) === 0
                  }
                />
                <Separator />
              </>
            ) : null}
            <Row label="تخفیف:" value={discount} muted={discount === 0} />
            {step !== "cart" ? (
              <>
                <Row label="تخفیف حکمت:" value={hekmatDiscount} />
              </>
            ) : null}
          </div>

          <div className="bg-muted mt-2 flex items-center justify-between gap-3 rounded-xl px-4 py-4">
            <span className="text-secondary text-sm font-bold">جمع سبد خرید:</span>
            <Price value={total} className="text-secondary text-base font-bold" />
          </div>

          {step === "review" ? (
            <div className="mt-5">
              <FieldLabel
                htmlFor="discount-code"
                className="text-secondary mb-2 block text-left text-xs font-bold"
              >
                کد تخفیف
              </FieldLabel>
              <div className="border-input flex h-11 items-center gap-2 rounded-full border p-1 ps-1">
                <Input
                  id="discount-code"
                  value={discountCode}
                  onChange={(event) => setDiscountCode(event.target.value)}
                  placeholder="کد را وارد کنید"
                  className="h-full flex-1 border-0 bg-transparent px-3 text-sm shadow-none focus-visible:border-0"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full bg-[#F1F5F9] px-4 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#64748B]"
                >
                  ثبت
                </Button>
              </div>
            </div>
          ) : null}

          <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#1E293B]">
            <TriangleAlert className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p>
              هزینه این سفارش هنوز پرداخت نشده و در صورت اتمام موجودی، کالاها از سبد حذف می‌شوند.
            </p>
          </div>
        </CardContent>

        <CardFooter className="border-0 bg-transparent p-5 pt-4">
          <Button
            type="button"
            onClick={() => void onPrimary()}
            size="md"
            disabled={
              isSubmitting ||
              !canProceed ||
              (isCartStep && checkoutDetails.basketItems.length === 0)
            }
            aria-busy={isSubmitting}
            className={cn(
              "w-full rounded-full font-bold",
              step === "review" && "bg-[#00C853] hover:bg-[#00B84A]",
            )}
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
