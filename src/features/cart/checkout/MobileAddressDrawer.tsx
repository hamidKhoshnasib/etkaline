"use client";

import { useState } from "react";
import { Check, MapPin, Pencil, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { AddressPicker } from "@/components/layout/header/AddressPicker";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSetDefaultAddress } from "@/features/address/api/use-address-mutations";
import type { Address, AddressAuthValue } from "@/features/address/api/use-addresses";
import { setClientSessionSnapshot } from "@/lib/axios-client";
import { cn } from "@/lib/utils";

interface MobileAddressDrawerProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onAddressSelected: (address: Address) => void;
}

function AddressDetails({ address }: { address: Address }) {
  return (
    <span className="text-muted-foreground flex min-w-0 flex-col gap-1 text-right text-sm leading-6">
      <span className="text-secondary font-bold">{address.title}</span>
      <span>{address.address}</span>
      {address.postalCode ? (
        <span>
          کد پستی: <bdi dir="ltr">{address.postalCode}</bdi>
        </span>
      ) : null}
      {address.recipient ? <span>گیرنده: {address.recipient}</span> : null}
      {address.phone ? (
        <span>
          <bdi dir="ltr">{address.phone}</bdi>
        </span>
      ) : null}
    </span>
  );
}

export function MobileAddressDrawer({
  addresses,
  selectedAddress,
  onAddressSelected,
}: MobileAddressDrawerProps) {
  const [open, setOpen] = useState(false);
  const { update } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const setDefaultAddress = useSetDefaultAddress();

  async function selectAddress(address: Address) {
    const addressId = Number(address.id);
    if (!Number.isSafeInteger(addressId) || addressId < 1) {
      toast.error("شناسه آدرس معتبر نیست.");
      return;
    }

    try {
      const response = await setDefaultAddress.mutateAsync({ addressId });
      if (response.isSuccess !== true || !response.value) {
        throw new Error("انتخاب آدرس ناموفق بود.");
      }

      const authValue = response.value as AddressAuthValue;
      await update({ user: authValue.user, accessToken: authValue.accessToken });
      setClientSessionSnapshot({ accessToken: authValue.accessToken.token });
      onAddressSelected(address);
      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["address"] });
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "انتخاب آدرس ناموفق بود.");
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerTrigger
        render={<Button type="button" variant="ghost" size="sm" className="lg:hidden" />}
      >
        {selectedAddress ? "تغییر آدرس" : "انتخاب آدرس"}
      </DrawerTrigger>
      <DrawerContent className="max-h-[calc(100dvh-1.5rem)] rounded-t-[28px] lg:hidden">
        <DrawerHeader className="flex-row items-center justify-between px-4 pt-5 text-right">
          <DrawerTitle className="text-secondary font-bold">آدرس‌های شما</DrawerTitle>
          <AddressPicker
            startInCreateMode
            trigger={
              <Button type="button" variant="outline-primary" size="sm" className="rounded-full">
                <Plus data-icon="inline-start" />
                افزودن آدرس جدید
              </Button>
            }
          />
        </DrawerHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
          {addresses.map((address) => {
            const isSelected = selectedAddress?.id === address.id;
            return (
              <div
                key={address.id}
                className={cn(
                  "relative flex min-h-32 items-start gap-3 rounded-2xl border p-4",
                  isSelected ? "border-primary bg-primary/5" : "border-border bg-muted/40",
                )}
              >
                <MapPin
                  className={cn(
                    "mt-0.5 size-5 shrink-0",
                    isSelected ? "text-primary" : "text-muted-foreground",
                  )}
                  aria-hidden="true"
                />
                <AddressDetails address={address} />
                <AddressPicker
                  editingAddress={address}
                  trigger={
                    <Button
                      type="button"
                      aria-label={`ویرایش ${address.title}`}
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground absolute start-3 top-3"
                    >
                      <Pencil aria-hidden="true" />
                    </Button>
                  }
                />
                {isSelected ? (
                  <Check
                    className="text-primary absolute end-3 bottom-3 size-4"
                    aria-label="آدرس انتخاب‌شده"
                  />
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={setDefaultAddress.isPending}
                    className="absolute end-3 bottom-2"
                    onClick={() => void selectAddress(address)}
                  >
                    انتخاب
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        <DrawerFooter className="border-t px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button
            type="button"
            size="md"
            className="h-12 rounded-full"
            onClick={() => setOpen(false)}
          >
            تأیید آدرس
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
