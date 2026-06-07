"use client";

import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft } from "lucide-react";
import "swiper/css";

const products = [
  { id: 1, name: "چیپس" },
  { id: 2, name: "رب گوجه" },
  { id: 3, name: "پنیر" },
  { id: 4, name: "پنیر تبریز" },
  { id: 5, name: "سس" },
  { id: 6, name: "روغن" },
  { id: 7, name: "نوشابه" },
];

export default function SupermarketCta() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section dir="rtl" className="w-full overflow-hidden rounded-2xl bg-[#00C853]">
      <div className="flex items-center gap-4 py-0.5 pr-0.5 pl-4">
        {/* Title */}

        {/* Product swiper */}
        <div className="flex min-w-0 flex-1 items-center justify-around gap-15 rounded-l-[55px] rounded-r-[20px] border border-white bg-linear-to-l from-[#FFFFFF] to-[#E2E8F0] px-6 py-3.75 overflow-hidden">
          <h3 className="headline-small shrink-0 text-[#00C853]">سوپرمارکت اتکالاین</h3>
          <div className="flex">
            {products.map((product) => (
                <div key={product.id} className="h-16 w-16 rounded-full border-2 border-[#CBD5E1] bg-white" >

              </div>
            ))}
          </div>
          <span className="title-medium hidden shrink-0 text-[#00C853] md:block">
            خرید آنلاین با حکمت کارت + ارسال رایگان
          </span>
        </div>

        {/* Nav arrow */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white"
        >
          <ChevronLeft className="h-5 w-5 text-[#00C853]" />
        </button>
      </div>
    </section>
  );
}
