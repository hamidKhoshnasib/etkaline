"use client";

import { useState } from "react";
import { MapPin, Pencil, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSetDefaultAddress } from "@/features/address/api/use-address-mutations";
import type { Address, AddressAuthValue } from "@/features/address/api/use-addresses";
import { useAddresses } from "@/features/address/api/use-addresses";

import { getResponseMessage } from "./get-response-message";
export function AddressListStep({
  selectedAddress,
  onEditAddress,
  onSelectAddress,
  onConfirm,
}: {
  selectedAddress: string;
  onEditAddress: (address: Address) => void;
  onSelectAddress: (address: Address, value: AddressAuthValue) => Promise<void>;
  onConfirm: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingAddressId, setPendingAddressId] = useState("");
  const { data: addresses = [], isError, isPending } = useAddresses();
  const setDefaultAddress = useSetDefaultAddress();
  const normalizedSearch = searchTerm.trim();
  const visibleAddresses = addresses
    .filter((address) => `${address.title} ${address.address}`.includes(normalizedSearch))
    .sort(
      (firstAddress, secondAddress) =>
        Number(secondAddress.isDefault) - Number(firstAddress.isDefault),
    );
  const activeAddressId =
    pendingAddressId ||
    selectedAddress ||
    addresses.find((address) => address.isDefault)?.id ||
    addresses[0]?.id ||
    "";

  async function handleConfirmAddress() {
    const address = addresses.find((item) => item.id === activeAddressId);
    if (!address) {
      return;
    }

    if (address.isDefault) {
      onConfirm();
      return;
    }

    const addressId = Number(address.id);
    if (!Number.isInteger(addressId)) {
      toast.error("شناسه آدرس معتبر نیست.");
      return;
    }

    try {
      const response = await setDefaultAddress.mutateAsync({ addressId });
      if (response.isSuccess !== true || !response.value) {
        throw new Error(getResponseMessage(response, "انتخاب آدرس ناموفق بود."));
      }

      await onSelectAddress(address, response.value);
      toast.success("آدرس پیش‌فرض تغییر کرد.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "انتخاب آدرس ناموفق بود.");
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 px-6 pt-[18px]">
        <label className="relative flex">
          <span className="sr-only">جست‌وجوی آدرس</span>
          <Search className="text-muted-foreground pointer-events-none absolute end-3 top-1/2 size-5 -translate-y-1/2" />
          <Input
            className="bg-background h-14 rounded-xl pe-11"
            placeholder="جست‌وجو"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-6">
        <div className="flex flex-col gap-2">
          {isPending && (
            <div aria-busy="true" className="flex flex-col gap-2">
              <Skeleton className="h-36 rounded-2xl" />
              <Skeleton className="h-36 rounded-2xl" />
            </div>
          )}
          {!isPending &&
            !isError &&
            visibleAddresses.map((address) => {
              const isSelected = address.id === activeAddressId;
              return (
                <div
                  className={`rounded-2xl border p-4 transition-colors ${
                    isSelected ? "border-primary-hover bg-muted/60" : "bg-muted/60"
                  }`}
                  key={address.id}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary-hover size-5 shrink-0" aria-hidden="true" />
                    <button
                      aria-pressed={isSelected}
                      className="focus-visible:ring-ring/50 min-w-0 flex-1 text-start focus-visible:ring-3 focus-visible:outline-none"
                      disabled={setDefaultAddress.isPending}
                      onClick={() => setPendingAddressId(address.id)}
                      type="button"
                    >
                      <span className="body-medium-bold text-primary-hover block text-start">
                        {address.title}
                      </span>
                      <span className="body-small text-foreground mt-1 block text-start">
                        {address.address}
                      </span>
                      {address.postalCode && (
                        <span className="body-small text-foreground block text-start">
                          کد پستی: {address.postalCode}
                        </span>
                      )}
                      {address.recipient && (
                        <span className="body-small text-foreground block text-start">
                          گیرنده: {address.recipient}
                        </span>
                      )}
                      {address.phone && (
                        <span className="body-small text-foreground block text-start">
                          {address.phone}
                        </span>
                      )}
                    </button>
                    <Button
                      aria-label={`ویرایش آدرس ${address.title}`}
                      className="text-muted-foreground"
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => onEditAddress(address)}
                    >
                      <Pencil data-icon="inline-end" />
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>

        {isError && (
          <p className="body-small text-destructive py-8 text-center" role="alert">
            دریافت آدرس‌ها ممکن نشد. دوباره تلاش کنید.
          </p>
        )}

        {!isPending && !isError && visibleAddresses.length === 0 && (
          <p className="body-small text-muted-foreground py-8 text-center">آدرسی یافت نشد.</p>
        )}
      </div>

      <div className="bg-background shrink-0 border-t px-6 py-4">
        <Button
          aria-busy={setDefaultAddress.isPending}
          className="h-[59px] w-full rounded-full text-base font-bold"
          disabled={!activeAddressId || isPending || isError || setDefaultAddress.isPending}
          onClick={() => void handleConfirmAddress()}
          size="xl"
        >
          تأیید آدرس
        </Button>
      </div>
    </div>
  );
}
