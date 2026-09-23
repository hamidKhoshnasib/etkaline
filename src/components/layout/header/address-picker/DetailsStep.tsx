"use client";

import { useRef, useState, type FormEvent } from "react";
import { BriefcaseBusiness, Building2, House, Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Address, AddressPayload } from "@/features/address/api/use-addresses";
import { useProfile } from "@/features/account/api/use-profile";
import { useNearApplianceStores } from "@/features/store/api/use-near-appliance-stores";
import { cn } from "@/lib/utils";

import { AddressMap } from "./AddressMapLazy";
export function DetailsStep({
  address,
  cityId,
  coordinates,
  formId,
  isPending,
  onEditLocation,
  saveError,
  onSave,
  suggestedFullAddress,
}: {
  address: Address | null;
  cityId: number;
  coordinates: { latitude: string; longitude: string };
  formId: string;
  isPending: boolean;
  onEditLocation: () => void;
  saveError: string | null;
  onSave: (payload: AddressPayload, headerName: string) => Promise<void>;
  suggestedFullAddress: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: profile } = useProfile();
  const { data: stores = [] } = useNearApplianceStores();
  const hasNewUserPlaceholderName =
    `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim() === "کاربر جدید" ||
    profile?.firstName?.trim() === "کاربر جدید" ||
    profile?.lastName?.trim() === "کاربر جدید";
  const profileFirstName = hasNewUserPlaceholderName ? "" : (profile?.firstName ?? "");
  const profileLastName = hasNewUserPlaceholderName ? "" : (profile?.lastName ?? "");
  const hasAddressPlaceholderName =
    `${address?.receiverFirstName ?? ""} ${address?.receiverLastName ?? ""}`.trim() ===
    "کاربر جدید";
  const addressFirstName = hasAddressPlaceholderName ? "" : (address?.receiverFirstName ?? "");
  const addressLastName = hasAddressPlaceholderName ? "" : (address?.receiverLastName ?? "");
  const receiverPhone = address?.phone ?? profile?.mobile ?? "";
  const [addressTitle, setAddressTitle] = useState(address?.title ?? "");
  const [isAlternateReceiver, setIsAlternateReceiver] = useState(
    address?.hasOtherReceiver ?? false,
  );

  const numericInput = (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    input.value = input.value
      .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
      .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
      .replace(/\D/g, "");
  };

  const requiredLabelClass =
    "after:ml-2 after:inline-block after:size-1 after:rounded-full after:bg-orange-500 after:content-['']";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cityId) {
      toast.error("ابتدا شهر را انتخاب کنید.");
      return;
    }
    if (!coordinates.latitude || !coordinates.longitude) {
      toast.error("موقعیت آدرس را روی نقشه انتخاب کنید.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const value = (name: string) => String(formData.get(name) ?? "").trim();
    const receiverPhoneInput = formRef.current?.elements.namedItem("receiverPhone");
    const displayedReceiverPhone =
      receiverPhoneInput instanceof HTMLInputElement ? receiverPhoneInput.value.trim() : "";
    const receiverFirstName = isAlternateReceiver
      ? value("alternateReceiverFirstName")
      : profileFirstName || addressFirstName;
    const receiverLastName = isAlternateReceiver
      ? value("alternateReceiverLastName")
      : profileLastName || addressLastName;
    const submittedReceiverPhone = isAlternateReceiver
      ? value("alternateReceiverPhone")
      : displayedReceiverPhone || profile?.mobile || address?.phone || "";
    const headerName = [profileFirstName || addressFirstName, profileLastName || addressLastName]
      .filter(Boolean)
      .join(" ");

    // if (!receiverFirstName || !receiverLastName || !submittedReceiverPhone || !headerName) {
    //   toast.error("اطلاعات گیرنده را کامل کنید.");
    //   return;
    // }

    await onSave(
      {
        title: value("title"),
        fullAddress: value("fullAddress"),
        longitude: coordinates.longitude,
        latitude: coordinates.latitude,
        plaque: value("plaque"),
        unit: value("unit"),
        postalCode: value("postalCode"),
        hasOtherReceiver: isAlternateReceiver,
        receiverFirstName,
        receiverLastName,
        receiverPhone: submittedReceiverPhone,
        isDefault: address?.isDefault ?? true,
        cityId,
      },
      headerName,
    );
  }

  return (
    <form ref={formRef} className="p-5" id={formId} onSubmit={handleSubmit}>
      <div className="relative mb-4 h-36 overflow-hidden rounded-xl">
        <div className="pointer-events-none h-full w-full [&_.nominatim]:hidden!">
          <AddressMap
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
            onSelect={() => undefined}
            stores={stores}
          />
        </div>
        <div className="absolute inset-0 z-[1100] flex items-center justify-center bg-black/50">
          <Button
            type="button"
            variant="secondary-gray"
            className="h-10 rounded-full bg-white px-4 text-sm font-bold"
            onClick={onEditLocation}
          >
            <Pencil className="size-4" />
            ویرایش موقعیت مکانی
          </Button>
        </div>
      </div>
      <FieldGroup className="gap-4">
        <Field data-disabled>
          <FieldLabel className={requiredLabelClass} htmlFor={`${formId}-receiver-mobile`}>
            موبایل
          </FieldLabel>
          <Input
            className="h-12"
            value={receiverPhone}
            id={`${formId}-receiver-mobile`}
            inputMode="numeric"
            name="receiverPhone"
            disabled
            required
          />
        </Field>
        <Field>
          <FieldLabel className={requiredLabelClass} htmlFor={`${formId}-title`}>
            عنوان آدرس
          </FieldLabel>
          <Input
            className="h-12"
            value={addressTitle}
            id={`${formId}-title`}
            name="title"
            onChange={(event) => setAddressTitle(event.target.value)}
            required
          />
          <div className="mt-[7px] flex gap-2">
            {[
              { label: "خانه", Icon: House },
              { label: "محل کار", Icon: BriefcaseBusiness },
              { label: "دانشگاه", Icon: Building2 },
            ].map(({ label, Icon }) => {
              const isSelected = addressTitle === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAddressTitle(label)}
                  className={cn(
                    "flex h-9 flex-1 items-center justify-center gap-1 rounded-full border text-xs transition-colors",
                    isSelected
                      ? "border-primary-hover text-primary-hover bg-[#FFFDE7]"
                      : "hover:text-primary-hover border-transparent text-[#9E9E9E]",
                  )}
                >
                  <Icon className="size-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        </Field>
        <Field>
          <FieldLabel className={requiredLabelClass} htmlFor={`${formId}-address`}>
            آدرس
          </FieldLabel>
          <Input
            className="h-12"
            defaultValue={address?.address ?? suggestedFullAddress}
            id={`${formId}-address`}
            name="fullAddress"
            required
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel className={requiredLabelClass} htmlFor={`${formId}-plaque`}>
              پلاک
            </FieldLabel>
            <Input
              className="h-12"
              defaultValue={address?.plaque ?? ""}
              id={`${formId}-plaque`}
              inputMode="numeric"
              name="plaque"
              onInput={numericInput}
              required
            />
          </Field>
          <Field>
            <FieldLabel className={requiredLabelClass} htmlFor={`${formId}-unit`}>
              واحد
            </FieldLabel>
            <Input
              className="h-12"
              defaultValue={address?.unit ?? ""}
              id={`${formId}-unit`}
              inputMode="numeric"
              name="unit"
              onInput={numericInput}
              required
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor={`${formId}-postal-code`}>کد پستی</FieldLabel>
          <Input
            className="h-12"
            defaultValue={address?.postalCode ?? ""}
            id={`${formId}-postal-code`}
            inputMode="numeric"
            name="postalCode"
            onInput={numericInput}
          />
        </Field>
        <Field orientation="horizontal" className="items-center justify-start pt-1">
          <input
            checked={isAlternateReceiver}
            className="accent-primary border-input size-4 rounded"
            id={`${formId}-alternate-receiver`}
            type="checkbox"
            onChange={(event) => setIsAlternateReceiver(event.target.checked)}
          />
          <FieldLabel htmlFor={`${formId}-alternate-receiver`} className="w-auto">
            شخص دیگری تحویل می‌گیرد
          </FieldLabel>
        </Field>
        {isAlternateReceiver ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel
                className={requiredLabelClass}
                htmlFor={`${formId}-alternate-receiver-first-name`}
              >
                نام گیرنده
              </FieldLabel>
              <Input
                className="h-12"
                defaultValue={address?.receiverFirstName ?? ""}
                id={`${formId}-alternate-receiver-first-name`}
                name="alternateReceiverFirstName"
                required
              />
            </Field>
            <Field>
              <FieldLabel
                className={requiredLabelClass}
                htmlFor={`${formId}-alternate-receiver-last-name`}
              >
                نام خانوادگی گیرنده
              </FieldLabel>
              <Input
                className="h-12"
                defaultValue={address?.receiverLastName ?? ""}
                id={`${formId}-alternate-receiver-last-name`}
                name="alternateReceiverLastName"
                required
              />
            </Field>
            <Field className="sm:col-span-2">
              <FieldLabel
                className={requiredLabelClass}
                htmlFor={`${formId}-alternate-receiver-mobile`}
              >
                شماره موبایل گیرنده
              </FieldLabel>
              <Input
                className="h-12"
                defaultValue={address?.phone ?? ""}
                id={`${formId}-alternate-receiver-mobile`}
                inputMode="numeric"
                maxLength={11}
                name="alternateReceiverPhone"
                onInput={numericInput}
                required
              />
            </Field>
          </div>
        ) : null}
      </FieldGroup>
      {saveError && (
        <p aria-live="polite" className="body-small text-destructive mt-4" role="alert">
          {saveError}
        </p>
      )}
      <Button
        aria-busy={isPending}
        className="mt-6 h-14 w-full rounded-full text-base font-bold"
        disabled={isPending}
        size="xl"
        type="submit"
      >
        {address ? "ذخیره تغییرات" : "ثبت آدرس"}
      </Button>
    </form>
  );
}
