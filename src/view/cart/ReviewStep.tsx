"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, Info, MapPin, Truck, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import Price from "@/view/cart/Price";
import { PAYMENT_GATEWAYS, SHIPPING_ADDRESS } from "@/view/cart/cart.data";

interface ReviewStepProps {
  onEdit: () => void;
}

type PaymentMethod = "gateway" | "wallet";

const WALLET_BALANCE = 5000000;

function ShipmentTime({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[#64748B]">
        <span className="body-small">ساعت ۱۲:۰۰</span>
        <span className="text-gray-300">|</span>
        <span className="body-small">چهارشنبه ۳۰ فروردین</span>
      </div>
      <div className="flex items-center gap-2 text-[#F57F17]">
        <span className="title-small-bold">{label}</span>
        <Truck className="size-5" />
      </div>
    </div>
  );
}

export default function ReviewStep({ onEdit }: ReviewStepProps) {
  const [method, setMethod] = useState<PaymentMethod>("gateway");
  const walletInsufficient = WALLET_BALANCE < 183000000;

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="relative rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <button
          onClick={onEdit}
          className="hover:text-secondary absolute top-5 left-5 flex items-center gap-1 text-[#64748B]"
        >
          <span className="body-small">تغییر آدرس و زمان ارسال</span>
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="title-medium-bold text-secondary text-center">بررسی نهایی</h1>
      </section>

      {/* Info note */}
      <div className="flex items-center justify-end gap-2 rounded-xl bg-gray-50 px-4 py-3 text-[#64748B]">
        <p className="body-small text-right">
          این سفارش در چند نوبت (مرسوله) ارسال می‌شود چون شامل کالای سنگین یا روش ارسال متفاوت است
        </p>
        <Info className="size-5 shrink-0" />
      </div>

      {/* Shipment times */}
      <section className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <ShipmentTime label="زمان ارسال کالای سنگین" />
        <ShipmentTime label="زمان ارسال کالای سبک" />
      </section>

      {/* Selected address */}
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <div className="mb-2 flex items-center justify-end gap-2 text-[#F57F17]">
          <h3 className="title-small-bold">آدرس انتخاب شده</h3>
          <MapPin className="size-5" />
        </div>
        <p className="body-medium text-secondary text-right">{SHIPPING_ADDRESS.address}</p>
      </section>

      {/* Parcel summary */}
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#64748B]">
            <span className="body-small">۱ کالای سنگین</span>
            <span className="text-gray-300">|</span>
            <span className="body-small">۲ کالای سبک</span>
          </div>
          <div className="text-secondary flex items-center gap-2">
            <h3 className="title-small-bold">مرسوله</h3>
            <CreditCard className="size-5" />
          </div>
        </div>
      </section>

      {/* Payment: gateway */}
      <button
        onClick={() => setMethod("gateway")}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border-2 bg-white p-5 transition-colors",
          method === "gateway" ? "border-[#0EA5E9] bg-[#0EA5E9]/5" : "border-[#E2E8F0]",
        )}
      >
        <div className="flex gap-2">
          {PAYMENT_GATEWAYS.map((name) => (
            <span
              key={name}
              className="bg-secondary flex size-10 items-center justify-center rounded-lg text-xs text-white"
            >
              {name.slice(0, 2)}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="body-medium text-secondary">پرداخت از تمامی درگاه‌های عضو شتاب</span>
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-full border-2",
              method === "gateway" ? "border-[#0EA5E9]" : "border-gray-300",
            )}
          >
            {method === "gateway" && <span className="size-2.5 rounded-full bg-[#0EA5E9]" />}
          </span>
        </div>
      </button>

      {/* Payment: wallet */}
      <button
        onClick={() => !walletInsufficient && setMethod("wallet")}
        disabled={walletInsufficient}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border-2 bg-white p-5 transition-colors disabled:cursor-not-allowed",
          method === "wallet" ? "border-[#0EA5E9] bg-[#0EA5E9]/5" : "border-[#E2E8F0]",
        )}
      >
        {walletInsufficient ? (
          <span className="label-medium rounded-md bg-[#FEE2E2] px-2 py-1 text-[#EF4444]">
            موجودی کیف پول کافی نیست!
          </span>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-3">
          <Price value={WALLET_BALANCE} className="body-medium text-secondary" />
          <span className="body-medium text-[#64748B]">موجودی</span>
          <div className="text-secondary flex items-center gap-2">
            <span className="title-small-bold">کیف پول</span>
            <Wallet className="size-5" />
          </div>
        </div>
      </button>
    </div>
  );
}
