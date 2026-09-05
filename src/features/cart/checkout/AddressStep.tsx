"use client";

import { useEffect, useMemo } from "react";
import {
  CalendarClock,
  ArrowRight,
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  type ApplianceDeliveryDate,
  useApplianceDeliveryTimes,
} from "@/features/cart/api/appliance-delivery-times";
import {
  type SupermarketDeliveryDate,
  useSupermarketDeliveryTimes,
} from "@/features/cart/api/supermarket-delivery-times";
import type { CheckoutDetails } from "@/features/cart/api/get-checkout-details";
import type { OpenBasketItem } from "@/features/cart/api/get-open-basket";
import type { Address } from "@/features/address/api/use-addresses";
import type {
  DeliverySelection,
  DeliverySelections,
  ParcelKind,
} from "@/features/cart/model/checkout";
import { cn } from "@/lib/utils";
import { SITE_TYPES } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";
import Price from "./Price";

interface AddressStepProps {
  address: Address | null;
  checkoutDetails: CheckoutDetails;
  selections: DeliverySelections;
  onSelectionsChange: (selections: DeliverySelections) => void;
  onReadyChange: (ready: boolean) => void;
  onBack: () => void;
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
      <div className="border-border flex flex-col gap-3 border-s ps-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="text-muted-foreground flex items-start gap-2">
            <MapPin className="text-muted-foreground mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {address.address}
          </span>
          {address.postalCode ? (
            <span className="text-muted-foreground flex items-center gap-2">
              <Map className="size-4" aria-hidden="true" />
              <bdi dir="ltr">{address.postalCode}</bdi>
            </span>
          ) : null}
        </div>
        <div className="flex flex-col gap-3">
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
      </div>
    </div>
  );
}

