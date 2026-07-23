"use client";

import { cloneElement, useId, useState, type MouseEventHandler, type ReactElement } from "react";
import { MapPin, MoveRight, Pencil, Plus, Search, X } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type AddressStep = "addresses" | "location" | "details" | "store";

const addresses = [
  {
    id: "home",
    title: "خانه",
    address: "بازار، خیابان پانزده خرداد، پاساژ بن، قائم مقام",
    postalCode: "۶۷۷۴۵۷۴۷۶",
    recipient: "محمدرضا چاقی",
    phone: "۰۹۳۵۰۳۴۱۹۵۰",
  },
  {
    id: "office",
    title: "محل کار",
    address: "تهران، میدان ونک، خیابان ملاصدرا، پلاک ۲۴",
    postalCode: "۱۴۳۵۷۶۴۸۹",
    recipient: "محمدرضا چاقی",
    phone: "۰۹۳۵۰۳۴۱۹۵۰",
  },
  {
    id: "warehouse",
    title: "انبار",
    address: "تهران، بازار بزرگ، کوچه مروی، پلاک ۱۸",
    postalCode: "۱۱۳۴۵۷۶۸۹",
    recipient: "محمدرضا چاقی",
    phone: "۰۹۳۵۰۳۴۱۹۵۰",
  },
];

const nearbyStores = [
  { id: "central", name: "فروشگاه مرکزی اتکالاین", address: "لورم ایپسوم متن ساختگی" },
  { id: "vanak", name: "فروشگاه اتکالاین ونک", address: "لورم ایپسوم متن ساختگی" },
];

interface AddressPickerProps {
  trigger: ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>;
}

