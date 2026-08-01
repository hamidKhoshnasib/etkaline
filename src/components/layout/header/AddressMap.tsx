"use client";

import { useEffect, useEffectEvent, useId, useRef } from "react";
import type { NearApplianceStore } from "@/features/store/api/use-near-appliance-stores";

const DEFAULT_CENTER: [number, number] = [51.389, 35.6892];

interface AddressMapProps {
  focusLatitude?: number;
  focusLongitude?: number;
  focusRequestId?: number;
  focusZoom?: number;
  latitude: string;
  longitude: string;
  onSelect: (coordinates: { latitude: string; longitude: string }) => void;
  stores: NearApplianceStore[];
}

function createStoreFeatures(stores: NearApplianceStore[]): MapViewFeature[] {
  return stores.flatMap((store) => {
    if (store.latitude === null || store.longitude === null) {
      return [];
    }

    return [
      {
        geom: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [store.longitude, store.latitude],
          },
        },
        properties: {
          name: store.title,
          description: store.address,
          storeId: Number(store.id),
          SupportInfo: store.supportDistance ?? 0,
          tel: store.tel,
          city: store.city,
          typeFa: store.typeFa,
        },
      },
    ];
  });
}

function getCoordinates(latitude: string, longitude: string): [number, number] | null {
  if (!latitude.trim() || !longitude.trim()) {
    return null;
  }

  const parsedLatitude = Number(latitude);
  const parsedLongitude = Number(longitude);

  if (
    !Number.isFinite(parsedLatitude) ||
    !Number.isFinite(parsedLongitude) ||
    parsedLatitude < -90 ||
    parsedLatitude > 90 ||
    parsedLongitude < -180 ||
    parsedLongitude > 180
  ) {
    return null;
  }

  return [parsedLongitude, parsedLatitude];
}

export function AddressMap({
  focusLatitude,
  focusLongitude,
  focusRequestId,
  focusZoom = 12,
  latitude,
  longitude,
  onSelect,
  stores,
}: AddressMapProps) {
  const reactId = useId();
  const mapId = `address-map-${reactId.replaceAll(":", "")}`;
  const handleSelect = useEffectEvent(onSelect);
  const initialCoordinates = useRef(getCoordinates(latitude, longitude));
  const focusCoordinates = useRef<[number, number] | null>(
    focusLatitude === undefined || focusLongitude === undefined
      ? null
      : [focusLongitude, focusLatitude],
  );
  const focusZoomRef = useRef(focusZoom);
  const mapServiceRef = useRef<MapService>(undefined);
  const storesRef = useRef(stores);

  useEffect(() => {
    let mapService: MapService | undefined;
    let cancelled = false;

    async function createMap() {
      const selectedCoordinates = initialCoordinates.current;
      const center = selectedCoordinates ?? DEFAULT_CENTER;

      await window.mapServiceReady;

      while (!cancelled && !window.MapService) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      const MapServiceConstructor = window.MapService;
      if (cancelled || !MapServiceConstructor) {
        return;
      }

      mapService = new MapServiceConstructor({
        center,
        editable: true,
        geoserver: "https://map.etkala.ir/geoserver",
        layername: ["osm:osm", "osm:osm_defaults"],
        map: mapId,
        searchServer: "https://map.etkala.ir/search",
        viewJson: createStoreFeatures(storesRef.current),
        zoom: selectedCoordinates ? 15 : 12,
      });
      mapServiceRef.current = mapService;

      mapService.ol2d.on("click", handleMapClick);
      mapService.ol2d.on("moveend", handleMapMoveEnd);

      const cityCenter = focusCoordinates.current;
      if (cityCenter) {
        mapService.ol2d.getView().setCenter(cityCenter);
        mapService.ol2d.getView().setZoom(focusZoomRef.current);
        selectCoordinates(cityCenter);
      }
    }

    function handleMapClick(event: MapClickEvent) {
      mapService?.ol2d.getView().setCenter(event.coordinate);
      selectCoordinates(event.coordinate);
    }

    function handleMapMoveEnd() {
      const center = mapService?.ol2d.getView().getCenter();
      if (center) {
        selectCoordinates(center);
      }
    }

    function selectCoordinates([longitudeValue, latitudeValue]: [number, number]) {
      handleSelect({
        latitude: latitudeValue.toFixed(6),
        longitude: longitudeValue.toFixed(6),
      });
    }

    void createMap();

    return () => {
      cancelled = true;
      mapService?.ol2d.un("click", handleMapClick);
      mapService?.ol2d.un("moveend", handleMapMoveEnd);
      mapService?.ol2d.setTarget(undefined);
      mapServiceRef.current = undefined;
    };
  }, [mapId]);

  useEffect(() => {
    focusZoomRef.current = focusZoom;

    if (focusLatitude === undefined || focusLongitude === undefined) {
      focusCoordinates.current = null;
      return;
    }

    const cityCenter: [number, number] = [focusLongitude, focusLatitude];
    focusCoordinates.current = cityCenter;
    const mapView = mapServiceRef.current?.ol2d.getView();
    if (!mapView) {
      return;
    }

    mapView.setCenter(cityCenter);
    mapView.setZoom(focusZoom);
    handleSelect({
      latitude: focusLatitude.toFixed(6),
      longitude: focusLongitude.toFixed(6),
    });
  }, [focusLatitude, focusLongitude, focusRequestId, focusZoom]);

  useEffect(() => {
    storesRef.current = stores;

    const mapService = mapServiceRef.current;
    if (!mapService) {
      return;
    }

    mapService.vectorView.getSource().clear();
    mapService.addFeatures(createStoreFeatures(stores), mapService.vectorView);
  }, [stores]);

  return (
    <div
      aria-label="نقشه انتخاب موقعیت آدرس"
      className="address-map [&_.nominatim>input]:border-input! [&_.nominatim>input]:text-foreground! [&_.nominatim>input:focus]:border-auth-accent! [&_.nominatim>input::placeholder]:text-muted-foreground! relative z-0 h-full w-full [&_.acceptCoordinate]:hidden [&_.bottombar]:hidden [&_.nominatim]:mr-[35%] [&_.nominatim>input]:m-0! [&_.nominatim>input]:h-11! [&_.nominatim>input]:rounded-lg! [&_.nominatim>input]:border! [&_.nominatim>input]:bg-white! [&_.nominatim>input]:px-3! [&_.nominatim>input]:py-1! [&_.nominatim>input]:font-sans! [&_.nominatim>input]:text-sm! [&_.nominatim>input]:shadow-none! [&_.nominatim>input]:transition-colors! [&_.nominatim>input]:outline-none! [&_.ol-control:not(.nominatim)]:hidden"
      id={mapId}
      role="application"
    />
  );
}