function AddressSection({ address }: { address: Address | null }) {
  return (
    <Card className="gap-3 rounded-2xl py-5 shadow-none">
      <CardHeader className="flex w-full flex-row items-center justify-between px-5">
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

function ProductThumbnails({
  items,
  prominent = false,
}: {
  items: OpenBasketItem[];
  prominent?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", prominent && "gap-3")}>
      {items.slice(0, 5).map((item) => (
        <div
          key={item.storeProductId}
          className={cn(
            "bg-muted relative size-16 overflow-hidden rounded-xl border",
            prominent && "border-input bg-background size-20 p-1",
          )}
        >
          <AppImage
            src={item.picUrl || item.pic || "/images/image-placeholder.svg"}
            alt={item.productTitle}
            width={prominent ? 80 : 64}
            height={prominent ? 80 : 64}
            className={cn("size-full object-cover", prominent && "object-contain")}
          />
          <Badge
            variant="secondary"
            className="bg-muted text-secondary absolute end-0.5 bottom-0.5 grid size-5 place-items-center rounded-[8px] p-0 text-[10px] shadow-none"
          >
            {item.productCount.toLocaleString("fa-IR")}
          </Badge>
        </div>
      ))}
    </div>
  );
}

function getSupermarketDateParts(date: SupermarketDeliveryDate) {
  const parsedDate = parseDate(date.deliveryDate);
  if (parsedDate) {
    return {
      weekday: persianWeekday.format(parsedDate),
      label: persianDate.format(parsedDate),
    };
  }

  const [weekday = "تاریخ ارسال", ...dateParts] = date.deliveryDateFa.split(/\s+/);
  return { weekday, label: dateParts.join(" ") };
}
function ApplianceDeliveryChoices({
  group,
  dates,
  selection,
  addressSelected,
  isLoading,
  error,
  onChange,
}: {
  group: ParcelGroup;
  dates: ApplianceDeliveryDate[];
  selection?: DeliverySelection;
  addressSelected: boolean;
  isLoading: boolean;
  error: Error | null;
  onChange: (selection: DeliverySelection) => void;
}) {
  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-hidden" aria-busy="true">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-24 w-28 shrink-0 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="text-destructive text-sm">
        {error.message}
      </p>
    );
  }

  const datesWithTimes = dates.filter((date) => date.deliveryTimes.length > 0);

  if (datesWithTimes.length === 0) {
    return <p className="text-muted-foreground text-sm">زمان قابل انتخابی در دسترس نیست.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-checkout-accent flex items-center gap-2 self-start text-base font-bold">
        <CalendarClock className="size-6" aria-hidden="true" />
        انتخاب زمان
      </div>
      {datesWithTimes.map((date) => (
        <section key={`${date.year}-${date.month}`} className="flex flex-col gap-3">
          <h4 className="text-secondary text-sm font-bold">
            {date.title ||
              `${date.month.toLocaleString("fa-IR")} / ${date.year.toLocaleString("fa-IR")}`}
          </h4>
          <div
            className="flex gap-3 overflow-x-auto pb-2"
            role="radiogroup"
            aria-label={`بازه ارسال ${date.title || group.title}`}
          >
            {date.deliveryTimes.map((time) => {
              const active =
                selection?.year === date.year &&
                selection.month === date.month &&
                selection.deliveryTimeId === time.id;
              const dayRangeLabel =
                time.startDayOfMonth === time.endDayOfMonth
                  ? time.startDayOfMonth.toLocaleString("fa-IR")
                  : `${time.startDayOfMonth.toLocaleString("fa-IR")} تا ${time.endDayOfMonth.toLocaleString("fa-IR")}`;
              const buttonLabel = time.title || dayRangeLabel;

              return (
                <Button
                  key={time.id}
                  type="button"
                  variant="outline"
                  disabled={!addressSelected || time.isFull}
                  role="radio"
                  aria-checked={active}
                  className={cn(
                    "h-auto min-w-28 flex-col gap-1 rounded-xl border-2 px-3 py-3",
                    active && "border-checkout-accent bg-transparent hover:bg-transparent",
                  )}
                  onClick={() =>
                    onChange({
                      dateIso: `${date.year}-${date.month}-${time.id}`,
                      dateLabel: buttonLabel,
                      time: time.title,
                      pickup: false,
                      year: date.year,
                      month: date.month,
                      deliveryTimeId: time.id,
                    })
                  }
                >
                  <span className="font-bold">{buttonLabel}</span>
                  {time.isFull ? (
                    <span className="text-destructive text-xs">تکمیل ظرفیت</span>
                  ) : null}
                </Button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function SupermarketDeliveryChoices({
  group,
  dates,
  deliveryPrice,
  selection,
  addressSelected,
  isLoading,
  error,
  onChange,
}: {
  group: ParcelGroup;
  dates: SupermarketDeliveryDate[];
  deliveryPrice: number;
  selection?: DeliverySelection;
  addressSelected: boolean;
  isLoading: boolean;
  error: Error | null;
  onChange: (selection: DeliverySelection) => void;
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4" aria-busy="true">
        <div className="text-checkout-accent flex items-center gap-2 self-start text-lg font-bold">
          <CalendarClock className="size-7" aria-hidden="true" />
          انتخاب زمان
        </div>
        <div className="border-border flex gap-3 overflow-hidden border-s ps-3">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-[100px] w-24 shrink-0 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="text-destructive text-sm">
        {error.message}
      </p>
    );
  }

  if (dates.length === 0) {
    return <p className="text-muted-foreground text-sm">زمان قابل انتخابی در دسترس نیست.</p>;
  }

  const selectedDate = dates.find((date) => date.deliveryDate === selection?.dateIso);
  const selectedDateParts = selectedDate ? getSupermarketDateParts(selectedDate) : null;

  return (
    <div className="flex flex-col gap-5">
      <div className="text-checkout-accent flex items-center gap-2 self-start text-lg font-bold">
        <CalendarClock className="size-7" aria-hidden="true" />
        انتخاب زمان
      </div>
      <div className="border-border flex flex-col gap-5 border-s ps-4">
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          role="radiogroup"
          aria-label={"تاریخ ارسال " + group.title}
        >
          {dates.map((date) => {
            const active = date.deliveryDate === selection?.dateIso;
            const isFull =
              date.deliveryTimes.length === 0 || date.deliveryTimes.every((time) => time.isFull);
            const dateParts = getSupermarketDateParts(date);

            return (
              <Button
                key={date.deliveryDate}
                type="button"
                variant="outline"
                disabled={!addressSelected || isFull}
                role="radio"
                aria-checked={active}
                className={cn(
                  "text-foreground hover:bg-muted/40 focus-visible:border-checkout-accent focus-visible:ring-checkout-accent/20 disabled:bg-muted/30 disabled:text-muted-foreground h-[100px] min-w-24 flex-col justify-between gap-1 rounded-xl px-3 py-3 shadow-none disabled:opacity-60",
                  active && "border-checkout-accent bg-background hover:bg-background border-2",
                )}
                onClick={() =>
                  onChange({
                    dateIso: date.deliveryDate,
                    dateLabel: date.deliveryDateFa,
                    time: "",
                    pickup: false,
                  })
                }
              >
                <span className="font-bold">{dateParts.weekday}</span>
                <span className={cn("text-xs", !active && "text-muted-foreground")}>
                  {dateParts.label || date.deliveryDateFa || "تاریخ ارسال"}
                </span>
                {isFull ? (
                  <span className="text-destructive text-xs">تکمیل ظرفیت</span>
                ) : (
                  <Price
                    value={deliveryPrice}
                    className={cn("text-xs", active ? "text-secondary" : "text-muted-foreground")}
                    iconClassName={active ? "text-secondary" : "text-muted-foreground"}
                  />
                )}
              </Button>
            );
          })}
        </div>

        {selectedDate && selectedDateParts ? (
          <div className="flex flex-col gap-5">
            <p className="text-sm font-medium">
              زمان برای ارسال در تاریخ{" "}
              <strong className="text-checkout-accent">
                {selectedDateParts.weekday} {selectedDateParts.label}
              </strong>{" "}
              را انتخاب نمایید:
            </p>
            <div
              className="flex flex-wrap gap-3"
              role="radiogroup"
              aria-label={"ساعت ارسال " + group.title}
            >
              {selectedDate.deliveryTimes.map((time) => {
                const active = selection?.deliveryTimeId === time.id;
                const timeLabel =
                  time.title ||
                  [time.startTime, time.endTime].filter(Boolean).join(" تا ") ||
                  "بازه ارسال";

                return (
                  <Button
                    key={time.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!addressSelected || time.isFull}
                    role="radio"
                    aria-checked={active}
                    onClick={() =>
                      onChange({
                        dateIso: selectedDate.deliveryDate,
                        dateLabel: selectedDate.deliveryDateFa,
                        time: timeLabel,
                        pickup: false,
                        deliveryTimeId: time.id,
                      })
                    }
                    className={cn(
                      "text-secondary hover:bg-muted/40 focus-visible:border-checkout-accent focus-visible:ring-checkout-accent/20 disabled:bg-muted/30 disabled:text-muted-foreground h-10 min-w-16 rounded-full px-5 shadow-none",
                      active &&
                        "border-checkout-accent bg-checkout-accent hover:bg-checkout-accent text-white hover:text-white",
                    )}
                  >
                    <bdi dir="ltr">{timeLabel}</bdi>
                  </Button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
function DeliveryGroup({
  group,
  dates,
  times,
  deliveryPrice,
  selection,
  addressSelected,
  applianceDates,
  supermarketDates,
  isApplianceDeliveryLoading,
  applianceDeliveryError,
  isSupermarketDeliveryLoading,
  supermarketDeliveryError,
  onChange,
}: {
  group: ParcelGroup;
  dates: DeliveryDateOption[];
  times: string[];
  deliveryPrice: number;
  selection?: DeliverySelection;
  addressSelected: boolean;
  applianceDates?: ApplianceDeliveryDate[];
  supermarketDates?: SupermarketDeliveryDate[];
  isApplianceDeliveryLoading: boolean;
  applianceDeliveryError: Error | null;
  isSupermarketDeliveryLoading: boolean;
  supermarketDeliveryError: Error | null;
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

  if (applianceDates) {
    return (
      <section aria-labelledby={`parcel-${group.id}`} className="flex flex-col gap-5">
        <div className="rounded-lg bg-[#F8FAFC] px-4 py-3">
          <h3 id={`parcel-${group.id}`} className="text-sm font-medium">
            {group.title}
          </h3>
        </div>
        <ProductThumbnails items={group.items} />
        <ApplianceDeliveryChoices
          group={group}
          dates={applianceDates}
          selection={selection}
          addressSelected={addressSelected}
          isLoading={isApplianceDeliveryLoading}
          error={applianceDeliveryError}
          onChange={onChange}
        />
      </section>
    );
  }

  if (supermarketDates) {
    return (
      <section aria-label="مرسوله" className="flex flex-col gap-5">
        <ProductThumbnails items={group.items} prominent />
        <SupermarketDeliveryChoices
          group={group}
          dates={supermarketDates}
          deliveryPrice={deliveryPrice}
          selection={selection}
          addressSelected={addressSelected}
          isLoading={isSupermarketDeliveryLoading}
          error={supermarketDeliveryError}
          onChange={onChange}
        />
      </section>
    );
  }

  return (
    <section aria-labelledby={`parcel-${group.id}`} className="flex flex-col gap-5">
      <div className="rounded-lg bg-[#F8FAFC] px-4 py-3">
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
  onBack,
}: AddressStepProps) {
  const { siteType } = useStorefront();
  const isApplianceStorefront = siteType === SITE_TYPES.appliance;
  const isSupermarketStorefront = siteType === SITE_TYPES.supermarket;
  const applianceDeliveryTimesQuery = useApplianceDeliveryTimes(checkoutDetails.id);
  const supermarketDeliveryTimesQuery = useSupermarketDeliveryTimes(checkoutDetails.id);
  const groups = useMemo<ParcelGroup[]>(() => {
    if (isSupermarketStorefront) {
      return [
        {
          id: "light" as const,
          title: "کالاهای سبد خرید",
          items: checkoutDetails.basketItems,
        },
      ];
    }

    const heavy = checkoutDetails.basketItems.filter((item) => item.isHeavyWeight);
    const light = checkoutDetails.basketItems.filter((item) => !item.isHeavyWeight);
    return [
      ...(heavy.length ? [{ id: "heavy" as const, title: "کالاهای سنگین", items: heavy }] : []),
      ...(light.length ? [{ id: "light" as const, title: "کالاهای سبک", items: light }] : []),
    ];
  }, [checkoutDetails.basketItems, isSupermarketStorefront]);
  const dates = useMemo(() => createDateOptions(checkoutDetails), [checkoutDetails]);
  const times = useMemo(
    () => createTimeOptions(checkoutDetails.deliveryTime),
    [checkoutDetails.deliveryTime],
  );
  const ready =
    address !== null &&
    groups.length > 0 &&
    (!isApplianceStorefront || Boolean(applianceDeliveryTimesQuery.data)) &&
    (!isSupermarketStorefront || Boolean(supermarketDeliveryTimesQuery.data)) &&
    groups.every((group) => {
      const selection = selections[group.id];
      if (isApplianceStorefront) {
        return (
          Number.isSafeInteger(selection?.year) &&
          Number.isSafeInteger(selection?.month) &&
          Number.isSafeInteger(selection?.deliveryTimeId) &&
          (selection?.deliveryTimeId ?? 0) > 0
        );
      }
      if (isSupermarketStorefront) {
        return (
          Boolean(selection?.dateIso) &&
          Number.isSafeInteger(selection?.deliveryTimeId) &&
          (selection?.deliveryTimeId ?? 0) > 0
        );
      }
      return selection?.pickup === true || Boolean(selection?.dateIso && selection.time);
    });

  useEffect(() => onReadyChange(ready), [onReadyChange, ready]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-2xl py-7 shadow-none">
        <CardHeader className="relative px-5 text-center">
          <CardTitle className="text-secondary text-xl font-bold">آدرس و زمان ارسال</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="absolute start-5 top-1/2"
            style={{ transform: "translateY(-50%)", transition: "none" }}
          >
            <ArrowRight data-icon="inline-start" />
            بازگشت به سبد خرید
          </Button>
        </CardHeader>
      </Card>

      <AddressSection address={address} />

      <Card className="rounded-2xl py-5 shadow-none">
        <CardHeader className="flex w-full flex-row items-center justify-between px-5">
          <CardTitle className="text-secondary flex items-center gap-2 font-bold">
            <Package aria-hidden="true" />
            مرسوله
          </CardTitle>
          <Badge variant="secondary" className="bg-[#ECEFF1] text-[#334155]">
            {checkoutDetails.count.toLocaleString("fa-IR")} کالا
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 px-5">
          {groups.map((group, index) => (
            <div key={group.id} className="flex flex-col gap-6">
              {index > 0 ? <Separator /> : null}
              <DeliveryGroup
                group={group}
                dates={dates}
                times={times}
                deliveryPrice={checkoutDetails.deliveryAmount}
                selection={selections[group.id]}
                addressSelected={address !== null}
                applianceDates={
                  isApplianceStorefront
                    ? group.id === "heavy"
                      ? (applianceDeliveryTimesQuery.data?.heavyWeightDeliveryDates ?? [])
                      : (applianceDeliveryTimesQuery.data?.lightWeightDeliveryDates ?? [])
                    : undefined
                }
                isApplianceDeliveryLoading={
                  isApplianceStorefront && applianceDeliveryTimesQuery.isPending
                }
                applianceDeliveryError={
                  isApplianceStorefront && applianceDeliveryTimesQuery.isError
                    ? applianceDeliveryTimesQuery.error
                    : null
                }
                supermarketDates={
                  isSupermarketStorefront ? (supermarketDeliveryTimesQuery.data ?? []) : undefined
                }
                isSupermarketDeliveryLoading={
                  isSupermarketStorefront && supermarketDeliveryTimesQuery.isPending
                }
                supermarketDeliveryError={
                  isSupermarketStorefront && supermarketDeliveryTimesQuery.isError
                    ? supermarketDeliveryTimesQuery.error
                    : null
                }
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
