"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Box, ChevronDown, CreditCard, Info, MapPin } from "lucide-react";

import ForkliftIcon from "@/assets/icons/forklift.svg";
import TruckLoadingIcon from "@/assets/icons/truck-loading.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppImage } from "@/components/ui/image";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { CheckoutDetails } from "@/features/cart/api/get-checkout-details";
import type { OpenBasketItem } from "@/features/cart/api/get-open-basket";
import type { PayBasketInput } from "@/features/cart/api/payment";
import { usePayTypes, usePaygates } from "@/features/cart/api/payment";
import type { Address } from "@/features/address/api/use-addresses";
import type { DeliverySelections, ParcelKind } from "@/features/cart/model/checkout";
import { cn } from "@/lib/utils";

interface ReviewStepProps {
  address: Address;
  checkoutDetails: CheckoutDetails;
  items: OpenBasketItem[];
  selections: DeliverySelections;
  onEdit: () => void;
  onPaymentReadyChange: (ready: boolean) => void;
  onPaymentSelectionChange: (selection: PayBasketInput | null) => void;
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
  const isApplianceDelivery =
    Number.isSafeInteger(selection.year) && Number.isSafeInteger(selection.month);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-secondary flex items-center gap-3 text-sm font-bold">
        {kind === "heavy" ? (
          <ForkliftIcon className="size-6" aria-hidden="true" />
        ) : (
          <TruckLoadingIcon className="size-6" aria-hidden="true" />
        )}
        {label}
      </div>
      <div className="text-muted-foreground flex flex-wrap items-center gap-2 ps-7 text-sm">
        <span>{selection.dateLabel}</span>
        {!selection.pickup && !isApplianceDelivery && selection.time ? (
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

function ShipmentProductGroup({ title, items }: { title: string; items: OpenBasketItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-3">
      <h4 className="text-secondary text-sm font-bold">
        {items.reduce((sum, item) => sum + item.productCount, 0).toLocaleString("fa-IR")} {title}
      </h4>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.storeProductId} className="flex items-center gap-3">
            <AppImage
              src={item.picUrl || item.pic || "/images/image-placeholder.svg"}
              alt={item.productTitle}
              width={48}
              height={48}
              className="size-12 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-secondary truncate text-sm font-medium">{item.productTitle}</p>
              <p className="text-muted-foreground text-xs">
                تعداد: {item.productCount.toLocaleString("fa-IR")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
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
  onPaymentSelectionChange,
}: ReviewStepProps) {
  const [payTypeId, setPayTypeId] = useState<number | null>(null);
  const [paygateId, setPaygateId] = useState<number | null>(null);
  const [isShipmentOpen, setIsShipmentOpen] = useState(false);
  const payTypesQuery = usePayTypes(checkoutDetails.id);
  const availablePayTypes = payTypesQuery.data ?? [];
  const selectedPayTypeId =
    payTypeId !== null && availablePayTypes.some((payType) => payType.id === payTypeId)
      ? payTypeId
      : availablePayTypes.length === 1
        ? availablePayTypes[0].id
        : null;
  const paygatesQuery = usePaygates(selectedPayTypeId === 1);
  const heavyItems = items.filter((item) => item.isHeavyWeight);
  const lightItems = items.filter((item) => !item.isHeavyWeight);
  const heavyCount = heavyItems.reduce((sum, item) => sum + item.productCount, 0);
  const lightCount = lightItems.reduce((sum, item) => sum + item.productCount, 0);
  const availablePaygates = paygatesQuery.data ?? [];
  const selectedPaygateId =
    paygateId !== null && availablePaygates.some((paygate) => paygate.id === paygateId)
      ? paygateId
      : availablePaygates.length === 1
        ? availablePaygates[0].id
        : null;

  const paymentSelection = useMemo<PayBasketInput | null>(
    () =>
      selectedPayTypeId !== null && (selectedPayTypeId !== 1 || selectedPaygateId !== null)
        ? {
            basketId: checkoutDetails.id,
            payType: selectedPayTypeId,
            paygateId: selectedPayTypeId === 1 ? (selectedPaygateId ?? 0) : 0,
            installmentCount: 0,
          }
        : null,
    [checkoutDetails.id, selectedPayTypeId, selectedPaygateId],
  );

  useEffect(() => {
    onPaymentReadyChange(paymentSelection !== null);
    onPaymentSelectionChange(paymentSelection);
  }, [onPaymentReadyChange, onPaymentSelectionChange, paymentSelection]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="relative rounded-2xl py-7 shadow-none">
        <CardHeader className="relative px-5 text-center">
          <CardTitle className="text-secondary text-xl font-bold">بررسی نهایی</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="absolute start-5 top-1/2"
            style={{ transform: "translateY(-50%)", transition: "none" }}
          >
            <ArrowRight data-icon="inline-start" />
            تغییر آدرس و زمان ارسال
          </Button>
        </CardHeader>
      </Card>

      {heavyCount > 0 ? (
        <div className="text-muted-foreground flex items-start gap-2 px-2 text-sm">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>
            این سفارش ممکن است در چند نوبت ارسال شود، چون شامل کالای سنگین یا روش ارسال متفاوت است.
          </p>
        </div>
      ) : null}

      <Card className="rounded-2xl py-5 shadow-none">
        <CardContent className="flex flex-col gap-5 px-5">
          <ShipmentTime kind="heavy" label="زمان ارسال کالای سنگین" selections={selections} />
          {selections.heavy && selections.light ? <Separator /> : null}
          <ShipmentTime kind="light" label="زمان ارسال کالای سبک" selections={selections} />
        </CardContent>
      </Card>

      <Card className="gap-3 rounded-2xl py-5 shadow-none">
        <CardHeader className="px-5">
          <div className="flex items-start gap-3">
            <MapPin className="text-primary-hover size-6" aria-hidden="true" />
            <div className="flex flex-col gap-3">
              <CardTitle className="text-secondary text-sm font-bold">آدرس انتخاب‌شده</CardTitle>
              <CardDescription>{address.address}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="rounded-2xl py-5 shadow-none">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setIsShipmentOpen((open) => !open)}
          aria-expanded={isShipmentOpen}
          aria-controls="shipment-products"
          className="h-auto w-full justify-between rounded-2xl px-5 py-0 text-start hover:bg-transparent aria-expanded:bg-transparent"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-secondary flex items-center gap-2 font-bold">
              <Box className="text-primary-hover size-6" aria-hidden="true" />
              مرسوله
            </span>
            {lightCount > 0 ? (
              <span className="text-secondary">{lightCount.toLocaleString("fa-IR")} کالای سبک</span>
            ) : null}
            {lightCount > 0 && heavyCount > 0 ? (
              <Separator orientation="vertical" className="h-5" />
            ) : null}
            {heavyCount > 0 ? (
              <span className="text-secondary">
                {heavyCount.toLocaleString("fa-IR")} کالای سنگین
              </span>
            ) : null}
          </div>
          <ChevronDown
            className={cn(
              "text-muted-foreground transition-transform",
              isShipmentOpen && "rotate-180",
            )}
            aria-hidden="true"
          />
        </Button>
        {isShipmentOpen ? (
          <CardContent id="shipment-products" className="flex flex-col gap-5 px-5 pt-5">
            <ShipmentProductGroup title="کالای سبک" items={lightItems} />
            {lightItems.length > 0 && heavyItems.length > 0 ? <Separator /> : null}
            <ShipmentProductGroup title="کالای سنگین" items={heavyItems} />
          </CardContent>
        ) : null}
      </Card>

      <Card className="rounded-2xl py-5 shadow-none">
        <CardHeader className="px-5">
          <CardTitle className="flex items-center gap-2 font-medium">
            <CreditCard className="text-secondary" aria-hidden="true" />
            روش پرداخت
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-5" role="radiogroup" aria-label="روش پرداخت">
          {payTypesQuery.isPending ? (
            <>
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </>
          ) : null}
          {payTypesQuery.isError ? (
            <p role="alert" className="text-destructive text-sm">
              {payTypesQuery.error.message}
            </p>
          ) : null}
          {payTypesQuery.data?.length === 0 ? (
            <p className="text-muted-foreground text-sm">روش پرداختی در دسترس نیست.</p>
          ) : null}
          {payTypesQuery.data?.map((payType) => (
            <div key={payType.id} className="flex flex-col gap-3">
              <PaymentOption
                selected={selectedPayTypeId === payType.id}
                title={payType.title}
                description={
                  payType.id === 1
                    ? "پس از انتخاب درگاه، به درگاه امن بانکی هدایت می‌شوید."
                    : "روش پرداخت مورد نظر خود را انتخاب کنید."
                }
                icon={CreditCard}
                onClick={() => setPayTypeId(payType.id)}
              />
              {payType.id === 1 && selectedPayTypeId === 1 ? (
                <div className="ms-4 flex flex-col gap-3 border-s ps-4">
                  {paygatesQuery.isPending ? <Skeleton className="h-16 w-full rounded-xl" /> : null}
                  {paygatesQuery.isError ? (
                    <p role="alert" className="text-destructive text-sm">
                      {paygatesQuery.error.message}
                    </p>
                  ) : null}
                  {paygatesQuery.data?.length === 0 ? (
                    <p className="text-muted-foreground text-sm">درگاه پرداختی در دسترس نیست.</p>
                  ) : null}
                  {paygatesQuery.data?.map((paygate) => {
                    const selected = selectedPaygateId === paygate.id;
                    return (
                      <Button
                        key={paygate.id}
                        type="button"
                        variant="outline"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setPaygateId(paygate.id)}
                        className={cn(
                          "h-auto justify-between rounded-xl px-4 py-3 text-start",
                          selected && "border-primary ring-primary ring-2",
                        )}
                      >
                        <span className="flex items-center gap-3 font-bold">
                          {paygate.picUrl || paygate.pic ? (
                            <AppImage
                              src={paygate.picUrl || paygate.pic}
                              alt={paygate.title}
                              width={36}
                              height={36}
                              className="size-9 rounded object-contain"
                            />
                          ) : null}
                          {paygate.title}
                        </span>
                        {paygate.isInstallment ? <Badge variant="secondary">اقساطی</Badge> : null}
                      </Button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
