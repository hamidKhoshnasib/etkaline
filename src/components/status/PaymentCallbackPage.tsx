"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { PaymentFailedPage } from "@/components/status/PaymentFailedPage";
import { PaymentSuccessPage } from "@/components/status/PaymentSuccessPage";
import { ServerErrorPage } from "@/components/status/ServerErrorPage";
import { StatusPage } from "@/components/status/StatusPage";
import { axiosClient } from "@/lib/axios-client";
import { getSiteTypeHeaders } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

const PAYMENT_FACTOR_STORAGE_KEY = "etkaline:payment-factor";

interface StoredPaymentFactor {
  factorNumber: string;
  siteType: string;
}

interface PaymentListResponse {
  isSuccess?: unknown;
  value?: {
    payments?: Array<{ factorNumber?: unknown; isPaid?: unknown }>;
  };
}

function readPaymentFactor(): StoredPaymentFactor | null {
  const storedValue = window.sessionStorage.getItem(PAYMENT_FACTOR_STORAGE_KEY);
  if (!storedValue) {
    return null;
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);
    if (
      typeof parsedValue === "object" &&
      parsedValue !== null &&
      typeof (parsedValue as StoredPaymentFactor).factorNumber === "string" &&
      (parsedValue as StoredPaymentFactor).factorNumber.trim()
    ) {
      return parsedValue as StoredPaymentFactor;
    }
  } catch {
    // The server response is the source of truth; invalid local state is ignored.
  }

  return null;
}

async function getPaymentResult(factorNumber: string, siteType: "appliance" | "supermarket") {
  const { data } = await axiosClient.get<PaymentListResponse>("/api/Payments", {
    headers: getSiteTypeHeaders(siteType),
    params: { FactorNum: factorNumber, Page: 1, PageLength: 1 },
  });
  const payment =
    data.isSuccess === true
      ? data.value?.payments?.find((item) => item.factorNumber === factorNumber)
      : undefined;

  if (!payment || typeof payment.isPaid !== "boolean") {
    throw new Error("وضعیت پرداخت قابل تأیید نیست.");
  }

  return payment.isPaid;
}

export function PaymentCallbackPage() {
  const { cartHref, homeHref, siteType } = useStorefront();
  const [storedFactor, setStoredFactor] = useState<StoredPaymentFactor | null>(() =>
    typeof window === "undefined" ? null : readPaymentFactor(),
  );
  const paymentQuery = useQuery({
    queryKey: ["payment-result", siteType, storedFactor?.factorNumber],
    queryFn: () => getPaymentResult(storedFactor!.factorNumber, siteType),
    enabled: storedFactor?.siteType === siteType,
    retry: 2,
    retryDelay: 1_000,
  });

  useEffect(() => {
    if (paymentQuery.data !== undefined) {
      window.sessionStorage.removeItem(PAYMENT_FACTOR_STORAGE_KEY);
    }
  }, [paymentQuery.data]);

  if (storedFactor === null || storedFactor.siteType !== siteType) {
    return <ServerErrorPage unstable_retry={() => setStoredFactor(readPaymentFactor())} />;
  }
  if (paymentQuery.isPending) {
    return <StatusPage className="min-h-[calc(100dvh-16rem)] flex-1" variant="server-error" />;
  }
  if (paymentQuery.isError) {
    return <ServerErrorPage unstable_retry={() => void paymentQuery.refetch()} />;
  }
  if (paymentQuery.data) {
    return <PaymentSuccessPage orderHref="/account/orders" storefrontHref={homeHref} />;
  }
  return (
    <PaymentFailedPage
      cartHref={cartHref}
      onRetryPayment={() => window.location.assign(cartHref)}
    />
  );
}
