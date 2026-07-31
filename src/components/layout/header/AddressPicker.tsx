"use client";

import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import { MapPin, MoveRight, Pencil, Plus, Search, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCreateAddress,
  useSetDefaultAddress,
  useUpdateAddress,
} from "@/features/address/api/use-address-mutations";
import type {
  Address,
  AddressAuthValue,
  AddressPayload,
  ApiResult,
} from "@/features/address/api/use-addresses";
import { useAddresses } from "@/features/address/api/use-addresses";
import { useProvinces } from "@/features/address/api/use-provinces";
import { useNearApplianceStores } from "@/features/store/api/use-near-appliance-stores";
import { cn } from "@/lib/utils";
import { setClientSessionSnapshot } from "@/lib/axios-client";

type AddressStep = "addresses" | "location" | "details" | "store";

const ADDRESS_PROMPT_STORAGE_KEY = "etkaline:address-prompt-shown";

const AddressMap = dynamic(() => import("./AddressMap").then((module) => module.AddressMap), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-2xl" />,
});

interface AddressPickerProps {
  trigger: ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>;
  startInCreateMode?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  editingAddress?: Address | null;
  showMissingAddressPrompt?: boolean;
}

function getResponseMessage(response: ApiResult<unknown>, fallback: string) {
  if (typeof response.message === "string" && response.message.trim()) {
    return response.message;
  }
  if (Array.isArray(response.errors) && typeof response.errors[0] === "string") {
    return response.errors[0];
  }
  return fallback;
}

