"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useDeleteBasketItem } from "@/features/cart/api/delete-basket-item";
import { useCheckoutDetails } from "@/features/cart/api/get-checkout-details";
import { useOpenBasket } from "@/features/cart/api/get-open-basket";
import { type SavedBasket, useSaveBasket } from "@/features/cart/api/save-basket";
import { useUpdateBasketQuantity } from "@/features/cart/api/update-basket-quantity";
import {
  type ApplianceDeliveryTimeSelection,
  useSetApplianceDeliveryTime,
} from "@/features/cart/api/appliance-delivery-times";
import { useSetSupermarketDeliveryTime } from "@/features/cart/api/supermarket-delivery-times";
import { type PayBasketInput, usePayBasket } from "@/features/cart/api/payment";
import { useAddresses } from "@/features/address/api/use-addresses";
import AddressStep from "@/features/cart/checkout/AddressStep";
import OrderSummary from "@/features/cart/checkout/OrderSummary";
import ReviewStep from "@/features/cart/checkout/ReviewStep";
import { CartSkeleton } from "@/features/cart/components/CartSkeleton";
import CartStep from "@/features/cart/components/CartStep";
import type { CartItem } from "@/features/cart/fixtures/cart";
import type { OpenBasketItem } from "@/features/cart/api/get-open-basket";
import type { DeliverySelections } from "@/features/cart/model/checkout";
import { useStorefront } from "@/providers/storefront-provider";
import { SITE_TYPES } from "@/lib/api-site-type";

export type CheckoutStep = "cart" | "address" | "review";

function toCheckoutItem(item: OpenBasketItem): CartItem {
  return {
    id: item.id,
    title: item.productTitle,
    image: item.picUrl || item.pic || "/images/image-placeholder.svg",
    color: item.valueTitle || item.propertyTitle,
    warranty: item.hasInventory ? "موجود در انبار" : "ناموجود",
    price: item.offPrice > 0 ? item.offPrice : item.mainPrice,
    originalPrice: item.offPrice > 0 ? item.mainPrice : undefined,
    discount: item.offPercent > 0 ? item.offPercent : undefined,
    quantity: item.productCount,
  };
}

function toApplianceDeliveryTimeSelection(
  selection: DeliverySelections["heavy"],
): ApplianceDeliveryTimeSelection | undefined {
  const year = selection?.year;
  const month = selection?.month;
  const deliveryTimeId = selection?.deliveryTimeId;
  if (
    typeof year !== "number" ||
    typeof month !== "number" ||
    typeof deliveryTimeId !== "number" ||
    !Number.isSafeInteger(year) ||
    !Number.isSafeInteger(month) ||
    !Number.isSafeInteger(deliveryTimeId) ||
    deliveryTimeId < 1
  ) {
    return undefined;
  }

  return {
    year,
    month,
    deliveryTimeId,
  };
}

