"use client";

import "leaflet/dist/leaflet.css";

import { CircleMarker, MapContainer, TileLayer, useMapEvents } from "react-leaflet";

const DEFAULT_CENTER: [number, number] = [35.6892, 51.389];

interface AddressMapProps {
  latitude: string;
  longitude: string;
  onSelect: (coordinates: { latitude: string; longitude: string }) => void;
}

function getCoordinates(latitude: string, longitude: string): [number, number] | null {
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

  return [parsedLatitude, parsedLongitude];
}

function MapClickHandler({ onSelect }: Pick<AddressMapProps, "onSelect">) {
  useMapEvents({
    click(event) {
      onSelect({
        latitude: event.latlng.lat.toFixed(6),
        longitude: event.latlng.lng.toFixed(6),
      });
    },
  });

  return null;
}

export function AddressMap({ latitude, longitude, onSelect }: AddressMapProps) {
  const selectedCoordinates = getCoordinates(latitude, longitude);
  const center = selectedCoordinates ?? DEFAULT_CENTER;

  return (
    <MapContainer
      aria-label="نقشه انتخاب موقعیت آدرس"
      center={center}
      className="relative z-0 h-full w-full"
      scrollWheelZoom
      zoom={selectedCoordinates ? 15 : 12}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onSelect={onSelect} />
      {selectedCoordinates && (
        <CircleMarker
          center={selectedCoordinates}
          fillOpacity={1}
          pathOptions={{ color: "#003566", fillColor: "#ffc300" }}
          radius={10}
        />
      )}
    </MapContainer>
  );
}