export function AddressPicker({
  trigger,
  startInCreateMode = false,
  open: controlledOpen,
  onOpenChange,
  editingAddress: externalEditingAddress,
  showMissingAddressPrompt = false,
}: AddressPickerProps) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const hasAutoPromptedRef = useRef(false);
  const [step, setStep] = useState<AddressStep>("addresses");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [cityId, setCityId] = useState(0);
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "" });
  const formId = useId();
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const hasNoApplianceStore = status === "authenticated" && !session.user.applianceStoreId;
  const isExternallyEditing = Boolean(externalEditingAddress);
  const activeEditingAddress = externalEditingAddress ?? editingAddress;
  const activeCityId = externalEditingAddress?.cityId ?? cityId;
  const activeCoordinates = externalEditingAddress
    ? { latitude: externalEditingAddress.latitude, longitude: externalEditingAddress.longitude }
    : coordinates;
  const activeStep: AddressStep = isExternallyEditing ? "details" : step;
  const isOpen = controlledOpen ?? open;

  useEffect(() => {
    if (!showMissingAddressPrompt || !hasNoApplianceStore || hasAutoPromptedRef.current) {
      if (!hasNoApplianceStore) {
        hasAutoPromptedRef.current = false;
      }
      return;
    }

    const promptStorageKey = `${ADDRESS_PROMPT_STORAGE_KEY}:${session.user.backendId}`;
    hasAutoPromptedRef.current = true;

    if (window.sessionStorage.getItem(promptStorageKey)) {
      return;
    }

    window.sessionStorage.setItem(promptStorageKey, "true");
    const promptTimer = window.setTimeout(() => setOpen(true), 0);
    return () => window.clearTimeout(promptTimer);
  }, [hasNoApplianceStore, session?.user.backendId, showMissingAddressPrompt]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) {
      setStep("addresses");
    }
  }

  async function refreshAddressSession(value: AddressAuthValue) {
    await update({ user: value.user, accessToken: value.accessToken });
    setClientSessionSnapshot({ accessToken: value.accessToken.token });
    await queryClient.invalidateQueries();
    router.refresh();
  }

  async function handleSaveAddress(payload: AddressPayload) {
    try {
      const isCreatingAddress = !activeEditingAddress;

      if (activeEditingAddress) {
        const id = Number(activeEditingAddress.id);
        if (!Number.isInteger(id)) {
          throw new Error("شناسه آدرس معتبر نیست.");
        }

        const response = await updateAddress.mutateAsync({ ...payload, id });
        if (response.isSuccess !== true) {
          throw new Error(getResponseMessage(response, "ویرایش آدرس ناموفق بود."));
        }
        toast.success("آدرس با موفقیت ویرایش شد.");
      } else {
        const response = await createAddress.mutateAsync(payload);
        if (response.isSuccess !== true || !response.value) {
          throw new Error(getResponseMessage(response, "ثبت آدرس ناموفق بود."));
        }
        await refreshAddressSession(response.value);
        toast.success("آدرس با موفقیت ثبت شد.");
      }

      await queryClient.invalidateQueries({ queryKey: ["address"] });
      setEditingAddress(null);
      if (isCreatingAddress) {
        setStep("store");
      } else {
        setStep("addresses");
        handleOpenChange(false);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "ثبت آدرس ناموفق بود.");
    }
  }

  function startCreatingAddress() {
    setEditingAddress(null);
    setCityId(0);
    setCoordinates({ latitude: "", longitude: "" });
    setStep("location");
  }

  const configuredTrigger = startInCreateMode
    ? cloneElement(trigger, {
        onClick: (event) => {
          trigger.props.onClick?.(event);
          if (!event.defaultPrevented) {
            startCreatingAddress();
          }
        },
      })
    : trigger;

  const guardedTrigger = cloneElement(configuredTrigger, {
    onClick: (event) => {
      configuredTrigger.props.onClick?.(event);
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
  }[activeStep];

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {status === "unauthenticated" ? guardedTrigger : <DialogTrigger render={configuredTrigger} />}
      <DialogContent
        showCloseButton={false}
        className={cn(
          "flex max-h-[calc(100dvh-2rem)] min-h-0 max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden rounded-[28px] p-0",
          activeStep === "addresses"
            ? "flex h-[min(calc(100dvh-2rem),36rem)] flex-col sm:max-w-[30rem]"
            : "sm:max-w-[38rem]",
        )}
      >
        <DialogHeader
          className={`relative shrink-0 flex-row items-center justify-between border-b px-6 ${
            activeStep === "addresses" ? "h-[89px]" : "py-5"
          }`}
        >
          <div className="flex items-center gap-3">
            {activeStep !== "addresses" && !isExternallyEditing && (
              <Button
                aria-label="بازگشت به مرحله قبل"
                className="text-secondary"
                size="icon-sm"
                variant="ghost"
                onClick={() =>
                  setStep(
                    activeStep === "store"
                      ? "details"
                      : activeStep === "details"
                        ? "location"
                        : "addresses",
                  )
                }
              >
                <MoveRight data-icon="inline-start" />
              </Button>
            )}
            <DialogTitle
              className={`title-medium-bold text-secondary ${
                activeStep === "addresses" ? "" : "absolute left-1/2 -translate-x-1/2"
              }`}
            >
              {stepTitle}
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            مراحل انتخاب موقعیت، ثبت جزئیات و انتخاب فروشگاه نزدیک
          </DialogDescription>
          <div className="flex items-center gap-2">
            {activeStep === "addresses" && (
              <Button
                className="h-11 min-w-40.75 rounded-full px-5"
                onClick={() => {
                  startCreatingAddress();
                }}
                variant="outline-primary"
              >
                <Plus data-icon="inline-start" />
                افزودن آدرس جدید
              </Button>
            )}
            <Button
              aria-label="بستن انتخاب آدرس"
              className="text-muted-foreground"
              size="icon-sm"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
            >
              <X data-icon="inline-end" />
            </Button>
          </div>
        </DialogHeader>

        <div
          key={activeStep}
          className={cn(
            "animate-in fade-in slide-in-from-right-4 min-h-0 flex-1 overflow-y-auto overscroll-contain duration-200",
            activeStep === "addresses" && "flex min-h-0 flex-1 flex-col",
          )}
        >
          {activeStep === "addresses" && (
            <AddressListStep
              selectedAddress={selectedAddress}
              onEditAddress={(address) => {
                setEditingAddress(address);
                setCityId(address.cityId ?? 0);
                setCoordinates({ latitude: address.latitude, longitude: address.longitude });
                setStep("details");
              }}
              onSelectAddress={async (address, value) => {
                await refreshAddressSession(value);
                setSelectedAddress(address.id);
              }}
              onConfirm={() => handleOpenChange(false)}
            />
          )}
          {activeStep === "location" && (
            <LocationStep
              coordinates={coordinates}
              onContinue={(nextCityId) => {
                setCityId(nextCityId);
                setStep("details");
              }}
              onCoordinatesChange={setCoordinates}
            />
          )}
          {activeStep === "details" && (
            <DetailsStep
              address={activeEditingAddress}
              cityId={activeCityId}
              coordinates={activeCoordinates}
              formId={formId}
              isPending={createAddress.isPending || updateAddress.isPending}
              onSave={handleSaveAddress}
            />
          )}
          {activeStep === "store" && (
            <StoreStep
              selectedStore={selectedStore}
              onSelectStore={setSelectedStore}
              onComplete={() => handleOpenChange(false)}
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
  onEditAddress: (address: Address) => void;
  onSelectAddress: (address: Address, value: AddressAuthValue) => Promise<void>;
  onConfirm: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: addresses = [], isError, isPending } = useAddresses();
  const setDefaultAddress = useSetDefaultAddress();
  const normalizedSearch = searchTerm.trim();
  const visibleAddresses = addresses.filter((address) =>
    `${address.title} ${address.address}`.includes(normalizedSearch),
  );
  const activeAddressId =
    selectedAddress || addresses.find((address) => address.isDefault)?.id || addresses[0]?.id || "";

  async function handleSelectAddress(address: Address) {
    const addressId = Number(address.id);
    if (!Number.isInteger(addressId)) {
      toast.error("شناسه آدرس معتبر نیست.");
      return;
    }

    if (address.id === activeAddressId) {
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
                      onClick={() => void handleSelectAddress(address)}
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
          className="h-[59px] w-full rounded-full text-base font-bold"
          disabled={!activeAddressId || isPending || isError}
          onClick={onConfirm}
          size="xl"
        >
          تأیید آدرس
        </Button>
      </div>
    </div>
  );
}

function LocationStep({
  coordinates,
  onContinue,
  onCoordinatesChange,
}: {
  coordinates: { latitude: string; longitude: string };
  onContinue: (cityId: number) => void;
  onCoordinatesChange: (coordinates: { latitude: string; longitude: string }) => void;
}) {
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const { data: provinces = [], isError, isPending } = useProvinces();

  return (
    <div className="p-5">
      <div className="bg-muted relative isolate h-72 overflow-hidden rounded-2xl border sm:h-88">
        <AddressMap
          key={`${coordinates.latitude}-${coordinates.longitude}`}
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
          onSelect={onCoordinatesChange}
        />
        <div className="absolute inset-x-4 top-4 z-[1100] flex gap-2">
          <label className="sr-only" htmlFor="city">
            شهر
          </label>
          <select
            className="bg-background text-secondary focus-visible:border-auth-accent h-11 rounded-lg border px-3 text-sm outline-none"
            disabled={isPending || isError}
            id="city"
            value={selectedProvinceId}
            onChange={(event) => setSelectedProvinceId(event.target.value)}
          >
            <option value="" disabled>
              {isPending
                ? "در حال دریافت استان‌ها"
                : isError
                  ? "دریافت استان‌ها ناموفق بود"
                  : "شهر را انتخاب کنید"}
            </option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.title}
              </option>
            ))}
          </select>
          <label className="relative flex min-w-0 flex-1">
            <span className="sr-only">جست‌وجوی مکان</span>
            <Search className="text-muted-foreground pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2" />
            <Input className="bg-background h-11 pe-10" placeholder="جست‌وجوی مکان" />
          </label>
        </div>
        <div className="bg-background/90 text-muted-foreground absolute inset-x-0 bottom-0 z-[1100] px-4 py-3 text-center text-xs">
          {coordinates.latitude && coordinates.longitude
            ? "موقعیت انتخاب شد؛ برای تغییر، نقطهٔ دیگری روی نقشه انتخاب کنید."
            : "موقعیت موردنظر را روی نقشه انتخاب کنید"}
        </div>
      </div>
      <Button
        className="mt-5 h-14 w-full rounded-full text-base font-bold"
        disabled={!selectedProvinceId || !coordinates.latitude || !coordinates.longitude}
        onClick={() => onContinue(Number(selectedProvinceId))}
        size="xl"
      >
        ادامه
      </Button>
    </div>
  );
}

