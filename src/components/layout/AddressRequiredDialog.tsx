"use client";

import { AddressPicker } from "@/components/layout/header/AddressPicker";

export function AddressRequiredDialog() {
  return (
    <AddressPicker
      listenForAddressRequired
      trigger={
        <button type="button" className="sr-only">
          انتخاب آدرس
        </button>
      }
    />
  );
}
