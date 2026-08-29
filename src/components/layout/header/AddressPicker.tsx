"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import {
  LoaderCircle,
  LocateFixed,
  MapPin,
  MoveRight,
  Pencil,
  Plus,
  Search,
  Building2,
  BriefcaseBusiness,
  House,
} from "lucide-react";
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
import { useProfile } from "@/features/account/api/use-profile";
import {
  geocodeLocation,
  reverseGeocodeLocation,
  type LocationCoordinates,
  useProvinces,
} from "@/features/address/api/use-provinces";
import { useNearApplianceStores } from "@/features/store/api/use-near-appliance-stores";
import { useSetDefaultStore } from "@/features/store/api/use-store-mutations";
import { cn } from "@/lib/utils";
import { getErrorMessage, setClientSessionSnapshot } from "@/lib/axios-client";
import { useStorefront } from "@/providers/storefront-provider";

type AddressStep = "addresses" | "location" | "details" | "store";

const ADDRESS_PROMPT_STORAGE_KEY = "etkaline:address-prompt-shown";

const AddressMap = dynamic(() => import("./AddressMap").then((module) => module.AddressMap), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-2xl" />,
});

interface AddressPickerProps {
  trigger: ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>;
  startInCreateMode?: boolean;
  startInStoreMode?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onStoreSelected?: (storeTitle: string) => void;
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
  startInStoreMode = false,
  open: controlledOpen,
  onOpenChange,
  onStoreSelected,
  editingAddress: externalEditingAddress,
  showMissingAddressPrompt = false,
}: AddressPickerProps) {
  const { siteType } = useStorefront();
  const { data: session, status, update } = useSession();
  const { data: addresses = [], isSuccess: hasLoadedAddresses } = useAddresses();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const hasAutoPromptedRef = useRef(false);
  const openStoreAfterAuthenticationRef = useRef(false);
  const [step, setStep] = useState<AddressStep>("addresses");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [hideStoreBackButton, setHideStoreBackButton] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [cityId, setCityId] = useState(0);
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "" });
  const [selectedFullAddress, setSelectedFullAddress] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);
  const formId = useId();
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const hasNoStore =
    status === "authenticated" &&
    (siteType === "supermarket"
      ? !session.user.superMarketStoreId
      : !session.user.applianceStoreId);
  const shouldPromptForAddress = hasNoStore && hasLoadedAddresses;
  const shouldStartAddressCreation = shouldPromptForAddress && addresses.length === 0;
  const isExternallyEditing = Boolean(externalEditingAddress);
  const activeEditingAddress = externalEditingAddress ?? editingAddress;
  const isExternalInitialDetails = isExternallyEditing && step === "addresses";
  const activeCityId = isExternalInitialDetails
    ? (externalEditingAddress?.cityId ?? cityId)
    : cityId;
  const activeCoordinates = isExternalInitialDetails
    ? {
        latitude: externalEditingAddress?.latitude ?? coordinates.latitude,
        longitude: externalEditingAddress?.longitude ?? coordinates.longitude,
      }
    : coordinates;
  const activeStep: AddressStep = isExternalInitialDetails ? "details" : step;
  const isOpen = controlledOpen ?? open;

  useEffect(() => {
    const handleAuthenticated = () => {
      if (!openStoreAfterAuthenticationRef.current) {
        return;
      }

      openStoreAfterAuthenticationRef.current = false;
      setHideStoreBackButton(true);
      setStep("store");
      setOpen(true);
      onOpenChange?.(true);
    };

    window.addEventListener("etkala:authenticated", handleAuthenticated);
    return () => window.removeEventListener("etkala:authenticated", handleAuthenticated);
  }, [onOpenChange]);

  useEffect(() => {
    if (!showMissingAddressPrompt || !shouldPromptForAddress || hasAutoPromptedRef.current) {
      if (!shouldPromptForAddress) {
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
    const promptTimer = window.setTimeout(() => {
      if (shouldStartAddressCreation) {
        setEditingAddress(null);
        setCityId(0);
        setCoordinates({ latitude: "", longitude: "" });
        setSelectedFullAddress("");
        setStep("location");
      } else {
        setStep("addresses");
      }
      setOpen(true);
    }, 0);
    return () => window.clearTimeout(promptTimer);
  }, [
    session?.user.backendId,
    shouldPromptForAddress,
    shouldStartAddressCreation,
    showMissingAddressPrompt,
  ]);

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen && startInStoreMode) {
      setHideStoreBackButton(true);
      setStep("store");
    }
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) {
      setHideStoreBackButton(false);
      setStep("addresses");
    }
  }

  async function refreshSession(value: AddressAuthValue, headerName?: string) {
    await update({
      user: { ...value.user, name: headerName || value.user.name },
      accessToken: value.accessToken,
    });
    setClientSessionSnapshot({ accessToken: value.accessToken.token });
    await queryClient.invalidateQueries();
    router.refresh();
  }

  async function handleSaveAddress(payload: AddressPayload, headerName: string) {
    setSaveError(null);

    try {
      if (activeEditingAddress) {
        const id = Number(activeEditingAddress.id);
        if (!Number.isInteger(id)) {
          throw new Error("شناسه آدرس معتبر نیست.");
        }

        const response = await updateAddress.mutateAsync({ ...payload, id });
        if (response.isSuccess !== true) {
          throw new Error(getResponseMessage(response, "ویرایش آدرس ناموفق بود."));
        }
        await update({ user: { name: headerName } });
        toast.success("آدرس با موفقیت ویرایش شد.");
      } else {
        const response = await createAddress.mutateAsync(payload);
        if (response.isSuccess !== true || !response.value) {
          throw new Error(getResponseMessage(response, "ثبت آدرس ناموفق بود."));
        }
        await refreshSession(response.value, headerName);
        toast.success("آدرس با موفقیت ثبت شد.");
      }

      await queryClient.invalidateQueries({ queryKey: ["address"] });
      setEditingAddress(null);
      setHideStoreBackButton(true);
      setStep("store");
    } catch (error) {
      const message = getErrorMessage(error);
      setSaveError(message);
      toast.error(message);
    }
  }

  function startCreatingAddress() {
    setEditingAddress(null);
    setCityId(0);
    setCoordinates({ latitude: "", longitude: "" });
    setSelectedFullAddress("");
    setHideStoreBackButton(false);
    setStep("location");
  }

  const handleTriggerClick: MouseEventHandler<HTMLSpanElement> = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (startInCreateMode) {
      startCreatingAddress();
    } else if (startInStoreMode) {
      setHideStoreBackButton(true);
      setStep("store");
    }

    if (status !== "unauthenticated") {
      return;
    }

    event.preventDefault();
    if (startInStoreMode) {
      openStoreAfterAuthenticationRef.current = true;
    }
    window.dispatchEvent(new Event("etkala:open-auth"));
  };

  const stepTitle = {
    addresses: "آدرس‌های شما",
    location: "انتخاب موقعیت مکانی",
    details: "اطلاعات تکمیلی آدرس",
    store: "انتخاب فروشگاه",
  }[activeStep];
  const canGoBack = activeStep !== "addresses" && !(activeStep === "store" && hideStoreBackButton);

  function handleBack() {
    if (activeStep === "details" && isExternalInitialDetails) {
      setCityId(activeCityId);
      setCoordinates(activeCoordinates);
    }
    setStep(
      activeStep === "store" ? "details" : activeStep === "details" ? "location" : "addresses",
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <span className="contents" onClick={handleTriggerClick}>
        {status === "unauthenticated" ? trigger : <DialogTrigger render={trigger} />}
      </span>
      <DialogContent
        data-site={siteType}
        showCloseButton={false}
        className={cn(
          "flex max-h-[calc(100dvh-2rem)] min-h-0 max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden rounded-[28px] p-0",
          activeStep === "addresses"
            ? "flex h-[min(calc(100dvh-2rem),36rem)] flex-col sm:max-w-[30rem]"
            : activeStep === "store"
              ? "sm:max-w-[30rem]"
              : "sm:max-w-[38rem]",
        )}
      >
        <DialogHeader className="relative h-[72px] shrink-0 flex-row items-center justify-between border-b px-6">
          {canGoBack && (
            <Button
              aria-label="بازگشت به مرحله قبل"
              className="text-secondary absolute start-6"
              size="icon-sm"
              variant="ghost"
              onClick={handleBack}
            >
              <MoveRight data-icon="inline-start" />
            </Button>
          )}
          <div className="flex min-w-0 items-center">
            <DialogTitle
              className={cn(
                "title-medium-bold text-secondary",
                activeStep !== "addresses" &&
                  "absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2",
              )}
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
                await refreshSession(value);
                setSelectedAddress(address.id);
                setHideStoreBackButton(true);
                setStep("store");
              }}
              onConfirm={() => handleOpenChange(false)}
            />
          )}
          {activeStep === "location" && (
            <LocationStep
              coordinates={coordinates}
              onAddressChange={setSelectedFullAddress}
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
              onEditLocation={() => {
                setCityId(activeCityId);
                setCoordinates(activeCoordinates);
                setStep("location");
              }}
              saveError={saveError}
              onSave={handleSaveAddress}
              suggestedFullAddress={selectedFullAddress}
            />
          )}
          {activeStep === "store" && (
            <StoreStep
              selectedStore={selectedStore}
              onSelectStore={(storeId, storeTitle) => {
                setSelectedStore(storeId);
                onStoreSelected?.(storeTitle);
              }}
              onComplete={async (storeTitle, value) => {
                await refreshSession(value);
                if (storeTitle) {
                  onStoreSelected?.(storeTitle);
                }
                handleOpenChange(false);
              }}
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

function LocationStep({
  coordinates,
  onAddressChange,
  onContinue,
  onCoordinatesChange,
}: {
  coordinates: { latitude: string; longitude: string };
  onAddressChange: (address: string) => void;
  onContinue: (cityId: number) => void;
  onCoordinatesChange: (coordinates: { latitude: string; longitude: string }) => void;
}) {
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [mapFocus, setMapFocus] = useState<LocationCoordinates | null>(null);
  const [mapFocusRequestId, setMapFocusRequestId] = useState(0);
  const [mapFocusZoom, setMapFocusZoom] = useState(12);
  const [isLocating, setIsLocating] = useState(false);
  const [isResolvingAddress, setIsResolvingAddress] = useState(false);
  const geocodeController = useRef<AbortController>(null);
  const reverseGeocodeController = useRef<AbortController>(null);
  const reverseGeocodeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { data: provinces = [], isError, isPending } = useProvinces();
  const { data: stores = [] } = useNearApplianceStores();

  useEffect(
    () => () => {
      geocodeController.current?.abort();
      reverseGeocodeController.current?.abort();
      clearTimeout(reverseGeocodeTimer.current);
    },
    [],
  );

  function handleCoordinatesChange(nextCoordinates: { latitude: string; longitude: string }) {
    onCoordinatesChange(nextCoordinates);
    onAddressChange("");
    reverseGeocodeController.current?.abort();
    clearTimeout(reverseGeocodeTimer.current);

    const latitude = Number(nextCoordinates.latitude);
    const longitude = Number(nextCoordinates.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      setIsResolvingAddress(false);
      return;
    }

    setIsResolvingAddress(true);
    reverseGeocodeTimer.current = setTimeout(() => {
      const controller = new AbortController();
      reverseGeocodeController.current = controller;

      void reverseGeocodeLocation({ latitude, longitude }, controller.signal)
        .then((address) => {
          onAddressChange(address ?? "");

          const matchingProvince = address
            ? provinces.find((province) => address.includes(province.title))
            : undefined;
          setSelectedProvinceId(matchingProvince ? String(matchingProvince.id) : "");
        })
        .catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === "AbortError")) {
            onAddressChange("");
          }
        })
        .finally(() => {
          if (reverseGeocodeController.current === controller) {
            setIsResolvingAddress(false);
          }
        });
    }, 350);
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      toast.error("مرورگر شما دریافت موقعیت مکانی را پشتیبانی نمی‌کند.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapFocus({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setMapFocusZoom(17);
        setMapFocusRequestId((requestId) => requestId + 1);
        setIsLocating(false);
      },
      (error) => {
        toast.error(
          error.code === error.PERMISSION_DENIED
            ? "برای نمایش موقعیت فعلی، دسترسی موقعیت مکانی را فعال کنید."
            : "دریافت موقعیت فعلی ممکن نشد. دوباره تلاش کنید.",
        );
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60_000,
        timeout: 12_000,
      },
    );
  }

  async function handleProvinceChange(value: string) {
    setSelectedProvinceId(value);
    setMapFocusZoom(10);
    handleCoordinatesChange({ latitude: "", longitude: "" });

    const province = provinces.find((item) => item.id === Number(value));
    if (!province) {
      setMapFocus(null);
      return;
    }

    if (province.latitude !== undefined && province.longitude !== undefined) {
      setMapFocus({ latitude: province.latitude, longitude: province.longitude });
      return;
    }

    geocodeController.current?.abort();
    const controller = new AbortController();
    geocodeController.current = controller;

    try {
      const location = await geocodeLocation(province.title, controller.signal);
      if (!location) {
        toast.error("موقعیت شهر روی نقشه پیدا نشد.");
        return;
      }
      setMapFocus(location);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        toast.error("انتقال نقشه به شهر انتخاب‌شده ممکن نشد.");
      }
    }
  }

  return (
    <div className="p-5">
      <div className="bg-muted relative isolate h-72 overflow-hidden rounded-2xl border sm:h-88">
        <AddressMap
          focusLatitude={mapFocus?.latitude}
          focusLongitude={mapFocus?.longitude}
          focusRequestId={mapFocusRequestId}
          focusZoom={mapFocusZoom}
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
          onSelect={handleCoordinatesChange}
          stores={stores}
        />
        <div className="absolute top-2 right-4 z-[1100] w-1/3">
          <label className="sr-only" htmlFor="city">
            شهر
          </label>
          <select
            className="bg-background text-secondary focus-visible:border-auth-accent h-11 w-full rounded-lg border px-3 text-sm outline-none"
            disabled={isPending || isError}
            id="city"
            value={selectedProvinceId}
            onChange={(event) => void handleProvinceChange(event.target.value)}
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
        </div>
        <Button
          aria-label="نمایش موقعیت فعلی من"
          className="bg-background text-secondary absolute bottom-14 left-4 z-[1100] rounded-full shadow-md"
          disabled={isLocating}
          size="icon-md"
          title="موقعیت فعلی من"
          type="button"
          variant="outline"
          onClick={handleUseCurrentLocation}
        >
          {isLocating ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : (
            <LocateFixed aria-hidden="true" />
          )}
        </Button>
        <div className="bg-background/90 text-muted-foreground absolute inset-x-0 bottom-0 z-[1100] px-4 py-3 text-center text-xs">
          {coordinates.latitude && coordinates.longitude
            ? "موقعیت انتخاب شد؛ برای تغییر، نقطهٔ دیگری روی نقشه انتخاب کنید."
            : "موقعیت موردنظر را روی نقشه انتخاب کنید"}
        </div>
      </div>
      <Button
        className="mt-5 h-14 w-full rounded-full text-base font-bold"
        disabled={isResolvingAddress || !coordinates.latitude || !coordinates.longitude}
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
  const [addressTitle, setAddressTitle] = useState(address?.title ?? "");
  const [isAlternateReceiver, setIsAlternateReceiver] = useState(
    address?.hasOtherReceiver ?? false,
  );

  const numericInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    input.value = input.value
      .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
      .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
      .replace(/\D/g, "");
  };

  const requiredLabelClass =
    "after:ml-2 after:inline-block after:size-1 after:rounded-full after:bg-orange-500 after:content-['']";

  useEffect(() => {
    if (!profile || !formRef.current) {
      return;
    }

    const values = {
      receiverFirstName: profileFirstName,
      receiverLastName: profileLastName,
      receiverPhone: profile.mobile,
    };

    for (const [name, value] of Object.entries(values)) {
      const input = formRef.current.elements.namedItem(name);
      if (input instanceof HTMLInputElement && !input.value.trim() && value) {
        input.value = value;
      }
    }
  }, [profile, profileFirstName, profileLastName]);

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
    const receiverPhoneInput = formRef.current?.elements.namedItem("receiverPhone");
    const displayedReceiverPhone =
      receiverPhoneInput instanceof HTMLInputElement ? receiverPhoneInput.value.trim() : "";
    const receiverFirstName = isAlternateReceiver
      ? value("alternateReceiverFirstName")
      : value("receiverFirstName") || profileFirstName || addressFirstName;
    const receiverLastName = isAlternateReceiver
      ? value("alternateReceiverLastName")
      : value("receiverLastName") || profileLastName || addressLastName;
    const receiverPhone = isAlternateReceiver
      ? value("alternateReceiverPhone")
      : displayedReceiverPhone || profile?.mobile || address?.phone || "";
    const headerName = [
      value("receiverFirstName") || profileFirstName || addressFirstName,
      value("receiverLastName") || profileLastName || addressLastName,
    ]
      .filter(Boolean)
      .join(" ");

    if (!receiverFirstName || !receiverLastName || !receiverPhone || !headerName) {
      toast.error("اطلاعات گیرنده را کامل کنید.");
      return;
    }

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
        receiverPhone,
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
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel className={requiredLabelClass} htmlFor={`${formId}-receiver-first-name`}>
              نام
            </FieldLabel>
            <Input
              className="h-12"
              defaultValue={addressFirstName || profileFirstName}
              id={`${formId}-receiver-first-name`}
              name="receiverFirstName"
              required
            />
          </Field>
          <Field>
            <FieldLabel className={requiredLabelClass} htmlFor={`${formId}-receiver-last-name`}>
              نام خانوادگی
            </FieldLabel>
            <Input
              className="h-12"
              defaultValue={addressLastName || profileLastName}
              id={`${formId}-receiver-last-name`}
              name="receiverLastName"
              required
            />
          </Field>
          <Field>
            <FieldLabel className={requiredLabelClass} htmlFor={`${formId}-receiver-mobile`}>
              موبایل
            </FieldLabel>
            <Input
              className="h-12"
              defaultValue={address?.phone ?? profile?.mobile ?? ""}
              id={`${formId}-receiver-mobile`}
              inputMode="numeric"
              name="receiverPhone"
              disabled
              required
            />
          </Field>
          <Field>
            <FieldLabel className={requiredLabelClass} htmlFor={`${formId}-national-code`}>
              کد ملی
            </FieldLabel>
            <Input
              className="h-12"
              dir="ltr"
              id={`${formId}-national-code`}
              inputMode="numeric"
              maxLength={10}
              name="nationalCode"
              onInput={numericInput}
              required
            />
          </Field>
        </div>
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