function DetailsStep({
  address,
  cityId,
  coordinates,
  formId,
  isPending,
  onSave,
}: {
  address: Address | null;
  cityId: number;
  coordinates: { latitude: string; longitude: string };
  formId: string;
  isPending: boolean;
  onSave: (payload: AddressPayload) => Promise<void>;
}) {
  const [isAlternateReceiver, setIsAlternateReceiver] = useState(
    address?.hasOtherReceiver ?? false,
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

    await onSave({
      title: value("title"),
      fullAddress: value("fullAddress"),
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
      plaque: value("plaque"),
      unit: value("unit"),
      postalCode: value("postalCode"),
      hasOtherReceiver: isAlternateReceiver,
      receiverFirstName: value("receiverFirstName"),
      receiverLastName: value("receiverLastName"),
      receiverPhone: value("receiverPhone"),
      isDefault: address?.isDefault ?? true,
      cityId,
    });
  }

  return (
    <form className="p-5" id={formId} onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={`${formId}-receiver-first-name`}>نام</FieldLabel>
            <Input
              className="h-12"
              defaultValue={address?.receiverFirstName ?? ""}
              id={`${formId}-receiver-first-name`}
              name="receiverFirstName"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${formId}-receiver-last-name`}>نام خانوادگی</FieldLabel>
            <Input
              className="h-12"
              defaultValue={address?.receiverLastName ?? ""}
              id={`${formId}-receiver-last-name`}
              name="receiverLastName"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${formId}-receiver-mobile`}>موبایل</FieldLabel>
            <Input
              className="h-12"
              defaultValue={address?.phone ?? ""}
              id={`${formId}-receiver-mobile`}
              inputMode="tel"
              name="receiverPhone"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${formId}-national-code`}>کد ملی</FieldLabel>
            <Input
              className="h-12"
              dir="ltr"
              id={`${formId}-national-code`}
              inputMode="numeric"
              maxLength={10}
              name="nationalCode"
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor={`${formId}-title`}>عنوان آدرس</FieldLabel>
          <Input
            className="h-12"
            defaultValue={address?.title ?? ""}
            id={`${formId}-title`}
            name="title"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${formId}-address`}>آدرس</FieldLabel>
          <Input
            className="h-12"
            defaultValue={address?.address ?? ""}
            id={`${formId}-address`}
            name="fullAddress"
            required
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={`${formId}-plaque`}>پلاک</FieldLabel>
            <Input
              className="h-12"
              defaultValue={address?.plaque ?? ""}
              id={`${formId}-plaque`}
              name="plaque"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${formId}-unit`}>واحد</FieldLabel>
            <Input
              className="h-12"
              defaultValue={address?.unit ?? ""}
              id={`${formId}-unit`}
              name="unit"
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
      </FieldGroup>
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

function StoreStep({
  selectedStore,
  onSelectStore,
  onComplete,
}: {
  selectedStore: string;
  onSelectStore: (storeId: string) => void;
  onComplete: () => void;
}) {
  const { data: stores = [], isError, isPending } = useNearApplianceStores();
  const activeStoreId = selectedStore || stores[0]?.id || "";

  return (
    <div className="p-5">
      <p className="body-medium-bold text-secondary mb-5 text-center">
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
          stores.map((store) => {
            const isSelected = store.id === activeStoreId;
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
        className="mt-10 h-14 w-full rounded-full text-base font-bold"
        disabled={!activeStoreId || isPending || isError}
        onClick={onComplete}
        size="xl"
      >
        ثبت و ادامه
      </Button>
    </div>
  );
}
