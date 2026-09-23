"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import { MoveRight, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { useCreateAddress, useUpdateAddress } from "@/features/address/api/use-address-mutations";
import type {
  Address,
  AddressAuthValue,
  AddressPayload,
} from "@/features/address/api/use-addresses";
import { useAddresses } from "@/features/address/api/use-addresses";
import { cn } from "@/lib/utils";
import {
  ADDRESS_REQUIRED_EVENT,
  getErrorMessage,
  setClientSessionSnapshot,
} from "@/lib/axios-client";
import { useStorefront } from "@/providers/storefront-provider";

import { AddressListStep } from "./address-picker/AddressListStep";
import { DetailsStep } from "./address-picker/DetailsStep";
import { LocationStep } from "./address-picker/LocationStep";
import { StoreStep } from "./address-picker/StoreStep";
import { getResponseMessage } from "./address-picker/get-response-message";
type AddressStep = "addresses" | "location" | "details" | "store";

const ADDRESS_PROMPT_STORAGE_KEY = "etkaline:address-prompt-shown";

interface AddressPickerProps {
  trigger: ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>;
  startInCreateMode?: boolean;
  startInStoreMode?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onStoreSelected?: (storeTitle: string) => void;
  editingAddress?: Address | null;
  showMissingAddressPrompt?: boolean;
  listenForAddressRequired?: boolean;
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
  listenForAddressRequired = false,
}: AddressPickerProps) {
  const { siteType } = useStorefront();
  const { data: session, status, update } = useSession();
  const { data: addresses = [], isSuccess: hasLoadedAddresses } = useAddresses();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const hasAutoPromptedRef = useRef(false);
  const openStoreAfterAuthenticationRef = useRef(false);
  const pendingAddressRequiredRef = useRef(false);
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
  const committedStoreId =
    siteType === "supermarket"
      ? String(session?.user.superMarketStoreId || "")
      : String(session?.user.applianceStoreId || "");
  const shouldPromptForAddress = status === "authenticated" && hasLoadedAddresses;
  const shouldStartAddressCreation = shouldPromptForAddress && addresses.length === 0;
  const hasDefaultAddress = addresses.some((address) => address.isDefault);
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
      setSelectedStore("");
      if (hasLoadedAddresses && addresses.length === 0) {
        setEditingAddress(null);
        setCityId(0);
        setCoordinates({ latitude: "", longitude: "" });
        setSelectedFullAddress("");
        setHideStoreBackButton(false);
        setStep("location");
      } else if (hasDefaultAddress) {
        setHideStoreBackButton(true);
        setStep("store");
      } else {
        setHideStoreBackButton(false);
        setStep("addresses");
      }
      setOpen(true);
      onOpenChange?.(true);
    };

    window.addEventListener("etkala:authenticated", handleAuthenticated);
    return () => window.removeEventListener("etkala:authenticated", handleAuthenticated);
  }, [addresses.length, hasDefaultAddress, hasLoadedAddresses, onOpenChange]);

  useEffect(() => {
    if (!listenForAddressRequired) {
      return;
    }

    const handleAddressRequired = () => {
      if (!hasLoadedAddresses) {
        pendingAddressRequiredRef.current = true;
        return;
      }

      setSelectedStore("");
      if (addresses.length === 0) {
        startCreatingAddress();
      } else {
        setHideStoreBackButton(false);
        setStep("addresses");
      }
      setOpen(true);
      onOpenChange?.(true);
    };
    window.addEventListener(ADDRESS_REQUIRED_EVENT, handleAddressRequired);
    return () => window.removeEventListener(ADDRESS_REQUIRED_EVENT, handleAddressRequired);
  }, [addresses.length, hasLoadedAddresses, listenForAddressRequired, onOpenChange]);

  useEffect(() => {
    if (!hasLoadedAddresses || !pendingAddressRequiredRef.current) {
      return;
    }

    pendingAddressRequiredRef.current = false;
    const openTimer = window.setTimeout(() => {
      setSelectedStore("");
      if (addresses.length === 0) {
        startCreatingAddress();
      } else {
        setHideStoreBackButton(false);
        setStep("addresses");
      }
      setOpen(true);
      onOpenChange?.(true);
    }, 0);
    return () => window.clearTimeout(openTimer);
  }, [addresses.length, hasLoadedAddresses, onOpenChange]);

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
      } else if (hasDefaultAddress) {
        setSelectedStore("");
        setHideStoreBackButton(true);
        setStep("store");
      } else {
        setHideStoreBackButton(false);
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
    hasDefaultAddress,
    startInStoreMode,
  ]);

  useEffect(() => {
    if (
      !isOpen ||
      !startInStoreMode ||
      !hasLoadedAddresses ||
      (addresses.length > 0 && !hasDefaultAddress) ||
      activeStep !== "addresses"
    ) {
      return;
    }

    const addressCreationTimer = window.setTimeout(() => {
      if (hasDefaultAddress) {
        setSelectedStore("");
        setHideStoreBackButton(true);
        setStep("store");
      } else {
        setEditingAddress(null);
        setCityId(0);
        setCoordinates({ latitude: "", longitude: "" });
        setSelectedFullAddress("");
        setHideStoreBackButton(false);
        setStep("location");
      }
    }, 0);

    return () => window.clearTimeout(addressCreationTimer);
  }, [
    activeStep,
    addresses.length,
    hasDefaultAddress,
    hasLoadedAddresses,
    isOpen,
    startInStoreMode,
  ]);

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen && startInStoreMode) {
      setSelectedStore("");
      if (hasLoadedAddresses && addresses.length === 0) {
        startCreatingAddress();
      } else if (hasDefaultAddress) {
        setHideStoreBackButton(true);
        setStep("store");
      } else {
        setHideStoreBackButton(false);
        setStep("addresses");
      }
    }
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) {
      setSelectedStore("");
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
      setSelectedStore("");
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
      setSelectedStore("");
      if (hasLoadedAddresses && addresses.length === 0) {
        startCreatingAddress();
      } else if (hasDefaultAddress) {
        setHideStoreBackButton(true);
        setStep("store");
      } else {
        setHideStoreBackButton(false);
        setStep("addresses");
      }
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
        initialFocus={activeStep === "addresses" ? false : undefined}
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
                "title-medium-bold text-secondary font-bold",
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
              onConfirm={() => {
                setSelectedStore("");
                setHideStoreBackButton(true);
                setStep("store");
              }}
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
              committedStoreId={committedStoreId}
              onSelectStore={(storeId) => {
                setSelectedStore(storeId);
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
