"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ui/ProductCard";
import Bazel from "@/assets/icons/bazell.svg";
import ProductSwiper from "@/components/ui/ProductSwiper";

const categories = [
  { id: "all", label: "همه" },
  { id: "washer", label: "ماشین لباسشویی" },
  { id: "dishwasher", label: "ماشین ظرفشویی" },
  { id: "fridge", label: "یخچال" },
  { id: "vacuum", label: "جارو برقی" },
  { id: "tv", label: "تلویزیون" },
  { id: "cooker", label: "غذا پز" },
  { id: "microwave", label: "ماکروفر" },
];

const products = [
  {
    id: 1,
    title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
    image: "https://via.placeholder.com/180x180?text=Product",
    price: 580000000,
    originalPrice: 828000000,
    discount: 30,
    category: "dishwasher",
  },
  {
    id: 11,
    title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
    image: "https://via.placeholder.com/180x180?text=Product",
    price: 580000000,
    originalPrice: 828000000,
    discount: 30,
    category: "dishwasher",
  },
  {
    id: 111,
    title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
    image: "https://via.placeholder.com/180x180?text=Product",
    price: 580000000,
    originalPrice: 828000000,
    discount: 30,
    category: "dishwasher",
  },
  {
    id: 2,
    title: "یخچال فریزر ساید بای ساید سامسونگ مدل RF23",
    image: "https://via.placeholder.com/180x180?text=Product",
    price: 580000000,
    originalPrice: 828000000,
    discount: 30,
    category: "fridge",
  },
  {
    id: 3,
    title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
    image: "https://via.placeholder.com/180x180?text=Product",
    price: 580000000,
    originalPrice: 828000000,
    discount: 30,
    category: "dishwasher",
  },
  {
    id: 4,
    title: "جارو برقی بوش مدل BGS2400",
    image: "https://via.placeholder.com/180x180?text=Product",
    price: 580000000,
    originalPrice: 828000000,
    discount: 30,
    category: "vacuum",
  },
  {
    id: 5,
    title: "ماشین لباسشویی ۹ کیلوگرمی ال‌جی مدل F4WV909",
    image: "https://via.placeholder.com/180x180?text=Product",
    price: 580000000,
    originalPrice: 828000000,
    discount: 30,
    category: "washer",
  },
  {
    id: 6,
    title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
    image: "https://via.placeholder.com/180x180?text=Product",
    price: 580000000,
    originalPrice: 828000000,
    discount: 30,
    category: "dishwasher",
  },
  {
    id: 7,
    title: "تلویزیون ۵۵ اینچ سامسونگ مدل QN55Q80C",
    image: "https://via.placeholder.com/180x180?text=Product",
    price: 580000000,
    originalPrice: 828000000,
    discount: 30,
    category: "tv",
  },
];

export default function FlashDeals() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <section className="bg-primary-hover border-primary-hover w-full overflow-hidden rounded-[32px] border-2">
      <div className="bg-border relative flex items-center rounded-[16px]">
        <div className="bg-primary-hover absolute top-0 h-1/2 w-full" />
        <div className="absolute bottom-0 h-1/2 w-full bg-white" />
        {/* Title badge */}
        <div className="bg-primary-hover z-10 flex h-18.75 shrink-0 items-center gap-2 rounded-l-[16px] px-2 pl-5">
          <Bazel />
          <span className="headline-large text-white">شگفتانه لحظه‌ای</span>
        </div>

        {/* Category pills */}
        <div className="z-10 flex h-18.75 flex-1 items-center gap-2.5 overflow-x-auto rounded-tr-[16px] bg-white px-3 [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "label-medium shrink-0 rounded-full border px-6 py-3 transition-colors",
                activeCategory === cat.id
                  ? "border-primary-hover text-secondary"
                  : "border[-#F0EEF0] text-[#475569]",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper */}
      <div className="rounded-tr-[16px] bg-white p-4">
        <ProductSwiper
          items={filtered}
          swiperKey={activeCategory}
          renderSlide={(product) => (
            <ProductCard
              title={product.title}
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              className="h-full w-full border-0"
            />
          )}
        />
      </div>
    </section>
  );
}
