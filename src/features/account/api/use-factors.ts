import { useApiQuery } from "@/hooks/use-api-query";
import type {
  MockOrder,
  MockOrderProduct,
  MockOrderStatus,
} from "@/features/account/model/mock-orders";

interface FactorsResponse {
  value?: unknown;
  isSuccess?: unknown;
}

interface FactorsData {
  orders: MockOrder[];
  totalCount: number;
}

const FACTOR_STATUS_MAP: Record<number, MockOrderStatus> = {
  0: "open",
  1: "paid",
  2: "delivered",
  3: "canceled",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getDisplayText(value: unknown): string | null {
  return (
    getText(value) ?? (typeof value === "number" && Number.isFinite(value) ? String(value) : null)
  );
}

function getNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function getInteger(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) ? value : null;
}

function getDateParts(createDate: unknown, createDateFa: unknown) {
  const localizedDate = getText(createDateFa);
  if (localizedDate) {
    const [date = localizedDate, time = ""] = localizedDate.split(/[،\s]+/);
    return { date, time };
  }

  const parsedDate = typeof createDate === "string" ? new Date(createDate) : null;
  if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
    return { date: "—", time: "" };
  }

  return {
    date: new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(parsedDate),
    time: new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(parsedDate),
  };
}

function parseProducts(value: unknown): MockOrderProduct[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const id = getInteger(item.id) ?? getInteger(item.productId);
    const title = getText(item.productTitle);
    if (id === null || !title) {
      return [];
    }

    const mainPrice = getNumber(item.mainPrice);
    const offPrice = getNumber(item.offPrice);
    const currentPrice = getNumber(item.currentPrice);
    const price = currentPrice > 0 ? currentPrice : offPrice > 0 ? offPrice : mainPrice;
    const image = getText(item.picUrl) ?? getText(item.pic) ?? "/images/image-placeholder.svg";

    return [
      {
        id: String(id),
        title,
        image,
        price,
        originalPrice: mainPrice > price ? mainPrice : undefined,
      },
    ];
  });
}

export function parseFactor(value: unknown): MockOrder | null {
  if (!isRecord(value)) {
    return null;
  }

  const factorNumber = getText(value.factorNumber);
  const id = getInteger(value.id);
  const statusCode = getInteger(value.status);
  const status = statusCode === null ? undefined : FACTOR_STATUS_MAP[statusCode];
  if (!factorNumber || !status) {
    return null;
  }

  const amounts = isRecord(value.amounts) ? value.amounts : {};
  const total = getNumber(value.basketPrice) || getNumber(amounts.totalOffPrice);
  const deliveryAmount = getNumber(amounts.deliveryAmount);
  const serviceAmount = getNumber(amounts.serviceAmount);
  const address = isRecord(value.address) ? value.address : {};
  const recipientName = [getText(address.receiverFirstName), getText(address.receiverLastName)]
    .filter((name): name is string => Boolean(name))
    .join(" ");
  const { date, time } = getDateParts(value.createDate, value.createDateFa);

  return {
    id: String(id ?? factorNumber),
    orderNumber: factorNumber,
    date,
    time,
    status,
    total,
    discount: getNumber(amounts.discountAmount) + getNumber(amounts.offDiscountAmount),
    shippingCost: deliveryAmount + serviceAmount,
    trackingCode:
      getDisplayText(
        value.deliveryInfo && isRecord(value.deliveryInfo) ? value.deliveryInfo.snappOrderId : null,
      ) ?? "",
    recipient: {
      name: recipientName || getText(value.customerName) || "—",
      phone: getText(address.receiverPhone) || getText(value.customerMobile) || "—",
      address: getText(address.fullAddress) || "—",
      postalCode: getText(address.postalCode) || "—",
    },
    products: parseProducts(value.products ?? value.basketItems),
  };
}

function parseFactors(response: FactorsResponse): FactorsData {
  if (response.isSuccess !== true || !isRecord(response.value)) {
    return { orders: [], totalCount: 0 };
  }

  const factors = Array.isArray(response.value.factors) ? response.value.factors : [];
  return {
    orders: factors.map(parseFactor).filter((factor): factor is MockOrder => factor !== null),
    totalCount: getNumber(response.value.totalCount),
  };
}

export function useFactors({
  factorNumber,
  status = factorNumber ? undefined : 3,
}: { factorNumber?: string; status?: number } = {}) {
  const params = {
    Page: 1,
    PageLength: 300,
    ...(status === undefined ? {} : { Status: status }),
    ...(factorNumber ? { FactorNum: factorNumber } : {}),
  };

  return useApiQuery<FactorsResponse, FactorsData>({
    url: "/api/Factors",
    queryKey: ["factors", { factorNumber, page: 1, pageLength: 300, status }],
    axiosConfig: {
      params,
    },
    select: parseFactors,
    staleTime: 60_000,
    retry: false,
  });
}
