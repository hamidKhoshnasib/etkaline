import Link from "next/link";

import { StatusPage } from "@/components/status/StatusPage";
import { Button } from "@/components/ui/button";

export function PaymentSuccessPage({
  orderHref,
  storefrontHref,
}: {
  orderHref: string;
  storefrontHref: string;
}) {
  return (
    <StatusPage className="min-h-[calc(100dvh-16rem)] flex-1" variant="payment-success">
      <Button
        className="font-bold"
        render={<Link href={orderHref} />}
        nativeButton={false}
        size="md"
      >
        پیگیری سفارش
      </Button>
      <Button
        className="border-primary text-primary hover:text-primary"
        render={<Link href={storefrontHref} />}
        nativeButton={false}
        size="md"
        variant="outline-primary"
      >
        بازگشت به فروشگاه
      </Button>
    </StatusPage>
  );
}
