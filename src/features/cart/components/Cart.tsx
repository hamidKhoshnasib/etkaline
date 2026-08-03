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
import { useUpdateBasketQuantity } from "@/features/cart/api/update-basket-quantity";
import { useAddresses } from "@/features/address/api/use-addresses";
import AddressStep from "@/features/cart/checkout/AddressStep";
import OrderSummary from "@/features/cart/checkout/OrderSummary";
import ReviewStep from "@/features/cart/checkout/ReviewStep";
import { CartSkeleton } from "@/features/cart/components/CartSkeleton";
import CartStep from "@/features/cart/components/CartStep";
import type { CartItem } from "@/features/cart/fixtures/cart";
import type { OpenBasketItem } from "@/features/cart/api/get-open-basket";
import type { DeliverySelections } from "@/features/cart/model/checkout";

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

export default function CartPage() {
  const { status } = useSession();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [addressReady, setAddressReady] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);
  const [deliverySelections, setDeliverySelections] = useState<DeliverySelections>({});
  const openBasketQuery = useOpenBasket();
  const addressesQuery = useAddresses();
  const checkoutQuery = useCheckoutDetails(
    openBasketQuery.data ? { basketId: openBasketQuery.data.id } : null,
  );
  const updateQuantityMutation = useUpdateBasketQuantity();
  const deleteItemMutation = useDeleteBasketItem();
  const checkoutDetails = checkoutQuery.data;
  const items = checkoutDetails?.basketItems ?? [];
  const checkoutItems = items.map(toCheckoutItem);
  const selectedAddress =
    addressesQuery.data?.find((address) => address.isDefault) ?? addressesQuery.data?.[0] ?? null;

  const handleReadyChange = useCallback((ready: boolean) => setAddressReady(ready), []);

  function handleQuantityChange(item: OpenBasketItem, quantity: number) {
    const basketId = openBasketQuery.data?.id;
    if (!basketId || !item.hasInventory) {
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

    void updateQuantityMutation
      .mutateAsync({ basketId, storeProductId: item.storeProductId, quantity })
      .catch((error: unknown) => {
        toast.error(error instanceof Error ? error.message : "تغییر تعداد کالا ناموفق بود.", {
          id: `cart-quantity-${item.storeProductId}`,
        });
      });
  }

  function handlePrimary() {
    if (step === "cart") {
      setStep("address");
    } else if (step === "address") {
      setPaymentReady(false);
      setStep("review");
    } else {
      toast.info("برای ثبت سفارش و انتقال به درگاه، API پرداخت باید متصل شود.");
    }
  }

  const canProceed =
    step === "address" ? addressReady : step === "review" ? paymentReady : items.length > 0;
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
              <Link href="/" className={buttonVariants()}>
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
            />
          ) : null}
        </div>

        <OrderSummary
          step={step}
          items={checkoutItems}
          checkoutDetails={checkoutDetails}
          canProceed={canProceed}
          onPrimary={handlePrimary}
        />
      </Container>
    </main>
  );
}