function StoreStep({
  selectedStore,
  onSelectStore,
  onComplete,
}: {
  selectedStore: string;
  onSelectStore: (storeId: string, storeTitle: string) => void;
  onComplete: (storeTitle: string, value: AddressAuthValue) => Promise<void>;
}) {
  const { data: stores = [], isError, isPending } = useNearApplianceStores();
  const setDefaultStore = useSetDefaultStore();
  const activeStoreId = selectedStore || stores[0]?.id || "";

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
          stores.map((store) => {
            const isSelected = store.id === activeStoreId;
            return (
              <button
                aria-pressed={isSelected}
                className={`focus-visible:ring-ring/50 flex h-20 w-full items-center gap-4 rounded-2xl border p-4 text-start transition-colors focus-visible:ring-3 focus-visible:outline-none ${
                  isSelected ? "border-primary-hover bg-muted/60" : "bg-muted/60 hover:bg-muted"
                }`}
                disabled={setDefaultStore.isPending}
                key={store.id}
                onClick={() => onSelectStore(store.id, store.title)}
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
        className="mt-10 h-14 w-full rounded-full text-base font-bold"
        disabled={!activeStoreId || isPending || isError || setDefaultStore.isPending}
        onClick={() => void handleComplete()}
        size="xl"
      >
        ثبت و ادامه
      </Button>
    </div>
  );
}
