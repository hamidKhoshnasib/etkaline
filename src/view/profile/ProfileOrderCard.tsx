"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  Check,
  Printer,
  User,
  Phone,
  MapPin,
  Package,
  Truck,
  CreditCard,
  Wallet,
  Clock,
  CalendarDays,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Order, OrderStatus, ShipmentStep } from "./types";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  "در حال ارسال": {
    label: "در حال ارسال",
    className: "bg-amber-50 text-amber-600 border-amber-200",
  },
  "تحویل داده شده": {
    label: "تحویل داده شده",
    className: "bg-green-50 text-green-600 border-green-200",
  },
  "لغو شده": {
    label: "لغو شده",
    className: "bg-red-50 text-red-600 border-red-200",
  },
  "مرجوع شده": {
    label: "مرجوع شده",
    className: "bg-orange-50 text-orange-600 border-orange-200",
  },
};

const SHIPMENT_STEPS: ShipmentStep[] = [
  "درحال آماده سازی",
  "در حال ارسال",
  "ارسال شد",
  "تحویل داده شد",
];

function ShipmentTracker({ currentStep }: { currentStep: ShipmentStep }) {
  const currentIndex = SHIPMENT_STEPS.indexOf(currentStep);
  const progressPct = (currentIndex / (SHIPMENT_STEPS.length - 1)) * 100;

  return (
    <div className="relative flex items-start justify-between px-6 py-5">
      <div className="bg-border absolute top-[2.35rem] right-6 left-6 h-0.5" />
      <div
        className="bg-primary absolute top-[2.35rem] right-6 h-0.5 transition-all duration-500"
        style={{ width: `${progressPct}%` }}
      />
      {[...SHIPMENT_STEPS].reverse().map((step) => {
        const idx = SHIPMENT_STEPS.indexOf(step);
        const isDone = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        return (
          <div key={step} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={cn(
                "bg-background flex size-8 items-center justify-center rounded-full border-2 transition-colors",
                isDone
                  ? "border-primary bg-primary text-primary-foreground"
                  : isCurrent
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground",
              )}
            >
              {isDone ? (
                <Check className="size-4" strokeWidth={3} />
              ) : (
                <div
                  className={cn("size-3 rounded-full", isCurrent ? "bg-primary" : "bg-border")}
                />
              )}
            </div>
            <span
              className={cn(
                "text-xs",
                isCurrent
                  ? "text-primary font-semibold"
                  : isDone
                    ? "text-foreground"
                    : "text-muted-foreground",
              )}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface ProfileOrderCardProps {
  order: Order;
}

export function ProfileOrderCard({ order }: ProfileOrderCardProps) {
  const [open, setOpen] = useState(false);
  const status = statusConfig[order.status];
  const firstProduct = order.products[0];

  return (
    <Card className="overflow-hidden">
      {/* ══════════════════════════════
          MOBILE LAYOUT
      ══════════════════════════════ */}
      <div className="md:hidden">
        <CardContent className="p-4 pb-0">
          {/* ── Top: thumbnail (right/start) + order info (left/end) ── */}
          <div className="flex gap-3">
            {/* Thumbnail — first in DOM = right in RTL */}
            <div className="bg-muted/30 relative size-24 shrink-0 overflow-hidden rounded-xl border">
              {firstProduct && (
                <Image
                  src={firstProduct.image}
                  alt={firstProduct.title}
                  fill
                  className="object-contain p-1"
                />
              )}
            </div>

            {/* Info block — left/end in RTL */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              {/* Status badge + order number */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                    status.className,
                  )}
                >
                  {status.label}
                </span>
                <span className="text-sm font-bold tabular-nums">#{order.orderNumber}</span>
                <span className="text-muted-foreground text-xs">شماره شفارش</span>
              </div>
              {/* Address */}
              {order.detail && (
                <p className="text-muted-foreground line-clamp-1 text-xs">
                  {order.detail.recipient.address}
                </p>
              )}
              {/* Item count */}
              <p className="text-muted-foreground text-xs">
                {order.detail?.shipment.itemCount ?? order.products.length} کالا
              </p>
            </div>
          </div>
        </CardContent>

        {/* ── Middle: amount / date / time grid ── */}
        {(() => {
          const [datePart, timePart] = order.date.split(" – ");
          return (
            <div className="divide-border mt-4 grid grid-cols-3 divide-x border-t border-b divide-x-reverse">
              {/* Time — first in DOM = right in RTL */}
              <div className="flex flex-col items-center gap-1.5 py-3">
                <span className="text-xs font-medium tabular-nums">{timePart}</span>
                <Clock className="text-muted-foreground size-4" />
              </div>
              {/* Date — middle */}
              <div className="flex flex-col items-center gap-1.5 py-3">
                <span className="text-xs font-medium tabular-nums">{datePart}</span>
                <CalendarDays className="text-muted-foreground size-4" />
              </div>
              {/* Amount — last = left in RTL */}
              <div className="flex flex-col items-center gap-1.5 py-3">
                <span className="text-xs font-bold tabular-nums">
                  {order.amount.toLocaleString("fa-IR")}
                </span>
                <Wallet className="text-muted-foreground size-4" />
              </div>
            </div>
          );
        })()}

        {/* ── Progress tracker ── */}
        {order.detail && <ShipmentTracker currentStep={order.detail.shipment.currentStep} />}

        {/* ── CTA button ── */}
        <div className="px-4 pb-4">
          {order.status === "در حال ارسال" ? (
            <button className="bg-primary text-primary-foreground w-full rounded-xl py-3 text-sm font-semibold">
              پیگیری سفارش
            </button>
          ) : (
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-foreground w-full rounded-xl border py-3 text-sm font-medium"
            >
              جزئیات سفارش
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════
          DESKTOP LAYOUT
      ══════════════════════════════ */}
      <div className="hidden md:block">
        <CardContent className="p-0">
          {/* Top: 4-column info row */}
          <div className="divide-border grid grid-cols-5 divide-x text-sm divide-x-reverse">
            <div className="flex flex-col items-center gap-1 px-4 py-4">
              <span className="text-muted-foreground text-xs">شماره سفارش</span>
              <span className="font-medium tabular-nums">#{order.orderNumber}</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-4 py-4">
              <span className="text-muted-foreground text-xs">مبلغ</span>
              <span className="font-bold tabular-nums">{order.amount.toLocaleString("fa-IR")}</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-4 py-4">
              <span className="text-muted-foreground text-xs">زمان سفارش</span>
              <span className="text-center text-xs leading-5 tabular-nums">{order.date}</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-4 py-4">
              <span className="text-muted-foreground text-xs">وضعیت</span>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                  status.className,
                )}
              >
                {status.label}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 py-4">
              <button
                onClick={() => setOpen((v) => !v)}
                className="text-primary flex items-center gap-1 text-sm hover:underline"
              >
                <ChevronLeft
                  className={cn("size-4 transition-transform duration-300", open && "-rotate-90")}
                />
                <span>جزئیات سفارش</span>
              </button>
            </div>
          </div>

          {/* Bottom: thumbnails + toggle */}
          <div className="flex items-center justify-between border-t px-4 py-3">
            <div className="flex items-center gap-1.5">
              {order.products.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="bg-muted/30 relative size-14 overflow-hidden rounded-lg border"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </div>

      {/* ══════════════════════════════
          COLLAPSIBLE DETAIL (shared)
      ══════════════════════════════ */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          {order.detail && (
            <div className="flex flex-col gap-4 border-t px-4 pt-4 pb-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => window.print()}
                  className="text-primary flex items-center gap-1.5 text-sm hover:underline"
                >
                  <Printer className="size-4" />
                  <span>پرینت فاکتور</span>
                </button>
                <p className="font-semibold">جزئیات سفارش</p>
              </div>

              <div className="divide-border grid grid-cols-2 gap-3 divide-x rounded-xl border text-center text-sm divide-x-reverse md:grid-cols-4">
                {[
                  { label: "شماره سفارش", value: `#${order.detail.orderNumber}` },
                  { label: "مبلغ", value: order.detail.amount.toLocaleString("fa-IR") },
                  { label: "زمان سفارش", value: order.detail.date },
                  { label: "تخفیف", value: order.detail.discount.toLocaleString("fa-IR") },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1 px-3 py-3">
                    <span className="text-muted-foreground text-xs">{label}</span>
                    <span className="font-medium tabular-nums">{value}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <p className="mb-3 font-semibold">گیرنده</p>
                  <div className="text-muted-foreground flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="text-muted-foreground/60 size-4 shrink-0" />
                      <span className="text-foreground">{order.detail.recipient.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="text-muted-foreground/60 size-4 shrink-0" />
                      <span className="tabular-nums">{order.detail.recipient.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="text-muted-foreground/60 size-4 shrink-0 translate-y-0.5" />
                      <span>{order.detail.recipient.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="text-muted-foreground/60 size-4 shrink-0" />
                      <span className="tabular-nums">{order.detail.recipient.postalCode}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border p-4">
                  <p className="mb-3 font-semibold">هزینه ارسال</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Truck className="text-muted-foreground/60 size-4" />
                        <span className="tabular-nums">
                          {order.detail.shipping.cost.toLocaleString("fa-IR")}
                        </span>
                      </div>
                      <span className="text-muted-foreground">مجموع هزینه ارسال:</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{order.detail.shipping.type}</span>
                      <span className="text-muted-foreground">نوع ارسال:</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">{order.detail.payment.bank}</span>
                  <span className="text-muted-foreground">بانک</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-1.5">
                  <CreditCard className="size-4" />
                  <span>درگاه پرداخت</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium tabular-nums">
                    {order.detail.payment.afterDiscount.toLocaleString("fa-IR")}
                  </span>
                  <span className="text-muted-foreground">مبلغ پس از تخفیف:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium tabular-nums">
                    {order.detail.payment.total.toLocaleString("fa-IR")}
                  </span>
                  <span className="text-muted-foreground">مبلغ کل:</span>
                </div>
              </div>

              <div className="rounded-xl border">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 text-sm">
                  <div className="text-muted-foreground flex items-center gap-4">
                    <span>زمان سفارش: {order.detail.shipment.date}</span>
                    <div className="flex items-center gap-1">
                      <span>کد رهگیری:</span>
                      <span className="text-foreground tabular-nums">
                        {order.detail.shipment.trackingCode}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="text-muted-foreground">
                      {order.detail.shipment.itemCount} کالا
                    </span>
                    <span>مرسوله</span>
                  </div>
                </div>

                <ShipmentTracker currentStep={order.detail.shipment.currentStep} />

                <div className="divide-y border-t">
                  {order.detail.shipment.products.map((product) => (
                    <div key={product.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="bg-muted/30 relative size-14 shrink-0 overflow-hidden rounded-lg border">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm font-medium">{product.title}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-bold tabular-nums">
                            {product.price.toLocaleString("fa-IR")}
                          </span>
                          {product.discount && (
                            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                              تخفیف: {product.discount.toLocaleString("fa-IR")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
