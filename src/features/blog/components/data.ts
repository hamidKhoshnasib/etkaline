import { Tag, Blinds, Lightbulb, Trees, Bath, CookingPot } from "lucide-react";
import type { Category } from "./CategoryCard";
import type { CompactBlogCardProps } from "@/features/blog/components/CompactBlogCard";

export const categories: Category[] = [
  { label: "جدیدترین مطالب", icon: Tag, href: "#" },
  { label: "دکوراسیون", icon: Blinds, href: "#" },
  { label: "نور و روشنایی", icon: Lightbulb, href: "#" },
  { label: "فضای باز و باغچه", icon: Trees, href: "#" },
  { label: "سرویس خواب و حمام", icon: Bath, href: "#" },
  { label: "لوازم آشپزخانه", icon: CookingPot, href: "#", active: true },
];

interface GridPost {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  href?: string;
}

export const gridPosts: GridPost[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  image: `https://via.placeholder.com/284x246?text=Blog+${i + 1}`,
  title: "بررسی آخرین مدل های تلوزیون های هوشمند",
  description: "راهنمای خرید و معرفی بهترین گزینه‌های موجود در بازار",
  date: "۹ آذر ۱۴۰۳",
  href: "#",
}));

export const popularPosts: (CompactBlogCardProps & { id: number })[] = Array.from(
  { length: 4 },
  (_, i) => ({
    id: i + 1,
    image: `https://via.placeholder.com/81x76?text=${i + 1}`,
    title: "بررسی آخرین مدل ها ...",
    time: "۱۴ دقیقه قبل",
    views: "۱۲۲ بازدید",
    hasVideo: true,
    href: "#",
  }),
);

export const featuredPost = {
  title: "فرش ایرانی در خانه مدرن",
  description:
    "فرش ایرانی یکی از هنرهای دستی و اصیل ایران است که به دلیل طراحی‌های پیچیده و استفاده از مواد باکیفیت، شهرت جهانی دارد. این فرش‌ها نمادی از فرهنگ، تاریخ و مهارت‌های بافندگان ایرانی هستند و در طرح‌ها، رنگ‌ها و ابعاد مختلف برای استفاده در منازل و دکوراسیون‌های مختلف تولید می‌شوند.",
  image: "https://via.placeholder.com/912x416?text=Featured",
  date: "۹ آذر ۱۴۰۳",
  href: "#",
};

export type { GridPost };