export function AddressPicker({ trigger }: AddressPickerProps) {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<AddressStep>("addresses");
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [selectedStore, setSelectedStore] = useState(nearbyStores[0].id);
  const formId = useId();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setStep("addresses");
    }
  }

  const guardedTrigger = cloneElement(trigger, {
    onClick: (event) => {
      trigger.props.onClick?.(event);
      if (event.defaultPrevented || status !== "unauthenticated") {
        return;
      }

      event.preventDefault();
      window.dispatchEvent(new Event("etkala:open-auth"));
    },
  });

  const stepTitle = {
    addresses: "آدرس‌های شما",
    location: "انتخاب موقعیت مکانی",
    details: "اطلاعات تکمیلی آدرس",
    store: "انتخاب فروشگاه",
  }[step];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {status === "unauthenticated" ? guardedTrigger : <DialogTrigger render={trigger} />}
      <DialogContent
        showCloseButton={false}
        className={`max-h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-[28px] p-0 ${
          step === "addresses" ? "sm:max-w-[30rem]" : "sm:max-w-[38rem]"
        }`}
      >
        <DialogHeader
          className={`relative flex-row items-center justify-between border-b px-6 ${
            step === "addresses" ? "h-[89px]" : "py-5"
          }`}
        >
          <div className="flex items-center gap-3">
            {step !== "addresses" && (
              <Button
                aria-label="بازگشت به مرحله قبل"
                className="text-secondary"
                size="icon-sm"
                variant="ghost"
                onClick={() =>
                  setStep(
                    step === "store" ? "details" : step === "details" ? "location" : "addresses",
                  )
                }
              >
                <MoveRight data-icon="inline-start" />
              </Button>
            )}
            <DialogTitle
              className={`title-medium-bold text-secondary ${
                step === "addresses" ? "" : "absolute left-1/2 -translate-x-1/2"
              }`}
            >
              {stepTitle}
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            مراحل انتخاب موقعیت، ثبت جزئیات و انتخاب فروشگاه نزدیک
          </DialogDescription>
          <div className="flex items-center gap-2">
            {step === "addresses" ? (
              <Button
                className="h-11 min-w-[163px] rounded-full px-5"
                onClick={() => setStep("location")}
                variant="outline-primary"
              >
                <Plus data-icon="inline-start" />
                افزودن آدرس جدید
              </Button>
            ) : (
              <span className="label-small text-muted-foreground">
                مرحله {step === "location" ? "۱" : step === "details" ? "۲" : "۳"} از ۳
              </span>
            )}
            <Button
              aria-label="بستن انتخاب آدرس"
              className={step === "addresses" ? "sr-only" : "text-muted-foreground"}
              size="icon-sm"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              <X data-icon="inline-end" />
            </Button>
          </div>
        </DialogHeader>

        <div key={step} className="animate-in fade-in slide-in-from-right-4 duration-200">
          {step === "addresses" && (
            <AddressListStep
              selectedAddress={selectedAddress}
              onEditAddress={() => setStep("details")}
              onSelectAddress={setSelectedAddress}
              onConfirm={() => setOpen(false)}
            />
          )}
          {step === "location" && <LocationStep onContinue={() => setStep("details")} />}
          {step === "details" && (
            <DetailsStep formId={formId} onContinue={() => setStep("store")} />
          )}
          {step === "store" && (
            <StoreStep
              selectedStore={selectedStore}
              onSelectStore={setSelectedStore}
              onComplete={() => setOpen(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddressListStep({
  selectedAddress,
  onEditAddress,
  onSelectAddress,
  onConfirm,
}: {
  selectedAddress: string;
  onEditAddress: () => void;
  onSelectAddress: (addressId: string) => void;
  onConfirm: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = searchTerm.trim();
  const visibleAddresses = addresses.filter((address) =>
    `${address.title} ${address.address}`.includes(normalizedSearch),
  );

  return (
    <div className="px-6 pt-[18px] pb-6">
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

      <div className="mt-4 flex flex-col gap-2">
        {visibleAddresses.map((address) => {
          const isSelected = address.id === selectedAddress;
          return (
            <div
              className={`h-36 rounded-2xl border p-4 transition-colors ${
                isSelected ? "border-primary-hover bg-muted/60" : "bg-muted/60"
              }`}
              key={address.id}
            >
              <div className="flex items-start gap-3">
                <MapPin className="text-primary-hover size-5 shrink-0" aria-hidden="true" />
                <button
                  aria-pressed={isSelected}
                  className="focus-visible:ring-ring/50 min-w-0 flex-1 text-start focus-visible:ring-3 focus-visible:outline-none"
                  onClick={() => onSelectAddress(address.id)}
                  type="button"
                >
                  <span className="body-medium-bold text-primary-hover block text-start">
                    {address.title}
                  </span>
                  <span className="body-small text-foreground mt-1 block text-start">
                    {address.address}
                  </span>
                  <span className="body-small text-foreground block text-start">
                    کد پستی: {address.postalCode}
                  </span>
                  <span className="body-small text-foreground block text-start">
                    گیرنده: {address.recipient}
                  </span>
                  <span className="body-small text-foreground block text-start">
                    {address.phone}
                  </span>
                </button>
                <Button
                  aria-label={`ویرایش آدرس ${address.title}`}
                  className="text-muted-foreground"
                  size="icon-sm"
                  variant="ghost"
                  onClick={onEditAddress}
                >
                  <Pencil data-icon="inline-end" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {visibleAddresses.length === 0 && (
        <p className="body-small text-muted-foreground py-8 text-center">آدرسی یافت نشد.</p>
      )}

      <Button
        className="mt-10 h-[59px] w-full rounded-full text-base font-bold"
        onClick={onConfirm}
        size="xl"
      >
        تأیید آدرس
      </Button>
    </div>
  );
}

function LocationStep({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="p-5">
      <div className="bg-muted relative h-72 overflow-hidden rounded-2xl border sm:h-88">
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:linear-gradient(25deg,transparent_44%,rgb(255_255_255/.85)_45%,rgb(255_255_255/.85)_48%,transparent_49%),linear-gradient(108deg,transparent_43%,rgb(255_255_255/.9)_44%,rgb(255_255_255/.9)_47%,transparent_48%),radial-gradient(circle_at_22%_68%,#d9f99d_0_7%,transparent_7.5%),radial-gradient(circle_at_73%_26%,#bbf7d0_0_8%,transparent_8.5%)] opacity-70"
        />
        <div className="absolute inset-x-4 top-4 flex gap-2">
          <label className="sr-only" htmlFor="province">
            استان
          </label>
          <select
            className="bg-background text-secondary focus-visible:ring-ring/50 h-11 rounded-lg border px-3 text-sm outline-none focus-visible:ring-3"
            defaultValue="tehran"
            id="province"
          >
            <option value="tehran">تهران</option>
          </select>
          <label className="relative flex min-w-0 flex-1">
            <span className="sr-only">جست‌وجوی مکان</span>
            <Search className="text-muted-foreground pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2" />
            <Input className="bg-background h-11 pe-10" placeholder="جست‌وجوی مکان" />
          </label>
        </div>
        <MapPin className="fill-primary text-secondary absolute start-[42%] top-[52%] size-10 drop-shadow" />
        <MapPin className="fill-primary text-secondary absolute end-[18%] top-[30%] size-8 drop-shadow" />
        <div className="bg-background/90 text-muted-foreground absolute inset-x-0 bottom-0 px-4 py-3 text-center text-xs">
          موقعیت موردنظر را روی نقشه انتخاب کنید
        </div>
      </div>
      <Button
        className="mt-5 h-14 w-full rounded-full text-base font-bold"
        onClick={onContinue}
        size="xl"
      >
        ادامه
      </Button>
    </div>
  );
}

function DetailsStep({ formId, onContinue }: { formId: string; onContinue: () => void }) {
  const [isAlternateReceiver, setIsAlternateReceiver] = useState(true);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onContinue();
  }

  return (
    <form className="p-5" id={formId} onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor={`${formId}-title`}>عنوان آدرس</FieldLabel>
          <Input className="h-12" defaultValue="خانه" id={`${formId}-title`} required />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${formId}-address`}>آدرس</FieldLabel>
          <Input
            className="h-12"
            defaultValue="تهران، میدان ونک، خیابان ملاصدرا"
            id={`${formId}-address`}
            required
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={`${formId}-plaque`}>پلاک</FieldLabel>
            <Input className="h-12" defaultValue="۱۲" id={`${formId}-plaque`} required />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${formId}-unit`}>واحد</FieldLabel>
            <Input className="h-12" defaultValue="۴" id={`${formId}-unit`} />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor={`${formId}-postal-code`}>کد پستی</FieldLabel>
          <Input
            className="h-12"
            defaultValue="۱۹۹۴۸۱۴۵۶۷"
            id={`${formId}-postal-code`}
            inputMode="numeric"
            required
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
        {isAlternateReceiver && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor={`${formId}-receiver-name`}>نام و نام خانوادگی</FieldLabel>
              <Input
                className="h-12"
                defaultValue="محمدرضا چاقی"
                id={`${formId}-receiver-name`}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${formId}-receiver-mobile`}>موبایل</FieldLabel>
              <Input
                className="h-12"
                defaultValue="۰۹۳۵۰۳۴۱۹۵۰"
                id={`${formId}-receiver-mobile`}
                inputMode="tel"
                required
              />
            </Field>
          </div>
        )}
      </FieldGroup>
      <Button className="mt-6 h-14 w-full rounded-full text-base font-bold" size="xl" type="submit">
        ادامه
      </Button>
    </form>
  );
}

function StoreStep({
  selectedStore,
  onSelectStore,
  onComplete,
}: {
  selectedStore: string;
  onSelectStore: (storeId: string) => void;
  onComplete: () => void;
}) {
  return (
    <div className="p-5">
      <p className="body-medium-bold text-secondary mb-5 text-center">
        یکی از فروشگاه‌های نزدیک اطراف خود را انتخاب نمایید:
      </p>
      <div className="flex flex-col gap-3">
        {nearbyStores.map((store) => {
          const isSelected = store.id === selectedStore;
          return (
            <button
              aria-pressed={isSelected}
              className={`focus-visible:ring-ring/50 flex h-20 w-full items-center gap-4 rounded-2xl border p-4 text-start transition-colors focus-visible:ring-3 focus-visible:outline-none ${
                isSelected ? "border-primary-hover bg-muted/60" : "bg-muted/60 hover:bg-muted"
              }`}
              key={store.id}
              onClick={() => onSelectStore(store.id)}
              type="button"
            >
              <MapPin className="fill-primary text-secondary size-10 shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="body-medium-bold text-secondary block">{store.name}</span>
                <span className="body-small text-muted-foreground mt-1 block">{store.address}</span>
              </span>
            </button>
          );
        })}
      </div>
      <Button
        className="mt-10 h-14 w-full rounded-full text-base font-bold"
        onClick={onComplete}
        size="xl"
      >
        ثبت و ادامه
      </Button>
    </div>
  );
}
