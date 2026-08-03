import Link from "next/link";
import {
  Check,
  ChevronRight,
  Copy,
  CreditCard,
  EllipsisVertical,
  Landmark,
  MapPin,
  Printer,
  Smartphone,
  Truck,
  UserRound,
} from "lucide-react";

import { AppImage } from "@/components/ui/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatMockPrice, type MockOrder } from "@/features/account/model/mock-orders";

function DetailValue({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-muted/70 flex min-h-16 flex-col justify-center gap-1 rounded-lg px-4">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-secondary font-medium">{value}</span>
    </div>
  );
}

const DELIVERY_STEPS = ["درحال آماده‌سازی", "در حال ارسال", "ارسال شد", "تحویل داده شد"];

function MobileInfoRow({
  icon: Icon,
  children,
}: {
  icon: typeof UserRound;
  children: React.ReactNode;
}) {
  return (
    <div className="text-muted-foreground flex min-h-11 items-center gap-3 text-sm">
      <Icon className="text-secondary/40 size-4.5 shrink-0" aria-hidden="true" />
      <span className="min-w-0 flex-1">{children}</span>
    </div>
  );
}

function MobileFinancialRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-[42px] items-center justify-between gap-4 text-sm">
      <span className="text-secondary">{label}:</span>
      <span className="text-secondary font-medium">{children}</span>
    </div>
  );
}

