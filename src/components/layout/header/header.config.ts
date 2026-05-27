import {
  Bath,
  BrickWall,
  Leaf,
  Lightbulb,
  type LucideIcon,
  Package,
  Paintbrush,
  Sofa,
  Tag,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import CategoryIcon from "@/assets/icons/category-2.svg";
import ReceiptIcon from "@/assets/icons/receipt-tax.svg";
import NewsIcon from "@/assets/icons/news.svg";
import PhoneIcon from "@/assets/icons/phone-outgoing.svg";
import ELogo from "@/assets/icons/ELogo.svg";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NavIcon = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

export type NavLink = { href: string; label: string; icon: NavIcon };

export type SubItem = { id: string; label: string; href: string };

export type Subcategory = {
  id: string;
  label: string;
  href: string;
  items: SubItem[];
};

export type Category = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  subcategories: Subcategory[];
};

// ─── Nav links ────────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { href: "/categories", label: "دسته‌بندی کالاها", icon: CategoryIcon },
  { href: "/discounts", label: "تخفیف‌دارها", icon: ReceiptIcon },
  { href: "/blog", label: "بلاگ", icon: NewsIcon },
  { href: "/about", label: "درباره ما", icon: ELogo },
  { href: "/contact", label: "تماس با ما", icon: PhoneIcon },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    id: "furniture",
    label: "مبلمان",
    href: "/categories/furniture",
    icon: Sofa,
    subcategories: [
      {
        id: "living",
        label: "مبلمان پذیرایی",
        href: "/categories/furniture/living",
        items: [
          { id: "sofa", label: "مبل", href: "#" },
          { id: "coffee-table", label: "میز جلو مبلی", href: "#" },
          { id: "tv-stand", label: "میز تلویزیون", href: "#" },
        ],
      },
      {
        id: "dining",
        label: "مبلمان ناهارخوری",
        href: "/categories/furniture/dining",
        items: [
          { id: "dining-table", label: "میز ناهارخوری", href: "#" },
          { id: "chair", label: "صندلی", href: "#" },
          { id: "bar-stool", label: "صندلی اپن", href: "#" },
        ],
      },
      {
        id: "office",
        label: "مبلمان اداری",
        href: "/categories/furniture/office",
        items: [
          { id: "desk", label: "میز کار", href: "#" },
          { id: "office-chair", label: "صندلی اداری", href: "#" },
        ],
      },
    ],
  },
  {
    id: "decor",
    label: "دکوراسیون داخلی",
    href: "/categories/decor",
    icon: Paintbrush,
    subcategories: [
      {
        id: "wall-decor",
        label: "دکور دیوار",
        href: "/categories/decor/wall",
        items: [
          { id: "picture-frame", label: "قاب تصویر", href: "#" },
          { id: "wall-clock", label: "ساعت دیواری", href: "#" },
          { id: "mirror", label: "آینه", href: "#" },
        ],
      },
      {
        id: "ornaments",
        label: "تزئینات",
        href: "/categories/decor/ornaments",
        items: [
          { id: "vase", label: "گلدان", href: "#" },
          { id: "candle", label: "شمع", href: "#" },
          { id: "figurine", label: "مجسمه", href: "#" },
        ],
      },
    ],
  },
  {
    id: "kitchen",
    label: "لوازم آشپزخانه",
    href: "/categories/kitchen",
    icon: UtensilsCrossed,
    subcategories: [
      {
        id: "kitchen-org",
        label: "سازماندهی آشپزخانه",
        href: "/categories/kitchen/organization",
        items: [
          { id: "cabinet-organizer", label: "نظم دهنده کابینت", href: "#" },
          { id: "shelf", label: "شلف و کشو", href: "#" },
        ],
      },
      {
        id: "kitchen-electric",
        label: "لوازم برقی آشپزخانه",
        href: "/categories/kitchen/electric",
        items: [
          { id: "rice-cooker", label: "پلویز", href: "#" },
          { id: "microwave", label: "ماکروویو", href: "#" },
          { id: "blender", label: "همزن و مخلوط کن", href: "#" },
          { id: "fridge", label: "یخچال فریزر", href: "#" },
        ],
      },
      {
        id: "kitchen-serving",
        label: "ظروف پذیرایی",
        href: "/categories/kitchen/serving",
        items: [
          { id: "plate", label: "بشقاب و لیوان", href: "#" },
          { id: "tea-set", label: "سرویس چایخوری", href: "#" },
          { id: "china", label: "سرویس چینی", href: "#" },
        ],
      },
      {
        id: "kitchen-cookware",
        label: "ظروف پخت و پز",
        href: "/categories/kitchen/cookware",
        items: [
          { id: "pot-set", label: "سرویس قابلمه", href: "#" },
          { id: "pressure-cooker", label: "زودپز", href: "#" },
        ],
      },
    ],
  },
  {
    id: "bedroom-bath",
    label: "سرویس خواب و حمام",
    href: "/categories/bedroom-bath",
    icon: Bath,
    subcategories: [
      {
        id: "bedding",
        label: "ملحفه و روتختی",
        href: "/categories/bedroom-bath/bedding",
        items: [
          { id: "sheet", label: "ملحفه", href: "#" },
          { id: "comforter", label: "روتختی", href: "#" },
          { id: "pillow", label: "بالش", href: "#" },
        ],
      },
      {
        id: "bath-towels",
        label: "حوله و دستمال",
        href: "/categories/bedroom-bath/towels",
        items: [
          { id: "bath-towel", label: "حوله حمام", href: "#" },
          { id: "hand-towel", label: "دستمال دست", href: "#" },
        ],
      },
    ],
  },
  {
    id: "lighting",
    label: "نور پردازی و روشنایی",
    href: "/categories/lighting",
    icon: Lightbulb,
    subcategories: [
      {
        id: "ceiling",
        label: "لوستر و سقفی",
        href: "/categories/lighting/ceiling",
        items: [
          { id: "chandelier", label: "لوستر", href: "#" },
          { id: "spot", label: "اسپات", href: "#" },
        ],
      },
      {
        id: "lamps",
        label: "آباژور و چراغ",
        href: "/categories/lighting/lamps",
        items: [
          { id: "table-lamp", label: "چراغ رومیزی", href: "#" },
          { id: "floor-lamp", label: "چراغ پایه‌دار", href: "#" },
        ],
      },
    ],
  },
  {
    id: "organization",
    label: "لوازم سازماندهی",
    href: "/categories/organization",
    icon: Package,
    subcategories: [
      {
        id: "storage",
        label: "جعبه و سبد",
        href: "/categories/organization/storage",
        items: [
          { id: "box", label: "جعبه نگهداری", href: "#" },
          { id: "basket", label: "سبد", href: "#" },
          { id: "drawer", label: "کشو", href: "#" },
        ],
      },
    ],
  },
  {
    id: "tools",
    label: "ابزار و تجهیزات خانه",
    href: "/categories/tools",
    icon: Wrench,
    subcategories: [
      {
        id: "hand-tools",
        label: "ابزار دستی",
        href: "/categories/tools/hand",
        items: [
          { id: "screwdriver", label: "پیچ‌گوشتی", href: "#" },
          { id: "hammer", label: "چکش", href: "#" },
          { id: "drill", label: "دریل", href: "#" },
        ],
      },
    ],
  },
  {
    id: "outdoor",
    label: "فضای باز و باغچه",
    href: "/categories/outdoor",
    icon: Leaf,
    subcategories: [
      {
        id: "plants",
        label: "گیاهان و گل",
        href: "/categories/outdoor/plants",
        items: [
          { id: "indoor-plant", label: "گیاه آپارتمانی", href: "#" },
          { id: "outdoor-plant", label: "گیاه فضای باز", href: "#" },
        ],
      },
      {
        id: "garden-tools",
        label: "ابزار باغبانی",
        href: "/categories/outdoor/tools",
        items: [
          { id: "hoe", label: "بیل و کج‌بیل", href: "#" },
          { id: "watering-can", label: "آبپاش", href: "#" },
        ],
      },
    ],
  },
  {
    id: "services",
    label: "خدمات",
    href: "/categories/services",
    icon: BrickWall,
    subcategories: [
      {
        id: "installation",
        label: "نصب و راه‌اندازی",
        href: "/categories/services/installation",
        items: [
          { id: "furniture-install", label: "نصب مبلمان", href: "#" },
          { id: "appliance-install", label: "نصب لوازم برقی", href: "#" },
        ],
      },
    ],
  },
  {
    id: "special",
    label: "محصولات ویژه",
    href: "/categories/special",
    icon: Tag,
    subcategories: [
      {
        id: "seasonal",
        label: "فصلی و مناسبتی",
        href: "/categories/special/seasonal",
        items: [
          { id: "gift", label: "هدیه", href: "#" },
          { id: "seasonal-item", label: "محصولات فصلی", href: "#" },
        ],
      },
    ],
  },
];