export default function CartPage() {
  const { homeHref, siteType } = useStorefront();
  const { status } = useSession();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [addressReady, setAddressReady] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);
  const [deliverySelections, setDeliverySelections] = useState<DeliverySelections>({});
  const [savedBasket, setSavedBasket] = useState<SavedBasket | null>(null);
  const [paymentSelection, setPaymentSelection] = useState<PayBasketInput | null>(null);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const openBasketQuery = useOpenBasket();
  const addressesQuery = useAddresses();
  const checkoutQuery = useCheckoutDetails(
    openBasketQuery.data ? { basketId: openBasketQuery.data.id } : null,
  );
  const updateQuantityMutation = useUpdateBasketQuantity();
  const deleteItemMutation = useDeleteBasketItem();
  const saveBasketMutation = useSaveBasket();
  const setApplianceDeliveryTimeMutation = useSetApplianceDeliveryTime();
  const setSupermarketDeliveryTimeMutation = useSetSupermarketDeliveryTime();
  const payBasketMutation = usePayBasket();
  const checkoutDetails = checkoutQuery.data;
  const items = checkoutDetails?.basketItems ?? [];
  const checkoutItems = items.map(toCheckoutItem);
  const selectedAddress =
    addressesQuery.data?.find((address) => address.isDefault) ?? addressesQuery.data?.[0] ?? null;

  const handleReadyChange = useCallback((ready: boolean) => setAddressReady(ready), []);
  const handlePaymentSelectionChange = useCallback((selection: PayBasketInput | null) => {
    setIsPaymentComplete(false);
    setPaymentSelection(selection);
  }, []);

  function handleQuantityChange(item: OpenBasketItem, quantity: number) {
    const basketId = openBasketQuery.data?.id;
    if (!basketId) {
      return;
    }

    if (quantity < 1) {
      void deleteItemMutation
        .mutateAsync({ basketId, storeProductId: item.storeProductId })
        .catch((error: unknown) => {
          toast.error(error instanceof Error ? error.message : "حذف کالا ناموفق بود.", {
            id: `cart-delete-${item.storeProductId}`,
          });
        });
      return;
    }

    if (!item.hasInventory) {
      return;
    }

    void updateQuantityMutation
      .mutateAsync({ basketId, storeProductId: item.storeProductId, quantity })
      .catch((error: unknown) => {
        toast.error(error instanceof Error ? error.message : "تغییر تعداد کالا ناموفق بود.", {
          id: `cart-quantity-${item.storeProductId}`,
        });
      });
  }

  async function handlePrimary() {
    if (step === "cart") {
      const basketId = openBasketQuery.data?.id;
      if (!basketId) {
        toast.error("سبد خرید معتبر نیست.");
        return;
      }

      try {
        const savedBasket = await saveBasketMutation.mutateAsync({
          basketId,
          customerDescription: "",
        });
        setSavedBasket(savedBasket);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "ثبت سبد خرید ناموفق بود.");
        return;
      }

      setStep("address");
    } else if (step === "address") {
      if (siteType === SITE_TYPES.appliance) {
        const basketId = openBasketQuery.data?.id;
        const heavyWeightDeliveryTime = toApplianceDeliveryTimeSelection(deliverySelections.heavy);
        const lightWeightDeliveryTime = toApplianceDeliveryTimeSelection(deliverySelections.light);

        if (!basketId || (!heavyWeightDeliveryTime && !lightWeightDeliveryTime)) {
          toast.error("زمان ارسال را انتخاب کنید.");
          return;
        }

        try {
          await setApplianceDeliveryTimeMutation.mutateAsync({
            basketId,
            heavyWeightDeliveryTime,
            lightWeightDeliveryTime,
          });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "ثبت زمان ارسال ناموفق بود.");
          return;
        }
      }

      if (siteType === SITE_TYPES.supermarket) {
        const basketId = openBasketQuery.data?.id;
        const selection = deliverySelections.light;
        const deliveryTimeId = selection?.deliveryTimeId;

        if (
          !basketId ||
          !selection?.dateIso ||
          !Number.isSafeInteger(deliveryTimeId) ||
          deliveryTimeId < 1
        ) {
          toast.error("زمان ارسال را انتخاب کنید.");
          return;
        }

        try {
          await setSupermarketDeliveryTimeMutation.mutateAsync({
            basketId,
            deliveryDate: selection.dateIso,
            deliveryTimeId,
          });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "ثبت زمان ارسال ناموفق بود.");
          return;
        }
      }

      setPaymentReady(false);
      setStep("review");
    } else {
      if (!paymentSelection) {
        toast.error("روش پرداخت را انتخاب کنید.");
        return;
      }

      try {
        const result = await payBasketMutation.mutateAsync(paymentSelection);
        const message = result.message || "پرداخت سفارش با موفقیت ثبت شد.";

        if (result.isPaid) {
          setIsPaymentComplete(true);
          toast.success(message);
          return;
        }

        if (!result.needPayGate) {
          toast.info(message);
          return;
        }

        if (!result.payUrl) {
          throw new Error("نشانی درگاه پرداخت معتبر نیست.");
        }
        let payUrl: URL;
        try {
          payUrl = new URL(result.payUrl);
        } catch {
          throw new Error("نشانی درگاه پرداخت معتبر نیست.");
        }
        if (payUrl.protocol !== "https:" && payUrl.protocol !== "http:") {
          throw new Error("نشانی درگاه پرداخت معتبر نیست.");
        }
        window.location.assign(payUrl.toString());
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "پرداخت سفارش ناموفق بود.");
      }
    }
  }

  function handleBack() {
    if (step === "review") {
      setPaymentReady(false);
      setStep("address");
      return;
    }

    if (step === "address") {
      setAddressReady(false);
      setSavedBasket(null);
      setStep("cart");
    }
  }

  const canProceed =
    step === "address"
      ? addressReady
      : step === "review"
        ? paymentReady && !isPaymentComplete
        : items.length > 0;
  const isLoading =
    status === "loading" ||
    (status === "authenticated" &&
      (openBasketQuery.isPending || (openBasketQuery.data !== null && checkoutQuery.isPending)));
  const error = openBasketQuery.error ?? checkoutQuery.error;

  if (isLoading) {
    return (
      <main className="bg-muted/60 min-h-[60vh] py-8">
        <Container className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <CartSkeleton />
        </Container>
      </main>
    );
  }

  if (status !== "authenticated") {
    return (
      <main className="bg-muted/60 min-h-[60vh] py-12">
        <Container>
          <Empty className="bg-card border-border mx-auto max-w-xl border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ShoppingCart />
              </EmptyMedia>
              <EmptyTitle>برای مشاهده سبد خرید وارد شوید</EmptyTitle>
              <EmptyDescription>
                پس از ورود، کالاهای سبد خرید شما در همه صفحات همگام می‌شوند.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                type="button"
                onClick={() => window.dispatchEvent(new Event("etkala:open-auth"))}
              >
                ورود به حساب کاربری
              </Button>
            </EmptyContent>
          </Empty>
        </Container>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-muted/60 min-h-[60vh] py-12">
        <Container>
          <Empty className="bg-card border-border mx-auto max-w-xl border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ShoppingCart />
              </EmptyMedia>
              <EmptyTitle>دریافت سبد خرید ناموفق بود</EmptyTitle>
              <EmptyDescription>{error.message}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                type="button"
                onClick={() =>
                  void (openBasketQuery.isError
                    ? openBasketQuery.refetch()
                    : checkoutQuery.refetch())
                }
              >
                تلاش دوباره
              </Button>
            </EmptyContent>
          </Empty>
        </Container>
      </main>
    );
  }

  if (!openBasketQuery.data || !checkoutDetails || items.length === 0) {
    return (
      <main className="bg-muted/60 min-h-[60vh] py-12">
        <Container>
          <Empty className="bg-card border-border mx-auto max-w-xl border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ShoppingCart />
              </EmptyMedia>
              <EmptyTitle>سبد خرید شما خالی است</EmptyTitle>
              <EmptyDescription>
                برای مشاهده کالاها و افزودن محصول، به فروشگاه برگردید.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href={homeHref} className={buttonVariants()}>
                مشاهده محصولات
              </Link>
            </EmptyContent>
          </Empty>
        </Container>
      </main>
    );
  }

  return (
    <main className="bg-muted/60 py-7 sm:py-10">
      <Container className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="min-w-0">
          {step === "cart" ? (
            <CartStep
              items={items}
              deletingStoreProductId={
                deleteItemMutation.isPending
                  ? deleteItemMutation.variables?.storeProductId
                  : undefined
              }
              onQuantityChange={handleQuantityChange}
            />
          ) : null}
          {step === "address" ? (
            <AddressStep
              address={selectedAddress}
              checkoutDetails={checkoutDetails}
              selections={deliverySelections}
              onSelectionsChange={setDeliverySelections}
              onReadyChange={handleReadyChange}
            />
          ) : null}
          {step === "review" && selectedAddress ? (
            <ReviewStep
              address={selectedAddress}
              checkoutDetails={checkoutDetails}
              items={items}
              selections={deliverySelections}
              onEdit={() => {
                setPaymentReady(false);
                setStep("address");
              }}
              onPaymentReadyChange={setPaymentReady}
              onPaymentSelectionChange={handlePaymentSelectionChange}
            />
          ) : null}
        </div>

        <OrderSummary
          step={step}
          items={checkoutItems}
          checkoutDetails={checkoutDetails}
          savedBasket={savedBasket}
          canProceed={canProceed}
          isSubmitting={
            (step === "cart" && saveBasketMutation.isPending) ||
            (step === "address" &&
              (setApplianceDeliveryTimeMutation.isPending ||
                setSupermarketDeliveryTimeMutation.isPending)) ||
            (step === "review" && payBasketMutation.isPending)
          }
          onPrimary={handlePrimary}
          onBack={handleBack}
        />
      </Container>
    </main>
  );
}
