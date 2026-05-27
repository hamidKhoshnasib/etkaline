import { Search } from "lucide-react";
import IconStore from "@/assets/icons/icons8_online_store_2 1.svg";

export function HeaderSearch() {
  return (
    <div className="flex flex-1 justify-center px-4">
      <div className="flex w-full max-w-154.5 items-center overflow-hidden rounded-full bg-white">
        {/* Store label */}
        <div className="text-primary flex shrink-0 items-center gap-2 px-4 py-2.5">
          <IconStore size={18} strokeWidth={1.5} />
          <span className="whitespace-nowrap text-sm font-medium text-gray-400">
            خرید از
            <span className="text-secondary font-bold"> انبار مرکزی اتکالاین </span>
          </span>
        </div>

        {/* Divider */}
        <div className="bg-secondary/20 h-6 w-px shrink-0" />

        {/* Input with split-color fake placeholder */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="text-secondary/40 absolute inset-e-3 top-1/2 -translate-y-1/2"
          />
          <input
            type="search"
            placeholder=" "
            className="peer text-secondary w-full border-0 bg-transparent py-2.5 ps-4 pe-8 text-sm placeholder:text-transparent focus:outline-none"
          />
          <span className="pointer-events-none invisible absolute inset-s-4 inset-e-8 top-1/2 -translate-y-1/2 overflow-hidden text-sm whitespace-nowrap peer-placeholder-shown:visible peer-focus:invisible!">
            <span className="text-secondary/40">جستجو در فروشگاه </span>
            <span className="text-primary">انبار مرکزی اتکالاین</span>
          </span>
        </div>
      </div>
    </div>
  );
}