"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, LocateFixed } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  geocodeLocation,
  reverseGeocodeLocation,
  type LocationCoordinates,
  useProvinces,
} from "@/features/address/api/use-provinces";
import { useNearApplianceStores } from "@/features/store/api/use-near-appliance-stores";

import { AddressMap } from "./AddressMapLazy";
export function LocationStep({
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
