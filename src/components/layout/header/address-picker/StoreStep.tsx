"use client";

import { MapPin } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { AddressAuthValue } from "@/features/address/api/use-addresses";
import { useNearApplianceStores } from "@/features/store/api/use-near-appliance-stores";
import { useSetDefaultStore } from "@/features/store/api/use-store-mutations";

import { getResponseMessage } from "./get-response-message";
export function StoreStep({
  selectedStore,
  committedStoreId,
  onSelectStore,
  onComplete,
}: {
  selectedStore: string;
  committedStoreId: string;
  onSelectStore: (storeId: string) => void;
  onComplete: (storeTitle: string, value: AddressAuthValue) => Promise<void>;
}) {
  const { data: stores = [], isError, isPending } = useNearApplianceStores();
  const setDefaultStore = useSetDefaultStore();
  const activeStoreId = selectedStore || committedStoreId || stores[0]?.id || "";
  const orderedStores = [...stores].sort(
    (firstStore, secondStore) =>
      Number(secondStore.id === committedStoreId) - Number(firstStore.id === committedStoreId),
  );

  async function handleComplete() {
    const store = stores.find((item) => item.id === activeStoreId);
    if (!store) {
      return;
    }

    const storeId = Number(store.id);
    if (!Number.isInteger(storeId)) {
      toast.error("شناسه فروشگاه معتبر نیست.");
      return;
    }

    try {
      const response = await setDefaultStore.mutateAsync({ storeId });
      if (response.isSuccess !== true || !response.value) {
        throw new Error(getResponseMessage(response, "انتخاب فروشگاه ناموفق بود."));
      }

      await onComplete(store.title, response.value);
      toast.success("فروشگاه پیش‌فرض تغییر کرد.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "انتخاب فروشگاه ناموفق بود.");
    }
  }

  return (
    <div className="p-5">
      <p className="body-medium-bold text-secondary mb-5">
        یکی از فروشگاه‌های نزدیک اطراف خود را انتخاب نمایید:
      </p>
      <div className="flex flex-col gap-3">
        {isPending && (
          <div aria-busy="true" className="flex flex-col gap-3">
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
          </div>
        )}
        {!isPending &&
          !isError &&
          orderedStores.map((store) => {
            const isSelected = store.id === activeStoreId;
            return (
              <button
                aria-pressed={isSelected}
                className={`focus-visible:ring-ring/50 flex h-20 w-full items-center gap-4 rounded-2xl border p-4 text-start transition-colors focus-visible:ring-3 focus-visible:outline-none ${
                  isSelected ? "border-primary-hover bg-muted/60" : "bg-muted/60 hover:bg-muted"
                }`}
                disabled={setDefaultStore.isPending}
                key={store.id}
                onClick={() => onSelectStore(store.id)}
                type="button"
              >
                <MapPin className="fill-primary text-secondary size-10 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="body-medium-bold text-secondary block">{store.title}</span>
                  <span className="body-small text-muted-foreground mt-1 block">
                    {store.address}
                  </span>
                  {store.tel && (
                    <span className="body-small text-muted-foreground mt-1 block">{store.tel}</span>
                  )}
                </span>
              </button>
            );
          })}
      </div>
      {isError && (
        <p className="body-small text-destructive py-8 text-center" role="alert">
          دریافت فروشگاه‌های نزدیک ممکن نشد. دوباره تلاش کنید.
        </p>
      )}
      {!isPending && !isError && stores.length === 0 && (
        <p className="body-small text-muted-foreground py-8 text-center">
          فروشگاه نزدیکی یافت نشد.
        </p>
      )}
      <Button
        aria-busy={setDefaultStore.isPending}
        className="mt-10 h-14 w-full rounded-full text-sm font-bold"
        disabled={!activeStoreId || isPending || isError || setDefaultStore.isPending}
        onClick={() => void handleComplete()}
        size="xl"
      >
        ثبت و ادامه
      </Button>
    </div>
  );
}
