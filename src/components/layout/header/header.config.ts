import type { ComponentType, SVGProps } from "react";

import CategoryIcon from "@/assets/icons/category-2.svg";
import ELogo from "@/assets/icons/ELogo.svg";
import NewsIcon from "@/assets/icons/news.svg";
import PhoneIcon from "@/assets/icons/phone-outgoing.svg";
import ReceiptIcon from "@/assets/icons/receipt-tax.svg";

export type NavIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavLink {
  href: string;
  label: string;
  icon: NavIcon;
}

export const navLinks: NavLink[] = [
  { href: "/categories", label: "دسته‌بندی کالاها", icon: CategoryIcon },
  { href: "/discounts", label: "تخفیف‌دارها", icon: ReceiptIcon },
  { href: "/blog", label: "بلاگ", icon: NewsIcon },
  { href: "/about", label: "درباره ما", icon: ELogo },
  { href: "/contact-us", label: "تماس با ما", icon: PhoneIcon },
];
