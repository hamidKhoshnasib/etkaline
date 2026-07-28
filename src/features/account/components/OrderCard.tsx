import Link from "next/link";
import { Check, ChevronLeft } from "lucide-react";

import { AppImage } from "@/components/ui/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  formatMockPrice,
  ORDER_STATUS_LABELS,
  type MockOrder,
} from "@/features/account/model/mock-orders";

const STATUS_STYLES = {
  open: "bg-amber-100 text-amber-700",
  paid: "bg-sky-50 text-sky-600",
  processing: "bg-amber-100 text-amber-700",
  delivered: "bg-emerald-50 text-emerald-600",
  returned: "bg-orange-50 text-orange-600",
  canceled: "bg-rose-50 text-rose-600",
} as const;

const MOBILE_DELIVERY_STEPS = [
  "درحال آماده سازی",
  "در حال ارسال",
  "ارسال شد",
  "تحویل داده شد",
] as const;

function OrderMeta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="text-secondary truncate font-medium">{value}</span>
    </div>
  );
}

function ProductPreview({ order }: { order: MockOrder }) {
  const product = order.products[0];

  if (!product) {
    return null;
  }

  return (
    <div className="relative size-16 shrink-0">
      <span className="border-border absolute inset-y-1 start-2 end-0 rounded-xl border bg-white" />
      <span className="border-border absolute inset-y-0 start-1 end-1 rounded-xl border bg-white" />
      <div className="relative flex size-16 items-center justify-center overflow-hidden rounded-xl border bg-white">
        <AppImage
          src={product.image}
          alt={product.title}
          fill
          sizes="64px"
          className="object-contain p-1"
        />
      </div>
    </div>
  );
}

function MobileOrderProgress({ delivered }: { delivered: boolean }) {
  return (
    <ol className="relative grid grid-cols-4 pt-4">
      <span
        aria-hidden="true"
        className="bg-border absolute top-[27px] right-[12.5%] left-[12.5%] h-0.5"
      />
      {MOBILE_DELIVERY_STEPS.map((step, index) => {
        const isDone = delivered || index === 0;
        const isActive = !delivered && index === 1;

        return (
          <li key={step} className="relative flex min-w-0 flex-col items-center gap-2 text-center">
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
  );
}

function MobileOrderCard({ order, history }: { order: MockOrder; history: boolean }) {
  const isDelivered = history || order.status === "delivered";

  return (
    <Link
      href={`/account/orders/${order.id}`}
      aria-label={`مشاهده جزئیات سفارش ${order.orderNumber}`}
      className="focus-visible:ring-ring block rounded-[26px] focus-visible:ring-3 focus-visible:outline-none lg:hidden"
    >
      <Card className="gap-0 rounded-[26px] py-0 shadow-none">
        <CardContent className={cn("px-4 pb-0", history ? "pt-2" : "pt-3")}>
          <div className="grid grid-cols-[64px_minmax(0,1fr)_auto] gap-2">
            <ProductPreview order={order} />
            <div className="flex min-w-0 flex-col gap-1 pt-1">
              <div className="text-secondary flex items-center gap-2 text-xs font-bold">
                <span>شماره سفارش</span>
                <bdi dir="ltr">{order.orderNumber}</bdi>
              </div>
              <p className="text-muted-foreground truncate text-xs">
                بازار، خ پانزده خرداد، خ پامنار...
              </p>
              <span className="text-secondary text-xs font-bold">۱۲ کالا</span>
            </div>
            <div className="flex min-w-16 flex-col items-end justify-between py-1">
              {history ? (
                <>
                  <ChevronLeft className="text-primary-hover" aria-hidden="true" />
                  <Badge className="border-0 bg-emerald-50 text-[10px] whitespace-nowrap text-emerald-600">
                    تحویل داده شده
                  </Badge>
                </>
              ) : (
                <Badge className={cn("border-0 text-[10px]", STATUS_STYLES[order.status])}>
                  {ORDER_STATUS_LABELS[order.status]}
                </Badge>
              )}
            </div>
          </div>

          <div
            className={cn(
              "border-border flex items-center justify-between border-t text-xs",
              history ? "mt-1 min-h-10" : "mt-2 min-h-11",
            )}
          >
            <span className="text-muted-foreground flex items-center gap-3">
              <bdi dir="ltr">{order.date}</bdi>
              <span className="bg-border h-5 w-px" aria-hidden="true" />
              <bdi dir="ltr">{order.time}</bdi>
            </span>
            <span className="text-secondary font-bold">{formatMockPrice(order.total)}</span>
          </div>

          {!history && (
            <>
              <div className="border-border border-t">
                <MobileOrderProgress delivered={isDelivered} />
              </div>
              <span
                className={cn(
                  "mt-4 mb-4 flex min-h-10 items-center justify-center rounded-full border font-bold",
                  isDelivered
                    ? "border-primary text-secondary bg-white"
                    : "border-primary bg-primary text-secondary",
                )}
              >
                {isDelivered ? "جزئیات سفارش" : "پیگیری سفارش"}
              </span>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export function OrderCard({ order, history = false }: { order: MockOrder; history?: boolean }) {
  return (
    <>
      <MobileOrderCard order={order} history={history} />
      <Link
        href={`/account/orders/${order.id}`}
        aria-label={`مشاهده جزئیات سفارش ${order.orderNumber}`}
        className="focus-visible:ring-ring hidden rounded-xl focus-visible:ring-3 focus-visible:outline-none lg:block"
      >
        <Card className="hover:border-primary/60 rounded-xl border py-0 shadow-none transition-colors">
          <CardHeader className="grid grid-cols-2 gap-x-4 gap-y-3 border-b px-4 py-3 sm:grid-cols-4 lg:grid-cols-[1fr_.85fr_1fr_1fr_auto]">
            <OrderMeta label="شماره سفارش" value={<bdi dir="ltr">{order.orderNumber}</bdi>} />
            <OrderMeta label="مبلغ" value={formatMockPrice(order.total)} />
            <OrderMeta
              label="زمان سفارش"
              value={
                <span className="flex flex-wrap gap-x-4">
                  <bdi dir="ltr">{order.time}</bdi>
                  <bdi dir="ltr">{order.date}</bdi>
                </span>
              }
            />
            <OrderMeta
              label="وضعیت"
              value={
                <Badge className={cn("border-0", STATUS_STYLES[order.status])}>
                  {ORDER_STATUS_LABELS[order.status]}
                </Badge>
              }
            />
            <div className="text-secondary col-span-2 flex items-center justify-end gap-2 text-sm sm:col-span-4 lg:col-span-1 lg:justify-start">
              <span>جزئیات سفارش</span>
              <ChevronLeft className="text-primary-hover" aria-hidden="true" />
            </div>
          </CardHeader>
          <CardContent className="flex min-h-20 items-center justify-start gap-2 px-4 py-4">
            {order.products.map((product, index) => (
              <div
                key={product.id}
                className="relative flex size-14 items-center justify-center overflow-hidden rounded-xl border bg-white"
              >
                <AppImage
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
                <span className="bg-background/90 absolute end-1 bottom-0 rounded-full px-1 text-[10px]">
                  {index + 1}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
