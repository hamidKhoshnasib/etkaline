"use client";

import { useEffect, useMemo } from "react";
import {
  CalendarClock,
  ChevronLeft,
  Clock3,
  Map,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";

import { AddressPicker } from "@/components/layout/header/AddressPicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppImage } from "@/components/ui/image";
import { Separator } from "@/components/ui/separator";
import type { CheckoutDetails } from "@/features/cart/api/get-checkout-details";
import type { OpenBasketItem } from "@/features/cart/api/get-open-basket";
import type { Address } from "@/features/address/api/use-addresses";
import type {
  DeliverySelection,
  DeliverySelections,
  ParcelKind,
} from "@/features/cart/model/checkout";
import { cn } from "@/lib/utils";
import Price from "./Price";

interface AddressStepProps {
  address: Address | null;
  checkoutDetails: CheckoutDetails;
  selections: DeliverySelections;
  onSelectionsChange: (selections: DeliverySelections) => void;
  onReadyChange: (ready: boolean) => void;
}

interface DeliveryDateOption {
  id: string;
  label: string;
  weekday: string;
  price: number;
  disabled: boolean;
}

interface ParcelGroup {
  id: ParcelKind;
  title: string;
  items: OpenBasketItem[];
}

const persianDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  day: "numeric",
  month: "long",
});
const persianWeekday = new Intl.DateTimeFormat("fa-IR", { weekday: "long" });

function parseDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function createDateOptions(details: CheckoutDetails): DeliveryDateOption[] {
  const start = parseDate(details.deliveryStartDate);
  const end = parseDate(details.deliveryEndDate);

  if (!start) {
    return [];
  }

  const last = end && end >= start ? end : start;
  const options: DeliveryDateOption[] = [];
  const cursor = new Date(start);

  while (cursor <= last && options.length < 7) {
    options.push({
      id: cursor.toISOString(),
      label: persianDate.format(cursor),
      weekday: persianWeekday.format(cursor),
      price: details.deliveryAmount,
      disabled: false,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return options;
}

function createTimeOptions(deliveryTime: string) {
  return deliveryTime
    .split(/[,،|]/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function SelectedAddress({ address }: { address: Address }) {
  return (
    <div className="border-primary-hover flex flex-col gap-3 rounded-xl border p-4">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span className="flex items-center gap-2">
          <MapPin className="text-muted-foreground size-4" aria-hidden="true" />
          {address.address}
        </span>
        {address.postalCode ? (
          <span className="text-muted-foreground flex items-center gap-2">
            <Map className="size-4" aria-hidden="true" />
            <bdi dir="ltr">{address.postalCode}</bdi>
          </span>
        ) : null}
      </div>
      <span className="text-secondary text-sm font-bold">گیرنده</span>
      <div className="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span className="flex items-center gap-2">
          <User className="size-4" aria-hidden="true" />
          {address.recipient || "گیرنده ثبت نشده"}
        </span>
        {address.phone ? (
          <span className="flex items-center gap-2">
            <Phone className="size-4" aria-hidden="true" />
            <bdi dir="ltr">{address.phone}</bdi>
          </span>
        ) : null}
      </div>
    </div>
  );
}

function AddressSection({ address }: { address: Address | null }) {
  return (
    <Card className="gap-3 rounded-2xl py-5 shadow-none">
      <CardHeader className="flex-row items-center justify-between px-5">
        <CardTitle className="text-primary-hover flex items-center gap-2 font-bold">
          <MapPin aria-hidden="true" />
          انتخاب آدرس
        </CardTitle>
        <AddressPicker
          trigger={
            <Button type="button" variant="ghost" size="sm">
              {address ? "تغییر آدرس" : "انتخاب آدرس"}
              <ChevronLeft data-icon="inline-end" />
            </Button>
          }
        />
      </CardHeader>
      {address ? (
        <CardContent className="px-5">
          <SelectedAddress address={address} />
        </CardContent>
      ) : null}
    </Card>
  );
}

function ProductThumbnails({ items }: { items: OpenBasketItem[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.slice(0, 5).map((item) => (
        <div
          key={item.storeProductId}
          className="bg-muted relative size-16 overflow-hidden rounded-xl border"
        >
          <AppImage
            src={item.picUrl || item.pic || "/images/image-placeholder.svg"}
            alt={item.productTitle}
            width={64}
            height={64}
            className="size-full object-contain p-1"
          />
          <Badge className="absolute start-0 bottom-0 rounded-se-md rounded-es-none px-1.5 py-0 text-[10px]">
            {item.productCount.toLocaleString("fa-IR")}
          </Badge>
        </div>
      ))}
    </div>
  );
}

function DeliveryGroup({
  group,
  dates,
  times,
  selection,
  addressSelected,
  onChange,
}: {
  group: ParcelGroup;
  dates: DeliveryDateOption[];
  times: string[];
  selection?: DeliverySelection;
  addressSelected: boolean;
  onChange: (selection: DeliverySelection) => void;
}) {
  const selectedDate = dates.find((date) => date.id === selection?.dateIso);

  function changeDate(date: DeliveryDateOption) {
    if (!addressSelected || date.disabled) {
      return;
    }
    onChange({
      dateIso: date.id,
      dateLabel: `${date.weekday} ${date.label}`,
      time: "",
      pickup: false,
    });
  }

  return (
    <section aria-labelledby={`parcel-${group.id}`} className="flex flex-col gap-5">
      <div className="bg-muted rounded-lg px-4 py-3">
        <h3 id={`parcel-${group.id}`} className="text-sm font-medium">
          {group.title}
        </h3>
      </div>
      <ProductThumbnails items={group.items} />

      <div className="flex flex-col gap-4">
        <div className="text-checkout-accent flex items-center gap-2 self-start text-base font-bold">
          <CalendarClock className="size-6" aria-hidden="true" />
          انتخاب زمان
        </div>
        {dates.length > 0 ? (
          <div
            className="flex gap-3 overflow-x-auto pb-2"
            role="radiogroup"
            aria-label={`تاریخ ارسال ${group.title}`}
          >
            {dates.map((date) => {
              const active = selection?.dateIso === date.id;
              return (
                <Button
                  key={date.id}
                  type="button"
                  variant={active ? "default" : "outline"}
                  disabled={!addressSelected || date.disabled}
                  role="radio"
                  aria-checked={active}
                  onClick={() => changeDate(date)}
                  className={cn(
                    "h-auto min-w-24 flex-col gap-1 rounded-xl px-3 py-3",
                    active && "ring-checkout-accent ring-2",
                  )}
                >
                  <span className="font-bold">{date.weekday}</span>
                  <span className="text-muted-foreground text-xs">{date.label}</span>
                  <Price
                    value={date.price}
                    className="text-secondary text-xs"
                    iconClassName="size-3"
                  />
                </Button>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            بازهٔ قابل انتخابی از سرویس ارسال دریافت نشد.
          </p>
        )}
      </div>

      {selectedDate ? (
        <div className="flex flex-col gap-4 border-e pe-4">
          <p className="text-sm">
            زمان ارسال در تاریخ{" "}
            <strong className="text-checkout-accent">
              {selectedDate.weekday} {selectedDate.label}
            </strong>{" "}
            را انتخاب نمایید:
          </p>
          {times.length > 0 ? (
            <div
              className="flex flex-wrap gap-3"
              role="radiogroup"
              aria-label={`ساعت ارسال ${group.title}`}
            >
              {times.map((time) => {
                const active = selection?.time === time;
                return (
                  <Button
                    key={time}
                    type="button"
                    variant={active ? "default" : "outline"}
                    size="sm"
                    role="radio"
                    aria-checked={active}
                    onClick={() =>
                      onChange({
                        dateIso: selectedDate.id,
                        dateLabel: `${selectedDate.weekday} ${selectedDate.label}`,
                        time,
                        pickup: false,
                      })
                    }
                    className="rounded-full px-5"
                  >
                    <Clock3 data-icon="inline-start" />
                    <bdi dir="ltr">{time}</bdi>
                  </Button>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              ساعت قابل انتخابی از سرویس ارسال دریافت نشد.
            </p>
          )}
        </div>
      ) : null}

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={selection?.pickup ?? false}
          disabled={!addressSelected}
          onChange={(event) =>
            onChange({
              dateIso: "",
              dateLabel: "دریافت حضوری",
              time: "",
              pickup: event.target.checked,
            })
          }
          className="accent-secondary size-4"
        />
        مایل هستم حضوری دریافت کنم.
      </label>
    </section>
  );
}

export default function AddressStep({
  address,
  checkoutDetails,
  selections,
  onSelectionsChange,
  onReadyChange,
}: AddressStepProps) {
  const groups = useMemo<ParcelGroup[]>(() => {
    const heavy = checkoutDetails.basketItems.filter((item) => item.isHeavyWeight);
    const light = checkoutDetails.basketItems.filter((item) => !item.isHeavyWeight);
    return [
      ...(heavy.length ? [{ id: "heavy" as const, title: "کالاهای سنگین", items: heavy }] : []),
      ...(light.length ? [{ id: "light" as const, title: "کالاهای سبک", items: light }] : []),
    ];
  }, [checkoutDetails.basketItems]);
  const dates = useMemo(() => createDateOptions(checkoutDetails), [checkoutDetails]);
  const times = useMemo(
    () => createTimeOptions(checkoutDetails.deliveryTime),
    [checkoutDetails.deliveryTime],
  );
  const ready =
    address !== null &&
    groups.length > 0 &&
    groups.every((group) => {
      const selection = selections[group.id];
      return selection?.pickup === true || Boolean(selection?.dateIso && selection.time);
    });

  useEffect(() => onReadyChange(ready), [onReadyChange, ready]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-2xl py-7 shadow-none">
        <CardHeader className="px-5 text-center">
          <CardTitle className="text-secondary text-xl font-bold">آدرس و زمان ارسال</CardTitle>
        </CardHeader>
      </Card>

      <AddressSection address={address} />

      <Card className="rounded-2xl py-5 shadow-none">
        <CardHeader className="flex-row items-center justify-between px-5">
          <CardTitle className="text-secondary flex items-center gap-2 font-bold">
            <Package aria-hidden="true" />
            مرسوله
          </CardTitle>
          <Badge variant="secondary">{checkoutDetails.count.toLocaleString("fa-IR")} کالا</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 px-5">
          {groups.map((group, index) => (
            <div key={group.id} className="flex flex-col gap-6">
              {index > 0 ? <Separator /> : null}
              <DeliveryGroup
                group={group}
                dates={dates}
                times={times}
                selection={selections[group.id]}
                addressSelected={address !== null}
                onChange={(selection) =>
                  onSelectionsChange({ ...selections, [group.id]: selection })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
