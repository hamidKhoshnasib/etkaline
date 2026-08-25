import type { Address, AddressPayload } from "@/features/address/api/use-addresses";

export type AddressStep = "addresses" | "location" | "details" | "store";

export type AddressCoordinates = Pick<AddressPayload, "latitude" | "longitude">;

export type AddressPickerEditingState = {
  address: Address | null;
  cityId: number;
  coordinates: AddressCoordinates;
};
