"use client";

import { useEffect } from "react";
import {
  ArrowLeft,
  Banknote,
  Box,
  CreditCard,
  Info,
  MapPin,
  Package,
  Truck,
  WalletCards,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CheckoutDetails } from "@/features/cart/api/get-checkout-details";
import type { OpenBasketItem } from "@/features/cart/api/get-open-basket";
import type { Address } from "@/features/address/api/use-addresses";
import type { DeliverySelections, ParcelKind } from "@/features/cart/model/checkout";
import { cn } from "@/lib/utils";
import Price from "./Price";
import { usePaymentSelection, WALLET_BALANCE } from "./use-payment-selection";

interface ReviewStepProps {
  address: Address;
  checkoutDetails: CheckoutDetails;
  items: OpenBasketItem[];
  selections: DeliverySelections;
  onEdit: () => void;
  onPaymentReadyChange: (ready: boolean) => void;
}

function ShipmentTime({
  kind,
  label,
  selections,
}: {
  kind: ParcelKind;
  label: string;
  selections: DeliverySelections;
}) {
  const selection = selections[kind];
  if (!selection) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-secondary flex items-center gap-2 font-bold">
        {kind === "heavy" ? (
          <Truck className="text-primary-hover size-5" />
        ) : (
          <Package className="text-primary-hover size-5" />
        )}
        {label}
      </div>
      <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
        <span>{selection.dateLabel}</span>
        {!selection.pickup ? (
          <>
            <Separator orientation="vertical" className="h-5" />
            <span>
              ساعت <bdi dir="ltr">{selection.time}</bdi>
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}

function PaymentOption({
  selected,
  disabled,
  title,
  description,
  icon: Icon,
  children,
  onClick,
}: {
  selected: boolean;
  disabled?: boolean;
  title: string;
  description: string;
  icon: typeof CreditCard;
  children?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-auto w-full flex-wrap justify-between gap-4 rounded-xl px-5 py-5 text-start",
        selected && "border-primary ring-primary ring-2",
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "border-input flex size-5 shrink-0 items-center justify-center rounded-full border-2",
            selected && "border-primary",
          )}
          aria-hidden="true"
        >
          {selected ? <span className="bg-primary size-2.5 rounded-full" /> : null}
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className="flex items-center gap-2 font-bold">
            <Icon data-icon="inline-start" />
            {title}
          </span>
          <span className="text-muted-foreground text-xs font-normal whitespace-normal">
            {description}
          </span>
        </span>
      </span>
      {children}
    </Button>
  );
}

export default function ReviewStep({
  address,
  checkoutDetails,
  items,
  selections,
  onEdit,
  onPaymentReadyChange,
}: ReviewStepProps) {
  const { method, walletInsufficient, selectMethod } = usePaymentSelection(
    checkoutDetails.payableAmount,
  );
  const heavyCount = items
    .filter((item) => item.isHeavyWeight)
    .reduce((sum, item) => sum + item.productCount, 0);
  const lightCount = items
    .filter((item) => !item.isHeavyWeight)
    .reduce((sum, item) => sum + item.productCount, 0);

  useEffect(() => onPaymentReadyChange(method !== null), [method, onPaymentReadyChange]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="relative rounded-2xl py-7 shadow-none">
        <CardHeader className="px-5 text-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="absolute start-4 top-5"
          >
            تغییر آدرس و زمان ارسال
            <ArrowLeft data-icon="inline-end" />
          </Button>
          <CardTitle className="text-secondary text-xl font-bold">بررسی نهایی</CardTitle>
        </CardHeader>
      </Card>

      <div className="text-muted-foreground flex items-start gap-2 px-2 text-sm">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <p>
          این سفارش ممکن است در چند نوبت ارسال شود، چون شامل کالای سنگین یا روش ارسال متفاوت است.
        </p>
      </div>

      <Card className="rounded-2xl py-5 shadow-none">
        <CardContent className="flex flex-col gap-5 px-5">
          <ShipmentTime kind="heavy" label="زمان ارسال کالای سنگین" selections={selections} />
          {selections.heavy && selections.light ? <Separator /> : null}
          <ShipmentTime kind="light" label="زمان ارسال کالای سبک" selections={selections} />
        </CardContent>
      </Card>

      <Card className="rounded-2xl py-5 shadow-none">
        <CardHeader className="px-5">
          <CardTitle className="text-secondary flex items-center gap-2 font-bold">
            <MapPin className="text-primary-hover" aria-hidden="true" />
            آدرس انتخاب‌شده
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground px-5 text-sm">{address.address}</CardContent>
      </Card>

      <Card className="rounded-2xl py-5 shadow-none">
        <CardContent className="flex flex-wrap items-center justify-between gap-4 px-5">
          <div className="text-secondary flex items-center gap-2 font-bold">
            <Box className="text-primary-hover" aria-hidden="true" />
            مرسوله
          </div>
          <div className="flex items-center gap-2">
            {lightCount > 0 ? (
              <Badge variant="outline">{lightCount.toLocaleString("fa-IR")} کالای سبک</Badge>
            ) : null}
            {heavyCount > 0 ? (
              <Badge variant="outline">{heavyCount.toLocaleString("fa-IR")} کالای سنگین</Badge>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6" role="radiogroup" aria-label="روش پرداخت">
        <Card className="rounded-2xl py-5 shadow-none">
          <CardHeader className="px-5">
            <CardTitle className="flex items-center gap-2 font-medium">
              <CreditCard className="text-secondary" aria-hidden="true" />
              درگاه اینترنتی
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5">
            <PaymentOption
              selected={method === "gateway"}
              title="پرداخت از تمامی درگاه‌های عضو شتاب"
              description="پس از ثبت سفارش به درگاه امن بانکی هدایت می‌شوید."
              icon={Banknote}
              onClick={() => selectMethod("gateway")}
            >
              <div className="flex gap-2" aria-label="درگاه‌های بانکی">
                {["ملت", "ملی", "سامان", "پاسارگاد"].map((gateway) => (
                  <Badge key={gateway} variant="secondary" className="hidden sm:inline-flex">
                    {gateway}
                  </Badge>
                ))}
              </div>
            </PaymentOption>
          </CardContent>
        </Card>

        <Card className="rounded-2xl py-5 shadow-none">
          <CardHeader className="px-5">
            <CardTitle className="flex items-center gap-2 font-medium">
              <WalletCards className="text-primary-hover" aria-hidden="true" />
              کیف پول
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5">
            <PaymentOption
              selected={method === "wallet"}
              disabled={walletInsufficient}
              title="پرداخت با موجودی کیف پول"
              description={
                walletInsufficient
                  ? "موجودی کیف پول برای این سفارش کافی نیست."
                  : "کل مبلغ از کیف پول کسر می‌شود."
              }
              icon={WalletCards}
              onClick={() => selectMethod("wallet")}
            >
              <span className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">موجودی</span>
                <Price value={WALLET_BALANCE} className="text-secondary text-sm" />
              </span>
            </PaymentOption>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
