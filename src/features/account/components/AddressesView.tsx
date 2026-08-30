"use client";

import { useState } from "react";
import {
  EllipsisVertical,
  Map,
  MapPin,
  Pencil,
  Plus,
  Smartphone,
  Trash2,
  UserRound,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { AddressPicker } from "@/components/layout/header/AddressPicker";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { ACCOUNT_OUTLINE_ACTION_CLASS } from "@/features/account/components/account-action-styles";
import { useDeleteAddress } from "@/features/address/api/use-address-mutations";
import { type Address, type ApiResult, useAddresses } from "@/features/address/api/use-addresses";
import { cn } from "@/lib/utils";

function getResponseMessage(response: ApiResult<never>, fallback: string) {
  if (typeof response.message === "string" && response.message.trim()) {
    return response.message;
  }
  if (Array.isArray(response.errors) && typeof response.errors[0] === "string") {
    return response.errors[0];
  }
  return fallback;
}

function AddressInfoRow({
  icon: Icon,
  children,
}: {
  icon: typeof UserRound;
  children: React.ReactNode;
}) {
  return (
    <div className="text-muted-foreground flex min-h-6 items-center gap-2 text-sm">
      <Icon className="text-secondary/40 size-4 shrink-0" aria-hidden="true" />
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}

function AddressActions({
  onEdit,
  onDelete,
  isDeleting,
}: {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="مدیریت آدرس"
            className="text-muted-foreground hover:bg-muted rounded-lg p-1.5"
          />
        }
      >
        <EllipsisVertical aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        dir="rtl"
        side="inline-start"
        sideOffset={4}
        className="min-w-28 rounded-lg p-0"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="min-h-10 cursor-pointer justify-start gap-2.5 rounded-none px-3"
            onClick={onEdit}
          >
            <Pencil className="text-[#64748B]" aria-hidden="true" />
            <span>ویرایش</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-0" />
          <DropdownMenuItem
            variant="destructive"
            className="min-h-10 cursor-pointer justify-start gap-2.5 rounded-none px-3"
            disabled={isDeleting}
            onClick={onDelete}
          >
            <Trash2 aria-hidden="true" />
            <span>{isDeleting ? "در حال حذف..." : "حذف"}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AddressesSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-busy="true" aria-label="در حال دریافت آدرس‌ها">
      {Array.from({ length: 2 }, (_, index) => (
        <Card key={index} className="min-h-48 gap-3 rounded-xl py-5 shadow-none">
          <CardHeader className="px-5 py-0">
            <Skeleton className="h-5 w-24" />
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-5 pb-0">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AddressesView() {
  const { data: addresses = [], error, isLoading } = useAddresses();
  const queryClient = useQueryClient();
  const deleteAddress = useDeleteAddress();
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  async function handleDeleteAddress(id: string) {
    const numericId = Number(id);
    if (!Number.isSafeInteger(numericId)) {
      toast.error("شناسه آدرس معتبر نیست.");
      return;
    }

    try {
      const response = await deleteAddress.mutateAsync({ id: numericId });
      if (response.isSuccess !== true) {
        throw new Error(getResponseMessage(response, "حذف آدرس ناموفق بود."));
      }

      await queryClient.invalidateQueries({ queryKey: ["address"] });
      toast.success("آدرس با موفقیت حذف شد.");
    } catch (deleteError) {
      toast.error(deleteError instanceof Error ? deleteError.message : "حذف آدرس ناموفق بود.");
    }
  }

  return (
    <section className="bg-muted/60 min-h-dvh lg:min-h-full lg:bg-transparent lg:px-0 lg:py-0">
      <MobilePageHeader
        fallbackHref="/account/profile"
        fixed
        title="آدرس‌های من"
        endContent={
          <AddressPicker
            startInCreateMode
            trigger={
              <Button
                type="button"
                variant="outline"
                className={cn(
                  ACCOUNT_OUTLINE_ACTION_CLASS,
                  "h-auto rounded-none px-0 py-2 text-[12px]",
                )}
              >
                <Plus data-icon="inline-start" className="size-3" aria-hidden="true" />
                افزودن آدرس
              </Button>
            }
          />
        }
      />
      <div className="px-4 pt-24 pb-6 lg:px-0 lg:py-0">
        <div className="mb-5 hidden items-center justify-between gap-4 lg:flex">
          <h1 className="text-secondary text-lg font-bold">آدرس‌های من</h1>
          <AddressPicker
            startInCreateMode
            trigger={
              <Button
                type="button"
                variant="outline"
                size="lg"
                className={ACCOUNT_OUTLINE_ACTION_CLASS}
              >
                <Plus data-icon="inline-start" />
                افزودن آدرس جدید
              </Button>
            }
          />
        </div>

        {editingAddress && (
          <AddressPicker
            editingAddress={editingAddress}
            open
            onOpenChange={(nextOpen) => {
              if (!nextOpen) {
                setEditingAddress(null);
              }
            }}
            trigger={
              <Button aria-hidden="true" className="sr-only" tabIndex={-1} type="button">
                ویرایش آدرس
              </Button>
            }
          />
        )}

        {isLoading ? (
          <AddressesSkeleton />
        ) : error ? (
          <Empty className="bg-card min-h-48">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MapPin aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>دریافت آدرس‌ها ناموفق بود</EmptyTitle>
              <EmptyDescription>{error.message}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : addresses.length === 0 ? (
          <Empty className="bg-card min-h-48">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MapPin aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>هنوز آدرسی ثبت نکرده‌اید</EmptyTitle>
              <EmptyDescription>برای ثبت آدرس جدید از دکمهٔ بالا استفاده کنید.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-5">
            {addresses.map((address) => (
              <Card key={address.id} className="min-h-48 gap-2 rounded-xl py-0 shadow-none">
                <CardHeader className="grid grid-cols-[1fr_auto] items-start px-5 pt-5 pb-0">
                  <CardTitle className="text-secondary font-bold">{address.title}</CardTitle>
                  <CardAction className="col-start-2 row-start-1">
                    <AddressActions
                      isDeleting={deleteAddress.isPending}
                      onEdit={() => setEditingAddress(address)}
                      onDelete={() => handleDeleteAddress(address.id)}
                    />
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col px-5 pb-5">
                  <AddressInfoRow icon={UserRound}>گیرنده: {address.recipient}</AddressInfoRow>
                  <AddressInfoRow icon={MapPin}>{address.address}</AddressInfoRow>
                  <AddressInfoRow icon={Map}>
                    <bdi dir="ltr">{address.postalCode}</bdi>
                  </AddressInfoRow>
                  <AddressInfoRow icon={Smartphone}>
                    <bdi dir="ltr">{address.phone}</bdi>
                  </AddressInfoRow>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
