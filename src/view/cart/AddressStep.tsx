"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarClock, Map, MapPin, Package, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Price from "@/view/cart/Price";
import { PARCEL_GROUPS, SHIPPING_ADDRESS, type ParcelGroup } from "@/view/cart/cart.data";

interface AddressStepProps {
  onReadyChange: (ready: boolean) => void;
}

interface GroupSelection {
  date?: string;
  time?: string;
  pickup?: boolean;
}

// ─── Address card ─────────────────────────────────────────────────────────────

function AddressCard() {
  return (
    <section className="rounded-2xl border-2 border-[#F57F17] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <button className="body-small text-[#64748B] hover:text-[#F57F17]">تغییر آدرس</button>
        <div className="flex items-center gap-2 text-[#F57F17]">
          <h3 className="title-small-bold">انتخاب آدرس</h3>
          <MapPin className="size-5" />
        </div>
      </div>

      <div className="space-y-3 text-[#1E293B]">
        <div className="flex items-center justify-end gap-2">
          <span className="body-small text-[#64748B]">{SHIPPING_ADDRESS.postalCode}</span>
          <Map className="size-4 text-[#64748B]" />
          <span className="body-medium">{SHIPPING_ADDRESS.address}</span>
          <MapPin className="size-4 text-[#64748B]" />
        </div>

        <p className="title-small-bold text-secondary text-right">گیرنده</p>
        <div className="flex items-center justify-end gap-2">
          <span className="body-small text-[#64748B]">{SHIPPING_ADDRESS.phone}</span>
          <Phone className="size-4 text-[#64748B]" />
          <span className="body-medium">{SHIPPING_ADDRESS.recipient}</span>
          <User className="size-4 text-[#64748B]" />
        </div>
      </div>
    </section>
  );
}

// ─── Delivery group ───────────────────────────────────────────────────────────

function DeliveryGroup({
  group,
  selection,
  onChange,
}: {
  group: ParcelGroup;
  selection: GroupSelection;
  onChange: (next: GroupSelection) => void;
}) {
  return (
    <div className="space-y-5 border-t border-[#EEF1F4] pt-5 first:border-t-0 first:pt-0">
      {/* Group title + thumbnails */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {group.items.map((it) => (
            <div
              key={it.id}
              className="relative size-16 overflow-hidden rounded-xl border border-[#E2E8F0] bg-gray-50"
            >
              <Image
                src={it.image}
                alt=""
                width={64}
                height={64}
                className="size-full object-contain p-1"
              />
              <span className="bg-secondary/80 absolute bottom-0 left-0 rounded-tr-lg px-1.5 text-[11px] text-white">
                {it.index}
              </span>
            </div>
          ))}
        </div>
        <h4 className="title-small-bold text-[#0EA5E9]">{group.title}</h4>
      </div>

      {/* Date selector */}
      <div>
        <div className="mb-3 flex items-center justify-end gap-2 text-[#0EA5E9]">
          <span className="title-small-bold">انتخاب زمان</span>
          <CalendarClock className="size-5" />
        </div>
        <div className="flex flex-wrap gap-3">
          {group.dates.map((d) => {
            const active = selection.date === d.id;
            return (
              <button
                key={d.id}
                onClick={() => onChange({ ...selection, date: d.id })}
                className={cn(
                  "flex w-28 flex-col items-center gap-1 rounded-xl border bg-white px-3 py-3 transition-colors",
                  active
                    ? "border-2 border-[#0EA5E9]"
                    : "border-[#E2E8F0] hover:border-[#0EA5E9]/50",
                )}
              >
                <span className="body-small-bold text-secondary">{d.weekday}</span>
                <span className="label-small text-[#64748B]">{d.date}</span>
                <Price
                  value={d.price}
                  className="label-small text-secondary"
                  iconClassName="size-3"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots — shown once a date is picked */}
      {selection.date && (
        <div>
          <p className="body-small text-secondary mb-3 text-right">
            زمان را برای ارسال در تاریخ <span className="text-[#0EA5E9]">دوشنبه ۳۰ فروردین</span>{" "}
            انتخاب نمایید:
          </p>
          <div className="flex flex-wrap gap-3">
            {group.times.map((t) => {
              const active = selection.time === t;
              return (
                <button
                  key={t}
                  onClick={() => onChange({ ...selection, time: t })}
                  className={cn(
                    "rounded-full border px-5 py-2.5 transition-colors",
                    active
                      ? "border-[#0EA5E9] bg-[#0EA5E9] text-white"
                      : "text-secondary border-[#E2E8F0] hover:border-[#0EA5E9]/50",
                  )}
                >
                  <span className="label-medium-bold">{t}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Pickup option */}
      <label className="flex items-center justify-end gap-2 text-right">
        <span className="body-small text-secondary">مایل هستم حضوری دریافت کنم.</span>
        <input
          type="checkbox"
          checked={selection.pickup ?? false}
          onChange={(e) => onChange({ ...selection, pickup: e.target.checked })}
          className="accent-secondary size-4"
        />
      </label>
    </div>
  );
}

// ─── Step ─────────────────────────────────────────────────────────────────────

export default function AddressStep({ onReadyChange }: AddressStepProps) {
  const [selections, setSelections] = useState<Record<string, GroupSelection>>({});

  const totalItems = PARCEL_GROUPS.reduce((sum, g) => sum + g.items.length, 0);

  const ready = PARCEL_GROUPS.every((g) => {
    const s = selections[g.id];
    return s?.pickup || (s?.date && s?.time);
  });

  useEffect(() => {
    onReadyChange(ready);
  }, [ready, onReadyChange]);

  const update = (groupId: string, next: GroupSelection) =>
    setSelections((prev) => ({ ...prev, [groupId]: next }));

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <h1 className="title-medium-bold text-secondary text-center">آدرس و زمان ارسال</h1>
      </section>

      <AddressCard />

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="body-small rounded-full bg-gray-100 px-3 py-1 text-[#64748B]">
            {totalItems.toLocaleString("fa-IR")} کالا
          </span>
          <div className="text-secondary flex items-center gap-2">
            <h3 className="title-small-bold">مرسوله</h3>
            <Package className="size-5" />
          </div>
        </div>

        <div className="space-y-6">
          {PARCEL_GROUPS.map((group) => (
            <DeliveryGroup
              key={group.id}
              group={group}
              selection={selections[group.id] ?? {}}
              onChange={(next) => update(group.id, next)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