function MobileOrderDetail({ order }: { order: MockOrder }) {
  return (
    <div className="bg-muted/60 min-h-screen pb-6 lg:hidden">
      <MobilePageHeader
        fallbackHref="/account/orders"
        title="جزئیات سفارش"
        endContent={
          <Button aria-label="گزینه‌های بیشتر" size="icon-sm" type="button" variant="ghost">
            <EllipsisVertical data-icon="inline-start" aria-hidden="true" />
          </Button>
        }
      />

      <div className="relative px-4 pt-3">
        <Button
          variant="outline"
          className="absolute end-7 top-[-14px] z-10 h-14 rounded-lg bg-white px-4 text-blue-600 shadow-sm"
        >
          <Printer data-icon="inline-start" />
          پرینت فاکتور
        </Button>

        <Card className="gap-0 rounded-[22px] py-0 shadow-none">
          <CardHeader className="px-4 pt-4 pb-1">
            <CardTitle className="text-secondary">مشخصات گیرنده</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-[29px]">
            <section aria-label="مشخصات گیرنده">
              <MobileInfoRow icon={UserRound}>{order.recipient.name}</MobileInfoRow>
              <MobileInfoRow icon={Smartphone}>
                <bdi dir="ltr">{order.recipient.phone}</bdi>
              </MobileInfoRow>
              <MobileInfoRow icon={MapPin}>{order.recipient.address}</MobileInfoRow>
              <MobileInfoRow icon={Copy}>
                <bdi dir="ltr">{order.recipient.postalCode}</bdi>
              </MobileInfoRow>
            </section>
          </CardContent>

          <CardHeader className="bg-muted/35 px-4 pt-4 pb-1">
            <CardTitle className="text-secondary">مالی</CardTitle>
          </CardHeader>
          <CardContent className="bg-muted/35 rounded-b-[22px] px-4 pb-3">
            <section aria-label="اطلاعات مالی">
              <MobileFinancialRow label="نوع ارسال">سریع</MobileFinancialRow>
              <MobileFinancialRow label="مبلغ کل">
                {formatMockPrice(order.total)}
              </MobileFinancialRow>
              <MobileFinancialRow label="مجموع هزینه ارسال">
                {formatMockPrice(order.shippingCost)}
              </MobileFinancialRow>
              <MobileFinancialRow label="مبلغ پس از تخفیف">
                {formatMockPrice(order.total)}
              </MobileFinancialRow>
              <MobileFinancialRow label="درگاه پرداخت">
                <span className="flex items-center gap-2">
                  <Landmark className="text-rose-700" aria-hidden="true" />
                  بانک ملت
                </span>
              </MobileFinancialRow>
            </section>
          </CardContent>
        </Card>

        <Card className="mt-3 gap-0 rounded-[22px] py-0 shadow-none">
          <CardHeader className="gap-3 px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-secondary">مرسوله</CardTitle>
              <span className="text-muted-foreground text-sm">{order.products.length} کالا</span>
            </div>
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>زمان سفارش:</span>
              <span className="flex items-center gap-3">
                <bdi dir="ltr">{order.time}</bdi>
                <bdi dir="ltr">{order.date}</bdi>
              </span>
            </div>
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>کد رهگیری:</span>
              <span className="flex items-center gap-2">
                <Copy className="size-4" aria-hidden="true" />
                <bdi dir="ltr">{order.trackingCode}</bdi>
              </span>
            </div>
          </CardHeader>

          <CardContent className="px-4 pb-4">
            <Separator />
            <div className="flex min-h-[102px] items-center overflow-x-auto">
              <ol className="relative grid min-w-85 flex-1 grid-cols-4">
                <span
                  aria-hidden="true"
                  className="bg-border absolute top-3 right-[12.5%] left-[12.5%] h-0.5"
                />
                {DELIVERY_STEPS.map((step, index) => {
                  const isDone = index === 0;
                  const isActive = index === 1;

                  return (
                    <li key={step} className="relative flex min-w-0 flex-col items-center gap-2">
                      <span
                        className={cn(
                          "bg-background z-10 flex size-6 items-center justify-center rounded-full border-2",
                          isDone && "border-primary bg-primary text-secondary",
                          isActive && "border-primary-hover",
                          !isDone && !isActive && "border-border",
                        )}
                      >
                        {isDone && <Check className="size-4" aria-hidden="true" />}
                        {isActive && <span className="bg-primary-hover size-2 rounded-full" />}
                      </span>
                      <span
                        className={cn(
                          "truncate text-[10px]",
                          isActive ? "text-primary-hover font-bold" : "text-muted-foreground",
                        )}
                      >
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <Separator />

            <div className="flex flex-col">
              {order.products.map((product, index) => (
                <div key={product.id}>
                  <div className="flex min-h-27 items-center gap-3 py-3">
                    <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white">
                      <AppImage
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                      <span className="bg-background/90 absolute end-1 bottom-0 rounded-full px-1 text-[10px]">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <p className="text-secondary line-clamp-2 text-sm font-medium">
                        {product.title}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-secondary text-sm font-bold">
                          {formatMockPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <Badge className="border-0 bg-[#43A047] text-[10px] text-white">
                            ۳۰٪
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < order.products.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DesktopOrderDetail({ order }: { order: MockOrder }) {
  return (
    <div className="hidden min-w-0 flex-col gap-4 lg:flex">
      <Card className="min-h-22 justify-center rounded-2xl py-0 shadow-none">
        <CardContent className="grid grid-cols-[1fr_auto_1fr] items-center px-5">
          <Link
            href="/account/orders"
            className="text-muted-foreground hover:text-secondary flex items-center gap-2 justify-self-start"
          >
            <ChevronRight aria-hidden="true" />
            سفارش‌های من
          </Link>
          <h1 className="text-secondary font-bold">جزئیات سفارش</h1>
        </CardContent>
      </Card>

      <Card className="rounded-2xl py-0 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between border-b px-5 py-5">
          <CardTitle className="text-secondary">جزئیات سفارش</CardTitle>
          <Button variant="link" className="text-blue-600" size="sm">
            <Printer data-icon="inline-start" />
            دریافت فاکتور
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 px-5 py-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <DetailValue label="شماره سفارش" value={<bdi dir="ltr">{order.orderNumber}</bdi>} />
            <DetailValue label="مبلغ" value={formatMockPrice(order.total)} />
            <DetailValue
              label="زمان سفارش"
              value={
                <span className="flex flex-wrap gap-3">
                  <bdi dir="ltr">{order.time}</bdi>
                  <bdi dir="ltr">{order.date}</bdi>
                </span>
              }
            />
            <DetailValue label="تخفیف" value={formatMockPrice(order.discount)} />
          </div>

          <section aria-labelledby="recipient-title" className="flex flex-col gap-3">
            <h2 id="recipient-title" className="text-secondary font-bold">
              گیرنده
            </h2>
            <div className="text-muted-foreground grid gap-3 text-sm sm:grid-cols-2">
              <p className="flex items-center gap-2">
                <UserRound aria-hidden="true" />
                {order.recipient.name}
              </p>
              <p className="flex items-center gap-2">
                <Smartphone aria-hidden="true" />
                <bdi dir="ltr">{order.recipient.phone}</bdi>
              </p>
              <p className="flex items-center gap-2 sm:col-span-2">
                <MapPin aria-hidden="true" />
                {order.recipient.address}
                <span className="ms-3 flex items-center gap-2">
                  <Copy aria-hidden="true" />
                  <bdi dir="ltr">{order.recipient.postalCode}</bdi>
                </span>
              </p>
            </div>
          </section>

          <Separator />

          <section aria-labelledby="shipping-title" className="flex flex-col gap-3">
            <h2 id="shipping-title" className="text-secondary font-bold">
              هزینه ارسال
            </h2>
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
              <Truck aria-hidden="true" />
              <span>مجموع هزینه ارسال: {formatMockPrice(order.shippingCost)}</span>
              <Separator orientation="vertical" className="h-5" />
              <span>
                نوع ارسال: <strong className="text-secondary">سریع</strong>
              </span>
            </div>
          </section>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between gap-4 rounded-b-2xl bg-transparent px-5 py-4">
          <div className="text-muted-foreground flex flex-wrap items-center gap-4">
            <CreditCard aria-hidden="true" />
            <span>مبلغ کل: {formatMockPrice(order.total)}</span>
            <Separator orientation="vertical" className="h-5" />
            <span>مبلغ پس از تخفیف: {formatMockPrice(order.total - order.discount)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">درگاه پرداخت</span>
            <strong className="text-secondary">بانک ملت</strong>
          </div>
        </CardFooter>
      </Card>

      <Card className="rounded-2xl py-0 shadow-none">
        <CardHeader className="grid gap-3 border-b px-5 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <div className="flex items-center gap-4">
            <CardTitle className="text-secondary">مرسوله</CardTitle>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-muted-foreground text-sm">{order.products.length} کالا</span>
          </div>
          <div className="text-muted-foreground flex justify-center text-sm">
            <span className="flex items-center gap-2">
              کد رهگیری: <bdi dir="ltr">{order.trackingCode}</bdi>
              <Copy aria-hidden="true" />
            </span>
          </div>
          <span className="text-muted-foreground text-sm">
            زمان سفارش: <bdi dir="ltr">{order.date}</bdi> - <bdi dir="ltr">{order.time}</bdi>
          </span>
        </CardHeader>
        <CardContent className="px-5 py-4">
          <div className="overflow-x-auto pb-3">
            <ol className="relative grid min-w-140 grid-cols-4 pt-1">
              <span
                aria-hidden="true"
                className="bg-border absolute top-4 right-[12.5%] left-[12.5%] h-1"
              />
              {DELIVERY_STEPS.map((step, index) => {
                const isDone = index === 0;
                const isActive = index === 1;

                return (
                  <li key={step} className="relative flex flex-col items-center gap-2 text-center">
                    <span
                      className={cn(
                        "bg-background z-10 flex size-7 items-center justify-center rounded-full border-3",
                        isDone && "border-primary bg-primary",
                        isActive && "border-primary-hover",
                        !isDone && !isActive && "border-border",
                      )}
                    >
                      {isDone && <Check aria-hidden="true" />}
                      {isActive && <span className="bg-primary-hover size-2 rounded-full" />}
                    </span>
                    <span
                      className={cn(
                        "text-xs",
                        isActive ? "text-primary-hover font-bold" : "text-muted-foreground",
                      )}
                    >
                      {step}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-2 flex flex-col">
            {order.products.map((product, index) => (
              <div key={product.id}>
                <div className="flex items-center gap-4 py-3">
                  <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white">
                    <AppImage
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-secondary truncate font-medium">{product.title}</p>
                    <p className="text-secondary font-bold whitespace-nowrap">
                      {formatMockPrice(product.price)}
                    </p>
                  </div>
                </div>
                {index < order.products.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function OrderDetailView({ order }: { order: MockOrder }) {
  return (
    <>
      <MobileOrderDetail order={order} />
      <DesktopOrderDetail order={order} />
    </>
  );
}
